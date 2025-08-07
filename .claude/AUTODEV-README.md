# AutoDev: Spec-Driven Development Automation

完全仕様書ベース開発ワークフローシステム - Sub-AgentsとKiro方式を統合したSDD自動実行

## Overview

AutoDevは、詳細な仕様書作成から実装まで、Spec-Driven Development (SDD) を完全自動化するシステムです。Kiro方式の仕様書ベース開発を Claude Code で実現し、個別承認ゲートによる品質管理を提供します。

## Development Mode Options

AutoDev provides two development approaches:

### 🎯 **Spec-Driven Development (SDD) - Recommended**
Kiro方式の詳細仕様書ベース開発 - 企業レベルの品質管理

### 🏃 **Simple Mode**  
従来の2フェーズワークフロー - 迅速な開発とプロトタイピング

---

## Spec-Driven Development (SDD) Workflow

### 🏛️ **Phase 0: Project Setup**
**プロジェクト基盤構築**
- **Project Steering Document** (steering-creator) ← 自動実行
- プロジェクト方針・技術方向・品質基準の確立
- 全開発作業の指針となる基盤文書作成

### 📋 **Phase 1: Specification Development**
**詳細仕様書作成** - 個別承認ゲート付き

**1A. Requirements Specification**
- **Requirements Analysis** (requirements-analyst) ← 自動実行
- 機能要件・非機能要件・ビジネスルール定義
- **個別承認:** `/autodev-approve-spec requirements` ← あなたの判断

**1B. Technical Design**
- **Architecture & Design** (technical-architect) ← 自動実行
- システム設計・API仕様・データベース設計
- **個別承認:** `/autodev-approve-spec design` ← あなたの判断

**1C. Implementation Tasks**
- **Task Breakdown** (implementation-planner) ← 自動実行
- 30-50個の詳細実装タスク・工数見積・依存関係
- **個別承認:** `/autodev-approve-spec tasks` ← あなたの判断

### 🚀 **Phase 2: Implementation (完全自動)**
**承認済み仕様書ベースの自動実装**
1. **GitHub Issues作成** - 承認済みタスクから自動生成
2. **設計** (backend-architect/frontend-developer) ← 自動実行
3. **実装** (language-specific specialists) ← 自動実行
4. **テスト** (test-automator) ← 自動実行
5. **DBG** (debugger/error-detective) ← 自動実行
6. **PR** (deployment-engineer) ← 自動実行
7. **デプロイ** (deployment-engineer) ← 自動実行
8. **ドキュメント更新** (docs-architect) ← 自動実行
9. **Follow-up Issues** (自動作成) ← 自動実行

---

## Simple Mode Workflow (Legacy)

### 🟡 Phase 1: Planning (一括承認)
1. **やりたいことを決める** (Human) ← あなたの入力
2. **調査** (search-specialist) ← 自動実行
3. **計画を立てる** (architect-reviewer) ← 自動実行  
4. **要件定義** (business-analyst) ← 自動実行
→ **📋 一括レビュー & 承認** ← あなたの判断

### 🟢 Phase 2: Implementation (完全自動)  
5-11. **設計→実装→テスト→DBG→PR→デプロイ→ドキュメント** ← 自動実行

## Quick Start

### 1. Setup

```bash
# Make scripts executable (Unix/Mac)
chmod +x .claude/scripts/*.js

# Install GitHub CLI if not installed
# https://cli.github.com/

# Authenticate GitHub CLI
gh auth login
```

### 2. Configuration

Claude Codeの設定に以下を追加:

```bash
# Hooks configuration
cp .claude/hooks/autodev-hooks.json ~/.claude/hooks/
```

### 3. Usage

## SDD (Spec-Driven Development) - Recommended

### Full SDD Workflow
```bash
# Phase 0: Project Setup (Recommended)
/autodev-init E-commerce platform with React frontend

# Phase 1A: Requirements Specification
/autodev-requirements User authentication with JWT tokens
/autodev-approve-spec requirements approve

# Phase 1B: Technical Design  
/autodev-design
/autodev-approve-spec design approve

# Phase 1C: Implementation Tasks
/autodev-tasks
/autodev-approve-spec tasks approve

# Phase 2: Implementation
/autodev-execute
```

