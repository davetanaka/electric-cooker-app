/**
 * 電気調理鍋 6社製品データ
 * データ出典：各社公式サイト・価格.com・家電量販店サイト（2026年2月時点）
 */

import type { Product } from "./types";

export const products: Product[] = [
  // 1. シャープ ホットクック KN-HW24H
  {
    id: "sharp-hotcook-kn-hw24h",
    specs: {
      basic: {
        manufacturer: "シャープ",
        productName: "ホットクック",
        modelNumber: "KN-HW24H",
        productType: "自動調理鍋（非圧力）",
        priceRange: "約48,000〜55,000円",
        priceMin: 48000,
        priceMax: 55000,
        releaseDate: "2024年8月",
        colors: ["プレミアムブラック", "ホワイト"],
      },
      capacity: {
        cookingCapacity: 2.4,
        fullCapacity: 4.7,
        servingSize: "2〜6人分",
        dimensions: { width: 345, depth: 305, height: 256 },
        weight: 6.0,
      },
      features: {
        pressureCooking: { supported: false, details: null },
        stirring: { supported: true, details: "まぜ技ユニット" },
        waterless: true,
        lowTemp: { supported: true, tempRange: "35〜90℃（1℃単位）" },
        stirFry: true,
        deepFry: false,
        steaming: "supported",
        fermentation: true,
        riceCooking: { supported: true, capacity: null },
      },
      menu: {
        autoMenuCount: "172（自動161/手動11）",
        recipeBook: true,
        recipeBookDetails: "同梱メニュー集",
      },
      convenience: {
        reservation: { supported: true, maxHours: 15 },
        keepWarm: true,
        wifi: { supported: true, appName: "COCORO KITCHEN" },
        dishwasherSafe: "partial",
        dishwasherDetails: "内鍋以外対応",
      },
      power: {
        wattage: 800,
        cordLength: "約1.4m（マグネットプラグ）",
        tempRange: "35〜90℃（1℃/5℃単位）",
      },
      uniqueFeatures: [
        "まぜ技ユニットによる自動かきまぜ",
        "「パパッとおかず」30メニュー",
        "別売「もっとクック」ヘラ対応",
      ],
    },
    community: {
      officialCommunity: {
        rating: 5,
        description: "ホットクック部（Commmune運営）",
        points: [
          "会員数2万人超（2024年10月時点）",
          "2020年5月開設、累計販売60万台",
          "オフラインファンミーティングも開催",
          "公式キャラ「クックにゃん」",
        ],
      },
      snsActivity: {
        rating: 5,
        description: "圧倒的",
        points: [
          "X/Instagram/YouTube全方位で投稿多数",
          "専門ブロガー・YouTuber多数",
          "「たろすけさん家」合計フォロワー4万超",
          "レシピ投稿アンケート450名参加規模",
          "#ホットクック でInstagram大量投稿",
        ],
      },
      instagrammability: {
        rating: 3,
        description: "料理映え重視",
        points: [
          "完成料理の写真投稿が主",
          "本体デザインは実用的（映え△）",
          "COCORO KITCHENのUI画面は地味",
        ],
      },
      maintenanceReputation: {
        rating: 4,
        description: "概ね好評",
        points: [
          "らっクリーンコート（Hシリーズ）で改善",
          "内蓋・まぜ技ユニット等パーツあり",
          "食洗機対応パーツあり（モデルによる）",
          "コミュニティで掃除コツ共有",
        ],
      },
      targetUsers: [
        "子育て世代～共働き家庭",
        "料理好き・コミュニティ好き",
        "「ホットクック沼」というワードあり",
        "愛着・ブランドロイヤリティ高い",
        "初心者→ベテランの成長導線あり",
      ],
      postPurchaseSupport: {
        rating: 5,
        description: "最強",
        points: [
          "ホットクック部で先輩ユーザーに相談可",
          "オリジナルレシピのクラウドDL",
          "公式172メニュー＋ユーザーメニュー無数",
          "専門ブログ・YouTube多数",
          "挫折しにくいエコシステム",
        ],
      },
      overallComment:
        "コミュニティの圧倒的な厚みが最大の差別化。買った後「使いこなせない」リスクが最も低い。累計60万台の実績が生む安心感。ただし本体デザインは実用重視でおしゃれ度は劣る。",
    },
  },

  // 2. パナソニック オートクッカー ビストロ NF-AC1000
  {
    id: "panasonic-bistro-nf-ac1000",
    specs: {
      basic: {
        manufacturer: "パナソニック",
        productName: "オートクッカー ビストロ",
        modelNumber: "NF-AC1000",
        productType: "自動調理鍋（圧力対応）",
        priceRange: "約71,000〜79,200円",
        priceMin: 71000,
        priceMax: 79200,
        releaseDate: "2023年2月",
        colors: ["ブラック"],
      },
      capacity: {
        cookingCapacity: 2.4,
        fullCapacity: 4.2,
        servingSize: "白米最大5合",
        dimensions: { width: 333, depth: 336, height: 260 },
        weight: 8.2,
      },
      features: {
        pressureCooking: {
          supported: true,
          details: "3段階（高圧/中圧/低圧、約2気圧）",
        },
        stirring: { supported: true, details: "鍋底かきまぜ羽根" },
        waterless: true,
        lowTemp: { supported: true, tempRange: null },
        stirFry: true,
        deepFry: false,
        steaming: "supported",
        fermentation: false,
        riceCooking: { supported: true, capacity: "白米5合/玄米4合" },
      },
      menu: {
        autoMenuCount: "25（アプリで追加可）",
        recipeBook: true,
        recipeBookDetails: "アプリ連動で追加",
      },
      convenience: {
        reservation: { supported: true, maxHours: null },
        keepWarm: true,
        wifi: { supported: true, appName: "キッチンポケット" },
        dishwasherSafe: "unsupported",
        dishwasherDetails: "全パーツ手洗い",
      },
      power: {
        wattage: 1285,
        cordLength: "約1.0m",
        tempRange: null,
      },
      uniqueFeatures: [
        "鍋底かきまぜ×高火力×圧力の三位一体",
        "業界最高クラス約2気圧",
        "業界最高クラス1285W",
      ],
    },
    community: {
      officialCommunity: {
        rating: 2,
        description: "公式コミュニティなし",
        points: [
          "「キッチンポケット」アプリでレシピ閲覧・送信",
          "アプリ経由でレシピ追加可能",
          "Bistroブランド全体のInstagramライブ配信あり",
        ],
      },
      snsActivity: {
        rating: 4,
        description: "やや活発",
        points: [
          "Bistroブランド認知度が追い風",
          "#オートクッカービストロ でInstagram投稿あり",
          "「炒飯パラパラ」が定番の口コミ",
          "北欧暮らしの道具店等タイアップ記事",
          "料理系インフルエンサー起用",
        ],
      },
      instagrammability: {
        rating: 4,
        description: "本体＋料理",
        points: [
          "Bistroブランドのシック黒デザイン",
          "「上品な佇まい」と評される",
          "料理完成写真は炒飯が定番",
        ],
      },
      maintenanceReputation: {
        rating: 2,
        description: "やや不満あり",
        points: [
          "全パーツ食洗機非対応（手洗い必須）",
          "本体8.2kgと重い",
          "操作パネルに指紋が目立つ",
          "羽根周辺は汚れ落ちやすいとの評",
        ],
      },
      targetUsers: [
        "料理にこだわる家庭",
        "本格志向・Bistroブランド好き",
        "「炒め物もできる万能機」を求める層",
        "やや価格帯高め許容層",
      ],
      postPurchaseSupport: {
        rating: 4,
        description: "充実",
        points: [
          "キッチンポケットで定期レシピ追加",
          "25→拡張可（アプリで追加）",
          "foodableサブスクプランあり",
          "メディアレビュー記事多め",
        ],
      },
      overallComment:
        "「圧力×かきまぜ」の唯一無二ポジション。Bistroブランドの信頼感。ただしコミュニティ不在で「買った後」の情報源がアプリ頼み。重量8.2kgと全パーツ手洗いは覚悟が必要。",
    },
  },

  // 3. ティファール ラクラ・クッカー プロ CY3811J0
  {
    id: "tfal-rakura-cooker-pro-cy3811j0",
    specs: {
      basic: {
        manufacturer: "ティファール",
        productName: "ラクラ・クッカー プロ",
        modelNumber: "CY3811J0",
        productType: "電気圧力鍋（かきまぜ対応）",
        priceRange: "約30,000〜38,000円",
        priceMin: 30000,
        priceMax: 38000,
        releaseDate: "2025年7月",
        colors: ["ホワイト", "ブラック（直販限定）"],
      },
      capacity: {
        cookingCapacity: 2.0,
        fullCapacity: 3.0,
        servingSize: "2〜4人分",
        dimensions: { width: 310, depth: 326, height: 274 },
        weight: 5.3,
      },
      features: {
        pressureCooking: { supported: true, details: "70kPa一定" },
        stirring: { supported: true, details: "かきませパドル" },
        waterless: true,
        lowTemp: { supported: true, tempRange: null },
        stirFry: true,
        deepFry: false,
        steaming: "supported",
        fermentation: true,
        riceCooking: { supported: true, capacity: "3合" },
      },
      menu: {
        autoMenuCount: "13種の調理モード（8種かきまぜ対応）",
        recipeBook: true,
        recipeBookDetails: "65品同梱",
      },
      convenience: {
        reservation: { supported: true, maxHours: null },
        keepWarm: true,
        wifi: { supported: false, appName: null },
        dishwasherSafe: "unsupported",
        dishwasherDetails: "スチーム洗浄機能あり",
      },
      power: {
        wattage: 800,
        cordLength: "約1.5m（着脱式）",
        tempRange: null,
      },
      uniqueFeatures: [
        "かきませパドル搭載",
        "圧力＋かきまぜの両立",
        "13種の調理モード",
      ],
    },
    community: {
      officialCommunity: {
        rating: 1,
        description: "公式コミュニティなし",
        points: [
          "アプリ連携なし（オフライン完結）",
          "レシピブック（65品）同梱",
          "2025年7月発売の新製品のためコミュニティ形成はこれから",
        ],
      },
      snsActivity: {
        rating: 2,
        description: "中程度",
        points: [
          "クックパッドにユーザーレシピ投稿あり",
          "Amebaブログ等で個人レビュー散見",
          "プロモデル（2025年7月）は情報少",
          "クックフォーミーの方が知名度高い",
        ],
      },
      instagrammability: {
        rating: 2,
        description: "控えめ",
        points: [
          "ホワイトカラーでシンプルだが特徴薄",
          "完成料理投稿は少なめ",
          "新プロモデルは未知数",
        ],
      },
      maintenanceReputation: {
        rating: 4,
        description: "好評",
        points: [
          "セラミックコーティングで汚れ落ちやすい",
          "内鍋が軽い（取っ手付き）",
          "スチーム洗浄機能搭載",
          "パーツ構成はシンプル",
        ],
      },
      targetUsers: [
        "コスパ重視の実用派",
        "T-falブランドの安心感で選ぶ",
        "電気圧力鍋入門者",
        "「かきまぜ＋圧力」で新規ユーザー獲得狙い",
      ],
      postPurchaseSupport: {
        rating: 2,
        description: "やや少ない",
        points: [
          "レシピブック65品＋公式サイト",
          "アプリなし・コミュニティなし",
          "新商品のため今後の充実に期待",
          "クックパッドの個人投稿頼り",
        ],
      },
      overallComment:
        "2025年7月発売の新鋭。「圧力×かきまぜ」をオートクッカーより1万以上安く実現。ただし情報量が圧倒的に少なく、買う前も買った後も手探り。T-falブランド信頼度は武器。",
    },
  },

  // 4. アイリスオーヤマ シェフドラム KDAC-IA2
  {
    id: "iris-chefdrum-kdac-ia2",
    specs: {
      basic: {
        manufacturer: "アイリスオーヤマ",
        productName: "シェフドラム",
        modelNumber: "KDAC-IA2",
        productType: "自動かくはん式調理機（非圧力）",
        priceRange: "約32,000〜62,000円",
        priceMin: 32000,
        priceMax: 62000,
        releaseDate: "2022年9月",
        colors: ["ブラウン", "グレー"],
      },
      capacity: {
        cookingCapacity: 2.0,
        fullCapacity: 4.5,
        servingSize: "2〜6人分",
        dimensions: { width: 370, depth: 279, height: 343 },
        weight: 7.2,
      },
      features: {
        pressureCooking: { supported: false, details: null },
        stirring: { supported: true, details: "鍋ごと回転" },
        waterless: true,
        lowTemp: { supported: true, tempRange: "40〜200℃" },
        stirFry: true,
        deepFry: true,
        steaming: "unsupported",
        fermentation: true,
        riceCooking: { supported: false, capacity: null },
      },
      menu: {
        autoMenuCount: "108（KDAC）/ 90（DAC）",
        recipeBook: true,
        recipeBookDetails: "付属レシピブック",
      },
      convenience: {
        reservation: { supported: true, maxHours: null },
        keepWarm: true,
        wifi: { supported: false, appName: null },
        dishwasherSafe: "unsupported",
        dishwasherDetails: null,
      },
      power: {
        wattage: 900,
        cordLength: "約2.0m",
        tempRange: "40〜200℃",
      },
      uniqueFeatures: [
        "鍋ごと回転する独自構造",
        "0°/30°/50°の3段階傾斜",
        "揚げ物にも対応（1台11役）",
      ],
    },
    community: {
      officialCommunity: {
        rating: 1,
        description: "公式コミュニティなし",
        points: [
          "アプリ連携なし",
          "専用レシピ本（108種）付属",
          "吉沢亮CM起用（2024年11月～）",
          "TV露出で認知度は急上昇中",
        ],
      },
      snsActivity: {
        rating: 4,
        description: "やや活発",
        points: [
          "「回転する様子」の動画がSNS映え",
          "子どもが見入るという口コミ多数",
          "X/Instagramで料理完成写真投稿あり",
          "価格.comマガジン等メディアレビュー充実",
        ],
      },
      instagrammability: {
        rating: 5,
        description: "動画映え最強",
        points: [
          "回転する様子がショート動画向き",
          "「ドラム式洗濯機みたい」が話題",
          "本体の傾き調整が視覚的にインパクト大",
          "TikTok/Instagram Reels向き",
        ],
      },
      maintenanceReputation: {
        rating: 4,
        description: "やや好評",
        points: [
          "洗うパーツが少ない（ふた＋内鍋）",
          "内鍋は重い（取り外し注意）",
          "食洗機非対応",
          "ダイヤモンドコートでこびりつき少",
        ],
      },
      targetUsers: [
        "時短重視の共働き・子育て世代",
        "「見た目が面白い」で選ぶ層",
        "揚げ物もしたい人",
        "調理家電を楽しみたい派",
      ],
      postPurchaseSupport: {
        rating: 2,
        description: "やや少ない",
        points: [
          "レシピ本108種付属",
          "公式サイトの情報は基本的",
          "メディアレビューはあるが",
          "ユーザーコミュニティ不在",
        ],
      },
      overallComment:
        "「回転する」見た目のインパクトが最強の営業マン。揚げ物対応は唯一。吉沢亮CMで認知拡大中。ただしWi-Fi非対応、圧力非対応。コミュニティ不在だがSNS映えで自然拡散。",
    },
  },

  // 5. シロカ おうちシェフPRO L SP-5D151
  {
    id: "siroca-ouchichef-pro-sp-5d151",
    specs: {
      basic: {
        manufacturer: "シロカ",
        productName: "おうちシェフPRO L",
        modelNumber: "SP-5D151",
        productType: "電気圧力鍋",
        priceRange: "約27,000〜33,000円",
        priceMin: 27000,
        priceMax: 33000,
        releaseDate: "2022年11月",
        colors: ["ホワイト"],
      },
      capacity: {
        cookingCapacity: 3.5,
        fullCapacity: 5.0,
        servingSize: "4〜6人分",
        dimensions: { width: 275, depth: 345, height: 287 },
        weight: 5.8,
      },
      features: {
        pressureCooking: { supported: true, details: "100kPaゲージ圧" },
        stirring: { supported: false, details: null },
        waterless: true,
        lowTemp: { supported: true, tempRange: null },
        stirFry: true,
        deepFry: false,
        steaming: "supported",
        fermentation: true,
        riceCooking: { supported: true, capacity: null },
      },
      menu: {
        autoMenuCount: "100",
        recipeBook: true,
        recipeBookDetails: "付属レシピブック",
      },
      convenience: {
        reservation: { supported: true, maxHours: 15 },
        keepWarm: true,
        wifi: { supported: false, appName: null },
        dishwasherSafe: "unsupported",
        dishwasherDetails: null,
      },
      power: {
        wattage: 1200,
        cordLength: "約1.2m",
        tempRange: null,
      },
      uniqueFeatures: [
        "スマートプレッシャー技術",
        "100kPa高圧力一定制御",
        "自動減圧機能",
        "1台12役",
      ],
    },
    community: {
      officialCommunity: {
        rating: 1,
        description: "公式コミュニティなし",
        points: [
          "アプリ連携なし",
          "レシピブック（83〜100種）付属",
          "シロカ公式サイト内にレビュー掲載",
          "テレビの家電芸人コーナーで紹介",
        ],
      },
      snsActivity: {
        rating: 2,
        description: "中程度",
        points: [
          "おしゃれデザインでInstagram投稿あり",
          "個人ブログレビューは一定数",
          "noteでの長文レビューも散見",
          "「家電芸人」経由の衝動買い報告あり",
        ],
      },
      instagrammability: {
        rating: 4,
        description: "デザイン映え",
        points: [
          "くすみカラー（グレー等）がおしゃれ",
          "ドラマ使用実績あり",
          "ミニマルデザインが好評",
          "キッチンインテリア写真向き",
        ],
      },
      maintenanceReputation: {
        rating: 2,
        description: "やや不満",
        points: [
          "パーツが多め（ホットクック比）",
          "食洗機非対応",
          "パッキンに匂いが残る口コミあり",
          "煮沸洗浄で対応可",
        ],
      },
      targetUsers: [
        "コスパ重視でおしゃれも欲しい",
        "キッチンデザインにこだわる層",
        "一人暮らし～少人数世帯",
        "電気圧力鍋初心者",
      ],
      postPurchaseSupport: {
        rating: 2,
        description: "やや少ない",
        points: [
          "レシピブック83～100種",
          "公式サイトにレビュー掲載",
          "個人ブログレビューは一定数",
          "コミュニティ不在",
        ],
      },
      overallComment:
        "コスパとデザインのバランスが光る。100kPaの高圧力は業界トップクラス。ただしコミュニティもアプリも不在で孤独な戦い。パッキンの匂い問題は要注意。",
    },
  },

  // 6. 象印 STAN. 自動調理なべ EL-KA23
  {
    id: "zojirushi-stan-el-ka23",
    specs: {
      basic: {
        manufacturer: "象印",
        productName: "STAN. 自動調理なべ",
        modelNumber: "EL-KA23",
        productType: "自動調理鍋（非圧力）",
        priceRange: "約19,000〜22,000円",
        priceMin: 19000,
        priceMax: 22000,
        releaseDate: "2021年10月",
        colors: ["ブラック", "ホワイト"],
      },
      capacity: {
        cookingCapacity: 2.3,
        fullCapacity: null,
        servingSize: "6人分",
        dimensions: { width: 285, depth: 310, height: 225 },
        weight: 7.0,
      },
      features: {
        pressureCooking: { supported: false, details: null },
        stirring: { supported: false, details: null },
        waterless: true,
        lowTemp: { supported: true, tempRange: "40〜100℃" },
        stirFry: false,
        deepFry: false,
        steaming: "partial",
        fermentation: false,
        riceCooking: { supported: true, capacity: null },
      },
      menu: {
        autoMenuCount: "4コース（カレー/スープ/煮物/米調理）＋手動3コース",
        recipeBook: true,
        recipeBookDetails: "付属レシピブック＋WEB 約100レシピ",
      },
      convenience: {
        reservation: { supported: true, maxHours: 12 },
        keepWarm: true,
        wifi: { supported: false, appName: null },
        dishwasherSafe: "unsupported",
        dishwasherDetails: "ホーローなべは手洗い",
      },
      power: {
        wattage: 900,
        cordLength: "約1.4m（マグネットプラグ）",
        tempRange: "40〜100℃",
      },
      uniqueFeatures: [
        "ホーローなべ（直火OK）",
        "パック調理（2品同時）",
        "パックホルダー付属",
        "コンパクト設計",
      ],
    },
    community: {
      officialCommunity: {
        rating: 1,
        description: "公式コミュニティなし",
        points: [
          "STAN.ブランドサイトにユーザー投稿掲載",
          "アプリ連携なし",
          "レシピブック＋WEB約100レシピ",
          "STAN.シリーズ全体でライフスタイル訴求",
        ],
      },
      snsActivity: {
        rating: 2,
        description: "やや少なめ",
        points: [
          "STAN.シリーズ全体のデザイン投稿あり",
          "「インスタで話題」（GetNavi等で紹介）",
          "インテリア系投稿と親和性高い",
          "自動調理鍋単体の投稿は少なめ",
        ],
      },
      instagrammability: {
        rating: 5,
        description: "デザイン映え最強",
        points: [
          "TENTコラボのミニマルデザイン",
          "「ダントツおしゃれ」（GetNavi）",
          "ホーローなべがそのまま食卓映え",
          "インテリアとの調和が高評価",
          "STAN.シリーズ統一感",
        ],
      },
      maintenanceReputation: {
        rating: 4,
        description: "好評",
        points: [
          "洗うのは「なべ・内ぶた・つゆ受け」3点のみ",
          "パーツ少なく簡単",
          "ただしホーローなべが重い（約1.5kg）",
          "取っ手が熱くなる注意",
          "直火温め直しOK（再加熱楽）",
        ],
      },
      targetUsers: [
        "デザイン最重視",
        "インテリア好き・30代共働き",
        "STAN.シリーズで統一したい層",
        "機能よりも暮らしの美しさ重視",
        "パック調理（2品同時）に魅力",
      ],
      postPurchaseSupport: {
        rating: 2,
        description: "少なめ",
        points: [
          "4コース＋手動3コースとシンプル",
          "公式WEB約100レシピ",
          "STAN.ブランドサイトに投稿あり",
          "レシピの幅は他社比で限定的",
        ],
      },
      overallComment:
        "デザインだけなら文句なしの1位。ホーローなべの食卓映え、STAN.シリーズの統一感は唯一無二。ただし機能面は最もシンプル（かきまぜ×、圧力×、Wi-Fi×）。「見た目で選びたい人」専用機。",
    },
  },
];

/**
 * 製品IDから製品を取得
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * メーカー名で製品をフィルタリング
 */
export function getProductsByManufacturer(manufacturer: string): Product[] {
  return products.filter(
    (p) => p.specs.basic.manufacturer === manufacturer
  );
}

/**
 * 全メーカー名を取得
 */
export function getAllManufacturers(): string[] {
  return [...new Set(products.map((p) => p.specs.basic.manufacturer))];
}
