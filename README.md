# 電気調理鍋 比較ガイド

電気調理鍋6社（ホットクック、ビストロ、クックフォーミー等）を横断比較するWebアプリケーションです。

**カタログに載っていない情報も含めた、消費者のための横断比較**

## 特徴

- **アフィリエイトなし**: 購入リンクや広告は一切掲載しません
- **Layer 1 + Layer 2 比較**: 公式スペックだけでなく、SNS・コミュニティの評判も掲載
- **AIチャット相談**: 「3人家族で圧力必須」のような自然言語で相談可能（入力バリデーション・レート制限付き）
- **レスポンシブ対応**: スマートフォンからPCまで快適に閲覧
- **アクセシビリティ**: 星評価・キーボードショートカット等に aria-label を設定
- **Error Boundary**: ページレベルのエラーをキャッチし、ユーザーフレンドリーなフォールバックUIを表示

## 比較対象製品

| メーカー | 製品名 |
|---------|--------|
| シャープ | ホットクック KN-HW24H |
| パナソニック | ビストロ NF-AC1000 |
| ティファール | ラクラ・クッカー プロ CY3811J0 |
| アイリスオーヤマ | シェフドラム KDAC-IA2 |
| シロカ | おうちシェフ Pro L SP-5D151 |
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
| `/favorites` | お気に入り一覧 | Static |
| `/side-by-side` | 横並び比較（最大3製品） | Static |
| `/products/[id]` | 製品詳細ページ（6製品） | SSG |
| `/about` | このサイトについて | Static |
| `/api/chat` | チャットAPI（バリデーション・レート制限付き） | Dynamic |

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
│   ├── api/chat/          # AIチャットAPI（バリデーション・レート制限）
│   ├── chat/              # チャットページ + Error Boundary
│   ├── compare/           # 比較ページ
│   ├── favorites/         # お気に入りページ
│   ├── side-by-side/      # 横並び比較ページ
│   ├── products/[id]/     # 製品詳細ページ + Error Boundary
│   ├── about/             # このサイトについて
│   ├── error.tsx          # グローバル Error Boundary
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/
│   ├── chat/              # チャットUI（XSSサニタイズ付きMarkdown）
│   ├── compare/           # 横並び比較コンポーネント
│   ├── favorites/         # お気に入りコンポーネント
│   ├── layout/            # ヘッダー・フッター
│   ├── products/          # 製品関連コンポーネント
│   └── ui/                # shadcn/ui コンポーネント
├── contexts/
│   └── CompareContext.tsx  # 比較リストの状態管理
├── hooks/
│   ├── useChatHistory.ts  # チャット履歴（localStorage永続化）
│   ├── useCompare.ts      # 比較リスト操作
│   ├── useFavorites.ts    # お気に入り（localStorage永続化）
│   └── useProductFilter.ts # フィルタリングフック
└── lib/
    ├── chat-prompt.ts     # AIプロンプト生成（キャッシュ付き）
    ├── products.ts        # 製品データ（6社）
    ├── types.ts           # TypeScript型定義
    └── utils.ts           # ユーティリティ
```

## セキュリティ

- **Chat API**: リクエストボディの型・長さバリデーション、IPベースのレート制限（10req/min）
- **Markdown XSS対策**: `javascript:` 等の危険なURLスキームをブロック
- **poweredByHeader無効化**: レスポンスヘッダーからフレームワーク情報を除去
- **reactStrictMode**: 潜在的バグの早期検出

## データ出典

- **Layer 1（スペック）**: 各社公式サイト、価格.com、家電量販店サイト
- **Layer 2（評価）**: 公開SNS・コミュニティ情報、メディアレビュー

※ 価格・仕様は2026年2月時点の情報です。

## ライセンス

このプロジェクトは個人利用を目的としています。
