#!/usr/bin/env node

/**
 * AutoDev Phase 1B Initialization Hook (SDD Design)
 * Triggered when /autodev-design command is used
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
    
    // Check if requirements are approved
    if (!sddState.specifications.requirements.approvedAt) {
      console.error('❌ Requirements specification must be approved before design phase.');
      console.error('   Current requirements status:', sddState.specifications.requirements.status);
      console.error('   Please complete and approve requirements with:');
      console.error('   1. /autodev-requirements <feature_description>');
      console.error('   2. /autodev-approve-spec requirements approve');
      process.exit(1);
    }
    
    const requirementsSpec = sddState.specifications.requirements;
    const featureName = requirementsSpec.featureName;
    
    // Initialize Phase 1B - Design
    sddState.phases.phase1.steps[1].status = 'in_progress';
    sddState.phases.phase1.steps[1].startedAt = new Date().toISOString();
    sddState.currentStep = '1.2';
    
    // Set up design specification
    const designFile = `.claude/specs/design-${featureName}.md`;
    sddState.specifications.design = {
      status: 'in_progress',
      file: designFile,
      feature: requirementsSpec.feature,
      featureName: featureName,
      startedAt: new Date().toISOString(),
      approvedAt: null,
      requirementsVersion: requirementsSpec.approvedAt
    };
    
    // Update feature status
    const feature = sddState.features.find(f => f.name === featureName);
    if (feature) {
      feature.phase = 'design';
      feature.status = 'in_progress';
    }
    
    // Save updated state
    fs.writeFileSync(sddStateFile, JSON.stringify(sddState, null, 2));
    
    // Log initialization
    console.log(`🏗️ AutoDev Phase 1B: Technical Design Specification`);
    console.log(`📋 Feature: "${requirementsSpec.feature}"`);
    console.log(`📁 Feature Name: ${featureName}`);
    console.log(`📊 Project: ${sddState.project.name}`);
    console.log(`✅ Requirements approved: ${new Date(requirementsSpec.approvedAt).toLocaleString()}`);
    console.log(`📝 Requirements file: ${requirementsSpec.file}`);
    console.log(`🎯 Creating technical design specification...`);
    console.log(`📝 Output: ${designFile}`);
    
    if (sddState.specifications.steering.approvedAt) {
      console.log(`✅ Using project steering and architecture context`);
    }
    
    console.log(`⏭️  Next: Review with /autodev-approve-spec design`);
    
  } catch (error) {
    console.error('AutoDev Design init error:', error.message);
    process.exit(1);
  }
});