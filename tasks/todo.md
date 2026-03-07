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

2. **比較画面** ([/compare](src/app/compare/page.tsx))
   - カード表示 / テーブル表示の切り替えUI（Tabs）
   - ProductCard, FilterSidebar コンポーネント

3. **追加コンポーネント**
   - shadcn/ui: Table, Badge, Select, Checkbox, Tabs

---

# Step 3: フィルタリング・製品詳細・AIチャットの実装

## タスク一覧

- [x] フィルタリングロジックの実装
- [x] 製品詳細ページの作成 (/products/[id])
- [x] AIチャット画面の実装 (/chat)
- [x] 動作確認とGitコミット

---

## 完了後レビュー

### 実装内容

1. **フィルタリング機能**
   - [useProductFilter.ts](src/hooks/useProductFilter.ts) - カスタムフック
     - 予算（上限・下限）
     - 調理容量
     - 必須機能（圧力、かきまぜ、Wi-Fi、食洗機）
     - メーカー選択
   - [ComparePageContent.tsx](src/components/products/ComparePageContent.tsx) - フィルター統合
   - 空状態UI対応（条件に一致する製品がない場合）

2. **製品詳細ページ** ([/products/[id]](src/app/products/[id]/page.tsx))
   - Layer 1: 全スペック表示
     - 基本情報、容量・サイズ、調理機能
     - メニュー・レシピ、便利機能、電源
     - 独自特徴
   - Layer 2: コミュニティ評価
     - 公式コミュニティ、SNS活発度、インスタ映え度
     - お手入れ評判、購入後サポート
   - 総合コメント、ターゲットユーザー、データ出典
   - SSG対応（generateStaticParams）

3. **AIチャット機能** ([/chat](src/app/chat/page.tsx))
   - [chat-prompt.ts](src/lib/chat-prompt.ts) - システムプロンプト生成
     - 6社製品データをコンテキストに含む
     - 中立的なアドバイザー設定
     - 出典明記ルール
   - [/api/chat/route.ts](src/app/api/chat/route.ts) - APIルート
     - Vercel AI SDK + Claude API
     - ストリーミング応答
   - [ChatPageContent.tsx](src/components/chat/ChatPageContent.tsx)
     - メッセージUI（ユーザー/AI）
     - 例の質問クリックで入力
     - ローディング・エラー表示

### 環境変数

```
ANTHROPIC_API_KEY=your_api_key_here
```

`.env.example` に記載

### 動作確認

- `npm run build` ✅ 成功
  - `/` - トップページ
  - `/compare` - 比較ページ（フィルタリング付き）
  - `/chat` - AIチャット
  - `/products/[id]` - 製品詳細（6ページ）
  - `/api/chat` - APIルート

### ページ一覧

| パス | 種別 | 説明 |
|------|------|------|
| / | Static | トップページ |
| /compare | Static | 製品比較（フィルタリング） |
| /chat | Static | AIチャット |
| /products/[id] | SSG | 製品詳細（6製品） |
| /api/chat | Dynamic | チャットAPI |

---

# Step 4: 品質チェックとデプロイ準備

## タスク一覧

- [x] UXとレスポンシブデザインの最終確認
- [x] OGPタグとメタ情報の設定
- [x] 製品詳細ページにOGPタグを追加
- [x] npm run buildでビルド確認
- [x] README.mdにVercelデプロイ手順を追記
- [x] 最終報告

---

## 完了後レビュー

### 実装内容

1. **レスポンシブデザイン確認**
   - 全ページでモバイル〜PCまでのレスポンシブ対応を確認
   - Header: モバイルメニュー (Sheet) / デスクトップナビゲーション
   - 各ページ: `sm:`, `md:`, `lg:`, `xl:` ブレークポイントを使用

2. **OGPタグ・メタ情報の強化**
   - [layout.tsx](src/app/layout.tsx) - グローバルメタ情報
     - `title.template` でページ別タイトル対応
     - Twitter Card (`summary_large_image`)
     - `robots` 設定
   - [/compare](src/app/compare/page.tsx) - OGPタグ追加
   - [/chat](src/app/chat/page.tsx) - OGPタグ追加
   - [/products/[id]](src/app/products/[id]/page.tsx) - 動的OGP生成

3. **不足ページの追加**
   - [/about](src/app/about/page.tsx) - 「このサイトについて」ページ
     - 情報ポリシー説明
     - 比較対象製品一覧
     - CTA（比較・AIチャット）

4. **README.md更新**
   - プロジェクト概要、技術スタック
   - ローカル開発手順
   - **Vercelデプロイ手順**（環境変数 `ANTHROPIC_API_KEY` の設定方法を明記）
   - プロジェクト構成図

### ビルド結果

```
npm run build ✅ 成功

Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/chat
├ ○ /chat
├ ○ /compare
└ ● /products/[id] (6製品)
```

### ページ一覧（最終）

| パス | 種別 | 説明 |
|------|------|------|
| / | Static | トップページ |
| /compare | Static | 製品比較（フィルタリング） |
| /chat | Static | AIチャット |
| /products/[id] | SSG | 製品詳細（6製品） |
| /about | Static | このサイトについて |
| /api/chat | Dynamic | チャットAPI |

---

## デプロイ準備完了

**次のステップ（ユーザー側）:**
1. GitHubリポジトリを作成してコードをpush
2. VercelでGitHubリポジトリをインポート
3. 環境変数 `ANTHROPIC_API_KEY` を設定
4. デプロイ実行

---

## 今後の拡張可能性

- 製品画像の追加
- ユーザーフィードバック収集
- 実売価格の自動更新
- Google Analytics導入
- 独自ドメイン取得
