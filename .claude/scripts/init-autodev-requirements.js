#!/usr/bin/env node

/**
 * AutoDev Phase 1A Initialization Hook (SDD Requirements)
 * Triggered when /autodev-requirements command is used
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
    const hookData = JSON.parse(input);
    const sddStateFile = '.claude/state/autodev-sdd.json';
    
    // Extract feature description from command
    const prompt = hookData.prompt || '';
    const requirementsMatch = prompt.match(/\/autodev-requirements\s+(.+)/);
    
    if (!requirementsMatch) {
      console.error('❌ Feature description required. Usage: /autodev-requirements <feature_description>');
      process.exit(1);
    }
    
    const featureDescription = requirementsMatch[1].trim();
    const featureName = generateFeatureName(featureDescription);
    
    // Check if SDD project exists
    if (!fs.existsSync(sddStateFile)) {
      console.error('❌ No AutoDev SDD project found. Please run /autodev-init <project_description> first.');
      process.exit(1);
    }
    
    const sddState = JSON.parse(fs.readFileSync(sddStateFile, 'utf8'));
    
    // Check if steering document exists and is recommended
    if (!sddState.specifications.steering.approvedAt) {
      console.log('⚠️  Warning: No project steering document found.');
      console.log('   Recommended: Run /autodev-init first to establish project direction.');
      console.log('   Continuing with requirements specification...');
    }
    
    // Initialize Phase 1A - Requirements
    sddState.phases.phase1.status = 'in_progress';
    sddState.phases.phase1.startedAt = new Date().toISOString();
    sddState.phases.phase1.steps[0].status = 'in_progress';
    sddState.currentPhase = 1;
    sddState.currentStep = '1.1';
    
    // Set up requirements specification
    const requirementsFile = `.claude/specs/requirements-${featureName}.md`;
    sddState.specifications.requirements = {
      status: 'in_progress',
      file: requirementsFile,
      feature: featureDescription,
      featureName: featureName,
      startedAt: new Date().toISOString(),
      approvedAt: null
    };
    
    // Add feature to project context
    if (!sddState.features) {
      sddState.features = [];
    }
    
    sddState.features.push({
      name: featureName,
      description: featureDescription,
      phase: 'requirements',
      status: 'in_progress',
      startedAt: new Date().toISOString()
    });
    
    // Save updated state
    fs.writeFileSync(sddStateFile, JSON.stringify(sddState, null, 2));
    
    // Log initialization
    console.log(`🔍 AutoDev Phase 1A: Requirements Specification`);
    console.log(`📋 Feature: "${featureDescription}"`);
    console.log(`📁 Feature Name: ${featureName}`);
    console.log(`📊 Project: ${sddState.project.name}`);
    console.log(`🎯 Creating comprehensive requirements specification...`);
    console.log(`📝 Output: ${requirementsFile}`);
    
    if (sddState.specifications.steering.approvedAt) {
      console.log(`✅ Using project steering context from steering document`);
    }
    
    console.log(`⏭️  Next: Review with /autodev-approve-spec requirements`);
    
  } catch (error) {
    console.error('AutoDev Requirements init error:', error.message);
    process.exit(1);
  }
});

// Helper function to generate feature name from description
function generateFeatureName(description) {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50); // Limit length
}