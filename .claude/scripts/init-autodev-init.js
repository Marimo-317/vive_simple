#!/usr/bin/env node

/**
 * AutoDev Phase 0 Initialization Hook (SDD)
 * Triggered when /autodev-init command is used
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
    
    // Extract project description from command
    const prompt = hookData.prompt || '';
    const autodevMatch = prompt.match(/\/autodev-init\s+(.+)/);
    
    if (!autodevMatch) {
      process.exit(0);
    }
    
    const projectDescription = autodevMatch[1].trim();
    
    // Initialize SDD (Spec-Driven Development) project state
    const sddState = {
      project: {
        name: extractProjectName(projectDescription),
        description: projectDescription,
        createdAt: new Date().toISOString(),
        type: 'spec-driven'
      },
      phases: {
        phase0: {
          id: 0,
          name: 'Project Initialization',
          status: 'in_progress',
          startedAt: new Date().toISOString(),
          steps: [
            { id: '0.1', name: 'Project Steering Document', status: 'pending', agent: 'business-analyst' }
          ]
        },
        phase1: {
          id: 1,
          name: 'Specification Development',
          status: 'not_started',
          steps: [
            { id: '1.1', name: 'Requirements Specification', status: 'not_started', agent: 'business-analyst' },
            { id: '1.2', name: 'Technical Design', status: 'not_started', agent: 'backend-architect' },
            { id: '1.3', name: 'Task Breakdown', status: 'not_started', agent: 'architect-reviewer' }
          ]
        },
        phase2: {
          id: 2,
          name: 'Implementation',
          status: 'not_started',
          steps: [
            { id: '2.1', name: '設計', status: 'not_started', agent: 'backend-architect' },
            { id: '2.2', name: '実装', status: 'not_started', agent: 'developer' },
            { id: '2.3', name: 'テスト', status: 'not_started', agent: 'test-automator' },
            { id: '2.4', name: 'DBG', status: 'not_started', agent: 'debugger' },
            { id: '2.5', name: 'PR', status: 'not_started', agent: 'deployment-engineer' },
            { id: '2.6', name: 'デプロイ', status: 'not_started', agent: 'deployment-engineer' },
            { id: '2.7', name: 'ドキュメント更新', status: 'not_started', agent: 'docs-architect' }
          ]
        }
      },
      specifications: {
        steering: {
          status: 'pending',
          file: '.claude/specs/steering.md',
          approvedAt: null
        },
        requirements: {
          status: 'not_started',
          file: null,
          approvedAt: null,
          feature: null
        },
        design: {
          status: 'not_started',
          file: null,
          approvedAt: null,
          dependsOn: 'requirements'
        },
        tasks: {
          status: 'not_started',
          file: null,
          approvedAt: null,
          dependsOn: 'design'
        }
      },
      currentPhase: 0,
      currentStep: '0.1',
      workflow: 'sdd', // spec-driven development
      issues: {
        epic: null,
        tasks: [],
        bugs: [],
        followups: []
      }
    };
    
    // Ensure specs directory exists
    const specsDir = '.claude/specs';
    if (!fs.existsSync(specsDir)) {
      fs.mkdirSync(specsDir, { recursive: true });
    }
    
    // Save SDD state
    const stateDir = '.claude/state';
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(stateDir, 'autodev-sdd.json'),
      JSON.stringify(sddState, null, 2)
    );
    
    // Log initialization
    console.log(`🚀 AutoDev Spec-Driven Development initialized`);
    console.log(`📁 Project: "${sddState.project.name}"`);
    console.log(`📋 Description: "${projectDescription}"`);
    console.log(`🎯 Phase 0: Creating project steering document...`);
    console.log(`📊 Workflow: Steering → Requirements → Design → Tasks → Implementation`);
    
  } catch (error) {
    console.error('AutoDev SDD init error:', error.message);
  }
});

// Helper function to extract project name from description
function extractProjectName(description) {
  // Simple heuristic to extract project name
  const words = description.split(' ');
  if (words.length >= 2) {
    return words.slice(0, 3).join(' '); // First 3 words
  }
  return description.substring(0, 30); // First 30 characters
}