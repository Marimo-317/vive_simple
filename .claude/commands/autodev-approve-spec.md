---
description: "AutoDev Spec Approval: Review and approve/reject individual specification documents"
usage: "/autodev-approve-spec <spec_type> [approve|reject] [feedback]"
examples:
  - "/autodev-approve-spec requirements"
  - "/autodev-approve-spec requirements approve Looks comprehensive"
  - "/autodev-approve-spec design reject Need more caching strategy details"
  - "/autodev-approve-spec tasks approve"
---

# AutoDev Spec Approval Command

Review and approve/reject individual specification documents in the Spec-Driven Development workflow.

## Usage Patterns:

### Review Current Specification
```bash
/autodev-approve-spec <spec_type>
```
Shows the current specification document for review without taking action.

### Approve Specification
```bash
/autodev-approve-spec <spec_type> approve [optional_comment]
```
Approves the specification and unlocks the next development phase.

### Reject Specification  
```bash
/autodev-approve-spec <spec_type> reject <feedback_required>
```
Rejects the specification with mandatory feedback for revision.

## Specification Types:

### `requirements`
- **Document:** `.claude/specs/requirements-[feature].md`
- **Purpose:** Functional and non-functional requirements approval
- **Next Step:** Enables `/autodev-design` command
- **Revision:** Returns to requirements analysis with feedback

### `design` 
- **Document:** `.claude/specs/design-[feature].md`
- **Purpose:** Technical architecture and design approval
- **Prerequisite:** Approved requirements
- **Next Step:** Enables `/autodev-tasks` command
- **Revision:** Returns to design phase with technical feedback

### `tasks`
- **Document:** `.claude/specs/tasks-[feature].md` 
- **Purpose:** Implementation task breakdown approval
- **Prerequisite:** Approved requirements AND design
- **Next Step:** Enables `/autodev-execute` command
- **Revision:** Returns to task breakdown with planning feedback

## Approval Workflow:

### Sequential Approval Required:
1. **Requirements First:** Must approve requirements before design
2. **Design Second:** Must approve design before tasks
3. **Tasks Final:** Must approve tasks before implementation
4. **No Skip Allowed:** Each phase must be completed in order

### Approval States:
- **`pending`** - Specification created, awaiting review
- **`approved`** - Specification approved, next phase unlocked
- **`rejected`** - Specification rejected, revision required
- **`revision`** - Specification being revised based on feedback

## Review Information Display:

When reviewing (no action specified), shows:
- **Specification Status:** Current approval state
- **Document Summary:** Key sections and content overview
- **Approval History:** Previous approvals/rejections with feedback
- **Next Steps:** Available actions and workflow progression
- **Dependencies:** Prerequisite approvals and blocking conditions

## Examples:

### Requirements Review & Approval:
```bash
# Review requirements specification
/autodev-approve-spec requirements

# Approve with comment
/autodev-approve-spec requirements approve "Comprehensive user stories, ready for design"

# Reject with feedback
/autodev-approve-spec requirements reject "Need more detail on OAuth integration requirements"
```

### Design Review & Approval:
```bash
# Review technical design
/autodev-approve-spec design

# Approve design
/autodev-approve-spec design approve "Architecture looks solid, caching strategy is well planned"

# Reject with technical feedback  
/autodev-approve-spec design reject "Database indexes need optimization, API versioning strategy unclear"
```

### Task Review & Approval:
```bash
# Review implementation tasks
/autodev-approve-spec tasks

# Approve task breakdown
/autodev-approve-spec tasks approve "Task breakdown is detailed and realistic"

# Reject with planning feedback
/autodev-approve-spec tasks reject "Task dependencies are unclear, need better effort estimation"
```

## Feedback Integration:

### Approval Feedback:
- Recorded in specification approval history
- Used to guide implementation phase
- Shared with implementation agents as context

### Rejection Feedback:
- **Mandatory for rejections** - specific feedback required
- Used by revision agents to improve specifications
- Tracked in revision history for learning

### Revision Process:
1. Feedback is analyzed by appropriate specialist agents
2. Specification is revised to address concerns
3. Revised specification is presented for re-approval
4. Process repeats until approved

## Quality Gates:

### Approval Criteria:
- **Completeness:** All required sections present and detailed
- **Consistency:** Alignment with project steering and previous specs
- **Feasibility:** Realistic and implementable within constraints
- **Quality:** Meets documentation and technical standards

### Rejection Triggers:
- **Incomplete Specifications:** Missing critical sections or details
- **Inconsistency:** Conflicts with steering or previous approvals
- **Technical Issues:** Unrealistic or problematic technical approaches
- **Unclear Requirements:** Ambiguous or contradictory specifications

## Integration with Implementation:

### Approved Specifications Enable:
- **Approved Requirements** → `/autodev-design` available
- **Approved Design** → `/autodev-tasks` available  
- **Approved Tasks** → `/autodev-execute` available

### Spec Context for Implementation:
- All approved specifications are provided to implementation agents
- Specifications serve as authoritative source of truth
- Implementation must maintain traceability to approved specs

**Your Specification Type:** $ARGUMENTS