### SDD Entry Points
```bash
# Main SDD entry point - guides through workflow
/autodev-spec Add user authentication with JWT tokens

# Individual phase commands
/autodev-init <project_description>           # Project steering
/autodev-requirements <feature_description>    # Requirements spec
/autodev-design                               # Technical design
/autodev-tasks                                # Task breakdown
/autodev-approve-spec <type> [approve|reject] # Individual approvals
/autodev-execute                              # Implementation
```

## Simple Mode (Legacy)

### Traditional 2-Phase Workflow
```bash
# Phase 1: Planning (一括)
/autodev-plan Add user authentication with JWT tokens
/autodev-approve approve            # Single approval gate

# Phase 2: Implementation
/autodev-execute
```

## Complete Examples

### SDD Example (Detailed)
```bash
# 1. Project setup
/autodev-init E-commerce platform with modern stack

# 2. Feature requirements
/autodev-requirements User authentication with JWT, OAuth, 2FA
# → Creates detailed requirements.md with user stories, acceptance criteria

# 3. Review & approve requirements
/autodev-approve-spec requirements
/autodev-approve-spec requirements approve "Comprehensive, ready for design"

# 4. Technical design
/autodev-design
# → Creates technical design.md with API specs, database schema, architecture

# 5. Review & approve design  
/autodev-approve-spec design approve "Solid architecture, good security design"

# 6. Implementation tasks
/autodev-tasks
# → Creates tasks.md with 30-50 specific implementation tasks

# 7. Review & approve tasks
/autodev-approve-spec tasks approve "Detailed breakdown, realistic estimates"

# 8. Begin implementation
/autodev-execute
# → Creates GitHub issues, implements all features automatically
```

### Simple Mode Example (Quick)
```bash
# 1. Quick planning
/autodev-plan User authentication with JWT tokens
# → Combined research, planning, requirements in one step

# 2. Single approval
/autodev-approve approve "Good plan, proceed with implementation"

# 3. Implementation
/autodev-execute
# → Implements feature with minimal documentation
```

## Sub-Agent Specialization

各ステップで最適化されたSub-Agentが自動選択されます:

### 🔍 Research Phase (search-specialist)
- 既存コードベースの分析
- 依存関係とライブラリの調査
- 実装パターンの特定
- 技術的リスクの評価

### 📋 Planning Phase (architect-reviewer)
- タスク分解とGitHub Issues作成
- 技術要件の定義
- 実装順序の計画
- リソース見積もり

### 📊 Requirements Phase (business-analyst)
- 機能要件と非機能要件の定義
- ユーザーストーリー作成
- ビジネスルールの文書化
- エッジケースの特定

### 🏗️ Design Phase (backend-architect/frontend-developer)
- システムアーキテクチャ設計
- データベーススキーマ設計
- API仕様書作成
- UI/UXデザイン

### 💻 Implementation Phase (専門開発Agent)
- バックエンドAPI実装
- フロントエンドUI実装
- データベース変更
- 既存システムとの統合

### 🧪 Testing Phase (test-automator)
- 単体テスト作成
- 統合テスト実装
- E2Eテストシナリオ
- パフォーマンステスト

### 🐛 Debug Phase (debugger/error-detective)
- バグ発見と分類
- 根本原因分析
- 修正実装
- リグレッションテスト

### 🚀 Deployment Phase (deployment-engineer)
- Git commit/PR作成
- CI/CDパイプライン設定
- デプロイメント準備
- 本番環境へのリリース

### 📝 Documentation Phase (docs-architect)
- API文書更新
- ユーザーガイド作成
- 技術文書更新
- トラブルシューティングガイド

## Issue Automation

2フェーズシステムで、適切なタイミングでGitHub Issuesが自動作成されます:

