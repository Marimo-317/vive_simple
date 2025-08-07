---
description: "AutoDev Approval: Review and approve/reject planning results"
usage: "/autodev-approve [approve|reject] [feedback]"
examples:
  - "/autodev-approve approve"
  - "/autodev-approve reject Need more database optimization analysis"
  - "/autodev-approve approve Looks good, proceed with implementation"
---

# AutoDev Approval Command

Review and approve/reject the results of the planning phase (Phase 1).

**Usage:**
- `/autodev-approve approve` - Approve and proceed to implementation
- `/autodev-approve reject <feedback>` - Reject with feedback for revision
- `/autodev-approve` - Show current planning results for review

## Current Planning Status

I'll show you the current planning results and await your decision.

**Commands:**
- **approve**: Creates GitHub Issues and starts Phase 2 implementation
- **reject**: Returns to planning phase with your feedback for revision

**Planning Summary:**

If there are planning results available, I'll display:

📊 **Research Results**
- Codebase analysis findings
- Required dependencies and integrations
- Technical risks and constraints
- Recommended approach

📋 **Implementation Plan** 
- Task breakdown and priorities
- Technical architecture decisions
- Timeline and complexity estimates
- Resource requirements

📝 **Requirements Definition**
- Functional and non-functional requirements
- User stories with acceptance criteria
- Business rules and validation logic
- Testing strategy and quality gates

## Next Steps

**If you approve:**
- GitHub Issues will be created automatically
- Phase 2 implementation will begin immediately
- All steps will execute with full automation

**If you reject:**
- Planning agents will revise based on your feedback
- Updated planning results will be presented
- Approval process repeats until satisfied

**Your decision:** $ARGUMENTS