#!/usr/bin/env node

/**
 * AutoDev Phase 1 Initialization Hook
 * Triggered when /autodev-plan command is used
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
    const autodevMatch = prompt.match(/\/autodev-plan\s+(.+)/);
    
    if (!autodevMatch) {
      process.exit(0);
    }
    
    const featureDescription = autodevMatch[1].trim();
    
    // Initialize Phase 1 workflow state
    const workflowState = {
      feature: featureDescription,
      startTime: new Date().toISOString(),
      phase: 'planning',
      currentStep: 1,
      steps: {
        phase1: [
          { id: 1, name: 'やりたいことを決める', status: 'completed', agent: 'human', phase: 1 },
          { id: 2, name: '調査', status: 'pending', agent: 'search-specialist', phase: 1 },
          { id: 3, name: '計画を立てる', status: 'pending', agent: 'architect-reviewer', phase: 1 },
          { id: 4, name: '要件定義', status: 'pending', agent: 'business-analyst', phase: 1 }
        ],
        phase2: [
          { id: 5, name: '設計', status: 'not_started', agent: 'backend-architect', phase: 2 },
          { id: 6, name: '実装', status: 'not_started', agent: 'developer', phase: 2 },
          { id: 7, name: 'テスト', status: 'not_started', agent: 'test-automator', phase: 2 },
          { id: 8, name: 'DBG', status: 'not_started', agent: 'debugger', phase: 2 },
          { id: 9, name: 'PR', status: 'not_started', agent: 'deployment-engineer', phase: 2 },
          { id: 10, name: 'デプロイ', status: 'not_started', agent: 'deployment-engineer', phase: 2 },
          { id: 11, name: 'ドキュメント更新', status: 'not_started', agent: 'docs-architect', phase: 2 }
        ]
      },
      approval: {
        status: 'pending', // pending, approved, rejected
        feedback: null,
        approvedAt: null
      },
      planning: {
        research: null,
        plan: null,
        requirements: null,
        summary: null
      },
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
    console.log(`🚀 AutoDev Phase 1 initialized for: "${featureDescription}"`);
    console.log(`📊 Planning workflow state saved`);
    console.log(`🎯 Phase 1: 調査 → 計画 → 要件定義 → 人間承認待ち`);
    
  } catch (error) {
    console.error('AutoDev Phase 1 init error:', error.message);
  }
});