# AutoDev API Reference & Developer Manual

**Technical Reference for AutoDev System**  
**Target Audience:** Developers, System Administrators, Advanced Users  
**Version:** 2.0 (SDD Integration)

---

## 📋 **Table of Contents**

1. [Command Reference](#command-reference)
2. [Hook System API](#hook-system-api)
3. [Agent Prompt Customization](#agent-prompt-customization)
4. [Workflow State API](#workflow-state-api)
5. [Template System](#template-system)
6. [Configuration Reference](#configuration-reference)
7. [Extension Development](#extension-development)

---

## 🎯 **Command Reference**

### **SDD Mode Commands**

#### `/autodev-spec <feature_description>`
**Purpose:** SDD workflow entry point and guidance  
**Usage:** `/autodev-spec Add user authentication with JWT`  
**Parameters:**
- `feature_description` (string, required): Detailed feature description

**Behavior:**
- Analyzes current project state
- Provides workflow guidance
- Shows available next steps
- Checks prerequisites

**Output:**
- Workflow status display
- Next step recommendations
- Command suggestions

---

#### `/autodev-init <project_description>`
**Purpose:** Initialize project steering document  
**Usage:** `/autodev-init E-commerce platform with React frontend`  
**Parameters:**
- `project_description` (string, required): Comprehensive project description

**Prerequisites:** None  
**Generates:** `.claude/specs/steering.md`  
**State Change:** Creates SDD project state

**Agent Used:** `steering-creator`  
**Template:** `.claude/templates/steering.md`

---

#### `/autodev-requirements <feature_description>`
**Purpose:** Create detailed requirements specification  
**Usage:** `/autodev-requirements User authentication with OAuth`  
**Parameters:**
- `feature_description` (string, required): Detailed feature description

**Prerequisites:** 
- SDD project initialized (recommended)
- No pending requirements approval

**Generates:** `.claude/specs/requirements-[feature-name].md`  
**State Change:** Sets requirements phase to `in_progress`

**Agent Used:** `requirements-analyst`  
**Template:** `.claude/templates/requirements.md`

---

#### `/autodev-design`
**Purpose:** Create technical design specification  
**Usage:** `/autodev-design`  
**Parameters:** None

**Prerequisites:**
- Requirements specification approved
- No pending design approval

**Generates:** `.claude/specs/design-[feature-name].md`  
**State Change:** Sets design phase to `in_progress`

**Agent Used:** `technical-architect`  
**Template:** `.claude/templates/design.md`

---

#### `/autodev-tasks`
**Purpose:** Generate implementation task breakdown  
**Usage:** `/autodev-tasks`  
**Parameters:** None

**Prerequisites:**
- Requirements specification approved
- Design specification approved
- No pending tasks approval

**Generates:** `.claude/specs/tasks-[feature-name].md`  
**State Change:** Sets tasks phase to `in_progress`

**Agent Used:** `implementation-planner`  
**Template:** `.claude/templates/tasks.md`

---

#### `/autodev-approve-spec <spec_type> [action] [feedback]`
**Purpose:** Approve or reject individual specifications  
**Usage Examples:**
- `/autodev-approve-spec requirements`
- `/autodev-approve-spec requirements approve "Comprehensive coverage"`
- `/autodev-approve-spec design reject "Need more caching details"`

**Parameters:**
- `spec_type` (enum, required): `requirements` | `design` | `tasks`
- `action` (enum, optional): `approve` | `reject`
- `feedback` (string, optional for approve, required for reject)

**Behavior:**
- No action: Shows specification status and content
- `approve`: Marks specification as approved, unlocks next phase
- `reject`: Marks for revision, triggers automatic improvement

**State Changes:**
- Approval: Updates `approvedAt` timestamp, unlocks dependent phases
- Rejection: Sets status to `rejected`, adds feedback for revision

---

### **Simple Mode Commands (Legacy)**

#### `/autodev-plan <feature_description>`
**Purpose:** Combined research, planning, and requirements  
**Usage:** `/autodev-plan Add shopping cart functionality`  
**Parameters:**
- `feature_description` (string, required): Feature description

**Behavior:**
- Executes search-specialist, architect-reviewer, business-analyst
- Creates combined planning state
- Waits for single approval gate

**State Change:** Sets to `awaiting_approval`

---

#### `/autodev-approve [action] [feedback]`
**Purpose:** Simple mode approval gate  
**Usage Examples:**
- `/autodev-approve`
- `/autodev-approve approve "Good plan"`
- `/autodev-approve reject "Need OAuth integration"`

**Parameters:**
- `action` (enum, optional): `approve` | `reject`
- `feedback` (string, optional)

**Prerequisites:** Simple mode planning completed

---

### **Shared Commands**

#### `/autodev-execute`
**Purpose:** Execute implementation phase  
**Usage:** `/autodev-execute`  
**Parameters:** None

**Prerequisites:**
- SDD Mode: All specifications approved (requirements, design, tasks)
- Simple Mode: Planning approved

**Behavior:**
1. Creates GitHub issues from approved specifications
2. Executes implementation with specialized agents
3. Runs testing and debugging phases
4. Creates pull request
5. Updates documentation
6. Creates follow-up issues

**Agents Used:** All implementation agents (backend-architect, test-automator, etc.)

---

## 🔗 **Hook System API**

### **Hook Configuration Structure**

**File:** `.claude/hooks/autodev-hooks.json`

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "^/autodev-command",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/scripts/hook-script.js",
            "timeout": 5000
          }
        ]
      }
    ],
    "PreToolUse": [...],
    "PostToolUse": [...],
    "Stop": [...],
    "SessionStart": [...]
  }
}
```

### **Hook Events**

#### `UserPromptSubmit`
**Trigger:** User submits command  
**Input:** `{"prompt": "user input", "timestamp": "ISO string"}`  
**Purpose:** Command preprocessing, validation, workflow initialization

#### `PreToolUse`
**Trigger:** Before agent execution  
**Input:** `{"tool": "Task", "tool_input": {...}, "timestamp": "ISO string"}`  
**Purpose:** Agent coordination, context preparation

#### `PostToolUse`
**Trigger:** After agent completion  
**Input:** `{"tool": "Task", "tool_result": {...}, "timestamp": "ISO string"}`  
**Purpose:** Workflow progression, state updates, issue creation

#### `Stop`
**Trigger:** Claude stops responding  
**Input:** `{"session_id": "string", "timestamp": "ISO string"}`  
**Purpose:** Checkpoints, progress logging

#### `SessionStart`
**Trigger:** New Claude session  
**Input:** `{"session_id": "string", "timestamp": "ISO string"}`  
**Purpose:** Environment setup, state recovery

### **Hook Script Development**

**Basic Hook Script Template:**
```javascript
#!/usr/bin/env node

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    
    // Your hook logic here
    console.log('Hook executed');
    
    // Exit codes:
    // 0: Success, continue
    // 1: Error, stop execution
    process.exit(0);
    
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(1);
  }
});
```

**Hook Script Utilities:**
```javascript
const fs = require('fs');

