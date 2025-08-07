#!/usr/bin/env node

/**
 * AutoDev Spec Approval Processing Hook
 * Handles approval/rejection of individual specification documents
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
    const sddStateFile = '.claude/state/autodev-sdd.json';
    
    // Check if SDD project exists
    if (!fs.existsSync(sddStateFile)) {
      console.error('❌ No AutoDev SDD project found. Please run /autodev-init first.');
      process.exit(0);
    }
    
    const sddState = JSON.parse(fs.readFileSync(sddStateFile, 'utf8'));
    
    // Parse approval command
    const prompt = hookData.prompt || '';
    const approvalMatch = prompt.match(/\/autodev-approve-spec\s+(\w+)(?:\s+(approve|reject)(?:\s+(.+))?)?/);
    
    if (!approvalMatch) {
      console.error('❌ Invalid approval command format.');
      console.error('   Usage: /autodev-approve-spec <spec_type> [approve|reject] [feedback]');
      process.exit(0);
    }
    
    const [, specType, action, feedback] = approvalMatch;
    
    // Validate spec type
    if (!['requirements', 'design', 'tasks'].includes(specType)) {
      console.error(`❌ Invalid spec type: ${specType}`);
      console.error('   Valid types: requirements, design, tasks');
      process.exit(0);
    }
    
    const specInfo = sddState.specifications[specType];
    
    if (!action) {
      // Show current specification status for review
      showSpecificationStatus(sddState, specType, specInfo);
      process.exit(0);
    }
    
    if (action === 'approve') {
      handleApproval(sddState, specType, specInfo, feedback);
    } else if (action === 'reject') {
      handleRejection(sddState, specType, specInfo, feedback);
    } else {
      console.error(`❌ Invalid action: ${action}. Use 'approve' or 'reject'.`);
      process.exit(0);
    }
    
    // Save updated state
    fs.writeFileSync(sddStateFile, JSON.stringify(sddState, null, 2));
    
  } catch (error) {
    console.error('Spec approval processing error:', error.message);
    process.exit(1);
  }
});

function showSpecificationStatus(sddState, specType, specInfo) {
  console.log(`📋 AutoDev Specification Review: ${specType.toUpperCase()}`);
  console.log('='.repeat(50));
  console.log(`📊 Project: ${sddState.project.name}`);
  console.log(`🎯 Feature: ${specInfo.feature || 'N/A'}`);
  console.log(`📁 Document: ${specInfo.file || 'Not created'}`);
  console.log(`🔄 Status: ${specInfo.status}`);
  
  if (specInfo.startedAt) {
    console.log(`⏰ Started: ${new Date(specInfo.startedAt).toLocaleString()}`);
  }
  
  if (specInfo.approvedAt) {
    console.log(`✅ Approved: ${new Date(specInfo.approvedAt).toLocaleString()}`);
  }
  
  // Show dependencies and prerequisites
  console.log('');
  console.log('📋 Prerequisites:');
  if (specType === 'requirements') {
    const steeringStatus = sddState.specifications.steering.approvedAt ? '✅ Complete' : '⚠️  Recommended';
    console.log(`   • Project Steering: ${steeringStatus}`);
  } else if (specType === 'design') {
    const reqStatus = sddState.specifications.requirements.approvedAt ? '✅ Approved' : '❌ Required';
    console.log(`   • Requirements Specification: ${reqStatus}`);
  } else if (specType === 'tasks') {
    const reqStatus = sddState.specifications.requirements.approvedAt ? '✅ Approved' : '❌ Required';
    const designStatus = sddState.specifications.design.approvedAt ? '✅ Approved' : '❌ Required';
    console.log(`   • Requirements Specification: ${reqStatus}`);
    console.log(`   • Design Specification: ${designStatus}`);
  }
  
  // Show approval history if available
  if (specInfo.approvalHistory && specInfo.approvalHistory.length > 0) {
    console.log('');
    console.log('📚 Approval History:');
    specInfo.approvalHistory.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry.action} - ${new Date(entry.timestamp).toLocaleString()}`);
      if (entry.feedback) {
        console.log(`      "${entry.feedback}"`);
      }
    });
  }
  
  // Show available actions
  console.log('');
  console.log('🎯 Available Actions:');
  console.log(`   /autodev-approve-spec ${specType} approve [comment] - Approve specification`);
  console.log(`   /autodev-approve-spec ${specType} reject <feedback> - Reject with feedback`);
  
  // Show next steps
  console.log('');
  console.log('⏭️  Next Steps After Approval:');
  if (specType === 'requirements') {
    console.log('   • /autodev-design - Create technical design specification');
  } else if (specType === 'design') {
    console.log('   • /autodev-tasks - Generate implementation task breakdown');
  } else if (specType === 'tasks') {
    console.log('   • /autodev-execute - Begin automated implementation');
  }
}

function handleApproval(sddState, specType, specInfo, feedback) {
  // Check prerequisites
  if (specType === 'design' && !sddState.specifications.requirements.approvedAt) {
    console.error('❌ Cannot approve design: Requirements not approved');
    process.exit(1);
  }
  
  if (specType === 'tasks' && (!sddState.specifications.requirements.approvedAt || !sddState.specifications.design.approvedAt)) {
    console.error('❌ Cannot approve tasks: Requirements and Design must both be approved');
    process.exit(1);
  }
  
  // Approve specification
  specInfo.status = 'approved';
  specInfo.approvedAt = new Date().toISOString();
  
  // Add to approval history
  if (!specInfo.approvalHistory) {
    specInfo.approvalHistory = [];
  }
  specInfo.approvalHistory.push({
    action: 'approved',
    timestamp: new Date().toISOString(),
    feedback: feedback || 'Approved without comment'
  });
  
  // Update phase progress
  updatePhaseProgress(sddState, specType);
  
  console.log(`✅ ${specType.toUpperCase()} specification approved`);
  console.log(`📝 Feedback: ${feedback || 'No feedback provided'}`);
  console.log(`⏰ Approved at: ${new Date().toLocaleString()}`);
  
  // Show next steps
  if (specType === 'requirements') {
    console.log(`⏭️  Next: /autodev-design - Create technical design`);
  } else if (specType === 'design') {
    console.log(`⏭️  Next: /autodev-tasks - Generate task breakdown`);
  } else if (specType === 'tasks') {
    console.log(`🚀 Ready for implementation: /autodev-execute`);
    console.log(`📋 All specifications approved - implementation unlocked!`);
  }
}

function handleRejection(sddState, specType, specInfo, feedback) {
  if (!feedback) {
    console.error('❌ Rejection feedback is required.');
    console.error(`   Usage: /autodev-approve-spec ${specType} reject <detailed_feedback>`);
    process.exit(1);
  }
  
  // Reject specification
  specInfo.status = 'rejected';
  specInfo.rejectedAt = new Date().toISOString();
  
  // Add to approval history
  if (!specInfo.approvalHistory) {
    specInfo.approvalHistory = [];
  }
  specInfo.approvalHistory.push({
    action: 'rejected',
    timestamp: new Date().toISOString(),
    feedback: feedback
  });
  
  // Reset dependent specifications
  if (specType === 'requirements') {
    resetDependentSpecs(sddState, ['design', 'tasks']);
  } else if (specType === 'design') {
    resetDependentSpecs(sddState, ['tasks']);
  }
  
  console.log(`❌ ${specType.toUpperCase()} specification rejected`);
  console.log(`📝 Feedback: ${feedback}`);
  console.log(`🔄 Specification will be revised based on feedback`);
  
  // Show revision guidance
  console.log('');
  console.log('🔧 Revision Process:');
  if (specType === 'requirements') {
    console.log('   1. Feedback will be provided to business-analyst');
    console.log('   2. Requirements will be revised automatically');
    console.log('   3. Re-review with /autodev-approve-spec requirements');
  } else if (specType === 'design') {
    console.log('   1. Feedback will be provided to technical architects');
    console.log('   2. Design will be revised automatically');
    console.log('   3. Re-review with /autodev-approve-spec design');
  } else if (specType === 'tasks') {
    console.log('   1. Feedback will be provided to project planners');
    console.log('   2. Task breakdown will be revised automatically');
    console.log('   3. Re-review with /autodev-approve-spec tasks');
  }
}

function updatePhaseProgress(sddState, specType) {
  if (specType === 'requirements') {
    sddState.phases.phase1.steps[0].status = 'completed';
    sddState.phases.phase1.steps[0].completedAt = new Date().toISOString();
  } else if (specType === 'design') {
    sddState.phases.phase1.steps[1].status = 'completed';
    sddState.phases.phase1.steps[1].completedAt = new Date().toISOString();
  } else if (specType === 'tasks') {
    sddState.phases.phase1.steps[2].status = 'completed';
    sddState.phases.phase1.steps[2].completedAt = new Date().toISOString();
    
    // Check if all Phase 1 is complete
    const allPhase1Complete = sddState.phases.phase1.steps.every(s => s.status === 'completed');
    if (allPhase1Complete) {
      sddState.phases.phase1.status = 'completed';
      sddState.phases.phase1.completedAt = new Date().toISOString();
      console.log('🎉 Phase 1 (Specification Development) completed!');
    }
  }
}

function resetDependentSpecs(sddState, dependentTypes) {
  dependentTypes.forEach(type => {
    const spec = sddState.specifications[type];
    if (spec.approvedAt) {
      spec.status = 'not_started';
      spec.approvedAt = null;
      spec.rejectedAt = null;
      console.log(`🔄 Reset dependent specification: ${type}`);
    }
  });
}