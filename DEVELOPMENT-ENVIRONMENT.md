# AutoDev Development Environment Documentation

**AutoDev Spec-Driven Development System**  
**Version:** 2.0 (SDD Integration)  
**Last Updated:** 2025-01-08  
**Environment:** Windows 11 + Claude Code + Sub-Agents

## 🏗️ Development Environment Overview

### **System Architecture**
AutoDev は Claude Code をベースとした完全自動化開発システムで、Kiro 方式の Spec-Driven Development (SDD) と従来のシンプルモードの両方をサポートします。

### **Core Components**
- **Claude Code AI Platform** - Sub-Agent オーケストレーションとコード生成
- **AutoDev SDD Engine** - 仕様書駆動開発自動化システム  
- **GitHub Integration** - Issue管理とPR自動化
- **Document Templates** - 企業レベル仕様書テンプレート
- **Workflow Automation** - Hook ベース自動化スクリプト

---

## 🎯 **Available Development Modes**

### **1. Spec-Driven Development (SDD) Mode - 推奨**
企業レベルの品質管理とドキュメント生成を行う詳細開発モード

**特徴:**
- ✅ 永続的な仕様書生成 (requirements, design, tasks)
- ✅ 個別承認ゲート (要件→設計→タスク)
- ✅ 完全なトレーサビリティ
- ✅ チーム協業対応
- ✅ 長期保守性重視

**適用場面:**
- 本格的な機能開発
- チーム開発プロジェクト
- エンタープライズ開発
- 品質重視の開発

### **2. Simple Mode (Legacy) - 迅速開発**
従来の2フェーズワークフローを維持したシンプルモード

**特徴:**
- ✅ 高速プロトタイピング
- ✅ 単一承認ゲート
- ✅ 最小限ドキュメント
- ✅ 個人開発最適化

**適用場面:**
- プロトタイプ開発
- 個人プロジェクト
- 実験的機能開発
- 学習・検証目的

---

## 🔧 **System Requirements**

### **Required Software**
- **Claude Code** - AI 開発プラットフォーム (Sub-Agent サポート必須)
- **Node.js** v16+ - フックスクリプト実行環境
- **GitHub CLI (gh)** - Issue/PR自動化
- **Git** - バージョン管理

### **Optional Software**
- **Visual Studio Code** - 推奨エディタ
- **PowerShell** / **Bash** - スクリプト実行
- **Docker** - コンテナ化環境 (プロジェクトによる)

### **Platform Support**
- ✅ **Windows** - 完全サポート (メイン開発環境)
- ✅ **macOS** - 完全サポート  
- ✅ **Linux** - 完全サポート

---

## 📁 **Project File Structure**