// Read workflow state
function readWorkflowState() {
  const sddFile = '.claude/state/autodev-sdd.json';
  const simpleFile = '.claude/state/autodev-workflow.json';
  
  if (fs.existsSync(sddFile)) {
    return JSON.parse(fs.readFileSync(sddFile, 'utf8'));
  }
  if (fs.existsSync(simpleFile)) {
    return JSON.parse(fs.readFileSync(simpleFile, 'utf8'));
  }
  return null;
}

// Save workflow state
function saveWorkflowState(state, isSDD = true) {
  const file = isSDD ? '.claude/state/autodev-sdd.json' : '.claude/state/autodev-workflow.json';
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}
```

---

## 🤖 **Agent Prompt Customization**

### **Agent Prompt System**

**File:** `.claude/scripts/agent-prompts.js`

```javascript
const SDD_AGENT_PROMPTS = {
  'agent-name': (parameters) => `
    Agent-specific prompt template
    Parameters: ${JSON.stringify(parameters)}
  `
};

module.exports = { AGENT_PROMPTS, SDD_AGENT_PROMPTS };
```

### **Available Agents**

#### **SDD Specialized Agents**

**`steering-creator`**
- **Purpose:** Create project steering documents
- **Parameters:** `(projectDescription, context)`
- **Output:** Project steering document with vision, technical direction

**`requirements-analyst`**
- **Purpose:** Detailed requirements analysis
- **Parameters:** `(feature, projectContext, steeringDoc)`
- **Output:** Comprehensive requirements specification

**`technical-architect`**
- **Purpose:** Technical design and architecture
- **Parameters:** `(feature, requirementsDoc, projectContext, steeringDoc)`
- **Output:** Detailed technical design specification

**`implementation-planner`**
- **Purpose:** Task breakdown and planning
- **Parameters:** `(feature, requirementsDoc, designDoc, projectContext)`
- **Output:** Detailed implementation task breakdown

#### **Implementation Agents (Shared)**

**Standard implementation agents:**
- `search-specialist` - Codebase analysis
- `backend-architect` - Backend design
- `frontend-developer` - Frontend implementation
- `test-automator` - Test creation
- `debugger` - Issue resolution
- `deployment-engineer` - Deployment and PR
- `docs-architect` - Documentation

### **Custom Agent Prompt Example**

```javascript
const CUSTOM_PROMPTS = {
  'custom-security-auditor': (feature, codeContext) => `
🔐 **CUSTOM SECURITY AUDIT SPECIALIST**

**Feature:** ${feature}
**Code Context:** ${JSON.stringify(codeContext)}

**Security Audit Objectives:**
1. Review authentication and authorization patterns
2. Identify potential security vulnerabilities
3. Ensure OWASP compliance
4. Validate input sanitization
5. Check for sensitive data exposure

**Custom Security Standards:**
- All API endpoints must have rate limiting
- Passwords must meet company complexity requirements
- All user inputs must be validated and sanitized
- Session management must use secure tokens
- Error messages must not expose internal information

**Output Requirements:**
- Security assessment report
- List of vulnerabilities with severity
- Recommended fixes with code examples
- Compliance checklist
  `,
  
  'custom-performance-optimizer': (feature, performanceTargets) => `
⚡ **CUSTOM PERFORMANCE OPTIMIZATION SPECIALIST**

**Feature:** ${feature}
**Performance Targets:** ${JSON.stringify(performanceTargets)}

**Optimization Focus:**
1. Database query optimization
2. API response time improvement
3. Frontend bundle size reduction
4. Caching strategy implementation
5. Memory usage optimization

**Performance Standards:**
- API responses < 200ms (95th percentile)
- Database queries < 50ms average
- Frontend initial load < 2 seconds
- Bundle size < 500KB gzipped
- Memory usage < 100MB per user session

**Deliverables:**
- Performance audit report
- Optimization implementation plan
- Monitoring and alerting setup
- Load testing strategy
  `
};
```

---

## 📊 **Workflow State API**

### **SDD State Structure**

```json
{
  "project": {
    "name": "string",
    "description": "string", 
    "createdAt": "ISO timestamp",
    "type": "spec-driven"
  },
  "phases": {
    "phase0": {
      "id": 0,
      "name": "Project Initialization",
      "status": "completed",
      "startedAt": "ISO timestamp",
      "completedAt": "ISO timestamp",
      "steps": [...]
    },
    "phase1": {
      "id": 1,
      "name": "Specification Development", 
      "status": "in_progress",
      "steps": [
        {
          "id": "1.1",
          "name": "Requirements Specification",
          "status": "completed",
          "agent": "requirements-analyst",
          "startedAt": "ISO timestamp",
          "completedAt": "ISO timestamp"
        }
      ]
    },
    "phase2": {
      "id": 2,
      "name": "Implementation",
      "status": "not_started",
      "steps": [...]
    }
  },
  "specifications": {
    "steering": {
      "status": "approved",
      "file": ".claude/specs/steering.md",
      "approvedAt": "ISO timestamp"
    },
    "requirements": {
      "status": "approved",
      "file": ".claude/specs/requirements-feature.md",
      "feature": "Feature description",
      "featureName": "feature-name",
      "approvedAt": "ISO timestamp",
      "approvalHistory": [
        {
          "action": "approved",
          "timestamp": "ISO timestamp", 
          "feedback": "Approval comment"
        }
      ]
    }
  },
  "currentPhase": 1,
  "currentStep": "1.2",
  "workflow": "sdd",
  "issues": {
    "epic": "123",
    "tasks": ["124", "125"],
    "bugs": [],
    "followups": ["126", "127"]
  }
}
```

### **Simple Mode State Structure**

```json
{
  "feature": "Feature description",
  "startTime": "ISO timestamp",
  "phase": "awaiting_approval",
  "currentStep": 4,
  "steps": {
    "phase1": [...],
    "phase2": [...]
  },
  "approval": {
    "status": "pending",
    "feedback": null,
    "approvedAt": null
  },
  "planning": {
    "research": "Research results",
    "plan": "Implementation plan",
    "requirements": "Requirements summary"
  },
  "issues": {...}
}
```

### **State Manipulation Functions**

```javascript
// Read current workflow state
function getCurrentWorkflowState() {
  const sddFile = '.claude/state/autodev-sdd.json';
  const simpleFile = '.claude/state/autodev-workflow.json';
  
  if (fs.existsSync(sddFile)) {
    return {
      type: 'sdd',
      state: JSON.parse(fs.readFileSync(sddFile, 'utf8'))
    };
  }
  if (fs.existsSync(simpleFile)) {
    return {
      type: 'simple',
      state: JSON.parse(fs.readFileSync(simpleFile, 'utf8'))
    };
  }
  return null;
}

