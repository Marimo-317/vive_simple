# AutoDev System Architecture

**Technical Architecture Documentation**  
**AutoDev Spec-Driven Development System**  
**Version:** 2.0 (SDD Integration)  
**Last Updated:** January 8, 2025

---

## 🏗️ **Architecture Overview**

AutoDev は Claude Code AI プラットフォーム上に構築された、完全自動化開発システムです。Spec-Driven Development (SDD) パラダイムと従来のシンプル開発モードの両方をサポートし、企業レベルの品質管理から迅速なプロトタイピングまでをカバーします。

### **Core Design Principles**

1. **Modular Architecture** - 独立したコンポーネントによる拡張可能設計
2. **Event-Driven Workflow** - Hook システムによる自動化とカスタマイズ
3. **Agent Orchestration** - 専門化されたAIエージェントの協調動作
4. **State Management** - 永続化された workflow 状態管理
5. **Template-Based Generation** - 一貫した文書・コード生成

---

## 🎯 **System Components**

```
┌─────────────────────────────────────────────────────────────────┐
│                      AutoDev System                             │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │
│  │ Command Layer │  │  Hook Engine  │  │   Agent System    │   │
│  │               │  │               │  │                   │   │
│  │ /autodev-*    │◄─┤ Event-Driven │◄─┤ Specialized AIs   │   │
│  │ Slash Commands│  │ Automation    │  │ Sub-Agents        │   │
│  └───────────────┘  └───────────────┘  └───────────────────┘   │
│           │                   │                   │             │
│           ▼                   ▼                   ▼             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │
│  │ State Manager │  │ Template Eng. │  │ GitHub Integration│   │
│  │               │  │               │  │                   │   │
│  │ Workflow      │  │ Document      │  │ Issues & PRs      │   │
│  │ Persistence   │  │ Generation    │  │ Automation        │   │
│  └───────────────┘  └───────────────┘  └───────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Claude Code Platform                           │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │
│  │ AI Language   │  │ Tool System   │  │  Context Manager  │   │
│  │ Model         │  │               │  │                   │   │
│  │ (Claude 3.5)  │  │ Read/Write    │  │ Conversation      │   │
│  │               │  │ Git/GitHub    │  │ Memory            │   │
│  └───────────────┘  └───────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 **Component Architecture**

### **1. Command Layer**

**Purpose:** ユーザーインタフェースとコマンド処理  
**Location:** `.claude/commands/`

#### **Command Categories:**

**SDD Commands:**
- `/autodev-spec` - Workflow guidance and entry point
- `/autodev-init` - Project steering document creation
- `/autodev-requirements` - Requirements specification
- `/autodev-design` - Technical design specification
- `/autodev-tasks` - Implementation task breakdown
- `/autodev-approve-spec` - Individual specification approval

**Legacy Commands:**
- `/autodev-plan` - Simple mode planning
- `/autodev-approve` - Simple mode approval
- `/autodev-execute` - Implementation execution (shared)

#### **Command Processing Flow:**
```
User Input → Claude Code → Command Parser → Hook Trigger → Script Execution → Agent Orchestration
```

### **2. Hook Engine**

**Purpose:** イベント駆動自動化システム  
**Configuration:** `.claude/hooks/autodev-hooks.json`

#### **Hook Types & Triggers:**

**UserPromptSubmit Hooks:**
```
User Command → Hook Matcher → Script Execution → Workflow Initialization
```

**PreToolUse Hooks:**
```
Agent Launch → Context Preparation → Agent Coordination → Execution
```

**PostToolUse Hooks:**
```
Agent Completion → Result Processing → State Update → Progress Tracking
```

**Session/Stop Hooks:**
```
Session Events → State Persistence → Checkpoint Creation → Cleanup
```

#### **Hook Execution Architecture:**
```javascript
// Hook execution pipeline
Input (JSON) → Script Process → State Mutation → Output/Side Effects

// Example hook flow:
UserPromptSubmit("/autodev-requirements Feature X")
  ↓
Matcher: "^/autodev-requirements"
  ↓
Script: init-autodev-requirements.js
  ↓
State: Create requirements workflow state
  ↓