```
vive_simple/                          # プロジェクトルート
├── CLAUDE.md                         # Claude Code 設定
├── DEVELOPMENT-ENVIRONMENT.md        # 本ドキュメント
│
├── .claude/                          # AutoDev システムファイル
│   ├── commands/                     # スラッシュコマンド定義
│   │   ├── autodev-spec.md          # SDD ワークフローガイド
│   │   ├── autodev-init.md          # プロジェクト初期化
│   │   ├── autodev-requirements.md  # 要件仕様作成
│   │   ├── autodev-design.md        # 技術設計作成
│   │   ├── autodev-tasks.md         # タスク分解
│   │   ├── autodev-approve-spec.md  # 仕様書承認
│   │   ├── autodev-plan.md          # シンプルモード計画
│   │   ├── autodev-approve.md       # シンプルモード承認
│   │   └── autodev-execute.md       # 実装実行
│   │
│   ├── templates/                    # 仕様書テンプレート
│   │   ├── steering.md              # プロジェクト指針テンプレート
│   │   ├── requirements.md          # 要件仕様テンプレート
│   │   ├── design.md                # 技術設計テンプレート
│   │   └── tasks.md                 # タスク分解テンプレート
│   │
│   ├── specs/                       # 生成される仕様書 (SDD)
│   │   ├── steering.md              # プロジェクト指針
│   │   ├── requirements-*.md        # 機能要件
│   │   ├── design-*.md              # 技術設計
│   │   └── tasks-*.md               # 実装タスク
│   │
│   ├── state/                       # ワークフロー状態管理
│   │   ├── autodev-sdd.json         # SDD ワークフロー状態
│   │   ├── autodev-workflow.json    # Simple モード状態
│   │   └── session.json             # セッション情報
│   │
│   ├── scripts/                     # 自動化スクリプト
│   │   ├── init-autodev-*.js        # 各フェーズ初期化
│   │   ├── process-*-approval.js    # 承認処理
│   │   ├── create-issues.js         # GitHub Issue作成
│   │   ├── validate-code.js         # コード品質チェック
│   │   ├── agent-prompts.js         # Sub-Agent プロンプト
│   │   └── ... (その他15個のスクリプト)
│   │
│   ├── hooks/                       # フック設定
│   │   └── autodev-hooks.json       # イベント駆動自動化設定
│   │
│   ├── setup-autodev.sh             # Unix/Mac セットアップ
│   ├── setup-autodev.bat            # Windows セットアップ
│   └── AUTODEV-README.md            # システム全体ドキュメント
│
└── [your-project-files...]          # 実際のプロジェクトファイル
```

---

## 🚀 **Available Commands Overview**

### **SDD Mode Commands**
```bash
/autodev-spec <feature>               # SDD ワークフロー開始・ガイド
/autodev-init <project_description>   # Phase 0: プロジェクト基盤
/autodev-requirements <feature>       # Phase 1A: 要件仕様作成
/autodev-design                       # Phase 1B: 技術設計作成  
/autodev-tasks                        # Phase 1C: タスク分解
/autodev-approve-spec <type> [action] # 個別仕様書承認・拒否
/autodev-execute                      # Phase 2: 自動実装実行
```

### **Simple Mode Commands (Legacy)**
```bash
/autodev-plan <feature>               # 従来の3-in-1計画
/autodev-approve [action]             # 一括承認・拒否
/autodev-execute                      # 実装実行
```

### **Workflow Control Commands**
```bash
/clear                                # 会話履歴クリア
/memory                               # メモリファイル編集
/status                               # システム状態確認
```

---

## 🔄 **Workflow States**

### **SDD Workflow States**
- **Phase 0:** `project_setup` - プロジェクト基盤構築
- **Phase 1A:** `requirements_spec` - 要件仕様作成・承認
- **Phase 1B:** `design_spec` - 技術設計作成・承認
- **Phase 1C:** `tasks_spec` - タスク分解・承認
- **Phase 2:** `implementation` - 自動実装実行

### **Simple Mode States**
- **Phase 1:** `planning` - 調査・計画・要件定義
- **Approval:** `awaiting_approval` - 人間承認待ち
- **Phase 2:** `execution` - 自動実装実行

### **Shared States**
- **Completed:** `completed` - 全工程完了
- **Error:** `error` - エラー状態
- **Paused:** `paused` - 一時停止

---

## 🛠️ **Sub-Agent Ecosystem**

### **SDD Specialized Agents**
- **steering-creator** - プロジェクト指針作成
- **requirements-analyst** - 要件仕様分析
- **technical-architect** - 技術設計専門
- **implementation-planner** - タスク分解専門

### **Implementation Agents (Shared)**
- **search-specialist** - コードベース調査
- **backend-architect** - バックエンド設計
- **frontend-developer** - フロントエンド開発
- **test-automator** - テスト自動化
- **debugger/error-detective** - デバッグ専門
- **deployment-engineer** - デプロイ・PR管理
- **docs-architect** - ドキュメント作成

### **Quality Assurance Agents**
- **code-reviewer** - コード品質レビュー
- **security-auditor** - セキュリティ監査
- **performance-engineer** - パフォーマンス最適化

