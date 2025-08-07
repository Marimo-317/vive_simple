# AutoDev Setup Guide

**Complete Installation & Configuration Guide**  
**Target:** New developers and system administrators  
**Time Required:** 30-45 minutes  
**Platforms:** Windows, macOS, Linux

---

## 🎯 **Setup Overview**

This guide will help you set up the AutoDev Spec-Driven Development system from scratch. By the end of this guide, you'll have:

- ✅ All required software installed
- ✅ AutoDev system fully configured
- ✅ GitHub integration working
- ✅ Both SDD and Simple modes available
- ✅ All commands and hooks operational

---

## 📋 **Prerequisites Check**

Before starting, verify your system meets these requirements:

### **Operating System**
- ✅ Windows 10/11 (recommended)
- ✅ macOS 10.15+ (Catalina or later)
- ✅ Linux (Ubuntu 18.04+, CentOS 7+, or equivalent)

### **User Permissions**
- ✅ Administrator/sudo access for software installation
- ✅ Ability to install Node.js and GitHub CLI
- ✅ Access to create directories in user home folder

---

## 🔧 **Step 1: Install Required Software**

### **1.1 Claude Code Installation**

**Install Claude Code AI Platform:**

**Windows:**
1. Visit [Claude Code Download Page]
2. Download Claude Code for Windows
3. Run installer as Administrator
4. Follow installation wizard
5. Restart your terminal/command prompt

**macOS:**
```bash
# Using Homebrew (recommended)
brew install claude-code

# Or download from official website
# Follow standard macOS installation process
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO- https://claude-code.anthropic.com/install.sh | bash

# CentOS/RHEL/Fedora  
curl -fsSL https://claude-code.anthropic.com/install.sh | bash

# Manual installation
# Download from official website and follow Linux installation guide
```

**Verify Installation:**
```bash
claude --version
# Should output: Claude Code v1.x.x
```

### **1.2 Node.js Installation**

**Windows:**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download LTS version (v18.x or later)
3. Run installer and follow wizard
4. **Important:** Check "Add to PATH" option
5. Restart Command Prompt/PowerShell

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Using Node Version Manager (alternative)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL/Fedora
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version  # Should be v18.x.x or later
npm --version   # Should be 9.x.x or later
```

### **1.3 GitHub CLI Installation**

**Windows:**
```powershell
# Using winget (Windows 11/Windows 10 with App Installer)
winget install --id GitHub.cli

# Using Chocolatey (if installed)
choco install gh

# Or download from https://cli.github.com/
```

**macOS:**
```bash
# Using Homebrew (recommended)
brew install gh

# Using MacPorts
sudo port install github-cli
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# CentOS/RHEL/Fedora
sudo dnf install 'dnf-command(config-manager)'
sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
sudo dnf install gh
```

**Verify Installation:**
```bash
gh --version
# Should output: gh version 2.x.x
```

### **1.4 Git Installation (if not already installed)**

**Windows:**
- Download from [https://git-scm.com/](https://git-scm.com/)
- Run installer with default settings

**macOS:**
```bash
# Usually pre-installed, or install via Homebrew
brew install git
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install git

# CentOS/RHEL/Fedora
sudo yum install git  # or sudo dnf install git
```

**Verify Installation:**
```bash
git --version
# Should output: git version 2.x.x
```

---

## 🏗️ **Step 2: GitHub Authentication**

### **2.1 Authenticate GitHub CLI**

**Interactive Authentication:**
```bash
gh auth login
```

**Follow the prompts:**
1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol?** → HTTPS (recommended)
3. **How would you like to authenticate?** → Login with a web browser
4. **Press Enter to open github.com in your browser**
5. **Enter the 8-character code** displayed in terminal
6. **Authorize GitHub CLI** in your browser

**Verify Authentication:**
```bash
gh auth status
# Should show: ✓ Logged in to github.com as [your-username]
```

### **2.2 Configure Git (if not done)**

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

---

## 📁 **Step 3: AutoDev System Setup**

### **3.1 Navigate to Your Project**

```bash
# Navigate to your existing project directory
cd /path/to/your/project

# Or create a new project
mkdir my-new-project
cd my-new-project
git init
```

### **3.2 Download AutoDev System**

**Option A: Clone the AutoDev repository (if available)**
```bash
git clone https://github.com/your-org/autodev-system .claude
```

**Option B: Manual setup (current method)**
```bash
# Create AutoDev directory structure
mkdir -p .claude/commands .claude/templates .claude/specs .claude/scripts .claude/hooks .claude/state

