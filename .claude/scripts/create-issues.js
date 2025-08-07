#!/usr/bin/env node

/**
 * GitHub Issue Creation Automation
 * Creates issues at appropriate workflow steps
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [, , issueType, featureDescription] = process.argv;

if (!issueType || !featureDescription) {
  console.error('Usage: node create-issues.js <issueType> <featureDescription>');
  process.exit(1);
}

// Check if gh CLI is available
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ GitHub CLI (gh) not found. Please install: https://cli.github.com/');
  process.exit(1);
}

// Issue templates and creation logic
const issueCreators = {
  
  epic_and_tasks: (feature) => {
    // First create epic, then create tasks
    console.log('📋 Creating Epic issue and Task breakdown...');
    
    const epicNumber = issueCreators.epic(feature);
    const taskResults = issueCreators.tasks(feature);
    
    return {
      epic: epicNumber,
      tasks: taskResults
    };
  },
  
  epic: (feature) => {
    const epicBody = `
## Epic: ${feature}

### Overview
This epic tracks the complete development lifecycle for implementing: **${feature}**

### Acceptance Criteria
- [ ] Research and analysis completed
- [ ] Technical requirements defined
- [ ] System architecture designed
- [ ] Implementation completed with full test coverage
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Successfully deployed to production

### Workflow Steps
- [ ] 📊 Research & Analysis
- [ ] 📋 Planning & Requirements
- [ ] 🏗️ System Design  
- [ ] 💻 Implementation
- [ ] 🧪 Testing & Quality Assurance
- [ ] 🐛 Debugging & Fixes
- [ ] 🚀 Deployment & Release
- [ ] 📝 Documentation Updates

### Definition of Done
- All functionality implemented and tested
- Code coverage meets project standards
- Documentation updated and reviewed
- Successfully deployed without issues
- All related tasks closed

### Links
- Related tasks will be linked as they are created
- PRs will be linked when submitted

---
🤖 Created by AutoDev Workflow Automation
    `;
    
    try {
      const result = execSync(`gh issue create --title "Epic: ${feature}" --body "${epicBody.replace(/"/g, '\\"')}" --label "epic,enhancement"`, 
        { encoding: 'utf8' });
      
      const issueUrl = result.trim();
      console.log(`✅ Epic issue created: ${issueUrl}`);
      
      // Save epic issue number for task linking
      const issueNumber = issueUrl.split('/').pop();
      return issueNumber;
      
    } catch (error) {
      console.error('❌ Failed to create epic issue:', error.message);
      return null;
    }
  },

  tasks: (feature) => {
    // Read workflow state to get planning results
    const stateFile = '.claude/state/autodev-workflow.json';
    let tasks = [];
    
    if (fs.existsSync(stateFile)) {
      try {
        const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
        // Extract tasks from planning phase (this would be populated by architect-reviewer)
        tasks = workflowState.plannedTasks || [];
      } catch (error) {
        console.log('⚠️ Could not read workflow state, creating default tasks');
      }
    }
    
    // Default task breakdown if planning didn't provide specific tasks
    if (tasks.length === 0) {
      tasks = [
        {
          title: `Backend API: ${feature}`,
          body: `Implement backend API endpoints for ${feature}\n\n**Acceptance Criteria:**\n- [ ] API endpoints created\n- [ ] Input validation implemented\n- [ ] Error handling added\n- [ ] Unit tests written`,
          labels: ['task', 'backend']
        },
        {
          title: `Frontend UI: ${feature}`,
          body: `Implement frontend user interface for ${feature}\n\n**Acceptance Criteria:**\n- [ ] UI components created\n- [ ] State management implemented\n- [ ] API integration completed\n- [ ] Responsive design verified`,
          labels: ['task', 'frontend']
        },
        {
          title: `Database: ${feature}`,
          body: `Database changes for ${feature}\n\n**Acceptance Criteria:**\n- [ ] Schema changes planned\n- [ ] Migrations created\n- [ ] Data validation added\n- [ ] Performance considerations addressed`,
          labels: ['task', 'database']
        },
        {
          title: `Testing: ${feature}`,
          body: `Comprehensive testing for ${feature}\n\n**Acceptance Criteria:**\n- [ ] Unit tests implemented\n- [ ] Integration tests added\n- [ ] E2E test scenarios covered\n- [ ] Code coverage meets standards`,
          labels: ['task', 'testing']
        }
      ];
    }
    
    const createdTasks = [];
    
    for (const task of tasks) {
      try {
        const labelString = (task.labels || ['task']).join(',');
        const result = execSync(
          `gh issue create --title "${task.title}" --body "${task.body.replace(/"/g, '\\"')}" --label "${labelString}"`,
          { encoding: 'utf8' }
        );
        
        const taskUrl = result.trim();
        const taskNumber = taskUrl.split('/').pop();
        createdTasks.push({ number: taskNumber, url: taskUrl, title: task.title });
        console.log(`✅ Task created: ${task.title} (${taskUrl})`);
        
      } catch (error) {
        console.error(`❌ Failed to create task "${task.title}":`, error.message);
      }
    }
    
    return createdTasks;
  },

  bugs: (feature) => {
    // This would typically be called when testing finds issues
    // For now, we'll create a placeholder process
    
    const bugReportBody = `
## Bug Report Template for ${feature}

This issue will track bugs found during testing and development of ${feature}.

### Bug Discovery Process
- [ ] Run comprehensive test suite
- [ ] Manual testing of all user flows
- [ ] Edge case validation
- [ ] Performance testing
- [ ] Security testing

### Bug Tracking Format
When bugs are found, create individual issues with:
- Clear reproduction steps
- Expected vs actual behavior  
- Screenshots/logs if applicable
- Severity classification
- Environment details

### Resolution Criteria
- [ ] All bugs identified and categorized
- [ ] Critical and high priority bugs fixed
- [ ] Regression testing completed
- [ ] Performance benchmarks met

---
🤖 Created by AutoDev Workflow Automation - Bug tracking for ${feature}
    `;
    
    try {
      const result = execSync(
        `gh issue create --title "Bug Tracking: ${feature}" --body "${bugReportBody.replace(/"/g, '\\"')}" --label "bug,testing"`,
        { encoding: 'utf8' }
      );
      
      console.log(`✅ Bug tracking issue created: ${result.trim()}`);
      return result.trim().split('/').pop();
      
    } catch (error) {
      console.error('❌ Failed to create bug tracking issue:', error.message);
      return null;
    }
  },

  followups: (feature) => {
    const followupItems = [
      {
        title: `Enhancement: Improve ${feature} performance`,
        body: `Future performance optimizations for ${feature}\n\n**Potential Improvements:**\n- [ ] Caching implementation\n- [ ] Database query optimization\n- [ ] Frontend bundle optimization\n- [ ] API response optimization`,
        labels: ['enhancement', 'performance', 'future']
      },
      {
        title: `Enhancement: ${feature} analytics and monitoring`,
        body: `Add comprehensive analytics for ${feature}\n\n**Analytics Features:**\n- [ ] Usage metrics tracking\n- [ ] Performance monitoring\n- [ ] Error rate monitoring\n- [ ] User behavior analysis`,
        labels: ['enhancement', 'analytics', 'future']
      },
      {
        title: `Technical Debt: ${feature} code refactoring`,
        body: `Future refactoring opportunities for ${feature}\n\n**Refactoring Areas:**\n- [ ] Code organization improvements\n- [ ] Design pattern implementation\n- [ ] Performance optimizations\n- [ ] Test coverage improvements`,
        labels: ['technical-debt', 'refactoring', 'future']
      }
    ];
    
    const createdFollowups = [];
    
    for (const item of followupItems) {
      try {
        const labelString = item.labels.join(',');
        const result = execSync(
          `gh issue create --title "${item.title}" --body "${item.body.replace(/"/g, '\\"')}" --label "${labelString}"`,
          { encoding: 'utf8' }
        );
        
        const followupUrl = result.trim();
        const followupNumber = followupUrl.split('/').pop();
        createdFollowups.push({ number: followupNumber, url: followupUrl, title: item.title });
        console.log(`✅ Follow-up created: ${item.title} (${followupUrl})`);
        
      } catch (error) {
        console.error(`❌ Failed to create follow-up "${item.title}":`, error.message);
      }
    }
    
    return createdFollowups;
  }
};

// Execute issue creation
if (issueCreators[issueType]) {
  console.log(`📋 Creating ${issueType} issues for: ${featureDescription}`);
  const result = issueCreators[issueType](featureDescription);
  
  // Update workflow state with created issues
  const stateFile = '.claude/state/autodev-workflow.json';
  if (fs.existsSync(stateFile)) {
    try {
      const workflowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      if (!workflowState.issues[issueType]) {
        workflowState.issues[issueType] = [];
      }
      
      if (Array.isArray(result)) {
        workflowState.issues[issueType] = result;
      } else if (result) {
        workflowState.issues[issueType] = result;
      }
      
      fs.writeFileSync(stateFile, JSON.stringify(workflowState, null, 2));
      console.log(`📊 Workflow state updated with ${issueType} issues`);
    } catch (error) {
      console.error('⚠️ Failed to update workflow state:', error.message);
    }
  }
  
} else {
  console.error(`❌ Unknown issue type: ${issueType}`);
  console.log('Available types: epic, tasks, bugs, followups');
  process.exit(1);
}