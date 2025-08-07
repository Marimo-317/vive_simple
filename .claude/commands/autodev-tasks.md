---
description: "AutoDev Spec Phase 1C: Task Breakdown - Generate detailed implementation tasks"
usage: "/autodev-tasks"
examples:
  - "/autodev-tasks"
---

# AutoDev Spec Phase 1C: Implementation Task Breakdown

**Spec-Driven Development Phase 1C:** Detailed Task Analysis & Implementation Planning

I'll create a comprehensive implementation task breakdown based on approved requirements and technical design documents.

## Prerequisites:

- Requirements specification must be completed and approved
- Technical design specification must be completed and approved  
- Documents required:
  - `.claude/specs/requirements-*.md` (approved)
  - `.claude/specs/design-*.md` (approved)

## Task Breakdown Objectives:

**Implementation Planning & Task Engineering**
Launching architect-reviewer and project management specialists to:
- Break down technical design into specific, actionable tasks
- Create task dependencies and implementation order
- Estimate effort and complexity for each task
- Define acceptance criteria and testing requirements for each task
- Plan database, backend, frontend, and infrastructure tasks
- Create testing task breakdown (unit, integration, e2e)
- Plan deployment and documentation tasks
- Generate GitHub issue templates for task tracking

## Implementation Task Document Structure:

### 1. **Backend Tasks**
- **Database Tasks:** Migrations, schema changes, indexing
- **API Development:** Endpoint implementation with full specifications
- **Service Layer:** Business logic and data access layer tasks
- **Security Tasks:** Authentication, authorization, validation
- **Performance Tasks:** Optimization, caching, monitoring

### 2. **Frontend Tasks**
- **Component Development:** UI components with props and state
- **State Management:** Redux/Context implementation tasks
- **Integration Tasks:** API connectivity and data flow
- **UI/UX Tasks:** Styling, responsiveness, accessibility
- **Route & Navigation:** Routing setup and navigation flows

### 3. **Testing Tasks**
- **Unit Testing:** Individual component and service tests
- **Integration Testing:** API and database integration tests
- **End-to-End Testing:** Complete user workflow tests
- **Performance Testing:** Load and stress testing scenarios

### 4. **Infrastructure & DevOps**
- **Deployment Tasks:** CI/CD pipeline and environment setup
- **Monitoring Tasks:** Logging, metrics, and alerting setup
- **Documentation Tasks:** API docs, user guides, technical docs

### 5. **Quality Assurance**
- **Code Review:** Review requirements and quality gates
- **Testing Gates:** Coverage and quality thresholds
- **Performance Gates:** Benchmark and optimization targets

## Task Management Features:

### Task Specifications:
- **Unique Task IDs:** DB-001, API-001, UI-001, etc.
- **Priority Levels:** Critical, High, Medium, Low
- **Effort Estimation:** Hours and complexity assessment
- **Dependency Mapping:** Clear prerequisite relationships
- **Acceptance Criteria:** Detailed done conditions
- **Testing Requirements:** Specific test cases and coverage

### Implementation Schedule:
- **Phase-based Grouping:** Foundation → Core → Integration → Polish
- **Weekly Milestones:** Clear deliverables and checkpoints
- **Risk Mitigation:** Alternative approaches and contingency plans

## GitHub Integration:

Each task will include:
- **GitHub Issue Template:** Ready for issue creation
- **Labels and Milestones:** Proper categorization
- **Assignee Suggestions:** Role-based task assignments
- **Linked Dependencies:** Cross-reference related tasks

## Output:

After task breakdown completion:
- `.claude/specs/tasks-[feature-name].md` will be created
- Complete implementation roadmap with 50+ detailed tasks
- Ready-to-execute implementation plan with clear priorities
- GitHub issue templates for immediate task creation

## Approval Gate:

Task breakdown must be reviewed and approved before implementation:
- Use `/autodev-approve-spec tasks [approve|reject] [feedback]` to review
- Approved tasks will enable `/autodev-execute` command
- Rejected tasks will be revised with updated breakdown

## Next Steps (After Task Approval):

- `/autodev-execute` - Begin automated implementation with GitHub issue creation
- All specs (requirements, design, tasks) must be approved to proceed

**📋 Starting Task Breakdown...**

I'll create a detailed, actionable task breakdown that transforms the technical design into specific implementation work items, complete with effort estimates, dependencies, and quality gates.

**Note:** This command requires approved requirements AND design documents. Please ensure both specifications are completed and approved before proceeding.