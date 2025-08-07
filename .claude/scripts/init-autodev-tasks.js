#!/usr/bin/env node

/**
 * AutoDev Phase 1C Initialization Hook (SDD Tasks)
 * Triggered when /autodev-tasks command is used
 */

const fs = require('fs');

// Read stdin for hook input
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const sddStateFile = '.claude/state/autodev-sdd.json';
    
    // Check if SDD project exists
    if (!fs.existsSync(sddStateFile)) {
      console.error('❌ No AutoDev SDD project found. Please run /autodev-init first.');
      process.exit(1);
    }
    
    const sddState = JSON.parse(fs.readFileSync(sddStateFile, 'utf8'));
    
    // Check if both requirements and design are approved
    const reqSpec = sddState.specifications.requirements;
    const designSpec = sddState.specifications.design;
    
    if (!reqSpec.approvedAt) {
      console.error('❌ Requirements specification must be approved before task breakdown.');
      console.error('   Current requirements status:', reqSpec.status);
      process.exit(1);
    }
    
    if (!designSpec.approvedAt) {
      console.error('❌ Design specification must be approved before task breakdown.');
      console.error('   Current design status:', designSpec.status);
      console.error('   Please complete and approve design with:');
      console.error('   1. /autodev-design');
      console.error('   2. /autodev-approve-spec design approve');
      process.exit(1);
    }
    
    const featureName = reqSpec.featureName;
    
    // Initialize Phase 1C - Tasks
    sddState.phases.phase1.steps[2].status = 'in_progress';
    sddState.phases.phase1.steps[2].startedAt = new Date().toISOString();
    sddState.currentStep = '1.3';
    
    // Set up tasks specification
    const tasksFile = `.claude/specs/tasks-${featureName}.md`;
    sddState.specifications.tasks = {
      status: 'in_progress',
      file: tasksFile,
      feature: reqSpec.feature,
      featureName: featureName,
      startedAt: new Date().toISOString(),
      approvedAt: null,
      requirementsVersion: reqSpec.approvedAt,
      designVersion: designSpec.approvedAt
    };
    
    // Update feature status
    const feature = sddState.features.find(f => f.name === featureName);
    if (feature) {
      feature.phase = 'tasks';
      feature.status = 'in_progress';
    }
    
    // Save updated state
    fs.writeFileSync(sddStateFile, JSON.stringify(sddState, null, 2));
    
    // Log initialization
    console.log(`📋 AutoDev Phase 1C: Implementation Task Breakdown`);
    console.log(`📋 Feature: "${reqSpec.feature}"`);
    console.log(`📁 Feature Name: ${featureName}`);
    console.log(`📊 Project: ${sddState.project.name}`);
    console.log(`✅ Requirements approved: ${new Date(reqSpec.approvedAt).toLocaleString()}`);
    console.log(`✅ Design approved: ${new Date(designSpec.approvedAt).toLocaleString()}`);
    console.log(`📝 Requirements file: ${reqSpec.file}`);
    console.log(`📝 Design file: ${designSpec.file}`);
    console.log(`🎯 Creating detailed task breakdown...`);
    console.log(`📝 Output: ${tasksFile}`);
    
    console.log(`📊 Specifications Context:`);
    console.log(`   • Steering document: ${sddState.specifications.steering.file || 'Not available'}`);
    console.log(`   • Requirements spec: ${reqSpec.file}`);
    console.log(`   • Technical design: ${designSpec.file}`);
    
    console.log(`⏭️  Next: Review with /autodev-approve-spec tasks`);
    console.log(`🚀 After tasks approval: Use /autodev-execute to begin implementation`);
    
  } catch (error) {
    console.error('AutoDev Tasks init error:', error.message);
    process.exit(1);
  }
});