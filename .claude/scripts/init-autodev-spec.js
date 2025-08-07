#!/usr/bin/env node

/**
 * AutoDev Spec-Driven Development Initialization Hook
 * Triggered when /autodev-spec command is used - guides user through SDD workflow
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
    
    // Extract feature description from command
    const prompt = hookData.prompt || '';
    const specMatch = prompt.match(/\/autodev-spec\s+(.+)/);
    
    if (!specMatch) {
      console.error('❌ Feature description required. Usage: /autodev-spec <feature_description>');
      process.exit(1);
    }
    
    const featureDescription = specMatch[1].trim();
    const sddStateFile = '.claude/state/autodev-sdd.json';
    
    console.log(`🎯 AutoDev Spec-Driven Development Workflow`);
    console.log(`📋 Feature: "${featureDescription}"`);
    console.log('');
    
    // Check if SDD project exists
    if (!fs.existsSync(sddStateFile)) {
      console.log('📁 No SDD project found - setting up Spec-Driven Development...');
      console.log('');
      console.log('🏛️  **RECOMMENDED FIRST STEP: Project Steering Document**');
      console.log('   A steering document provides project-wide context and guides all specifications.');
      console.log('   Command: /autodev-init <project_description>');
      console.log('');
      console.log('📋 **OR PROCEED DIRECTLY TO REQUIREMENTS:**');
      console.log(`   Command: /autodev-requirements ${featureDescription}`);
      console.log('');
      console.log('🔄 **COMPLETE SDD WORKFLOW:**');
      console.log('   1. /autodev-init <project>           # Project setup (recommended)');
      console.log(`   2. /autodev-requirements ${featureDescription.substring(0, 30)}... # Requirements spec`);
      console.log('   3. /autodev-approve-spec requirements approve  # Approve requirements');
      console.log('   4. /autodev-design                   # Technical design');  
      console.log('   5. /autodev-approve-spec design approve      # Approve design');
      console.log('   6. /autodev-tasks                    # Task breakdown');
      console.log('   7. /autodev-approve-spec tasks approve       # Approve tasks');
      console.log('   8. /autodev-execute                  # Begin implementation');
      
    } else {
      // SDD project exists, check current status
      const sddState = JSON.parse(fs.readFileSync(sddStateFile, 'utf8'));
      console.log(`📊 Existing SDD Project: ${sddState.project.name}`);
      console.log('');
      
      // Show current specifications status
      console.log('📋 **CURRENT SPECIFICATIONS STATUS:**');
      
      const steering = sddState.specifications.steering;
      const steeringStatus = steering.approvedAt ? '✅ Approved' : steering.status;
      console.log(`   Steering Document: ${steeringStatus}`);
      
      Object.entries(sddState.specifications).forEach(([specType, spec]) => {
        if (specType !== 'steering' && spec.status !== 'not_started') {
          const status = spec.approvedAt ? '✅ Approved' : `🔄 ${spec.status}`;
          console.log(`   ${specType.charAt(0).toUpperCase() + specType.slice(1)}: ${status} - ${spec.feature || 'N/A'}`);
        }
      });
      
      console.log('');
      console.log('🎯 **NEXT STEPS FOR NEW FEATURE:**');
      console.log(`   /autodev-requirements ${featureDescription}`);
      
      console.log('');
      console.log('📊 **OR CONTINUE EXISTING SPECIFICATIONS:**');
      
      // Suggest next steps based on current state
      const requirements = sddState.specifications.requirements;
      const design = sddState.specifications.design;
      const tasks = sddState.specifications.tasks;
      
      if (requirements.status === 'in_progress' || requirements.status === 'rejected') {
        console.log('   • Complete requirements: /autodev-approve-spec requirements');
      }
      
      if (requirements.approvedAt && (!design.approvedAt && design.status === 'not_started')) {
        console.log('   • Start design phase: /autodev-design');
      } else if (design.status === 'in_progress' || design.status === 'rejected') {
        console.log('   • Complete design: /autodev-approve-spec design');
      }
      
      if (design.approvedAt && (!tasks.approvedAt && tasks.status === 'not_started')) {
        console.log('   • Start task breakdown: /autodev-tasks');
      } else if (tasks.status === 'in_progress' || tasks.status === 'rejected') {
        console.log('   • Complete tasks: /autodev-approve-spec tasks');
      }
      
      if (requirements.approvedAt && design.approvedAt && tasks.approvedAt) {
        console.log('   • Begin implementation: /autodev-execute');
      }
    }
    
    console.log('');
    console.log('🆚 **ALTERNATIVE: Simple Mode**');
    console.log('   For faster workflow with single approval gate:');
    console.log(`   /autodev-plan ${featureDescription}`);
    console.log('');
    console.log('📚 **SDD BENEFITS:**');
    console.log('   ✅ Detailed permanent specifications');
    console.log('   ✅ Individual approval control at each phase');
    console.log('   ✅ Complete project documentation');
    console.log('   ✅ Full traceability from requirements to code');
    console.log('   ✅ Team collaboration and knowledge sharing');
    
  } catch (error) {
    console.error('AutoDev Spec initialization error:', error.message);
    process.exit(1);
  }
});