// Update specification approval
function approveSpecification(specType, feedback = null) {
  const workflow = getCurrentWorkflowState();
  if (!workflow || workflow.type !== 'sdd') return false;
  
  const spec = workflow.state.specifications[specType];
  spec.status = 'approved';
  spec.approvedAt = new Date().toISOString();
  
  if (!spec.approvalHistory) spec.approvalHistory = [];
  spec.approvalHistory.push({
    action: 'approved',
    timestamp: new Date().toISOString(),
    feedback: feedback || 'Approved without comment'
  });
  
  saveWorkflowState(workflow.state, true);
  return true;
}

// Check if ready for next phase
function canProceedToPhase(targetPhase) {
  const workflow = getCurrentWorkflowState();
  if (!workflow) return false;
  
  if (workflow.type === 'sdd') {
    const specs = workflow.state.specifications;
    switch (targetPhase) {
      case 'design':
        return specs.requirements?.approvedAt != null;
      case 'tasks':
        return specs.requirements?.approvedAt && specs.design?.approvedAt;
      case 'implementation':
        return specs.requirements?.approvedAt && specs.design?.approvedAt && specs.tasks?.approvedAt;
      default:
        return false;
    }
  }
  
  if (workflow.type === 'simple') {
    return workflow.state.approval.status === 'approved';
  }
  
  return false;
}
```

---

## 📝 **Template System**

### **Template Structure**

Templates use Handlebars-style placeholders: `{{PLACEHOLDER_NAME}}`

**Template Location:** `.claude/templates/`

### **Available Templates**

#### **Steering Document Template**
**File:** `steering.md`  
**Purpose:** Project initialization and direction  
**Placeholders:**
- `{{PROJECT_NAME}}` - Project name
- `{{PROJECT_DESCRIPTION}}` - Detailed project description
- `{{CREATED_DATE}}` - Creation timestamp
- `{{FRONTEND_TECH}}` - Frontend technology choice
- `{{BACKEND_TECH}}` - Backend technology choice
- `{{DATABASE_TECH}}` - Database choice
- Plus 20+ additional placeholders

#### **Requirements Template**
**File:** `requirements.md`  
**Purpose:** Detailed feature requirements  
**Placeholders:**
- `{{FEATURE_NAME}}` - Feature name
- `{{FEATURE_DESCRIPTION}}` - Feature description
- `{{PROJECT_NAME}}` - Parent project name
- `{{CORE_REQUIREMENTS}}` - Array of requirements
- `{{USER_STORIES}}` - Array of user stories
- Plus 30+ additional placeholders

#### **Design Template**  
**File:** `design.md`  
**Purpose:** Technical architecture and design  
**Placeholders:**
- `{{SYSTEM_ARCHITECTURE_DESCRIPTION}}` - Architecture overview
- `{{API_ENDPOINTS}}` - Array of endpoint specifications
- `{{SCHEMA_CHANGES}}` - Database schema changes
- `{{COMPONENTS}}` - Frontend components
- Plus 40+ additional placeholders

#### **Tasks Template**
**File:** `tasks.md`  
**Purpose:** Implementation task breakdown  
**Placeholders:**
- `{{TOTAL_TASKS}}` - Total number of tasks
- `{{ESTIMATED_HOURS}}` - Total estimated effort
- `{{DATABASE_TASKS}}` - Array of database tasks
- `{{API_TASKS}}` - Array of API tasks
- Plus 50+ additional placeholders

### **Custom Template Development**

**Adding New Templates:**
1. Create template file in `.claude/templates/`
2. Use `{{PLACEHOLDER}}` syntax for dynamic content
3. Support array placeholders with `{{#ARRAY}}...{{/ARRAY}}`
4. Update agent prompts to use new template

**Template Inheritance:**
```markdown
<!-- Base template -->
# {{DOCUMENT_TYPE}} Specification

**Feature:** {{FEATURE_NAME}}  
**Project:** {{PROJECT_NAME}}  
**Created:** {{CREATED_DATE}}

<!-- Custom sections -->
{{CUSTOM_CONTENT}}
```

---

## ⚙️ **Configuration Reference**

### **Claude Code Configuration**

**File:** `CLAUDE.md`  
**Purpose:** Project-specific Claude Code settings

```markdown
# Claude Code Configuration

## Project Overview
This is the `project_name` project. 

## Coding Standards
- Follow existing code conventions
- Use TypeScript for type safety
- Write comprehensive tests
- Follow security best practices

## AutoDev Integration
- **AutoDev Mode**: SDD (Spec-Driven Development)
- **Quality Gates**: All specifications must be approved
- **Documentation**: Comprehensive specifications required
```

### **Hook Configuration**

**File:** `.claude/hooks/autodev-hooks.json`  
**Configuration Options:**

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "regex_pattern",
        "hooks": [
          {
            "type": "command",
            "command": "script_path",
            "timeout": 5000,
            "async": false
          }
        ]
      }
    ]
  }
}
```

**Configuration Parameters:**
- `matcher` (string): Regex pattern to match user input
- `command` (string): Script path to execute
- `timeout` (number): Maximum execution time in milliseconds
- `async` (boolean): Whether to run asynchronously

### **Agent Configuration**

**File:** `.claude/scripts/agent-prompts.js`  
**Customizable Elements:**
- Agent-specific instructions
- Project context integration
- Quality standards
- Output format requirements
- Technology preferences

### **Environment Variables**

```bash
# AutoDev behavior customization
export AUTODEV_VALIDATE_WITH_TESTS=true      # Run tests during validation
export AUTODEV_CREATE_DRAFT_PR=true          # Create draft pull requests
export AUTODEV_REQUIRE_APPROVAL_COMMENT=true # Require comments for approval
export AUTODEV_DEBUG=true                    # Enable debug logging
export AUTODEV_TIMEOUT=10000                 # Hook timeout in milliseconds

