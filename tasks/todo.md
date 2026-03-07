# Step 1: プロジェクト基盤の構築

## タスク一覧

- [x] Next.jsプロジェクトの初期化（App Router, TypeScript, Tailwind CSS）
- [x] shadcn/uiの導入と基本コンポーネントのインストール
- [x] トップページのベース作成（ヒーローセクション、ナビゲーション）
- [x] 開発サーバーで動作確認
- [x] Git初期コミット

---

## 完了後レビュー

### 実装内容

1. **Next.js 16.1.6 プロジェクト**
   - App Router + TypeScript + Tailwind CSS v4
   - ESLint設定済み

2. **shadcn/ui コンポーネント**
   - Button, Card, Input, Sheet を導入
   - Base UI ベースの最新版（asChild非対応のためLinkButton作成）

3. **レイアウト構成**
   - [Header.tsx](src/components/layout/Header.tsx) - レスポンシブナビゲーション
   - [Footer.tsx](src/components/layout/Footer.tsx) - 情報ポリシー表示

4. **トップページ** ([page.tsx](src/app/page.tsx))
   - ヒーローセクション（キーメッセージ + CTA）
   - 対象製品6社のリスト
   - 機能紹介カード（スペック比較、生の声、AIチャット）
   - 情報ポリシーセクション
   - 最終CTAセクション

---

# Step 2: 製品データの準備と比較画面の構築

## タスク一覧

- [x] Excelファイルの読み取りとデータ構造化
- [x] TypeScript型定義と製品データの作成
- [x] 比較ページのルーティング追加
- [x] 製品一覧・比較画面の基本UI実装
- [x] 動作確認とGitコミット

---

## 完了後レビュー

### 実装内容

1. **データ構造化**
   - [types.ts](src/lib/types.ts) - TypeScript型定義
     - `ProductSpecs`: Layer 1（公式スペック30+項目）
     - `ProductCommunity`: Layer 2（コミュニティ評価7項目）
     - `Product`: 統合型（Layer 1 + Layer 2）
     - `FilterCriteria`: フィルター条件型
   - [products.ts](src/lib/products.ts) - 6社製品データ
     - シャープ ホットクック KN-HW24H
     - パナソニック オートクッカー ビストロ NF-AC1000
     - ティファール ラクラ・クッカー プロ CY3811J0
     - アイリスオーヤマ シェフドラム KDAC-IA2
     - シロカ おうちシェフPRO L SP-5D151
     - 象印 STAN. 自動調理なべ EL-KA23

2. **比較画面** ([/compare](src/app/compare/page.tsx))
   - カード表示 / テーブル表示の切り替えUI（Tabs）
   - [ProductCard.tsx](src/components/products/ProductCard.tsx)
     - 主要スペック（価格、容量、機能バッジ）
     - Layer 2評価（コミュニティ、購入後サポート）
   - [FilterSidebar.tsx](src/components/products/FilterSidebar.tsx)
     - 予算、容量、必須機能、メーカーのフィルターUI
     - ※ロジックは次ステップで実装

3. **追加コンポーネント**
   - shadcn/ui: Table, Badge, Select, Checkbox, Tabs

### データソース

- `doc/電気調理鍋_6社カタログ比較.xlsx` (Layer 1)
- `doc/電気調理鍋_第2層データ_SNSコミュニティ調査.xlsx` (Layer 2)

### 動作確認

- `npm run build` ✅ 成功（/, /compare 両方生成）
- `/compare` ページで6製品がカード・テーブル両表示で確認可能

### 次のステップ

- フィルタリングロジックの実装
- 製品詳細ページの作成
- AIチャット画面の実装
