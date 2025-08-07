#!/usr/bin/env node

/**
 * Session Initialization Hook
 * Sets up session for AutoDev workflow
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    // Ensure state directory exists
    const stateDir = '.claude/state';
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }
    
    // Check for existing workflow
    const stateFile = '.claude/state/autodev-workflow.json';
    if (fs.existsSync(stateFile)) {
      const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      
      const completed = workflowState.steps.filter(s => s.status === 'completed').length;
      const total = workflowState.steps.length;
      
      if (completed < total && workflowState.status !== 'completed') {
        console.log('🔄 Resuming AutoDev workflow...');
        console.log(`📊 Progress: ${completed}/${total} steps completed`);
        console.log(`🎯 Current feature: ${workflowState.feature}`);
        
        const currentStep = workflowState.steps.find(s => s.status === 'in_progress' || s.status === 'pending');
        if (currentStep) {
          console.log(`⏭️  Next: Step ${currentStep.id} - ${currentStep.name} (${currentStep.agent})`);
        }
      }
    }
    
    // Initialize session log
    const sessionLog = {
      startTime: new Date().toISOString(),
      sessionId: Date.now().toString(36),
      workflowActive: fs.existsSync(stateFile)
    };
    
    fs.writeFileSync('.claude/state/session.json', JSON.stringify(sessionLog, null, 2));
    
    console.log('🚀 Claude Code AutoDev session initialized');
    console.log('💡 Use "/autodev <feature_description>" to start automated development workflow');
    
  } catch (error) {
    console.error('Session init error:', error.message);
  }
});