Agent: Launch requirements-analyst
```

### **3. Agent System**

**Purpose:** 専門化されたAIエージェントの協調システム  
**Configuration:** `.claude/scripts/agent-prompts.js`

#### **Agent Categories:**

**SDD Specialized Agents:**
- **steering-creator** - Project vision and direction
- **requirements-analyst** - Detailed requirements analysis
- **technical-architect** - System design and architecture
- **implementation-planner** - Task breakdown and scheduling

**Implementation Agents:**
- **search-specialist** - Codebase research and analysis
- **backend-architect** - Backend system design
- **frontend-developer** - UI/UX implementation
- **test-automator** - Comprehensive testing
- **debugger/error-detective** - Problem diagnosis and resolution
- **deployment-engineer** - CI/CD and deployment
- **docs-architect** - Documentation generation

**Quality Assurance Agents:**
- **code-reviewer** - Code quality assessment
- **security-auditor** - Security vulnerability analysis
- **performance-engineer** - Performance optimization

#### **Agent Orchestration Flow:**
```
Workflow State → Agent Selection → Context Preparation → Agent Execution → Result Processing
```

#### **Agent Communication Protocol:**
```json
{
  "agent_type": "requirements-analyst",
  "context": {
    "feature": "Feature description",
    "project_context": {...},
    "steering_document": "..."
  },
  "template": ".claude/templates/requirements.md",
  "output_location": ".claude/specs/requirements-feature.md"
}
```

### **4. State Management System**

**Purpose:** ワークフロー状態の永続化と管理  
**Location:** `.claude/state/`

#### **State Files:**

**SDD State (`autodev-sdd.json`):**
```json
{
  "project": {
    "name": "string",
    "description": "string",
    "type": "spec-driven",
    "createdAt": "timestamp"
  },
  "phases": {
    "phase0": { "status": "completed", "steps": [...] },
    "phase1": { "status": "in_progress", "steps": [...] },
    "phase2": { "status": "not_started", "steps": [...] }
  },
  "specifications": {
    "steering": { "status": "approved", "file": "...", "approvedAt": "..." },
    "requirements": { "status": "in_progress", "file": "..." },
    "design": { "status": "not_started" },
    "tasks": { "status": "not_started" }
  },
  "currentPhase": 1,
  "currentStep": "1.1",
  "workflow": "sdd"
}
```

**Simple State (`autodev-workflow.json`):**
```json
{
  "feature": "Feature description",
  "phase": "awaiting_approval",
  "steps": {
    "phase1": [{"status": "completed"}, ...],
    "phase2": [{"status": "pending"}, ...]
  },
  "approval": {
    "status": "pending",
    "feedback": null
  },
  "workflow": "simple"
}
```

#### **State Transitions:**

**SDD Mode State Machine:**
```
initial → project_setup → requirements_spec → requirements_approved →
design_spec → design_approved → tasks_spec → tasks_approved →
implementation → completed
```

**Simple Mode State Machine:**
```
initial → planning → awaiting_approval → approved → implementation → completed
```

#### **State Management Operations:**
```javascript
// State CRUD operations
function readWorkflowState(type) { /* Read JSON file */ }
function updateWorkflowState(state, changes) { /* Merge and persist */ }
function validateStateTransition(current, target) { /* Validate transition */ }
function createCheckpoint(state) { /* Create restoration point */ }
```

### **5. Template Engine**

**Purpose:** 一貫した文書・コード生成システム  
**Location:** `.claude/templates/`

#### **Template Architecture:**

```
Template File (.md) → Placeholder Replacement → Agent Processing → Output Generation
```

#### **Template Types:**

**Document Templates:**
- `steering.md` - Project steering document (40+ placeholders)
- `requirements.md` - Requirements specification (50+ placeholders)
- `design.md` - Technical design (60+ placeholders)
- `tasks.md` - Implementation tasks (80+ placeholders)

#### **Template Processing Pipeline:**
```javascript
// Template processing flow
Template Loading → Placeholder Identification → Context Injection → 
Agent Enhancement → Final Document Generation → File Persistence
```

#### **Placeholder System:**
```markdown
<!-- Simple placeholders -->
{{PROJECT_NAME}} → "E-commerce Platform"
{{CREATED_DATE}} → "2025-01-08T10:30:00Z"

