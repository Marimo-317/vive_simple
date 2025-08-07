#!/usr/bin/env node

/**
 * Workflow Checkpoint Hook
 * Creates checkpoints and saves workflow state
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const stateFile = '.claude/state/autodev-workflow.json';
    
    if (!fs.existsSync(stateFile)) {
      process.exit(0);
    }
    
    const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    
    // Create checkpoint
    const checkpoint = {
      timestamp: new Date().toISOString(),
      currentStep: workflowState.currentStep,
      completedSteps: workflowState.steps.filter(s => s.status === 'completed').length,
      totalSteps: workflowState.steps.length,
      issues: workflowState.issues
    };
    
    if (!workflowState.checkpoints) {
      workflowState.checkpoints = [];
    }
    
    workflowState.checkpoints.push(checkpoint);
    
    // Keep only last 10 checkpoints
    if (workflowState.checkpoints.length > 10) {
      workflowState.checkpoints = workflowState.checkpoints.slice(-10);
    }
    
    fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    
    const progress = `${checkpoint.completedSteps}/${checkpoint.totalSteps}`;
    console.log(`💾 Checkpoint saved - Progress: ${progress} steps completed`);
    
    // Check if workflow is complete
    if (checkpoint.completedSteps === checkpoint.totalSteps) {
      console.log('🎉 AutoDev workflow completed successfully!');
      console.log(`📊 Final Summary:
        • Feature: ${workflowState.feature}
        • Duration: ${new Date() - new Date(workflowState.startTime)}ms
        • Epic Issue: ${workflowState.issues.epic}
        • Tasks Created: ${Array.isArray(workflowState.issues.tasks) ? workflowState.issues.tasks.length : 0}
        • Bugs Tracked: ${workflowState.issues.bugs ? 1 : 0}
        • Follow-ups: ${Array.isArray(workflowState.issues.followups) ? workflowState.issues.followups.length : 0}`);
    }
    
  } catch (error) {
    console.error('Checkpoint error:', error.message);
  }
});