### Phase 1: Planning (No Issues Created)
Phase 1では**Issues作成なし**。人間承認後にまとめて作成。

### Phase 2 Start: Epic & Task Creation
承認後の実装フェーズ開始時:
```bash
✅ Epic issue created: Epic: Add user authentication
✅ Task created: Backend API: User authentication
✅ Task created: Frontend UI: Login components
✅ Task created: Database: User schema and migrations
✅ Task created: Testing: Authentication test suite
```

### Phase 2 Progress: Bug Tracking (必要時)
テスト完了後、バグが見つかった場合:
```bash
✅ Bug tracking issue created: Bug Tracking: User authentication
```

### Phase 2 Complete: Follow-up Issues
実装完了後の継続的改善:
```bash
✅ Follow-up created: Enhancement: Authentication performance optimization
✅ Follow-up created: Enhancement: User analytics and monitoring
✅ Follow-up created: Technical Debt: Authentication code refactoring
```

## Monitoring & Progress Tracking

### Phase 1 Progress
```bash
🚀 AutoDev Phase 1 initialized: "Add user authentication"
🤖 Launching search-specialist for Step 2: 調査
📊 Phase 1 Progress: 2/4 steps completed
⏭️  Next: Step 3 - 計画を立てる (architect-reviewer)
🎉 Phase 1 completed: 調査 → 計画 → 要件定義
⏸️  Waiting for human approval...
```

### Approval Gate
```bash
📋 AutoDev Planning Results for Review
🎯 Feature: Add user authentication
📊 Phase: awaiting_approval
✅ Phase 1 Progress: 4/4 steps completed
📝 Use /autodev-approve to review and approve/reject
```

### Phase 2 Progress
```bash
✅ Planning approved: "Add user authentication"
🚀 AutoDev Phase 2 starting...
📋 Creating GitHub Issues for task tracking...
🤖 Launching backend-architect for Step 5: 設計
📊 Phase 2 Progress: 2/7 steps completed
```

### 2-Phase Workflow State
```json
{
  "feature": "Add user authentication",
  "phase": "executing",
  "currentStep": 6,
  "steps": {
    "phase1": [{"id": 1, "status": "completed"}, ...],
    "phase2": [{"id": 5, "status": "in_progress"}, ...]
  },
  "approval": {
    "status": "approved",
    "approvedAt": "2025-01-01T12:00:00Z"
  },
  "issues": {
    "epic": "123",
    "tasks": ["124", "125", "126"],
    "bugs": [],
    "followups": []
  }
}
```

## Configuration Files

### `.claude/commands/` - Slash Commands
**SDD (Spec-Driven Development) Commands:**
- `autodev-spec.md` - SDD ワークフローガイド
- `autodev-init.md` - Phase 0: Project steering document
- `autodev-requirements.md` - Phase 1A: Requirements specification
- `autodev-design.md` - Phase 1B: Technical design
- `autodev-tasks.md` - Phase 1C: Implementation tasks
- `autodev-approve-spec.md` - Individual spec approval

**Legacy Simple Mode Commands:**
- `autodev-plan.md` - Simple planning (3-in-1)
- `autodev-approve.md` - Simple approval gate
- `autodev-execute.md` - Implementation phase

### `.claude/templates/` - Document Templates
- `steering.md` - Project steering document template
- `requirements.md` - Requirements specification template  
- `design.md` - Technical design specification template
- `tasks.md` - Implementation tasks template

### `.claude/specs/` - Generated Specifications
```
.claude/specs/
├── steering.md                    # Project direction & principles
├── requirements-[feature].md      # Feature requirements
├── design-[feature].md           # Technical architecture
└── tasks-[feature].md            # Implementation roadmap
```

### `.claude/hooks/autodev-hooks.json`
SDD + Legacy対応Hook設定とSub-Agent調整

### `.claude/scripts/` - Automation Scripts
**SDD Workflow Scripts:**
- `init-autodev-init.js` - Phase 0 steering initialization
- `init-autodev-requirements.js` - Phase 1A requirements initialization
- `init-autodev-design.js` - Phase 1B design initialization  
- `init-autodev-tasks.js` - Phase 1C tasks initialization
- `init-autodev-spec.js` - SDD workflow guidance
- `process-spec-approval.js` - Individual spec approval handling