<!-- Array placeholders -->
{{#API_ENDPOINTS}}
**{{METHOD}} {{ENDPOINT}}**
- Purpose: {{PURPOSE}}
- Authentication: {{AUTH_REQUIRED}}
{{/API_ENDPOINTS}}

<!-- Conditional placeholders -->
{{#HAS_DATABASE}}
### Database Schema
{{DATABASE_SCHEMA}}
{{/HAS_DATABASE}}
```

### **6. GitHub Integration**

**Purpose:** Issue管理・PR自動化システム  
**Dependencies:** GitHub CLI (`gh`)

#### **Integration Components:**

**Issue Management:**
```javascript
// Issue creation workflow
Approved Specifications → Task Extraction → Issue Template Generation → 
GitHub Issue Creation → Issue Linking → Project Board Updates
```

**Pull Request Automation:**
```javascript
// PR creation workflow
Implementation Completion → Code Review → Commit Organization → 
PR Description Generation → PR Creation → Review Assignment
```

#### **GitHub Integration Architecture:**
```
AutoDev State → Issue Template → GitHub CLI Command → GitHub API → 
Repository Update → State Synchronization
```

---

## 🔄 **Data Flow Architecture**

### **SDD Mode Data Flow**

```
1. User Command:
   /autodev-requirements "Feature description"
   ↓
2. Hook Trigger:
   UserPromptSubmit → init-autodev-requirements.js
   ↓
3. State Initialization:
   Create/Update autodev-sdd.json
   ↓
4. Agent Orchestration:
   Launch requirements-analyst with context
   ↓
5. Template Processing:
   requirements.md template + agent context
   ↓
6. Document Generation:
   .claude/specs/requirements-feature.md
   ↓
7. State Update:
   Mark requirements as "in_progress"
   ↓
8. User Approval Gate:
   /autodev-approve-spec requirements [approve|reject]
   ↓
9. State Transition:
   Update approval status, unlock next phase
```

### **Agent Execution Flow**

```
Hook Trigger → Agent Selection → Context Preparation → Agent Launch → 
Result Processing → State Update → Next Agent/Phase
```

#### **Context Preparation:**
```javascript
// Agent context assembly
const agentContext = {
  feature: workflowState.specifications.requirements.feature,
  projectContext: workflowState.project,
  steeringDocument: readFile('.claude/specs/steering.md'),
  requirementsDocument: readFile('.claude/specs/requirements-feature.md'),
  existingCode: analyzeCodebase(),
  qualityStandards: extractQualityStandards()
};
```

### **Template Processing Flow**

```
Template File → Placeholder Extraction → Context Mapping → 
Agent Enhancement → Document Assembly → File Generation
```

#### **Template Context Injection:**
```javascript
// Template rendering process
function renderTemplate(templatePath, context) {
  const template = fs.readFileSync(templatePath, 'utf8');
  const placeholders = extractPlaceholders(template);
  const renderedContent = replacePlaceholders(template, context);
  return enhanceWithAgent(renderedContent, context);
}
```

---

## 🔐 **Security Architecture**

### **Security Layers**

#### **1. Input Validation**
```javascript
// Command input sanitization
function validateUserInput(input) {
  // SQL injection prevention
  // Script injection prevention
  // Path traversal prevention
  // Length validation
}
```

#### **2. File System Security**
```javascript
// Secure file operations
function secureFileWrite(path, content) {
  // Path validation (must be within .claude/)
  // Permission checking
  // Atomic write operations
  // Backup creation
}
```

#### **3. GitHub Integration Security**
```javascript
// Secure GitHub operations
function secureGitHubOperation(operation, data) {
  // Token validation
  // Repository permission verification
  // Rate limit compliance
  // Audit logging
}
```

#### **4. State Protection**
```javascript
// State file security
function protectWorkflowState(state) {
  // Sensitive data redaction
  // Schema validation
  // Integrity verification
  // Access control
}
```

### **Security Best Practices**

- **Credential Management:** No API keys or tokens in code
- **File Permissions:** Restricted access to .claude/ directory
- **Input Sanitization:** All user inputs validated and sanitized
- **Audit Logging:** All significant operations logged
- **Error Handling:** No sensitive information in error messages

---

## 📊 **Performance Architecture**

### **Performance Characteristics**

#### **Command Response Times:**
- Simple commands (status, help): < 100ms
- SDD initialization: < 2 seconds
- Specification generation: 10-30 seconds
- Implementation execution: 5-20 minutes

#### **Memory Usage:**
- Base system: < 50MB
- Active workflow: < 200MB
- Peak implementation: < 500MB

#### **Scalability Factors:**
- Project size (file count, complexity)
- Specification detail level
- Implementation scope
- Agent coordination overhead

### **Performance Optimizations**

#### **1. Lazy Loading**
```javascript
// Load components only when needed
const agentPrompts = require('./agent-prompts'); // Loaded on first use
const templates = {}; // Cached after first load
```

#### **2. State Caching**
```javascript
// In-memory state caching
let workflowStateCache = null;
function getCachedWorkflowState() {
  if (!workflowStateCache) {
    workflowStateCache = loadWorkflowState();
  }
  return workflowStateCache;
}
```

#### **3. Parallel Processing**
```javascript
// Concurrent agent operations where possible
async function parallelAgentExecution(agents) {
  const results = await Promise.all(
    agents.map(agent => executeAgent(agent))
  );
  return combineResults(results);
}
```

#### **4. File I/O Optimization**
```javascript
// Efficient file operations
const fsPromises = require('fs').promises;
async function optimizedFileWrite(path, content) {
  // Use async I/O
  // Minimize file system operations
  // Batch related operations
}
```

---

## 🔧 **Extension Architecture**

### **Plugin System Design**

#### **Plugin Structure:**
```
.claude/plugins/
├── plugin-name/
│   ├── plugin.json          # Plugin manifest
│   ├── commands/            # Custom commands
│   ├── scripts/             # Hook scripts
│   ├── templates/           # Document templates
│   ├── agents/              # Agent definitions
│   └── hooks.json           # Hook configuration
```

#### **Plugin Lifecycle:**
```
Discovery → Loading → Registration → Initialization → Execution → Cleanup
```

#### **Plugin API:**
```javascript
// Plugin interface
class AutoDevPlugin {
  constructor(config) {
    this.name = config.name;
    this.version = config.version;
  }
  
  async initialize() { /* Setup resources */ }
  async registerCommands() { /* Add commands */ }
  async registerHooks() { /* Add hooks */ }
  async registerAgents() { /* Add agents */ }
  async cleanup() { /* Cleanup resources */ }
}
```

### **Customization Points**

#### **1. Command Extensions**
- Add new slash commands
- Modify existing command behavior
- Custom validation logic

#### **2. Agent Extensions**
- Custom specialized agents
- Agent behavior modification
- Context enhancement

#### **3. Template Extensions**
- Custom document templates
- Template inheritance
- Dynamic content generation

#### **4. Hook Extensions**
- Custom event handling
- Workflow customization
- Integration with external systems

---

## 📈 **Monitoring & Observability**

### **System Metrics**

#### **Operational Metrics:**
- Command execution frequency
- Agent success/failure rates
- Workflow completion times
- Error frequencies by component

#### **Performance Metrics:**
- Response time percentiles (p50, p95, p99)
- Memory usage patterns
- File I/O operations
- GitHub API usage

#### **Quality Metrics:**
- Specification approval rates
- Implementation success rates
- Code quality scores
- Test coverage achievements

### **Logging Architecture**

#### **Log Categories:**
```javascript
// Structured logging
const logger = {
  command: (cmd, user, timestamp) => log('COMMAND', {cmd, user, timestamp}),
  agent: (agent, phase, duration) => log('AGENT', {agent, phase, duration}),
  state: (transition, from, to) => log('STATE', {transition, from, to}),
  error: (error, context) => log('ERROR', {error, context})
};
```

#### **Log Levels:**
- **DEBUG:** Detailed execution traces
- **INFO:** Normal operation events
- **WARN:** Non-critical issues
- **ERROR:** System errors and failures

### **Health Checks**

```javascript
// System health monitoring
function healthCheck() {
  return {
    status: 'healthy',
    components: {
      claudeCode: checkClaudeCode(),
      nodeJs: checkNodeJs(),
      githubCli: checkGitHubCli(),
      fileSystem: checkFileSystem(),
      workflowState: checkWorkflowState()
    },
    timestamp: new Date().toISOString()
  };
}
```

---

## 🔄 **Backup & Recovery**

### **Backup Strategy**

#### **What to Backup:**
- Workflow state files (`.claude/state/`)
- Generated specifications (`.claude/specs/`)
- Configuration files (`.claude/hooks/`, `CLAUDE.md`)
- Custom extensions (`.claude/plugins/`)

#### **Backup Automation:**
```javascript
// Automated backup creation
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `.claude/backups/backup-${timestamp}`;
  
  fs.mkdirSync(backupPath, { recursive: true });
  copyRecursively('.claude/specs', `${backupPath}/specs`);
  copyRecursively('.claude/state', `${backupPath}/state`);
}
```

### **Recovery Procedures**

#### **State Recovery:**
```javascript
// Restore workflow state from backup
function restoreWorkflowState(backupTimestamp) {
  const backupPath = `.claude/backups/backup-${backupTimestamp}`;
  copyRecursively(`${backupPath}/state`, '.claude/state');
  validateWorkflowState();
}
```

#### **Specification Recovery:**
```javascript
// Restore specifications from backup
function restoreSpecifications(backupTimestamp) {
  const backupPath = `.claude/backups/backup-${backupTimestamp}`;
  copyRecursively(`${backupPath}/specs`, '.claude/specs');
}
```

---

## 🔬 **Testing Architecture**

### **Testing Strategy**

#### **Component Testing:**
```javascript
// Hook script testing
describe('AutoDev Hook Scripts', () => {
  test('init-autodev-requirements.js', () => {
    const mockInput = { prompt: '/autodev-requirements Test feature' };
    const result = executeHook('init-autodev-requirements.js', mockInput);
    expect(result.exitCode).toBe(0);
  });
});
```

#### **Integration Testing:**
```javascript
// Workflow testing
describe('SDD Workflow', () => {
  test('Complete requirements → design → tasks flow', async () => {
    await executeCommand('/autodev-requirements Test feature');
    await executeCommand('/autodev-approve-spec requirements approve');
    await executeCommand('/autodev-design');
    
    const state = readWorkflowState();
    expect(state.specifications.design.status).toBe('in_progress');
  });
});
```

#### **End-to-End Testing:**
```javascript
// Full system testing
describe('AutoDev E2E', () => {
  test('Complete SDD workflow execution', async () => {
    // Initialize project
    await executeCommand('/autodev-init Test Project');
    
    // Requirements phase
    await executeCommand('/autodev-requirements Test feature');
    await executeCommand('/autodev-approve-spec requirements approve');
    
    // Design phase
    await executeCommand('/autodev-design');
    await executeCommand('/autodev-approve-spec design approve');
    
    // Tasks phase
    await executeCommand('/autodev-tasks');
    await executeCommand('/autodev-approve-spec tasks approve');
    
    // Verify final state
    const state = readWorkflowState();
    expect(state.phases.phase1.status).toBe('completed');
  });
});
```

---

## 📚 **Documentation Architecture**

### **Documentation System**

#### **Document Types:**
- **User Documentation:** Setup, usage, troubleshooting
- **Developer Documentation:** API reference, architecture
- **System Documentation:** Configuration, deployment
- **Generated Documentation:** Specifications, API docs

#### **Documentation Generation:**
```javascript
// Automated documentation updates
function updateDocumentation() {
  generateCommandReference();
  updateAPIDocumentation();
  createArchitectureDiagrams();
  validateDocumentationLinks();
}
```

### **Knowledge Management**

#### **Information Architecture:**
```
DEVELOPMENT-ENVIRONMENT.md    # System overview
├── SETUP-GUIDE.md           # Installation & setup
├── USAGE-MANUAL.md          # Usage instructions
├── TROUBLESHOOTING.md       # Problem solving
├── API-REFERENCE.md         # Technical reference
└── SYSTEM-ARCHITECTURE.md   # Architecture details
```

#### **Cross-Reference System:**
- Consistent terminology across documents
- Internal links between related sections
- Version synchronization
- Automatic validation

---

**📈 Future Architecture Considerations:**

- **Microservices Architecture:** Breaking down into smaller services
- **Cloud Integration:** AWS/Azure deployment capabilities
- **Real-time Collaboration:** Multi-user workflow support
- **Advanced AI Integration:** GPT-4, Claude 3, and future models
- **Enterprise Features:** RBAC, audit trails, compliance

**📅 Document Version:** 1.0  
**📅 Last Updated:** January 8, 2025  
**🔄 Next Architecture Review:** March 8, 2025