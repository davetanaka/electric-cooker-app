# 電気調理鍋 比較ガイド

電気調理鍋6社（ホットクック、ビストロ、クックフォーミー等）を横断比較するWebアプリケーションです。

**カタログに載っていない情報も含めた、消費者のための横断比較**

## 特徴

- **アフィリエイトなし**: 購入リンクや広告は一切掲載しません
- **Layer 1 + Layer 2 比較**: 公式スペックだけでなく、SNS・コミュニティの評判も掲載
- **AIチャット相談**: 「3人家族で圧力必須」のような自然言語で相談可能
- **レスポンシブ対応**: スマートフォンからPCまで快適に閲覧

## 比較対象製品

| メーカー | 製品名 |
|---------|--------|
| シャープ | ヘルシオ ホットクック KN-HW24H |
| パナソニック | ビストロ NF-AC1000 |
| ティファール | ラクラ・クッカー プロ CY3811JP |
| アイリスオーヤマ | ヘルシープラス KPC-MA2 |
| シロカ | おうちシェフ PRO SP-2DP251 |
| 象印 | STAN. EL-KA23 |

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui (Base UI)
- **AI機能**: Claude API (Anthropic) + Vercel AI SDK
- **デプロイ**: Vercel

## ローカル開発

### 必要条件

- Node.js 18以上
- npm または yarn

### セットアップ

```bash
# 依存パッケージをインストール
npm install

# 環境変数を設定（.env.example をコピー）
cp .env.example .env.local

# 開発サーバーを起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

### 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Claude API キー（AIチャット機能用） | チャット機能を使う場合は必須 |

## ページ構成

| パス | 説明 | 種別 |
|------|------|------|
| `/` | トップページ | Static |
| `/compare` | 製品比較（フィルタリング機能付き） | Static |
| `/chat` | AIチャット相談 | Static |
| `/products/[id]` | 製品詳細ページ（6製品） | SSG |
| `/about` | このサイトについて | Static |
| `/api/chat` | チャットAPI | Dynamic |

## Vercel へのデプロイ

### 1. GitHubリポジトリを用意

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Vercel と連携

1. [Vercel](https://vercel.com) にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを選択してインポート
4. フレームワークは自動検出されます（Next.js）

### 3. 環境変数を設定

Vercelダッシュボードで以下の環境変数を設定してください：

| 変数名 | 値 |
|--------|-----|
| `ANTHROPIC_API_KEY` | Anthropic から取得したAPIキー |

**設定手順:**
1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Environment Variables」に移動
3. `ANTHROPIC_API_KEY` を追加
4. 「Redeploy」を実行

> **注意**: APIキーは機密情報です。GitHubにコミットしないでください。

### 4. デプロイ

環境変数を設定後、「Deploy」ボタンをクリックするか、mainブランチにpushするとデプロイが開始されます。

## ビルドコマンド

```bash
# 本番ビルド
npm run build

# ビルド結果を確認
npm run start

# リント
npm run lint
```

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/chat/          # AIチャットAPIルート
│   ├── chat/              # チャットページ
│   ├── compare/           # 比較ページ
│   ├── products/[id]/     # 製品詳細ページ
│   ├── about/             # このサイトについて
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/
│   ├── chat/              # チャットUIコンポーネント
│   ├── layout/            # ヘッダー・フッター
│   ├── products/          # 製品関連コンポーネント
│   └── ui/                # shadcn/ui コンポーネント
├── hooks/
│   └── useProductFilter.ts # フィルタリングフック
└── lib/
    ├── chat-prompt.ts     # AIプロンプト生成
    ├── products.ts        # 製品データ
    ├── types.ts           # TypeScript型定義
    └── utils.ts           # ユーティリティ
```

## データ出典

- **Layer 1（スペック）**: 各社公式サイト、価格.com、家電量販店サイト
- **Layer 2（評価）**: 公開SNS・コミュニティ情報、メディアレビュー

※ 価格・仕様は2026年2月時点の情報です。

## ライセンス

このプロジェクトは個人利用を目的としています。
