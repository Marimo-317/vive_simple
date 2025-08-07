---
description: "AutoDev Phase 2: Implementation - Auto-execute design through deployment"
usage: "/autodev-execute"
examples:
  - "/autodev-execute"
---

# AutoDev Phase 2: Implementation & Deployment

**Phase 2:** 設計→実装→テスト→DBG→PR→デプロイ→ドキュメント更新→Follow-up (Full Auto)

This command continues the AutoDev workflow after human approval of the planning phase.

**Prerequisites:**
- Phase 1 (`/autodev-plan`) must be completed
- Planning results must be approved by human
- Workflow state must be in "awaiting_approval" status

## Phase 2 Steps (Auto-Executed):

**Step 4.5: GitHub Issues Creation**
- Create Epic issue for overall feature tracking
- Break down approved plan into specific task issues
- Set up proper issue linking and milestones

**Step 5: 設計フェーズ (Design)**
Launching appropriate architecture specialists to:
- Design detailed system architecture
- Create database schema and migrations
- Design API endpoints and request/response formats
- Plan frontend component structure
- Define service boundaries and integrations

**Step 6: 実装フェーズ (Implementation)**
Launching specialized development agents to:
- Implement backend API endpoints with validation
- Create frontend UI components and state management
- Implement database changes and migrations
- Integrate with external services as needed
- Follow existing codebase patterns and conventions

**Step 7: テストフェーズ (Testing)**
Launching test-automator to:
- Create comprehensive unit test suites
- Implement integration tests for APIs
- Add end-to-end test scenarios
- Test error handling and edge cases
- Ensure code coverage meets standards

**Step 8: デバッグフェーズ (Debugging)**
Launching debugger/error-detective to:
- Identify and fix all test failures
- Debug runtime errors and exceptions
- Validate error handling and user feedback
- Test edge cases and boundary conditions
- Ensure proper logging and monitoring

**Step 9: PR作成フェーズ (Pull Request)**
Launching deployment-engineer to:
- Create clean git commits with conventional format
- Prepare comprehensive pull request description
- Run all linting, type checking, and tests
- Ensure all quality gates pass
- Request appropriate code reviews

**Step 10: デプロイ準備フェーズ (Deployment)**
Preparing deployment configuration:
- Environment-specific configuration
- Database migration scripts (if needed)
- CI/CD pipeline updates
- Monitoring and alerting setup

**Step 11: ドキュメント更新フェーズ (Documentation)**
Launching docs-architect to:
- Update API documentation and examples
- Create/update user guides and tutorials
- Update technical architecture documentation
- Add troubleshooting guides and FAQs

**Step 11.5: Follow-up Issues作成**
Creating enhancement and technical debt issues:
- Performance optimization opportunities
- Analytics and monitoring enhancements
- Code refactoring and cleanup tasks
- Future feature enhancements

## Execution Control:

The implementation phase runs fully automated with:
- ✅ Real-time progress tracking
- ✅ Automatic quality validation at each step
- ✅ Error handling and recovery
- ✅ Comprehensive reporting and logging

**🚀 Starting Phase 2 Implementation...**