---

## 📊 **Quality Gates & Standards**

### **SDD Quality Gates**
1. **Requirements Approval** - 要件仕様の完全性・明確性
2. **Design Approval** - 技術設計の妥当性・実装可能性
3. **Tasks Approval** - タスク分解の現実性・完全性
4. **Implementation Gates** - コード品質・テストカバレッジ

### **Code Quality Standards**
- **Linting** - ESLint/Prettier/言語固有リンター
- **Type Checking** - TypeScript/言語固有型チェック
- **Test Coverage** - 80%以上推奨
- **Security Scan** - 脆弱性スキャン

### **Documentation Standards**
- **API Documentation** - OpenAPI/Swagger仕様
- **Code Comments** - 複雑ロジックのみ
- **README Updates** - 機能追加時必須
- **Changelog** - バージョン管理

---

## 🔐 **Security & Best Practices**

### **Security Measures**
- ✅ シークレット・API キーの Git 除外
- ✅ 入力検証とサニタイゼーション
- ✅ HTTPS/TLS 強制
- ✅ 認証・認可の適切な実装
- ✅ セキュリティヘッダーの設定

### **Development Best Practices**
- ✅ 機能ブランチワークフロー
- ✅ Pull Request レビュー必須
- ✅ CI/CD パイプライン活用
- ✅ 自動テスト・品質チェック
- ✅ コード規約の統一

### **Data Protection**
- ✅ 個人情報の適切な処理
- ✅ GDPR/プライバシー法準拠
- ✅ データベース暗号化
- ✅ ログの機密情報除外

---

## 📈 **Performance & Monitoring**

### **Performance Targets**
- **API Response Time:** < 200ms (95th percentile)
- **Page Load Time:** < 3 seconds
- **Database Query:** < 100ms (average)
- **Build Time:** < 5 minutes
- **Test Execution:** < 2 minutes

### **Monitoring Stack**
- **Application Monitoring** - APM ツール統合
- **Error Tracking** - 例外・エラー追跡
- **Performance Monitoring** - レスポンス時間・スループット
- **Infrastructure Monitoring** - システムリソース監視
- **User Analytics** - ユーザー行動分析

---

## 🤝 **Team Collaboration**

### **Role-Based Access**
- **Product Owner** - 要件仕様承認権限
- **Tech Lead** - 技術設計承認権限
- **Developer** - 実装・コードレビュー
- **QA** - テスト・品質保証
- **DevOps** - デプロイ・インフラ管理

### **Communication Channels**
- **Slack/Teams** - 日常コミュニケーション
- **GitHub Issues** - タスク・バグ管理
- **Pull Requests** - コードレビュー
- **Documentation** - 仕様書・技術文書

---

## 🔧 **Troubleshooting Quick Reference**

### **Common Issues**
1. **GitHub CLI 未認証** → `gh auth login`
2. **Node.js バージョン不一致** → Node.js v16+ インストール
3. **Hook スクリプト実行エラー** → `chmod +x .claude/scripts/*.js`
4. **仕様書承認順序エラー** → requirements → design → tasks の順序遵守

### **Log Locations**
- **Workflow State:** `.claude/state/*.json`
- **Hook Execution:** Claude Code ログ
- **Script Errors:** Console 出力

---

## 📚 **Additional Resources**

### **Documentation**
- **Setup Guide:** `SETUP-GUIDE.md`
- **Usage Manual:** `USAGE-MANUAL.md`
- **API Reference:** `API-REFERENCE.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`

### **External Links**
- [Claude Code Official Docs](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Node.js Downloads](https://nodejs.org/)

---

**📞 Support Contact:**
- **Issues:** GitHub Issues in this repository
- **Questions:** See troubleshooting guide first
- **Feature Requests:** GitHub Discussions

**📅 Last Updated:** January 8, 2025  
**📋 Document Version:** 1.0