# Copy AutoDev files to your project
# (Files should already exist in your current project)
```

### **3.3 Run AutoDev Setup Script**

**Windows:**
```cmd
# Navigate to project directory
cd C:\path\to\your\project

# Run setup script
.claude\setup-autodev.bat
```

**macOS/Linux:**
```bash
# Navigate to project directory  
cd /path/to/your/project

# Make setup script executable
chmod +x .claude/setup-autodev.sh

# Run setup script
./.claude/setup-autodev.sh
```

**Expected Output:**
```
🚀 Setting up AutoDev Workflow Automation...
📋 Installing AutoDev commands...
🔧 Making scripts executable...
🔍 Checking dependencies...
✅ Node.js found: v18.x.x
✅ GitHub CLI found: gh version 2.x.x
✅ Git found: git version 2.x.x
✅ GitHub CLI authenticated
🔗 Setting up hooks...
🧪 Testing hook scripts...
🚀 Claude Code AutoDev session initialized
💡 Use "/autodev-spec <feature_description>" to start automated development workflow

✅ AutoDev Spec-Driven Development setup completed successfully!
```

---

## 🧪 **Step 4: Verify Installation**

### **4.1 Test Claude Code Integration**

**Start Claude Code:**
```bash
# Start Claude Code in your project directory
claude
```

**Test Basic Commands:**
```bash
# In Claude Code session
/help                    # Should show available commands
/status                  # Should show system status
```

### **4.2 Test AutoDev Commands**

**Test SDD Commands:**
```bash
# Test SDD workflow guide
/autodev-spec Test feature for verification

# Test project initialization
/autodev-init Test project for AutoDev verification
```

**Test Simple Mode Commands:**
```bash
# Test simple mode planning
/autodev-plan Simple test feature for verification
```

### **4.3 Verify File Structure**

**Check Directory Structure:**
```bash
# Verify AutoDev files are in place
ls -la .claude/

# Should show:
# commands/     (11 command files)
# templates/    (4 template files)  
# scripts/      (15+ script files)
# hooks/        (hooks configuration)
# specs/        (empty, for generated specs)
# state/        (empty, for workflow state)
```

### **4.4 Test GitHub Integration**

**Test GitHub CLI:**
```bash
# Test issue creation (in a GitHub repository)
gh issue create --title "AutoDev Setup Test" --body "Testing AutoDev setup"

# List issues to verify
gh issue list

# Close the test issue
gh issue close [issue-number]
```

---

## 🎛️ **Step 5: Configuration Customization**

### **5.1 Claude Code Configuration**

**Edit CLAUDE.md (if needed):**
```bash
# Edit project-specific Claude settings
code CLAUDE.md  # or your preferred editor
```

**Common customizations:**
- Project-specific coding standards
- Preferred technology stack
- Team workflow preferences
- Quality gates and requirements

### **5.2 Hook Configuration**

**Edit Hook Settings:**
```bash
# Edit hook configuration
code .claude/hooks/autodev-hooks.json
```

**Available customizations:**
- Hook execution timeouts
- Additional validation steps
- Custom script paths
- Environment-specific settings

### **5.3 Agent Prompt Customization**

**Edit Agent Prompts:**
```bash
# Customize agent behavior
code .claude/scripts/agent-prompts.js
```

**Customization options:**
- Agent-specific instructions
- Project context integration
- Technology stack preferences
- Quality standards and requirements

---

## 🚀 **Step 6: First Usage Test**

### **6.1 Complete SDD Workflow Test**

**Test Full SDD Cycle:**
```bash
# Start Claude Code in project directory
claude

# In Claude Code session:
/autodev-init Test E-commerce Platform
# Follow prompts and verify steering document creation

/autodev-requirements User authentication with JWT
# Verify requirements specification generation

/autodev-approve-spec requirements
# Review generated requirements

/autodev-approve-spec requirements approve "Good comprehensive requirements"
# Approve to proceed

/autodev-design
# Verify technical design generation

/autodev-approve-spec design approve
# Approve design to proceed

/autodev-tasks  
# Verify task breakdown generation

/autodev-approve-spec tasks approve
# Approve tasks

# DON'T RUN /autodev-execute for test - it will start actual implementation
```

### **6.2 Simple Mode Test**

**Test Simple Workflow:**
```bash
# In Claude Code session:
/autodev-plan Simple test authentication feature

