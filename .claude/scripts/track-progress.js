#!/usr/bin/env node

/**
 * Progress Tracking Hook
 * Tracks progress of bash commands and workflow steps
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const stateFile = '.claude/state/autodev-workflow.json';
    
    if (!fs.existsSync(stateFile)) {
      process.exit(0);
    }
    
    const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    
    // Log command execution for progress tracking
    if (hookData.tool === 'Bash' && hookData.tool_input) {
      const command = hookData.tool_input.command;
      const timestamp = new Date().toISOString();
      
      if (!workflowState.commandHistory) {
        workflowState.commandHistory = [];
      }
      
      workflowState.commandHistory.push({
        timestamp,
        command: command.substring(0, 100), // Truncate long commands
        step: workflowState.currentStep
      });
      
      // Keep only last 50 commands to prevent bloat
      if (workflowState.commandHistory.length > 50) {
        workflowState.commandHistory = workflowState.commandHistory.slice(-50);
      }
      
      // Track important commands
      const importantCommands = ['npm test', 'npm run', 'git', 'gh'];
      const isImportant = importantCommands.some(cmd => command.includes(cmd));
      
      if (isImportant) {
        console.log(`📊 Progress: Executed "${command.split(' ')[0]}" at step ${workflowState.currentStep}`);
      }
      
      fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
    }
    
  } catch (error) {
    // Silently handle errors in progress tracking to not interrupt workflow
  }
});