**Legacy Scripts:**
- `init-autodev-plan.js` - Simple planning initialization
- `init-autodev-execute.js` - Implementation phase initialization
- `process-approval.js` - Simple approval handling

**Shared Infrastructure:**
- `pre-agent-launch.js` - Agent coordination (SDD + Legacy対応)
- `post-agent-complete.js` - Agent completion handling (SDD + Legacy対応)
- `create-issues.js` - GitHub Issues creation
- `validate-code.js` - Code quality validation
- `track-progress.js` - Progress tracking
- `workflow-checkpoint.js` - Workflow checkpoints
- `session-init.js` - Session initialization
- `agent-prompts.js` - Agent prompts (SDD + Legacy prompts)

## Advanced Usage

### Phase Control & Resume
```bash
# Phase 1完了状態の確認
/autodev-approve                         # 計画結果の確認

# 承認処理の詳細
/autodev-approve approve Great plan!     # 承認コメント付き
/autodev-approve reject Need more DB optimization  # 拒否フィードback

# Phase 2の状態確認（実行中の場合）
cat .claude/state/autodev-workflow.json | grep -E "phase|currentStep"
```

### Planning Revision Workflow
```bash
# 1. 初回計画
/autodev-plan Add user authentication

# 2. 計画を拒否してフィードバック
/autodev-approve reject Need OAuth integration analysis

# 3. 修正された計画を自動再実行
# （フィードバックを考慮してAgent達が再実行）

# 4. 修正結果を再承認
/autodev-approve approve
```

### Custom Agent Prompts
```javascript
// .claude/scripts/agent-prompts.js でPromptカスタマイズ
AGENT_PROMPTS['search-specialist'] = (feature, context) => `
  Phase 1 Research Mission for ${feature}
  Additional context: ${JSON.stringify(context)}
  Custom research requirements...
`;
```

### Environment Variables
```bash
export AUTODEV_VALIDATE_WITH_TESTS=true  # Phase 2でテストも含めて検証
export AUTODEV_CREATE_DRAFT_PR=true      # ドラフトPRを作成
export AUTODEV_REQUIRE_APPROVAL_COMMENT=true  # 承認時コメント必須
```

## Requirements

- **Claude Code** with Sub-Agent support
- **GitHub CLI** (`gh`) for issue automation
- **Node.js** for hook scripts
- **Git** repository with issues enabled

## Troubleshooting

### Common Issues

1. **GitHub CLI not authenticated**
```bash
gh auth login
```

2. **Scripts not executable**
```bash
chmod +x .claude/scripts/*.js
```

3. **Workflow state corrupted**
```bash
rm .claude/state/autodev-workflow.json
# Restart with /autodev command
```

### Debug Mode
```bash
# Enable detailed logging
export AUTODEV_DEBUG=true
```

## Examples

### Web Application Feature
```bash
/autodev Add user profile management with avatar upload
```

### API Development
```bash
/autodev Implement RESTful API for inventory management
```

### Database Feature
```bash
/autodev Add full-text search with Elasticsearch integration
```

### UI Component
```bash
/autodev Create reusable data table component with sorting and filtering
```

## Success Metrics

AutoDevの成功は以下で測定されます:

- ✅ **全11ステップの自動完了**
- ✅ **適切なGitHub Issues作成とリンク**
- ✅ **コード品質基準の遵守**
- ✅ **テストカバレッジの達成**
- ✅ **成功した本番デプロイ**
- ✅ **完全な文書化**

## Contributing

AutoDevシステムの改善:

1. Agent Promptsの最適化
2. 新しいSub-Agent Specialistsの追加
3. Issue templateの改良
4. Hook logiｃの拡張

---

🤖 **AutoDev by Claude Code** - Sub-Agentsによる完全自動化開発ワークフロー