@echo off
REM AutoDev Setup Script for Windows
REM Sets up the complete automated development workflow system

echo 🚀 Setting up AutoDev Workflow Automation...

REM Create necessary directories
if not exist "%USERPROFILE%\.claude\commands" mkdir "%USERPROFILE%\.claude\commands"
if not exist "%USERPROFILE%\.claude\hooks" mkdir "%USERPROFILE%\.claude\hooks"
if not exist "%USERPROFILE%\.claude\state" mkdir "%USERPROFILE%\.claude\state"

REM Copy commands
echo 📋 Installing AutoDev commands...
REM SDD Commands
copy ".claude\commands\autodev-spec.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-init.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-requirements.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-design.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-tasks.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-approve-spec.md" "%USERPROFILE%\.claude\commands\"

REM Legacy Simple Mode Commands
copy ".claude\commands\autodev-plan.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-execute.md" "%USERPROFILE%\.claude\commands\"
copy ".claude\commands\autodev-approve.md" "%USERPROFILE%\.claude\commands\"

echo 🔍 Checking dependencies...

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is required but not installed
    echo    Please install Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM Check GitHub CLI
gh --version >nul 2>&1
if errorlevel 1 (
    echo ❌ GitHub CLI is required but not installed
    echo    Please install gh: https://cli.github.com/
    pause
    exit /b 1
)

REM Check git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is required but not installed
    pause
    exit /b 1
)

REM Check GitHub CLI authentication
gh auth status >nul 2>&1
if errorlevel 1 (
    echo ⚠️  GitHub CLI is not authenticated
    echo    Please run: gh auth login
    echo    Then re-run this setup script
    pause
    exit /b 1
)

REM Setup hooks configuration
echo 🔗 Setting up hooks...
set HOOKS_FILE=%USERPROFILE%\.claude\hooks.json

if exist "%HOOKS_FILE%" (
    echo ⚠️  Existing hooks configuration found
    echo    Backing up to hooks.json.backup
    copy "%HOOKS_FILE%" "%HOOKS_FILE%.backup"
)

REM Copy hooks
copy ".claude\hooks\autodev-hooks.json" "%HOOKS_FILE%"

REM Test scripts
echo 🧪 Testing hook scripts...
echo {"prompt": "test"} | node .claude\scripts\session-init.js

echo ✅ AutoDev Spec-Driven Development setup completed successfully!
echo.
echo 🎯 SDD (Spec-Driven Development) - Recommended:
echo    /autodev-spec ^<feature_description^>   # SDD workflow guide
echo    /autodev-init ^<project_description^>   # Project steering (optional)
echo    /autodev-requirements ^<feature^>       # Requirements specification
echo    /autodev-approve-spec requirements    # Approve requirements
echo    /autodev-design                       # Technical design
echo    /autodev-approve-spec design          # Approve design
echo    /autodev-tasks                        # Implementation tasks
echo    /autodev-approve-spec tasks           # Approve tasks
echo    /autodev-execute                      # Begin implementation
echo.
echo 🏃 Simple Mode (Legacy):
echo    /autodev-plan ^<feature_description^>   # Traditional planning
echo    /autodev-approve [approve^|reject]     # Single approval gate
echo    /autodev-execute                      # Implementation
echo.
echo 📖 SDD Example:
echo    /autodev-init E-commerce platform with React
echo    /autodev-requirements User authentication with JWT
echo    /autodev-approve-spec requirements approve
echo    /autodev-design
echo    /autodev-approve-spec design approve
echo    /autodev-tasks
echo    /autodev-approve-spec tasks approve
echo    /autodev-execute
echo.
echo 📚 See AUTODEV-README.md for complete SDD workflow documentation

pause