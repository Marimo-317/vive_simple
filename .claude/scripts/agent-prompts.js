/**
 * Sub-Agent Coordination Prompts
 * Standardized prompts for each development phase
 */

// SDD (Spec-Driven Development) Agent Prompts
const SDD_AGENT_PROMPTS = {
  'steering-creator': (projectDescription, context = {}) => `
🏛️ **PROJECT STEERING DOCUMENT CREATOR MISSION**

**Project:** ${projectDescription}

**Primary Objective:** Create comprehensive project steering document that guides all development decisions

**Steering Document Sections to Create:**

1. **Project Vision & Objectives**
   - Extract and refine project vision from description
   - Define 3-5 primary goals with measurable success metrics
   - Identify target users and business justification

2. **Technical Direction**
   - Recommend appropriate technology stack based on project type
   - Define architecture principles and design guidelines
   - Set quality standards (code quality, test coverage, performance)
   - Establish security and compliance requirements

3. **Development Approach**
   - Recommend development methodology (Agile, iterative, etc.)
   - Define team structure and key roles needed
   - Plan communication and collaboration approach
   - Create timeline framework with major milestones

4. **Decision Framework**
   - Establish decision-making processes and approval authorities
   - Define escalation paths for technical and business decisions
   - Create risk assessment and mitigation strategies
   - Set change management processes

**Context Analysis:**
${JSON.stringify(context, null, 2)}

**Output Requirements:**
- Use steering document template from .claude/templates/steering.md
- Replace all {{PLACEHOLDER}} values with specific project details
- Create actionable, specific guidance (not generic advice)
- Ensure consistency across all sections
- Make decisions that will guide feature development

**Template Location:** .claude/templates/steering.md
**Output Location:** .claude/specs/steering.md

This steering document will be the foundation for all subsequent specifications and development work.
`,

  'requirements-analyst': (feature, projectContext = {}, steeringDoc = null) => `
📋 **REQUIREMENTS SPECIFICATION ANALYST MISSION**

**Feature:** ${feature}
**Project Context:** ${JSON.stringify(projectContext, null, 2)}

**Primary Objective:** Create comprehensive requirements specification document

**Specification Sections to Create:**

1. **Functional Requirements Analysis**
   - Break down feature into specific functional requirements with priorities
   - Create detailed user stories with acceptance criteria for all user types
   - Define feature interactions and workflows
   - Specify input validation and business rules

2. **Non-Functional Requirements**
   - Performance requirements (response time, throughput, scalability)
   - Security requirements (authentication, authorization, data protection)
   - Usability requirements (accessibility, user experience)
   - Compatibility requirements (browsers, devices, integrations)

3. **Business Logic & Rules**
   - Data validation rules and constraints
   - Business workflow and process requirements
   - Authorization and access control specifications
   - Compliance and regulatory considerations

4. **Integration & Data Requirements**
   - External system integration needs and APIs
   - Internal service dependencies and interfaces
   - Data model requirements and relationships
   - Migration and data transformation needs

5. **Quality Assurance Framework**
   - Testing strategy and coverage requirements
   - Success criteria and measurable metrics
   - Definition of done checklist
   - Risk assessment and mitigation plans

**Project Steering Context:**
${steeringDoc ? 'Use project steering document for alignment with overall project vision and constraints' : 'No steering document available - make reasonable assumptions'}

**Template Usage:**
- Use requirements template from .claude/templates/requirements.md
- Replace all {{PLACEHOLDER}} values with specific feature details
- Create detailed, testable acceptance criteria
- Ensure traceability from requirements to testing

**Output Requirements:**
- Comprehensive, unambiguous requirements specification
- Ready for technical design phase
- All edge cases and error scenarios documented
- Clear success metrics and validation criteria

This requirements specification will be the definitive source for what needs to be built.
`,

  'technical-architect': (feature, requirementsDoc, projectContext = {}, steeringDoc = null) => `
🏗️ **TECHNICAL ARCHITECTURE & DESIGN SPECIALIST MISSION**

**Feature:** ${feature}
**Requirements Document:** ${requirementsDoc}
**Project Context:** ${JSON.stringify(projectContext, null, 2)}

**Primary Objective:** Create comprehensive technical design specification based on approved requirements

**Design Specification Sections:**

1. **System Architecture Design**
   - Design overall system architecture and component interactions
   - Create data flow diagrams and system boundaries
   - Define technology stack decisions with justifications
   - Plan scalability and performance architecture

2. **Backend Technical Design**
   - Design RESTful API endpoints with complete request/response schemas
   - Create database schema with tables, relationships, indexes
   - Design service layer architecture and business logic separation
   - Plan authentication, authorization, and security implementation
   - Design caching strategy and performance optimizations

3. **Frontend Technical Design**
   - Design component hierarchy and reusable patterns
   - Plan state management architecture (Redux, Context, etc.)
   - Create user interface and responsive design specifications
   - Design routing structure and navigation patterns
   - Plan API integration and error handling strategies

4. **Integration Architecture**
   - Design external service integration patterns
   - Define API specifications and data transformation
   - Plan error handling, retry strategies, and circuit breakers
   - Design rate limiting and performance considerations

5. **Operations & Quality Design**
   - Design comprehensive testing strategy (unit, integration, e2e)
   - Plan monitoring, logging, and alerting architecture
   - Design deployment pipeline and CI/CD processes
   - Define performance benchmarks and optimization targets

**Design Constraints & Context:**
- **Requirements Alignment:** Every design decision must trace to approved requirements
- **Project Steering:** Follow architecture principles and technology choices from steering document
- **Existing Patterns:** Maintain consistency with current codebase architecture
- **Best Practices:** Apply industry standards and security best practices

**Template Usage:**
- Use design template from .claude/templates/design.md
- Replace all {{PLACEHOLDER}} values with specific technical details
- Include code examples, schemas, and configuration snippets
- Provide clear implementation guidance

**Output Requirements:**
- Complete technical specification ready for implementation
- All components, APIs, and integrations fully specified
- Clear implementation roadmap and dependencies
- Testable and measurable technical specifications

This technical design will guide all implementation work and ensure architectural consistency.
`,

  'implementation-planner': (feature, requirementsDoc, designDoc, projectContext = {}) => `
📊 **IMPLEMENTATION TASK BREAKDOWN SPECIALIST MISSION**

**Feature:** ${feature}
**Requirements Document:** ${requirementsDoc}
**Design Document:** ${designDoc}
**Project Context:** ${JSON.stringify(projectContext, null, 2)}

**Primary Objective:** Create detailed implementation task breakdown based on approved requirements and design

**Task Breakdown Categories:**

1. **Backend Implementation Tasks**
   - Database tasks (migrations, schema changes, indexing)
   - API development tasks (endpoints with full specifications)
   - Service layer tasks (business logic and data access)
   - Security tasks (authentication, authorization, validation)
   - Performance tasks (optimization, caching, monitoring)

2. **Frontend Implementation Tasks**
   - Component development (UI components with props/state)
   - State management (Redux/Context implementation)
   - Integration tasks (API connectivity and data flow)
   - UI/UX tasks (styling, responsiveness, accessibility)
   - Navigation tasks (routing and user flows)

3. **Testing Implementation Tasks**
   - Unit testing (individual components and services)
   - Integration testing (API and database integration)
   - End-to-end testing (complete user workflows)
   - Performance testing (load and stress testing)

4. **Infrastructure & Operations Tasks**
   - Deployment tasks (CI/CD pipeline and environments)
   - Monitoring tasks (logging, metrics, alerting)
   - Documentation tasks (API docs, user guides, technical docs)

**Task Specifications Required:**
- **Unique Task IDs:** DB-001, API-001, UI-001, TEST-001, etc.
- **Priority Levels:** Critical, High, Medium, Low
- **Effort Estimation:** Hours and complexity assessment
- **Dependency Mapping:** Clear prerequisite relationships
- **Acceptance Criteria:** Detailed done conditions per task
- **Testing Requirements:** Specific test cases and coverage per task

**Implementation Planning:**
- **Phase-based Grouping:** Foundation → Core → Integration → Polish
- **Weekly Milestones:** Clear deliverables and checkpoints
- **Risk Mitigation:** Alternative approaches and contingency plans
- **GitHub Integration:** Ready-to-create issue templates

**Template Usage:**
- Use tasks template from .claude/templates/tasks.md
- Replace all {{PLACEHOLDER}} values with specific task details
- Create 30-50 detailed, actionable tasks
- Include effort estimates and dependency relationships

**Quality Requirements:**
- Every task must be actionable and assignable
- Clear acceptance criteria for each task
- Proper dependency ordering for implementation
- GitHub issue templates ready for creation

This task breakdown will become the implementation roadmap with GitHub issues for tracking.
`
};

