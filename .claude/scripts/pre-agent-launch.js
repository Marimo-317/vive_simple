#!/usr/bin/env node

/**
 * Pre-Agent Launch Hook
 * Coordinates sub-agent selection and task preparation
 */

const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const stateFile = '.claude/state/autodev-workflow.json';
    
    if (!fs.existsSync(stateFile)) {
      process.exit(0);
    }
    
    const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    
    // Find current step in appropriate phase
    const allSteps = [...workflowState.steps.phase1, ...workflowState.steps.phase2];
    const currentStep = allSteps.find(s => s.status === 'pending');
    
    if (!currentStep) {
      process.exit(0);
    }
    
    // Agent coordination prompts based on workflow step
    const agentPrompts = {
      'search-specialist': `🔍 RESEARCH PHASE: Analyze the existing codebase for implementing "${workflowState.feature}". 
        - Search for similar existing features and patterns
        - Identify required dependencies and libraries  
        - Find potential integration points
        - Document current architecture patterns
        - Provide comprehensive analysis for implementation planning`,
        
      'architect-reviewer': `📋 PLANNING PHASE: Create detailed implementation plan for "${workflowState.feature}".
        - Break down feature into specific tasks
        - Identify technical requirements and constraints
        - Plan database schema changes if needed
        - Design API endpoints and data flows
        - Create implementation timeline and priorities`,
        
      'business-analyst': `📊 REQUIREMENTS PHASE: Define detailed requirements for "${workflowState.feature}".
        - Create user stories and acceptance criteria  
        - Define functional and non-functional requirements
        - Identify edge cases and error scenarios
        - Plan testing strategies
        - Document business logic and rules`,
        
      'backend-architect': `🏗️ DESIGN PHASE: Design system architecture for "${workflowState.feature}".
        - Design database schema and migrations
        - Plan API endpoints and request/response formats
        - Design service layer architecture
        - Plan authentication and authorization
        - Design error handling and validation`,
        
      'test-automator': `🧪 TESTING PHASE: Create comprehensive test suite for "${workflowState.feature}".
        - Write unit tests for all new functions
        - Create integration tests for API endpoints  
        - Add end-to-end test scenarios
        - Test error handling and edge cases
        - Ensure test coverage meets requirements`,
        
      'debugger': `🐛 DEBUG PHASE: Identify and fix issues in "${workflowState.feature}".
        - Run all tests and fix failures
        - Check for runtime errors and exceptions
        - Validate error handling and user feedback
        - Test edge cases and boundary conditions
        - Ensure proper logging and monitoring`,
        
      'deployment-engineer': `🚀 DEPLOYMENT PHASE: Prepare "${workflowState.feature}" for production.
        - Create proper git commits with conventional format
        - Prepare pull request with detailed description
        - Run all linting and type checking
        - Prepare deployment configuration
        - Document deployment procedures`,
        
      'docs-architect': `📝 DOCUMENTATION PHASE: Update documentation for "${workflowState.feature}".
        - Update API documentation
        - Add usage examples and tutorials  
        - Update README and setup instructions
        - Document new configuration options
        - Create troubleshooting guides`
    };
    
    // Update current step status
    currentStep.status = 'in_progress';
    fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    
    // Output coordinated prompt for the agent
    const agentPrompt = agentPrompts[currentStep.agent] || `Execute step: ${currentStep.name}`;
    
    console.log(`🤖 Launching ${currentStep.agent} for Step ${currentStep.id}: ${currentStep.name}`);
    console.log(`📝 Agent Prompt: ${agentPrompt}`);
    
  } catch (error) {
    console.error('Pre-agent launch error:', error.message);
  }
});