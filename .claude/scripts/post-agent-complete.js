#!/usr/bin/env node

/**
 * Post-Agent Completion Hook  
 * Handles agent completion and workflow progression
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
    const currentStep = allSteps.find(s => s.status === 'in_progress');
    
    if (!currentStep) {
      process.exit(0);
    }
    
    // Mark current step as completed
    currentStep.status = 'completed';
    currentStep.completedAt = new Date().toISOString();
    
    // Phase-specific logic
    if (currentStep.phase === 1) {
      // Phase 1 (Planning) completion logic
      console.log(`✅ Phase 1 Step ${currentStep.id} completed: ${currentStep.name}`);
      
      // Check if Phase 1 is complete
      const phase1Complete = workflowState.steps.phase1.every(s => s.status === 'completed');
      
      if (phase1Complete) {
        // Phase 1 completed - wait for human approval
        workflowState.phase = 'awaiting_approval';
        workflowState.phase1CompletedAt = new Date().toISOString();
        
        console.log(`🎉 Phase 1 completed: 調査 → 計画 → 要件定義`);
        console.log(`⏸️  Waiting for human approval...`);
        console.log(`📋 Use /autodev-approve to review and approve/reject planning`);
        console.log(`🎯 After approval, use /autodev-execute to start implementation`);
        
      } else {
        // Find next Phase 1 step
        const nextStep = workflowState.steps.phase1.find(s => s.status === 'pending');
        if (nextStep) {
          console.log(`⏭️  Next: Step ${nextStep.id} - ${nextStep.name} (${nextStep.agent})`);
          workflowState.currentStep = nextStep.id;
        }
      }
      
    } else if (currentStep.phase === 2) {
      // Phase 2 (Implementation) completion logic
      console.log(`✅ Phase 2 Step ${currentStep.id} completed: ${currentStep.name}`);
      
      // Issue creation for Phase 2 steps
      const issueCreationSteps = {
        5: 'epic_and_tasks', // After design, create epic and tasks
        7: 'bugs', // After testing, create bug tracking if needed
        11: 'followups' // After documentation, create follow-up issues
      };
      
      if (issueCreationSteps[currentStep.id]) {
        const issueType = issueCreationSteps[currentStep.id];
        console.log(`📋 Creating ${issueType} issues for step ${currentStep.id}`);
        
        // Trigger issue creation script
        const { spawn } = require('child_process');
        spawn('node', ['.claude/scripts/create-issues.js', issueType, workflowState.feature], {
          stdio: 'inherit'
        });
      }
      
      // Check if Phase 2 is complete
      const phase2Complete = workflowState.steps.phase2.every(s => s.status === 'completed');
      
      if (phase2Complete) {
        // Entire workflow completed
        workflowState.phase = 'completed';
        workflowState.completedAt = new Date().toISOString();
        
        console.log(`🎉 AutoDev workflow completed: "${workflowState.feature}"`);
        console.log(`✅ Phase 1: Planning & Requirements - Completed`);
        console.log(`✅ Phase 2: Implementation & Deployment - Completed`);
        
      } else {
        // Find next Phase 2 step
        const nextStep = workflowState.steps.phase2.find(s => s.status === 'pending');
        if (nextStep) {
          console.log(`⏭️  Next: Step ${nextStep.id} - ${nextStep.name} (${nextStep.agent})`);
          workflowState.currentStep = nextStep.id;
        }
      }
    }
    
    // Update workflow state
    fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    
    // Progress summary
    const completed = workflowState.steps.filter(s => s.status === 'completed').length;
    const total = workflowState.steps.length;
    console.log(`📊 Progress: ${completed}/${total} steps completed`);
    
  } catch (error) {
    console.error('Post-agent completion error:', error.message);
  }
});