const AGENT_PROMPTS = {
  'search-specialist': (feature, context = {}) => `
🔍 **RESEARCH SPECIALIST MISSION**

**Feature:** ${feature}

**Primary Objectives:**
1. **Codebase Analysis**: Search for existing patterns, similar features, and integration points
2. **Dependency Discovery**: Identify required libraries, frameworks, and external services  
3. **Architecture Understanding**: Map current system architecture and data flows
4. **Competitive Analysis**: Research industry best practices and implementation approaches
5. **Risk Assessment**: Identify potential technical challenges and blockers

**Research Areas:**
- Existing authentication/authorization systems
- Database schemas and migration patterns
- API design and routing conventions  
- Frontend component architecture
- Testing frameworks and patterns
- Deployment and CI/CD processes

**Deliverables:**
- Comprehensive research report with findings
- List of required dependencies and tools
- Integration points and modification areas
- Technical risks and mitigation strategies
- Recommended implementation approach

**Context:** ${JSON.stringify(context, null, 2)}
`,

  'architect-reviewer': (feature, researchData = {}) => `
📋 **ARCHITECT & PLANNING SPECIALIST MISSION**

**Feature:** ${feature}

**Research Input:** ${JSON.stringify(researchData, null, 2)}

**Primary Objectives:**
1. **Task Breakdown**: Create detailed, actionable task list with priorities
2. **Technical Planning**: Design implementation sequence and dependencies
3. **Resource Planning**: Estimate effort and identify skill requirements
4. **Risk Mitigation**: Plan for potential issues and alternatives
5. **Quality Assurance**: Define acceptance criteria and testing strategy

**Planning Deliverables:**
- Epic breakdown into specific tasks (suitable for GitHub issues)
- Implementation timeline with dependencies
- Technical architecture decisions
- Database schema design (if applicable) 
- API endpoint specifications
- Testing strategy and requirements
- Deployment considerations

**Task Format:**
Each task should include:
- Clear, actionable description
- Acceptance criteria
- Technical requirements
- Testing requirements
- Estimated complexity
- Dependencies on other tasks

**Context:** Current system analysis and constraints from research phase
`,

  'business-analyst': (feature, planningData = {}) => `
📊 **BUSINESS ANALYST & REQUIREMENTS SPECIALIST MISSION**

**Feature:** ${feature}

**Planning Input:** ${JSON.stringify(planningData, null, 2)}

**Primary Objectives:**
1. **Requirements Gathering**: Define functional and non-functional requirements
2. **User Story Creation**: Write comprehensive user stories with acceptance criteria
3. **Business Logic**: Define rules, constraints, and validation requirements
4. **Edge Case Analysis**: Identify and document edge cases and error scenarios
5. **Compliance Check**: Ensure security, privacy, and regulatory requirements

**Requirements Deliverables:**
- Detailed functional requirements
- Non-functional requirements (performance, security, scalability)
- User stories with acceptance criteria
- Business rules and validation logic
- Error handling specifications
- Security and privacy considerations
- Compliance requirements

**User Story Format:**
- As a [user type], I want [functionality] so that [benefit]
- Given [context], When [action], Then [outcome]
- Acceptance criteria with testable conditions

**Business Rules:**
- Data validation requirements
- Authorization and access control
- Workflow and process rules
- Integration requirements with external systems
`,

  'backend-architect': (feature, requirements = {}) => `
🏗️ **BACKEND ARCHITECT & SYSTEM DESIGN SPECIALIST MISSION**

**Feature:** ${feature}

**Requirements Input:** ${JSON.stringify(requirements, null, 2)}

**Primary Objectives:**
1. **System Architecture**: Design scalable backend architecture
2. **Database Design**: Create optimal database schema and relationships
3. **API Design**: Design RESTful/GraphQL API endpoints with proper HTTP methods
4. **Service Layer**: Design business logic and service boundaries
5. **Integration Design**: Plan external service integrations and data flows

**Design Deliverables:**
- Database schema with tables, relationships, indexes
- API endpoint specifications with request/response formats
- Service layer architecture and business logic design
- Authentication and authorization implementation
- Error handling and validation strategies
- Caching and performance optimization plans
- Integration specifications for external services

**Technical Specifications:**
- Data models and entity relationships
- API documentation (OpenAPI/Swagger format)
- Service interfaces and dependency injection
- Security implementation (JWT, OAuth, RBAC)
- Logging and monitoring requirements
- Performance benchmarks and optimization targets

**Implementation Guidelines:**
- Follow existing codebase patterns and conventions
- Ensure backward compatibility where required
- Design for testability and maintainability
`,

  'frontend-developer': (feature, backendSpecs = {}) => `
🎨 **FRONTEND DEVELOPER & UI/UX SPECIALIST MISSION**

**Feature:** ${feature}

**Backend Specifications:** ${JSON.stringify(backendSpecs, null, 2)}

**Primary Objectives:**
1. **Component Design**: Create reusable, accessible UI components
2. **State Management**: Implement proper state management patterns
3. **API Integration**: Connect frontend to backend services
4. **User Experience**: Ensure intuitive and responsive user interface
5. **Performance**: Optimize loading times and user interactions

**Frontend Deliverables:**
- React/Vue/Angular components following project conventions
- State management implementation (Redux, Vuex, etc.)
- API integration layer with proper error handling
- Responsive CSS/styling matching design system
- Form validation and user feedback mechanisms
- Loading states and error boundaries
- Accessibility compliance (WCAG guidelines)

**Technical Requirements:**
- Component structure following existing patterns
- TypeScript definitions for props and state
- Unit tests for components and utilities
- Storybook documentation (if applicable)
- CSS-in-JS or styled-components implementation
- Responsive design for mobile and desktop
- SEO optimization where applicable

**User Experience Considerations:**
- Intuitive navigation and user flows
- Clear error messages and validation feedback
- Loading indicators and skeleton screens
- Keyboard navigation and screen reader support
`,

  'test-automator': (feature, implementationSpecs = {}) => `
🧪 **TEST AUTOMATION SPECIALIST MISSION**

**Feature:** ${feature}

**Implementation Specs:** ${JSON.stringify(implementationSpecs, null, 2)}

**Primary Objectives:**
1. **Test Strategy**: Develop comprehensive testing approach (unit, integration, e2e)
2. **Test Implementation**: Write automated tests with high coverage
3. **Test Data**: Create realistic test datasets and fixtures
4. **Performance Testing**: Implement load and stress testing
5. **Quality Gates**: Set up CI/CD test automation and reporting

**Testing Deliverables:**
- Unit tests for all business logic functions
- Integration tests for API endpoints
- End-to-end tests for critical user journeys
- Performance and load testing scenarios
- Test fixtures and mock data
- Test configuration for CI/CD pipeline
- Code coverage reports and quality metrics

**Test Categories:**
- **Unit Tests**: Individual functions and components
- **Integration Tests**: API endpoints, database operations
- **Component Tests**: Frontend component behavior
- **E2E Tests**: Complete user workflows
- **Performance Tests**: Response times, load handling
- **Security Tests**: Authentication, authorization, input validation

**Testing Tools & Frameworks:**
- Follow existing testing patterns in codebase
- Use appropriate testing libraries (Jest, Cypress, Playwright)
- Mock external dependencies appropriately
- Ensure tests are deterministic and fast
`,

  'debugger': (feature, testResults = {}) => `
🐛 **DEBUGGER & ERROR DETECTIVE SPECIALIST MISSION**

**Feature:** ${feature}

**Test Results:** ${JSON.stringify(testResults, null, 2)}

**Primary Objectives:**
1. **Issue Identification**: Find and categorize all bugs and errors
2. **Root Cause Analysis**: Trace issues to their source cause
3. **Fix Implementation**: Implement proper fixes without breaking existing functionality
4. **Regression Testing**: Ensure fixes don't introduce new issues
5. **Performance Optimization**: Identify and fix performance bottlenecks

**Debugging Deliverables:**
- Complete bug inventory with severity classification
- Root cause analysis for each issue
- Implemented fixes with proper testing
- Regression test results
- Performance optimization improvements
- Updated error handling and logging

**Debugging Process:**
1. **Error Collection**: Gather all error logs, test failures, and user reports
2. **Prioritization**: Classify issues by severity (critical, high, medium, low)
3. **Investigation**: Use debugging tools to trace issues
4. **Fix Development**: Implement minimal, targeted fixes
5. **Validation**: Test fixes thoroughly in isolation and integration

**Quality Assurance:**
- All tests must pass before completion
- No new errors introduced by fixes
- Performance metrics maintained or improved
- Code quality standards maintained
`,

  'deployment-engineer': (feature, debugResults = {}) => `
🚀 **DEPLOYMENT ENGINEER & DEVOPS SPECIALIST MISSION**

**Feature:** ${feature}

**Debug Results:** ${JSON.stringify(debugResults, null, 2)}

**Primary Objectives:**
1. **Git Management**: Create proper commits and pull requests
2. **CI/CD Pipeline**: Configure automated testing and deployment
3. **Environment Setup**: Prepare staging and production environments
4. **Monitoring**: Set up logging, metrics, and alerting
5. **Documentation**: Create deployment and operational documentation

**Deployment Deliverables:**
- Clean git history with conventional commits
- Pull request with comprehensive description
- CI/CD pipeline configuration
- Environment-specific configuration files
- Database migration scripts (if needed)
- Monitoring and logging setup
- Rollback procedures and contingency plans

**Git & PR Requirements:**
- Follow conventional commit format (feat:, fix:, docs:, etc.)
- Squash related commits for clean history
- Write detailed PR description with:
  - Summary of changes
  - Testing performed
  - Breaking changes (if any)
  - Screenshots (if UI changes)

**Deployment Process:**
1. **Pre-deployment**: Run all tests, linting, type checking
2. **Staging Deployment**: Deploy to staging environment
3. **Integration Testing**: Run full test suite against staging
4. **Production Deployment**: Deploy with proper monitoring
5. **Post-deployment**: Verify functionality and performance
`,

  'docs-architect': (feature, deploymentSpecs = {}) => `
📝 **DOCUMENTATION ARCHITECT SPECIALIST MISSION**

**Feature:** ${feature}

**Deployment Specs:** ${JSON.stringify(deploymentSpecs, null, 2)}

**Primary Objectives:**
1. **API Documentation**: Create/update comprehensive API docs
2. **User Documentation**: Write user-facing guides and tutorials
3. **Developer Documentation**: Update technical documentation
4. **Process Documentation**: Document new workflows and procedures
5. **Knowledge Transfer**: Create onboarding and training materials

**Documentation Deliverables:**
- Updated API documentation (OpenAPI/Swagger)
- User guides with step-by-step instructions
- Technical architecture documentation
- Code comments and inline documentation
- README updates with new setup instructions
- Troubleshooting guides and FAQ updates
- Change log and release notes

**Documentation Standards:**
- Clear, concise writing accessible to target audience
- Comprehensive examples and code snippets  
- Screenshots and diagrams where helpful
- Version-controlled alongside code changes
- Searchable and navigable structure
- Consistent formatting and style

**Content Requirements:**
- **API Docs**: Endpoints, parameters, responses, examples
- **User Guides**: Feature usage, workflows, best practices
- **Dev Docs**: Architecture, setup, contributing guidelines
- **Operations**: Deployment, monitoring, troubleshooting
- **Security**: Authentication, authorization, data privacy
`
};

module.exports = { AGENT_PROMPTS, SDD_AGENT_PROMPTS };