/autodev-approve approve "Test approval"

# DON'T RUN /autodev-execute for test
```

### **6.3 Verify Generated Files**

**Check Generated Specifications:**
```bash
# Check for generated spec files
ls -la .claude/specs/

# Should contain:
# steering.md
# requirements-*.md
# design-*.md  
# tasks-*.md
```

**Check Workflow State:**
```bash
# Check workflow state files
ls -la .claude/state/

# Should contain:
# autodev-sdd.json
# session.json
```

---

## ✅ **Step 7: Setup Completion Checklist**

### **Required Software ✓**
- [ ] Claude Code installed and working
- [ ] Node.js v18+ installed
- [ ] GitHub CLI installed and authenticated
- [ ] Git installed and configured

### **AutoDev System ✓**  
- [ ] AutoDev files copied to project
- [ ] Setup script executed successfully
- [ ] All commands available in Claude Code
- [ ] Hook scripts executable
- [ ] File structure verified

### **GitHub Integration ✓**
- [ ] GitHub CLI authenticated
- [ ] Repository access confirmed
- [ ] Issue creation/management tested

### **Functionality Test ✓**
- [ ] SDD workflow commands working
- [ ] Simple mode commands working
- [ ] Specifications generated correctly
- [ ] Workflow state management working
- [ ] File generation in .claude/specs/

---

## 🔧 **Troubleshooting Common Setup Issues**

### **Claude Code Issues**

**Problem:** Claude Code command not found
**Solution:**
```bash
# Verify installation
which claude  # macOS/Linux
where claude  # Windows

# If not found, reinstall Claude Code and ensure PATH is set
```

**Problem:** Sub-agent support not available
**Solution:**
- Ensure you have the latest version of Claude Code
- Verify your Claude Code license supports Sub-Agents
- Contact Claude Code support if needed

### **Node.js Issues**

**Problem:** Node version too old
**Solution:**
```bash
# Check version
node --version

# Upgrade Node.js
# Windows: Download new installer
# macOS: brew upgrade node
# Linux: Follow Node.js installation guide for your distro
```

**Problem:** npm command not found
**Solution:**
- Reinstall Node.js ensuring npm is included
- Verify PATH configuration includes npm

### **GitHub CLI Issues**

**Problem:** gh command not found
**Solution:**
```bash
# Verify installation
which gh  # macOS/Linux
where gh  # Windows

# If not found, reinstall GitHub CLI
```

**Problem:** Authentication failed
**Solution:**
```bash
# Re-authenticate
gh auth logout
gh auth login

# Use personal access token if browser auth fails
gh auth login --with-token < your_token_file
```

### **Permission Issues**

**Problem:** Script execution failed (macOS/Linux)
**Solution:**
```bash
# Make scripts executable
chmod +x .claude/scripts/*.js
chmod +x .claude/setup-autodev.sh
```

**Problem:** Access denied (Windows)
**Solution:**
- Run Command Prompt as Administrator
- Check file permissions in .claude directory
- Verify antivirus isn't blocking scripts

### **Hook Execution Issues**

**Problem:** Hooks not executing
**Solution:**
```bash
# Verify hook configuration
cat .claude/hooks/autodev-hooks.json

# Test hook manually
echo '{"prompt": "test"}' | node .claude/scripts/session-init.js

# Check Claude Code hook settings
```

---

## 📚 **Next Steps**

After successful setup:

1. **Read Usage Guide:** `USAGE-MANUAL.md`
2. **Review System Architecture:** `DEVELOPMENT-ENVIRONMENT.md`
3. **Start First Project:** Try the SDD workflow with a simple feature
4. **Explore Advanced Features:** Custom agent prompts and hooks
5. **Join Community:** GitHub discussions and issue reporting

---

## 🆘 **Getting Help**

### **Documentation**
- **Usage Manual:** `USAGE-MANUAL.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`
- **API Reference:** `API-REFERENCE.md`

### **Support Channels**
- **GitHub Issues:** Report bugs and issues
- **GitHub Discussions:** Questions and community help
- **Claude Code Support:** Official Claude Code support channels

### **Common Resources**
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

**🎉 Congratulations!**

You now have a fully functional AutoDev Spec-Driven Development environment. You can start using both SDD mode for detailed development and Simple mode for rapid prototyping.

**📅 Document Version:** 1.0  
**📅 Last Updated:** January 8, 2025