# GitHub integration
export GITHUB_TOKEN=your_token               # GitHub authentication token
export GITHUB_REPO=owner/repo                # Default repository

# Claude Code integration
export CLAUDE_MODEL=claude-3-opus            # Preferred model
export CLAUDE_MAX_TOKENS=4000                # Token limit per request
```

---

## 🔧 **Extension Development**

### **Creating Custom Commands**

**Command File Structure:**
```markdown
---
description: "Command description"
usage: "/custom-command <parameter>"
examples:
  - "/custom-command example usage"
---

# Custom Command

Command implementation and help text.
```

**Command Registration:**
1. Create command file in `.claude/commands/`
2. Add hook handler in `.claude/hooks/autodev-hooks.json`
3. Create initialization script in `.claude/scripts/`

### **Custom Agent Development**

**Agent Prompt Template:**
```javascript
const CUSTOM_AGENTS = {
  'custom-agent': (parameters) => `
🎯 **CUSTOM AGENT MISSION**

**Parameters:** ${JSON.stringify(parameters)}

**Objectives:**
1. Custom objective 1
2. Custom objective 2

**Output Requirements:**
- Specific output format
- Quality standards
- Integration requirements

**Context Integration:**
- Use project context
- Follow established patterns
- Maintain consistency
  `
};
```

**Agent Integration:**
1. Add agent prompt to `agent-prompts.js`
2. Create agent initialization logic
3. Update workflow to use custom agent
4. Test agent behavior

### **Custom Hook Development**

**Hook Script Template:**
```javascript
#!/usr/bin/env node

