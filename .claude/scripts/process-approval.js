#!/usr/bin/env node

/**
 * AutoDev Approval Processing Hook
 * Handles approval/rejection of Phase 1 planning results
 */

const fs = require('fs');

// Read stdin for hook input
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const stateFile = '.claude/state/autodev-workflow.json';
    
    // Check if workflow state exists
    if (!fs.existsSync(stateFile)) {
      console.error('❌ No AutoDev workflow found. Please run /autodev-plan first.');
      process.exit(0);
    }
    
    const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    
    // Parse approval command
    const prompt = hookData.prompt || '';
    const approvalMatch = prompt.match(/\/autodev-approve(?:\s+(approve|reject)(?:\s+(.+))?)?/);
    
    if (!approvalMatch) {
      // Show current status if no action specified
      console.log('📋 AutoDev Planning Results for Review');
      console.log('=====================================');
      console.log(`🎯 Feature: ${workflowState.feature}`);
      console.log(`📊 Phase: ${workflowState.phase}`);
      console.log(`🔄 Current Step: ${workflowState.currentStep}`);
      
      // Show Phase 1 completion status
      const phase1Steps = workflowState.steps.phase1;
      const completed = phase1Steps.filter(s => s.status === 'completed').length;
      console.log(`✅ Phase 1 Progress: ${completed}/${phase1Steps.length} steps completed`);
      
      if (workflowState.planning.summary) {
        console.log('\n📝 Planning Summary:');
        console.log(workflowState.planning.summary);
      }
      
      console.log('\n🎯 Commands:');
      console.log('  /autodev-approve approve - Proceed to implementation');
      console.log('  /autodev-approve reject <feedback> - Request planning revision');
      
      process.exit(0);
    }
    
    const [, action, feedback] = approvalMatch;
    
    if (action === 'approve') {
      // Approve planning and prepare for Phase 2
      workflowState.approval.status = 'approved';
      workflowState.approval.approvedAt = new Date().toISOString();
      workflowState.approval.feedback = feedback || 'Approved for implementation';
      workflowState.phase = 'approved'; // Ready for Phase 2
      
      console.log(`✅ Planning approved: "${workflowState.feature}"`);
      console.log(`📝 Feedback: ${workflowState.approval.feedback}`);
      console.log(`🎯 Ready for Phase 2 implementation`);
      console.log(`📋 Use /autodev-execute to start implementation phase`);
      
    } else if (action === 'reject') {
      // Reject planning and request revision
      workflowState.approval.status = 'rejected';
      workflowState.approval.feedback = feedback || 'Planning revision requested';
      workflowState.phase = 'revision'; // Back to planning with feedback
      
      // Reset Phase 1 steps for revision
      workflowState.steps.phase1 = workflowState.steps.phase1.map(step => {
        if (step.id > 1) { // Keep "やりたいことを決める" as completed
          return { ...step, status: 'pending' };
        }
        return step;
      });
      
      workflowState.currentStep = 2; // Restart from research
      
      console.log(`❌ Planning rejected: "${workflowState.feature}"`);
      console.log(`📝 Feedback: ${workflowState.approval.feedback}`);
      console.log(`🔄 Phase 1 reset for revision based on feedback`);
      console.log(`📋 AutoDev will incorporate feedback and re-run planning phases`);
      
    } else {
      console.error('❌ Invalid approval action. Use: approve or reject');
      process.exit(1);
    }
    
    // Save updated workflow state
    fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    
  } catch (error) {
    console.error('Approval processing error:', error.message);
    process.exit(1);
  }
});