#!/usr/bin/env node

/**
 * AutoDev Phase 2 Initialization Hook
 * Triggered when /autodev-execute command is used
 */

const fs = require('fs');
const path = require('path');

// Read stdin for hook input
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const stateFile = '.claude/state/autodev-workflow.json';
    
    // Check if workflow state exists
    if (!fs.existsSync(stateFile)) {
      console.error('❌ No AutoDev workflow found. Please run /autodev-plan first.');
      process.exit(1);
    }
    
    const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    
    // Check if Phase 1 is completed and approved
    if (workflowState.phase !== 'planning' || workflowState.approval.status !== 'approved') {
      console.error('❌ Phase 1 must be completed and approved before executing Phase 2.');
      console.error(`   Current status: phase=${workflowState.phase}, approval=${workflowState.approval.status}`);
      console.error('   Please complete /autodev-plan and /autodev-approve first.');
      process.exit(1);
    }
    
    // Initialize Phase 2
    workflowState.phase = 'executing';
    workflowState.currentStep = 5; // Start from design step
    workflowState.phase2StartTime = new Date().toISOString();
    
    // Reset Phase 2 steps to pending
    workflowState.steps.phase2 = workflowState.steps.phase2.map(step => ({
      ...step,
      status: step.id === 5 ? 'pending' : 'pending'
    }));
    
    // Save updated state
    fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    
    // Log Phase 2 start
    console.log(`🚀 AutoDev Phase 2 starting: "${workflowState.feature}"`);
    console.log(`✅ Phase 1 completed and approved`);
    console.log(`🎯 Phase 2: 設計 → 実装 → テスト → DBG → PR → デプロイ → ドキュメント`);
    console.log(`📋 Creating GitHub Issues for task tracking...`);
    
    // Trigger issue creation for approved plan
    console.log('📝 Creating Epic and Task issues based on approved planning...');
    
    // This will be handled by the post-hook after the first agent completes
    
  } catch (error) {
    console.error('AutoDev Phase 2 init error:', error.message);
    process.exit(1);
  }
});