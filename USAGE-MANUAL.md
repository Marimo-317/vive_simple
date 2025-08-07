# AutoDev Usage Manual

**Comprehensive User Guide for AutoDev Spec-Driven Development System**  
**Target Audience:** Developers, Team Leads, Project Managers  
**Prerequisites:** Completed setup from `SETUP-GUIDE.md`

---

## 📖 **Table of Contents**

1. [Quick Start Guide](#quick-start-guide)
2. [SDD Mode Complete Walkthrough](#sdd-mode-complete-walkthrough)
3. [Simple Mode Walkthrough](#simple-mode-walkthrough)
4. [Advanced Usage Patterns](#advanced-usage-patterns)
5. [Team Collaboration Workflows](#team-collaboration-workflows)
6. [Best Practices](#best-practices)
7. [Common Use Cases](#common-use-cases)

---

## 🚀 **Quick Start Guide**

### **Choose Your Development Mode**

**🎯 Use SDD Mode when:**
- Building production features
- Working in teams
- Need comprehensive documentation
- Quality is priority over speed
- Complex feature requirements

**🏃 Use Simple Mode when:**
- Rapid prototyping
- Personal projects
- Simple feature additions
- Speed is priority over documentation

### **SDD Mode Quick Start**
```bash
# Start Claude Code in your project
claude

# Begin SDD workflow
/autodev-spec Add user authentication system

# Follow the guided workflow:
/autodev-init My E-commerce Platform                 # Project setup
/autodev-requirements User auth with JWT and OAuth   # Requirements
/autodev-approve-spec requirements approve          # Approve
/autodev-design                                     # Technical design
/autodev-approve-spec design approve                # Approve
/autodev-tasks                                      # Implementation tasks
/autodev-approve-spec tasks approve                 # Approve
/autodev-execute                                    # Auto implementation
```

### **Simple Mode Quick Start**
```bash
# Start Claude Code in your project
claude

# Begin simple workflow
/autodev-plan Add user authentication with JWT tokens
/autodev-approve approve "Looks good, proceed"
/autodev-execute
```

---

## 🎯 **SDD Mode Complete Walkthrough**

### **Phase 0: Project Initialization**

**When to use:**
- Starting a new project
- Setting up project-wide standards
- Establishing team guidelines

**Step 1: Initialize Project Steering**
```bash
/autodev-init E-commerce platform with React frontend and Node.js backend
```

**What happens:**
- Creates `.claude/specs/steering.md` with project vision
- Establishes technical direction and architecture principles
- Sets quality standards and development approach
- Defines decision framework and team structure

**Review the steering document:**
```bash
# The system will create a comprehensive steering document
# Review: .claude/specs/steering.md
```

**Steering Document Contents:**
- Project Vision & Objectives
- Technical Direction (tech stack, architecture)
- Development Approach (methodology, timeline)
- Decision Framework (approval processes)

### **Phase 1A: Requirements Specification**

**Step 2: Create Requirements Specification**
```bash
/autodev-requirements User authentication system with JWT tokens, OAuth integration, and two-factor authentication
```

**What happens:**
- Analyzes feature requirements in detail
- Creates comprehensive requirements document
- Defines user stories with acceptance criteria
- Establishes business rules and validation logic
- Documents integration and data requirements

**Generated file:** `.claude/specs/requirements-user-authentication-system.md`

**Requirements Document Sections:**
- **Functional Requirements** - Core features with priorities
- **Non-Functional Requirements** - Performance, security, usability
- **Business Rules** - Validation, authorization, compliance
- **Integration Requirements** - APIs, external services
- **Quality Assurance** - Testing strategy, success criteria

**Step 3: Review Requirements**
```bash
/autodev-approve-spec requirements
```

**Review Output Example:**
```
📋 AutoDev Specification Review: REQUIREMENTS
==================================================
📊 Project: E-commerce platform
🎯 Feature: User authentication system with JWT tokens, OAuth integration
📁 Document: .claude/specs/requirements-user-authentication-system.md
🔄 Status: in_progress
⏰ Started: Jan 8, 2025, 10:30:00 AM

📋 Prerequisites:
   • Project Steering: ✅ Complete

🎯 Available Actions:
   /autodev-approve-spec requirements approve [comment] - Approve specification
   /autodev-approve-spec requirements reject <feedback> - Reject with feedback
```

**Step 4: Approve or Reject Requirements**
```bash
# Approve
/autodev-approve-spec requirements approve "Comprehensive requirements, covers all OAuth providers and security considerations"

# Or reject with feedback
/autodev-approve-spec requirements reject "Need more details on password reset flow and account recovery"
```

### **Phase 1B: Technical Design**

**Step 5: Create Technical Design (requires approved requirements)**
```bash
/autodev-design
```

**Prerequisites Check:**
- Requirements must be approved first
- System validates prerequisite completion

**What happens:**
- Analyzes approved requirements
- Creates detailed technical architecture
- Designs API endpoints and database schema
- Plans service layer and security implementation
- Defines integration patterns and performance optimization

**Generated file:** `.claude/specs/design-user-authentication-system.md`

**Design Document Sections:**
- **System Architecture** - Components, data flow, technology decisions
- **Backend Design** - API endpoints, database schema, service layer
- **Frontend Design** - Components, state management, UI patterns
- **Integration Design** - External services, error handling
- **Operations Design** - Testing, monitoring, deployment

**Step 6: Review and Approve Design**
```bash
/autodev-approve-spec design
# Review the technical design document

/autodev-approve-spec design approve "Solid architecture, good security implementation, scalable design"
```

### **Phase 1C: Implementation Tasks**

**Step 7: Generate Task Breakdown (requires approved design)**
```bash
/autodev-tasks
```

**What happens:**
- Analyzes approved requirements and design
- Breaks down into 30-50 specific implementation tasks
- Estimates effort and complexity
- Maps task dependencies
- Creates GitHub-ready issue templates

**Generated file:** `.claude/specs/tasks-user-authentication-system.md`

**Task Categories:**
- **Backend Tasks** - DB migrations, API endpoints, services
- **Frontend Tasks** - Components, state management, UI
- **Testing Tasks** - Unit, integration, E2E tests
- **Infrastructure Tasks** - Deployment, monitoring, docs

**Task Example:**
```markdown
**Task API-001: Implement User Registration Endpoint**
- Description: Create POST /api/auth/register endpoint
- Priority: High
- Estimated Effort: 4 hours
- Dependencies: DB-001 (User table migration)
- Acceptance Criteria:
  - Email and password validation
  - Password hashing with bcrypt
  - Email uniqueness check
  - JWT token generation on success
- Testing Requirements:
  - Unit tests for validation logic
  - Integration test with database
  - Error case testing
```

**Step 8: Review and Approve Tasks**
```bash
/autodev-approve-spec tasks approve "Detailed breakdown with realistic estimates and proper dependencies"
```

### **Phase 2: Implementation**

**Step 9: Execute Implementation (requires all specs approved)**
```bash
/autodev-execute
```

**Prerequisites Check:**
- Requirements: ✅ Approved
- Design: ✅ Approved  
- Tasks: ✅ Approved

**What happens:**
1. **GitHub Issues Creation** - Creates epic and individual task issues
2. **Automated Implementation** - Specialized agents implement all features
3. **Quality Assurance** - Automated testing and code review
4. **Pull Request Creation** - Creates comprehensive PR with description
5. **Documentation Updates** - Updates all relevant documentation

**Implementation Progress Example:**
```
🚀 AutoDev Phase 2 starting: "User authentication system"
📋 Creating GitHub Issues for task tracking...

✅ Epic issue created: Epic: User authentication system (#123)
✅ Task created: Backend API: User registration (#124)
✅ Task created: Frontend UI: Login components (#125)
✅ Task created: Database: User schema and migrations (#126)
✅ Task created: Testing: Authentication test suite (#127)

🤖 Launching backend-architect for Step 5: 設計
🤖 Launching developer agents for implementation...
📊 Phase 2 Progress: 3/7 steps completed
```

---

## 🏃 **Simple Mode Walkthrough**

### **When to Use Simple Mode**
- Quick feature additions
- Prototype development
- Personal projects
- Learning and experimentation

### **Step 1: Plan Feature**
```bash
/autodev-plan Add user authentication with JWT tokens and basic login/logout functionality
```

**What happens:**
- Combines research, planning, and requirements in one step
- Analyzes existing codebase patterns
- Creates implementation plan with basic requirements
- Generates minimal documentation

**Planning Output:**
- Codebase analysis and integration points
- Basic implementation plan
- Simple requirements and acceptance criteria
- Testing strategy overview

### **Step 2: Review Planning Results**
```bash
/autodev-approve
```

**Review Output:**
```
📋 AutoDev Planning Results for Review
=====================================
🎯 Feature: Add user authentication with JWT tokens
📊 Phase: awaiting_approval
✅ Phase 1 Progress: 4/4 steps completed

📝 Planning Summary:
[Displays combined research, planning, and requirements summary]

🎯 Commands:
  /autodev-approve approve - Proceed to implementation
  /autodev-approve reject <feedback> - Request planning revision
```

### **Step 3: Approve or Reject**
```bash
# Approve and proceed
/autodev-approve approve "Good plan, covers main use cases"

# Or reject with feedback
/autodev-approve reject "Need more consideration for OAuth integration"
```

### **Step 4: Execute Implementation**
```bash
/autodev-execute
```

**What happens:**
- Creates basic GitHub issues
- Implements feature with minimal documentation
- Runs tests and creates PR
- Updates essential documentation only

---

## 🔧 **Advanced Usage Patterns**

### **Multi-Feature Development**

**Pattern 1: Sequential Feature Development (SDD)**
```bash
# Feature 1: Authentication
/autodev-requirements User authentication system
/autodev-approve-spec requirements approve
/autodev-design
/autodev-approve-spec design approve
/autodev-tasks
/autodev-approve-spec tasks approve
/autodev-execute

# Feature 2: User Profile Management  
/autodev-requirements User profile management with settings
# ... continue SDD workflow
```

**Pattern 2: Parallel Planning (Multiple Requirements)**
```bash
# Plan multiple features in requirements phase
/autodev-requirements User authentication system
/autodev-approve-spec requirements approve

/autodev-requirements User profile management  
/autodev-approve-spec requirements approve

/autodev-requirements Shopping cart functionality
/autodev-approve-spec requirements approve

# Then proceed with designs for all approved requirements
```

### **Iterative Development**

**Pattern 3: Specification Revision Cycle**
```bash
# Initial requirements
/autodev-requirements Basic user authentication

# Review and request improvements
/autodev-approve-spec requirements reject "Add OAuth providers and 2FA support"

# System automatically revises requirements based on feedback
# Re-review improved requirements
/autodev-approve-spec requirements approve "Much better, comprehensive now"
```

### **Hybrid Workflows**

**Pattern 4: SDD for Core, Simple for Extensions**
```bash
# Use SDD for main feature
/autodev-requirements Core payment processing system
# ... complete SDD workflow

# Use Simple mode for minor additions
/autodev-plan Add PayPal payment method
/autodev-approve approve
/autodev-execute
```

### **Team Handoff Patterns**

**Pattern 5: Specification Handoff**
```bash
# Product Manager creates requirements
/autodev-requirements User authentication system
/autodev-approve-spec requirements approve

# Tech Lead creates design
/autodev-design
/autodev-approve-spec design approve

# Project Manager creates tasks
/autodev-tasks
/autodev-approve-spec tasks approve

# Development Team executes
/autodev-execute
```

---

## 🤝 **Team Collaboration Workflows**

### **Role-Based Workflow**

**Product Owner Role:**
```bash
# Define requirements and business needs
/autodev-init Project vision and business goals
/autodev-requirements Feature requirements and user stories
/autodev-approve-spec requirements approve
```

**Technical Lead Role:**
```bash
# Review requirements and create technical design
/autodev-approve-spec requirements  # Review first
/autodev-design
/autodev-approve-spec design approve
```

**Project Manager Role:**
```bash
# Review design and break down into manageable tasks
/autodev-approve-spec design  # Review first
/autodev-tasks
/autodev-approve-spec tasks approve
```

**Development Team Role:**
```bash
# Execute approved implementation plan
/autodev-execute
```

### **Review and Approval Workflows**

**Comprehensive Review Process:**
```bash
# Step 1: Create specification
/autodev-requirements User authentication with OAuth

# Step 2: Self-review before submission
/autodev-approve-spec requirements

# Step 3: Team review (async)
# Share .claude/specs/requirements-*.md with team

# Step 4: Incorporate feedback
/autodev-approve-spec requirements reject "Add SAML support for enterprise users"

# Step 5: Final approval after revision
/autodev-approve-spec requirements approve "Comprehensive, addresses all enterprise needs"
```

**Approval with Comments:**
```bash
# Approve with specific feedback
/autodev-approve-spec requirements approve "Good coverage of OAuth flows, password policies are comprehensive"

# Approve with suggestions for future
/autodev-approve-spec design approve "Solid architecture, consider Redis for session storage in v2"

# Approve with implementation notes
/autodev-approve-spec tasks approve "Realistic estimates, prioritize security tasks first"
```

### **Documentation Handoff**

**Specification Sharing:**
```bash
# Generated specifications can be shared with team
.claude/specs/
├── steering.md                    # Project direction (PM/PO)
├── requirements-feature.md        # Business requirements (PO/BA)
├── design-feature.md             # Technical specs (TL/Arch)
└── tasks-feature.md              # Implementation plan (PM/Dev)
```

---

## 📝 **Best Practices**

### **SDD Mode Best Practices**

**1. Steering Document Quality**
```bash
# Always start with comprehensive project setup
/autodev-init "E-commerce platform targeting small businesses, React + Node.js stack, focus on performance and SEO"

# Be specific about project context, not generic
# Include business constraints and technical preferences
```

**2. Requirements Specification**
```bash
# Be detailed and specific in requirements
/autodev-requirements "User authentication supporting email/password, Google OAuth, Facebook OAuth, GitHub OAuth, with email verification, password reset, account lockout after 5 failed attempts, and two-factor authentication using TOTP"

# Not just: "User authentication"
```

**3. Incremental Approval**
```bash
# Review each specification carefully
/autodev-approve-spec requirements  # Always review first

# Provide specific feedback for rejections
/autodev-approve-spec requirements reject "Add specific password complexity requirements, define session timeout policies, and specify account recovery process for locked accounts"
```

**4. Task Validation**
```bash
# Verify task breakdown makes sense
/autodev-approve-spec tasks

# Ensure estimates are realistic
# Check dependencies are properly mapped
# Verify acceptance criteria are testable
```

### **Simple Mode Best Practices**

**1. Clear Feature Description**
```bash
# Provide enough context for good planning
/autodev-plan "Add user authentication with JWT tokens, including registration, login, logout, and password reset via email, integrated with existing user database"

# Not just: "Add auth"
```

**2. Meaningful Approval Comments**
```bash
# Provide context for future reference
/autodev-approve approve "Plan looks good, JWT implementation matches existing API patterns"

# Request specific changes
/autodev-approve reject "Please add email verification step to registration flow"
```

### **Universal Best Practices**

**1. Consistent Naming**
- Use descriptive feature names
- Follow consistent naming conventions
- Keep feature scope focused and bounded

**2. Quality Gates**
```bash
# Always run quality checks before major commits
# AutoDev automatically runs linting and type checking
# Review generated code before merging
```

**3. Documentation Maintenance**
```bash
# Keep specifications up-to-date
# Review and update steering document periodically
# Maintain traceability from requirements to implementation
```

**4. Version Control Integration**
```bash
# Commit specifications alongside code
git add .claude/specs/
git commit -m "Add user authentication specifications"

# Tag major specification versions
git tag -a "v1.0-auth-spec" -m "User authentication specification v1.0"
```

---

## 📋 **Common Use Cases**

### **Use Case 1: New Feature Development**

**Scenario:** Adding shopping cart functionality to e-commerce site

**SDD Approach:**
```bash
# Phase 0: Project context (if not done)
/autodev-init E-commerce platform with React and Node.js

# Phase 1A: Requirements
/autodev-requirements Shopping cart with add/remove items, quantity updates, price calculation, persistent storage, guest cart support, and checkout integration
/autodev-approve-spec requirements approve

# Phase 1B: Design
/autodev-design
/autodev-approve-spec design approve

# Phase 1C: Tasks
/autodev-tasks
/autodev-approve-spec tasks approve

# Phase 2: Implementation
/autodev-execute
```

**Simple Approach:**
```bash
/autodev-plan Shopping cart with add/remove items, quantity updates, and checkout integration
/autodev-approve approve
/autodev-execute
```

### **Use Case 2: Bug Fix with Enhancement**

**Scenario:** Fix authentication bug and add password strength requirements

**Combined Approach:**
```bash
# Use Simple mode for quick bug fix
/autodev-plan Fix authentication session timeout bug in login system
/autodev-approve approve
/autodev-execute

# Use SDD for enhancement
/autodev-requirements Password strength requirements with complexity rules, strength meter, and security recommendations
/autodev-approve-spec requirements approve
/autodev-design
/autodev-approve-spec design approve
/autodev-tasks
/autodev-approve-spec tasks approve
/autodev-execute
```

### **Use Case 3: API Development**

**Scenario:** Creating RESTful API for inventory management

**SDD Approach:**
```bash
/autodev-requirements Inventory management API with CRUD operations for products, categories, stock tracking, low stock alerts, batch operations, and comprehensive search/filtering
/autodev-approve-spec requirements approve

/autodev-design
# Review API endpoints, data models, validation rules
/autodev-approve-spec design approve

/autodev-tasks
# Review database tasks, API implementation, testing
/autodev-approve-spec tasks approve

/autodev-execute
```

### **Use Case 4: UI Component Library**

**Scenario:** Building reusable component library

**SDD Approach:**
```bash
/autodev-requirements Reusable component library with Button, Input, Modal, Table components, consistent theming, TypeScript support, Storybook integration, and comprehensive testing
/autodev-approve-spec requirements approve

/autodev-design
# Review component APIs, theming system, build process
/autodev-approve-spec design approve

/autodev-tasks
/autodev-approve-spec tasks approve

/autodev-execute
```

### **Use Case 5: Performance Optimization**

**Scenario:** Optimizing application performance

**SDD Approach:**
```bash
/autodev-requirements Performance optimization targeting 50% faster load times, code splitting, lazy loading, image optimization, caching strategies, and performance monitoring
/autodev-approve-spec requirements approve

/autodev-design
# Review optimization strategies, measurement tools
/autodev-approve-spec design approve

/autodev-tasks
/autodev-approve-spec tasks approve

/autodev-execute
```

### **Use Case 6: Integration Development**

**Scenario:** Integrating with third-party payment service

**SDD Approach:**
```bash
/autodev-requirements Stripe payment integration with credit card processing, subscription support, webhook handling, error handling, testing with test keys, and PCI compliance considerations
/autodev-approve-spec requirements approve

/autodev-design
# Review integration patterns, security measures, error handling
/autodev-approve-spec design approve

/autodev-tasks
/autodev-approve-spec tasks approve

/autodev-execute
```

---

## 🔄 **Workflow State Management**

### **Understanding Workflow States**

**SDD Workflow States:**
- `project_setup` → `requirements_spec` → `design_spec` → `tasks_spec` → `implementation` → `completed`

**Simple Mode States:**
- `planning` → `awaiting_approval` → `execution` → `completed`

### **State Transitions**

**Normal SDD Flow:**
```
Phase 0: /autodev-init → project_setup
Phase 1A: /autodev-requirements → requirements_spec
         /autodev-approve-spec requirements approve → requirements_approved
Phase 1B: /autodev-design → design_spec
         /autodev-approve-spec design approve → design_approved
Phase 1C: /autodev-tasks → tasks_spec
         /autodev-approve-spec tasks approve → tasks_approved
Phase 2: /autodev-execute → implementation → completed
```

**Revision Cycles:**
```
/autodev-approve-spec requirements reject → requirements_revision
# System automatically revises requirements
/autodev-approve-spec requirements approve → requirements_approved
```

### **State Recovery**

**Resume Interrupted Workflows:**
```bash
# Check current state
/autodev-approve-spec requirements  # Shows current status

# Continue from where you left off
# If in requirements phase: approve or revise
# If in design phase: /autodev-design (if needed) then approve
# If in tasks phase: /autodev-tasks (if needed) then approve
```

---

## 🏆 **Success Patterns**

### **High-Quality Feature Development**

**Pattern: Comprehensive SDD**
1. Start with detailed project steering
2. Create comprehensive requirements with edge cases
3. Review and refine requirements iteratively
4. Create detailed technical design
5. Break down into specific, testable tasks
6. Execute with full automation
7. Review generated code and documentation

### **Rapid Prototyping**

**Pattern: Simple Mode Iteration**
1. Quick planning with Simple mode
2. Rapid implementation and testing
3. Iterate based on feedback
4. Convert to SDD mode for production features

### **Team Collaboration**

**Pattern: Role-based SDD**
1. Product Owner creates requirements
2. Technical Lead creates design
3. Project Manager creates tasks
4. Development team executes
5. All roles review specifications at each stage

---

**📚 Additional Resources:**
- `DEVELOPMENT-ENVIRONMENT.md` - System overview
- `SETUP-GUIDE.md` - Installation instructions  
- `TROUBLESHOOTING.md` - Problem solving
- `API-REFERENCE.md` - Command reference

**📅 Document Version:** 1.0  
**📅 Last Updated:** January 8, 2025