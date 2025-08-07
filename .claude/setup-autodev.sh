#!/bin/bash

# AutoDev Setup Script
# Sets up the complete automated development workflow system

echo "🚀 Setting up AutoDev Workflow Automation..."

# Create necessary directories
mkdir -p ~/.claude/commands ~/.claude/hooks ~/.claude/state

# Copy commands
echo "📋 Installing AutoDev commands..."
# SDD Commands
cp .claude/commands/autodev-spec.md ~/.claude/commands/
cp .claude/commands/autodev-init.md ~/.claude/commands/
cp .claude/commands/autodev-requirements.md ~/.claude/commands/
cp .claude/commands/autodev-design.md ~/.claude/commands/
cp .claude/commands/autodev-tasks.md ~/.claude/commands/
cp .claude/commands/autodev-approve-spec.md ~/.claude/commands/

# Legacy Simple Mode Commands  
cp .claude/commands/autodev-plan.md ~/.claude/commands/
cp .claude/commands/autodev-execute.md ~/.claude/commands/
cp .claude/commands/autodev-approve.md ~/.claude/commands/

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x .claude/scripts/*.js

# Check dependencies
echo "🔍 Checking dependencies..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    echo "   Please install Node.js: https://nodejs.org/"
    exit 1
fi

# Check GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI is required but not installed"
    echo "   Please install gh: https://cli.github.com/"
    exit 1
fi

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ Git is required but not installed"
    exit 1
fi

# Check GitHub CLI authentication
if ! gh auth status &> /dev/null; then
    echo "⚠️  GitHub CLI is not authenticated"
    echo "   Please run: gh auth login"
    echo "   Then re-run this setup script"
    exit 1
fi

# Merge hooks configuration
echo "🔗 Setting up hooks..."
HOOKS_FILE=~/.claude/hooks.json

if [ -f "$HOOKS_FILE" ]; then
    echo "⚠️  Existing hooks configuration found"
    echo "   Backing up to hooks.json.backup"
    cp "$HOOKS_FILE" "$HOOKS_FILE.backup"
fi

# Copy or merge hooks
cp .claude/hooks/autodev-hooks.json "$HOOKS_FILE"

# Test scripts
echo "🧪 Testing hook scripts..."
echo '{"prompt": "test"}' | node .claude/scripts/session-init.js

echo "✅ AutoDev Spec-Driven Development setup completed successfully!"
echo ""
echo "🎯 SDD (Spec-Driven Development) - Recommended:"
echo "   /autodev-spec <feature_description>   # SDD workflow guide"
echo "   /autodev-init <project_description>   # Project steering (optional)"
echo "   /autodev-requirements <feature>       # Requirements specification"
echo "   /autodev-approve-spec requirements    # Approve requirements"
echo "   /autodev-design                       # Technical design"
echo "   /autodev-approve-spec design          # Approve design"
echo "   /autodev-tasks                        # Implementation tasks"
echo "   /autodev-approve-spec tasks           # Approve tasks"
echo "   /autodev-execute                      # Begin implementation"
echo ""
echo "🏃 Simple Mode (Legacy):"
echo "   /autodev-plan <feature_description>   # Traditional planning"
echo "   /autodev-approve [approve|reject]     # Single approval gate"
echo "   /autodev-execute                      # Implementation"
echo ""
echo "📖 SDD Example:"
echo "   /autodev-init E-commerce platform with React"
echo "   /autodev-requirements User authentication with JWT"
echo "   /autodev-approve-spec requirements approve"
echo "   /autodev-design"
echo "   /autodev-approve-spec design approve"
echo "   /autodev-tasks"
echo "   /autodev-approve-spec tasks approve"
echo "   /autodev-execute"
echo ""
echo "📚 See AUTODEV-README.md for complete SDD workflow documentation"