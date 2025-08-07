# AutoDev Troubleshooting Guide

**Problem Solving and FAQ for AutoDev System**  
**Quick Reference for Common Issues**  
**Updated:** January 8, 2025

---

## 🚨 **Emergency Quick Fixes**

### **System Not Responding**
```bash
# Restart Claude Code
# Exit current session (Ctrl+C or /quit)
claude

# Check system status
/status

# Clear conversation if needed
/clear
```

### **Commands Not Working**
```bash
# Verify AutoDev setup
ls .claude/commands/  # Should show 11 command files

# Re-run setup if needed
./.claude/setup-autodev.sh  # macOS/Linux
.claude\setup-autodev.bat   # Windows
```

### **Critical File Missing**
```bash
# Check AutoDev structure
ls -la .claude/

# If missing, re-copy AutoDev files
# Or re-run setup script
```

---

## 📋 **Table of Contents**

1. [Installation & Setup Issues](#installation--setup-issues)
2. [Command Execution Problems](#command-execution-problems)
3. [Workflow State Issues](#workflow-state-issues)
4. [GitHub Integration Problems](#github-integration-problems)
5. [Specification Generation Issues](#specification-generation-issues)
6. [Performance Problems](#performance-problems)
7. [Error Messages & Meanings](#error-messages--meanings)
8. [Frequently Asked Questions](#frequently-asked-questions)

---

## 🔧 **Installation & Setup Issues**

### **Problem: Claude Code not found**

**Symptoms:**
```
Command 'claude' not found
```

**Solutions:**
```bash
# Check if Claude Code is installed
which claude  # macOS/Linux
where claude  # Windows

# If not found:
# 1. Reinstall Claude Code
# 2. Add to PATH environment variable
# 3. Restart terminal/command prompt

# Verify installation
claude --version
```

### **Problem: Node.js version incompatible**

**Symptoms:**
```
Error: Node.js version 14.x is not supported
AutoDev requires Node.js v16 or later
```

**Solutions:**
```bash
# Check current version
node --version

# Update Node.js
# Windows: Download from nodejs.org
# macOS: brew upgrade node
# Linux: Follow distribution-specific upgrade guide

# Verify after update
node --version  # Should show v16+ or v18+
```

### **Problem: GitHub CLI authentication failed**

**Symptoms:**
```
❌ GitHub CLI is not authenticated
Please run: gh auth login
```

**Solutions:**
```bash
# Re-authenticate
gh auth logout
gh auth login

# If browser auth fails, use token
gh auth login --with-token
# Enter your personal access token

# Verify authentication
gh auth status
```

### **Problem: Permissions denied on scripts**

**Symptoms (macOS/Linux):**
```
Permission denied: .claude/scripts/init-autodev-init.js
```

**Solutions:**
```bash
# Make scripts executable
chmod +x .claude/scripts/*.js
chmod +x .claude/setup-autodev.sh

# Verify permissions
ls -la .claude/scripts/
```

**Windows Equivalent:**
```cmd
# Run Command Prompt as Administrator
# Or check file permissions in .claude directory
```

---

## ⚡ **Command Execution Problems**

### **Problem: /autodev-* commands not recognized**

**Symptoms:**
```
Unknown command: /autodev-spec
```

**Diagnosis:**
```bash
# Check if commands are installed
ls .claude/commands/
# Should show: autodev-spec.md, autodev-init.md, etc.

# Check Claude Code command registration
/help  # Should list AutoDev commands
```

**Solutions:**
```bash
# Re-copy command files
cp .claude/commands/*.md ~/.claude/commands/

# Or re-run setup
./.claude/setup-autodev.sh

# Restart Claude Code
claude
```

### **Problem: Hooks not executing**

**Symptoms:**
```
Commands run but no hook output appears
Scripts seem to not execute
```

**Diagnosis:**
```bash
# Check hooks configuration
cat .claude/hooks/autodev-hooks.json

# Test hook manually
echo '{"prompt": "test"}' | node .claude/scripts/session-init.js
```

**Solutions:**
```bash
# Verify hooks file location
# Should be in ~/.claude/hooks.json or project-specific location

# Copy hooks configuration
cp .claude/hooks/autodev-hooks.json ~/.claude/hooks.json

# Restart Claude Code
claude
```

### **Problem: Scripts fail with module errors**

**Symptoms:**
```
Error: Cannot find module 'fs'
SyntaxError: Unexpected token
```

**Diagnosis:**
```bash
# Check Node.js installation
node --version
npm --version

# Test script manually
node .claude/scripts/session-init.js
```

**Solutions:**
```bash
# Ensure Node.js is properly installed
# Verify scripts have correct syntax
# Check file encoding (should be UTF-8)

# Test individual script
echo '{"prompt": "test"}' | node .claude/scripts/session-init.js
```

---

## 🔄 **Workflow State Issues**

### **Problem: Workflow state corrupted**

**Symptoms:**
```
Error reading workflow state
Invalid JSON in state file
Workflow appears stuck
```

**Diagnosis:**
```bash
# Check state files
ls .claude/state/
cat .claude/state/autodev-sdd.json
```

**Solutions:**
```bash
# Backup current state
cp .claude/state/autodev-sdd.json .claude/state/autodev-sdd.json.backup

# Remove corrupted state to restart
rm .claude/state/autodev-sdd.json
rm .claude/state/autodev-workflow.json

# Start fresh workflow
/autodev-init  # For SDD mode
# or
/autodev-plan  # For Simple mode
```

### **Problem: Cannot proceed to next phase**

**Symptoms:**
```
❌ Requirements specification must be approved before design phase
Current requirements status: in_progress
```

**Diagnosis:**
```bash
# Check specification approval status
/autodev-approve-spec requirements
```

**Solutions:**
```bash
# Complete required approvals in order
/autodev-approve-spec requirements approve
# Then proceed to next phase
/autodev-design
```

### **Problem: Workflow stuck in approval state**

**Symptoms:**
```
Phase shows as "awaiting_approval" but cannot proceed
```

**Diagnosis:**
```bash
# Check current workflow state
cat .claude/state/autodev-workflow.json | grep -E "phase|status"
```

**Solutions:**
```bash
# Complete pending approval
/autodev-approve approve
# or for SDD mode:
/autodev-approve-spec [type] approve

# Force state reset if needed (last resort)
rm .claude/state/*.json
```

---

## 🐙 **GitHub Integration Problems**

### **Problem: Issue creation fails**

**Symptoms:**
```
❌ Failed to create issue: HTTP 404
GitHub repository not found
```

**Diagnosis:**
```bash
# Check GitHub repository
gh repo view
gh auth status

# Check repository permissions
gh api repos/:owner/:repo
```

**Solutions:**
```bash
# Ensure you're in a GitHub repository
git remote -v

# Initialize GitHub repository if needed
gh repo create

# Check repository permissions
# Must have 'Issues' enabled in repository settings
```

### **Problem: GitHub CLI rate limiting**

**Symptoms:**
```
API rate limit exceeded
HTTP 403: rate limit exceeded
```

**Diagnosis:**
```bash
# Check rate limit status
gh api rate_limit
```

**Solutions:**
```bash
# Wait for rate limit reset (usually 1 hour)
# Or use authentication token with higher limits

# Check if using personal access token
gh auth status

# Re-authenticate with token if needed
gh auth login --with-token
```

### **Problem: Pull request creation fails**

**Symptoms:**
```
Error creating pull request
No changes to create PR
```

**Diagnosis:**
```bash
# Check git status
git status
git branch

# Check for uncommitted changes
git diff
```

**Solutions:**
```bash
# Ensure changes are committed
git add .
git commit -m "AutoDev implementation"

# Push to remote branch
git push -u origin feature-branch

# Then create PR
gh pr create --title "Feature implementation" --body "AutoDev generated implementation"
```

---

## 📝 **Specification Generation Issues**

### **Problem: Specifications not generating**

**Symptoms:**
```
Command runs but no specification file created
.claude/specs/ directory is empty
```

**Diagnosis:**
```bash
# Check specs directory
ls -la .claude/specs/

# Check directory permissions
ls -la .claude/

# Verify agent execution
# Look for agent-related output in command execution
```

**Solutions:**
```bash
# Create specs directory if missing
mkdir -p .claude/specs

# Check file permissions
chmod 755 .claude/specs

# Re-run specification command
/autodev-requirements "Your feature description"
```

### **Problem: Template files missing**

**Symptoms:**
```
Error: Template file not found
Cannot read template from .claude/templates/
```

**Diagnosis:**
```bash
# Check template files
ls .claude/templates/
# Should show: steering.md, requirements.md, design.md, tasks.md
```

**Solutions:**
```bash
# Re-copy template files
# Or re-run setup script
./.claude/setup-autodev.sh

# Verify templates exist
ls -la .claude/templates/
```

### **Problem: Specification approval not working**

**Symptoms:**
```
❌ Cannot approve design: Requirements not approved
But requirements were already approved
```

**Diagnosis:**
```bash
# Check approval state
cat .claude/state/autodev-sdd.json | grep -A5 -B5 "approved"
```

**Solutions:**
```bash
# Verify approval status
/autodev-approve-spec requirements

# If showing as approved but system doesn't recognize:
# Check timestamp and approval format in state file
# May need to re-approve
/autodev-approve-spec requirements approve "Re-approving after state issue"
```

---

## ⚡ **Performance Problems**

### **Problem: Commands running very slowly**

**Symptoms:**
```
Commands take 30+ seconds to respond
Timeout errors in hooks
```

**Diagnosis:**
```bash
# Check system resources
top  # Linux/macOS
# Task Manager on Windows

# Check Claude Code performance
# Look for memory usage, CPU usage
```

**Solutions:**
```bash
# Increase hook timeouts if needed
# Edit .claude/hooks/autodev-hooks.json
# Increase "timeout" values from 5000 to 10000

# Restart Claude Code
claude

# Clear conversation history if very long
/clear
```

### **Problem: Large specification files**

**Symptoms:**
```
Specification generation takes very long
Generated files are extremely large
```

**Solutions:**
```bash
# Break down feature into smaller components
# Instead of: "Complete e-commerce platform"
# Use: "User authentication system" first, then other components

# Use more specific feature descriptions
# This helps agents generate focused specifications
```

---

## 💬 **Error Messages & Meanings**

### **Common Error Messages**

#### `❌ No AutoDev SDD project found. Please run /autodev-init first.`
**Meaning:** Trying to use SDD commands without project initialization  
**Solution:** Run `/autodev-init <project_description>` first

#### `❌ Requirements specification must be approved before design phase.`
**Meaning:** Attempting to skip approval gates in SDD workflow  
**Solution:** Complete approvals in sequence: requirements → design → tasks

#### `❌ GitHub CLI (gh) not found. Please install: https://cli.github.com/`
**Meaning:** GitHub CLI not installed or not in PATH  
**Solution:** Install GitHub CLI and ensure it's in system PATH

#### `❌ Feature description required. Usage: /autodev-requirements <feature_description>`
**Meaning:** Command used without required parameters  
**Solution:** Provide feature description: `/autodev-requirements User authentication`

#### `Permission denied: .claude/scripts/init-autodev-init.js`
**Meaning:** Script execution permissions not set (Unix/Linux/macOS)  
**Solution:** Run `chmod +x .claude/scripts/*.js`

### **Warning Messages**

#### `⚠️ Warning: No project steering document found.`
**Meaning:** Using SDD without project initialization (optional)  
**Action:** Consider running `/autodev-init` for better context

#### `⚠️ Could not read workflow state, creating default tasks`
**Meaning:** Task generation proceeding with default breakdown  
**Action:** Usually fine, but verify generated tasks are appropriate

---

## ❓ **Frequently Asked Questions**

### **General Questions**

**Q: What's the difference between SDD mode and Simple mode?**
A: SDD mode creates detailed specifications with individual approval gates for enterprise development. Simple mode combines planning into one step for rapid prototyping.

**Q: Can I switch between SDD and Simple mode in the same project?**
A: Yes, you can use both modes for different features. SDD for complex features, Simple for quick additions.

**Q: Do I need GitHub for AutoDev to work?**
A: GitHub CLI is required for issue creation and PR management, but basic specification generation works without it.

**Q: Can I customize the generated specifications?**
A: Yes, edit the template files in `.claude/templates/` to customize specification format and content.

### **Workflow Questions**

**Q: Can I skip specification approval steps?**
A: No, SDD mode requires sequential approval (requirements → design → tasks). Use Simple mode for faster workflows.

**Q: What if I want to revise a specification after approval?**
A: Reject it with specific feedback, and the system will automatically revise and re-present for approval.

**Q: Can multiple people approve different specifications?**
A: Yes, SDD supports role-based approvals. Different team members can handle requirements, design, and task approvals.

**Q: How long does the implementation phase take?**
A: Implementation time depends on feature complexity, typically 10-30 minutes for moderate features.

### **Technical Questions**

**Q: Where are specifications stored?**
A: In `.claude/specs/` directory as permanent markdown files that can be shared and version controlled.

**Q: Can I version control the specifications?**
A: Yes, specifications are regular markdown files that should be committed with your code.

**Q: How do I backup my workflow state?**
A: Copy `.claude/state/` directory. State files are JSON and can be backed up like any other project files.

**Q: Can I customize agent behavior?**
A: Yes, edit `.claude/scripts/agent-prompts.js` to customize how agents approach each phase.

### **Troubleshooting Questions**

**Q: Command worked before but now fails with "command not found"**
A: Command files may have been removed. Re-run `.claude/setup-autodev.sh` to reinstall.

**Q: Specifications generate but are very generic**
A: Provide more detailed feature descriptions and ensure project steering document exists for context.

**Q: GitHub issues aren't created during implementation**
A: Check GitHub CLI authentication (`gh auth status`) and repository permissions.

**Q: How do I completely reset AutoDev?**
A: Remove `.claude/state/` directory and re-run setup script. This clears all workflow state.

### **Best Practices Questions**

**Q: How detailed should my feature descriptions be?**
A: More detail produces better specifications. Include user types, main functions, and any special requirements.

**Q: Should I create one large specification or multiple small ones?**
A: Multiple focused specifications are better. Break complex features into logical components.

**Q: When should I use rejection vs. approval with comments?**
A: Reject when specification needs significant changes. Approve with comments for minor suggestions or clarifications.

**Q: How often should I update the project steering document?**
A: Update when project direction, technology choices, or quality standards change significantly.

---

## 🔄 **Recovery Procedures**

### **Complete System Reset**
```bash
# 1. Backup current work
cp -r .claude/specs/ .claude/specs-backup/
cp -r .claude/state/ .claude/state-backup/

# 2. Clean AutoDev installation
rm -rf .claude/

# 3. Re-run setup
# Copy AutoDev files from source
# Run setup script
./.claude/setup-autodev.sh

# 4. Restart Claude Code
claude
```

### **State Recovery**
```bash
# If workflow state is corrupted but specs exist
rm .claude/state/*.json

# Start new workflow using existing specs as reference
/autodev-init  # Create new steering document
# Then continue with new feature development
```

### **Partial Reset**
```bash
# Reset only workflow state, keep specifications
rm .claude/state/autodev-*.json

# Keep specifications and restart workflow
# Existing specs in .claude/specs/ remain as reference
```

---

## 📞 **Getting Help**

### **Self-Service Resources**
1. **Setup Guide:** `SETUP-GUIDE.md` - Installation instructions
2. **Usage Manual:** `USAGE-MANUAL.md` - How to use AutoDev
3. **Environment Docs:** `DEVELOPMENT-ENVIRONMENT.md` - System overview

### **Community Support**
- **GitHub Issues:** Report bugs and problems
- **GitHub Discussions:** Ask questions and share experiences
- **Documentation:** Check official Claude Code documentation

### **Diagnostic Information to Include**
When reporting issues, include:
```bash
# System information
claude --version
node --version
gh --version
git --version

# AutoDev state
ls .claude/
cat .claude/state/autodev-sdd.json  # (if relevant and safe to share)

# Error messages (copy exact error text)
# Steps to reproduce the problem
# Expected vs actual behavior
```

---

**📅 Document Version:** 1.0  
**📅 Last Updated:** January 8, 2025  
**🔄 Next Review:** February 8, 2025