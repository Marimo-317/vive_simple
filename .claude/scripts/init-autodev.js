#!/usr/bin/env node

/**
 * AutoDev Initialization Hook
 * Triggered when /autodev command is used
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
    
    // Extract feature description from command
    const prompt = hookData.prompt || '';
    const autodevMatch = prompt.match(/\/autodev\s+(.+)/);
    
    if (!autodevMatch) {
      process.exit(0);
    }
    
    const featureDescription = autodevMatch[1].trim();
    
    // Initialize workflow state
    const workflowState = {
      feature: featureDescription,
      startTime: new Date().toISOString(),
      currentStep: 1,
      steps: [
        { id: 1, name: 'やりたいことを決める', status: 'completed', agent: 'human' },
        { id: 2, name: '調査', status: 'pending', agent: 'search-specialist' },
        { id: 3, name: '計画を立てる', status: 'pending', agent: 'architect-reviewer' },
        { id: 4, name: '要件定義', status: 'pending', agent: 'business-analyst' },
        { id: 5, name: '設計', status: 'pending', agent: 'backend-architect' },
        { id: 6, name: '実装', status: 'pending', agent: 'developer' },
        { id: 7, name: 'テスト', status: 'pending', agent: 'test-automator' },
        { id: 8, name: 'DBG', status: 'pending', agent: 'debugger' },
        { id: 9, name: 'PR', status: 'pending', agent: 'deployment-engineer' },
        { id: 10, name: 'デプロイ', status: 'pending', agent: 'deployment-engineer' },
        { id: 11, name: 'ドキュメント更新', status: 'pending', agent: 'docs-architect' }
      ],
      issues: {
        epic: null,
        tasks: [],
        bugs: [],
        followups: []
      }
    };
    
    // Save workflow state
    const stateDir = '.claude/state';
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(stateDir, 'autodev-workflow.json'),
      JSON.stringify(workflowState, null, 2)
    );
    
    // Log initialization
    console.log(`🚀 AutoDev initialized for: "${featureDescription}"`);
    console.log(`📊 Workflow state saved to ${stateDir}/autodev-workflow.json`);
    
  } catch (error) {
    console.error('AutoDev init error:', error.message);
  }
});