const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => input += chunk);

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    
    // Custom hook logic
    customHookLogic(hookData);
    
    console.log('Custom hook completed');
    process.exit(0);
    
  } catch (error) {
    console.error('Custom hook error:', error.message);
    process.exit(1);
  }
});

function customHookLogic(data) {
  // Implement custom functionality
  // Read/write workflow state
  // Integrate with external systems
  // Validate inputs/outputs
}
```

### **Plugin Architecture**

**Plugin Structure:**
```
.claude/plugins/
├── custom-plugin/
│   ├── commands/
│   ├── scripts/
│   ├── templates/
│   ├── hooks.json
│   └── plugin.json
```

**Plugin Manifest:**
```json
{
  "name": "custom-plugin",
  "version": "1.0.0",
  "description": "Custom AutoDev plugin",
  "author": "Developer Name",
  "commands": ["custom-command"],
  "hooks": ["custom-hook"],
  "dependencies": ["autodev-core"]
}
```

---

## 📊 **Performance & Optimization**

### **Performance Monitoring**

```javascript
// Performance measurement in hooks
const startTime = process.hrtime();

// Your hook logic here

const [seconds, nanoseconds] = process.hrtime(startTime);
const milliseconds = seconds * 1000 + nanoseconds / 1000000;
console.log(`Hook execution time: ${milliseconds.toFixed(2)}ms`);
```

### **Memory Management**

```javascript
// Memory usage monitoring
const memoryUsage = process.memoryUsage();
console.log({
  rss: Math.round(memoryUsage.rss / 1024 / 1024) + 'MB',
  heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
  heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB'
});
```

### **Optimization Guidelines**

**Hook Optimization:**
- Use efficient JSON parsing
- Avoid synchronous file operations where possible
- Implement proper error handling
- Use appropriate timeout values

**State Management:**
- Minimize state file size
- Use efficient data structures
- Implement state cleanup
- Archive old workflow states

---

**📚 Additional Resources:**
- **Usage Guide:** `USAGE-MANUAL.md`
- **Setup Instructions:** `SETUP-GUIDE.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`
- **Environment Overview:** `DEVELOPMENT-ENVIRONMENT.md`

**📅 Document Version:** 1.0  
**📅 Last Updated:** January 8, 2025