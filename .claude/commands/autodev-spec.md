---
description: "AutoDev Spec-Driven Development: Complete workflow from requirements to implementation"
usage: "/autodev-spec <feature_description>"
examples:
  - "/autodev-spec User authentication with JWT tokens"
  - "/autodev-spec Payment processing with Stripe integration"
  - "/autodev-spec Real-time chat with notifications"
---

# AutoDev Spec-Driven Development

**Complete Spec-Driven Development Workflow** - Detailed specifications with individual approval gates

**Feature:** $ARGUMENTS

I'll guide you through the complete Spec-Driven Development (SDD) workflow, creating detailed specifications for requirements, design, and implementation tasks before beginning development.

## SDD Workflow Overview:

### 📋 **Phase 0: Project Setup (Recommended)**
If no project steering document exists:
- Use `/autodev-init <project_description>` first
- Creates project steering document with vision, technical direction, and decision framework
- Provides context for all feature specifications

### 🔍 **Phase 1: Specification Development**
**Step 1A: Requirements Specification**
- Use `/autodev-requirements <feature_description>`
- Creates comprehensive requirements document
- Includes functional requirements, user stories, business rules
- Must be approved with `/autodev-approve-spec requirements approve`

**Step 1B: Technical Design**
- Use `/autodev-design` (requires approved requirements)
- Creates detailed technical architecture and design
- Includes API specs, database design, component architecture
- Must be approved with `/autodev-approve-spec design approve`

**Step 1C: Task Breakdown**
- Use `/autodev-tasks` (requires approved design)
- Creates detailed implementation task breakdown
- Includes 30-50 specific tasks with effort estimates
- Must be approved with `/autodev-approve-spec tasks approve`

### 🚀 **Phase 2: Implementation**
- Use `/autodev-execute` (requires all specs approved)
- Creates GitHub issues from approved task breakdown
- Executes complete automated implementation
- Includes testing, debugging, PR creation, deployment, and documentation

## SDD Benefits:

### **📚 Detailed Documentation**
- Permanent specification documents in `.claude/specs/`
- Complete requirements, design, and task documentation
- Reusable across teams and tools

### **🎯 Individual Approval Gates**
- Approve/reject each specification phase individually
- Revise specifications with targeted feedback
- Ensure quality before implementation starts

### **🔄 Iterative Refinement**
- Reject specifications with specific feedback
- Automated revision based on approval feedback
- Re-approval process until specifications are perfect

### **📊 Complete Traceability**
- Requirements → Design → Tasks → Implementation
- Every implementation decision traceable to specifications
- Comprehensive project documentation for maintenance

## Quick Start Commands:

```bash
# Complete SDD Workflow
/autodev-init E-commerce platform with React frontend    # Project setup
/autodev-requirements User authentication system         # Requirements
/autodev-approve-spec requirements approve              # Approve requirements
/autodev-design                                        # Technical design  
/autodev-approve-spec design approve                   # Approve design
/autodev-tasks                                         # Task breakdown
/autodev-approve-spec tasks approve                    # Approve tasks
/autodev-execute                                       # Begin implementation
```

## Alternative: Simple Mode

If you prefer the traditional approach without detailed specifications:
- Use `/autodev-plan <feature>` for simple 3-in-1 planning
- Use `/autodev-approve approve` for single approval gate
- Use `/autodev-execute` for implementation

## File Structure:

After SDD completion:
```
.claude/specs/
├── steering.md                    # Project direction
├── requirements-[feature].md      # Feature requirements
├── design-[feature].md           # Technical design
└── tasks-[feature].md            # Implementation tasks
```

## Decision: SDD vs Simple Mode

**Choose SDD (Spec-Driven) when:**
- Working on complex features requiring detailed planning
- Need comprehensive documentation for team collaboration
- Want individual control over each specification phase
- Building enterprise or production-critical features

**Choose Simple Mode when:**
- Building simple features or prototypes
- Working alone or with minimal documentation needs
- Prefer faster workflow with single approval gate
- Experimenting or doing quick development iterations

**🎯 Starting SDD Workflow for: "${$ARGUMENTS}"**

**Next Steps:**
1. **Recommended:** `/autodev-init <project_description>` (if no steering doc exists)
2. **Required:** `/autodev-requirements ${$ARGUMENTS}`
3. **Follow:** Individual approval workflow as described above

This spec-driven approach ensures high-quality, well-documented, and maintainable feature development.