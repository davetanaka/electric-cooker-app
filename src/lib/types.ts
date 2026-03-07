/**
 * 電気調理鍋 製品データの型定義
 * Layer 1: 公式スペック情報
 * Layer 2: SNS・コミュニティ情報（定性評価）
 */

/** 機能の対応状況 */
export type FeatureSupport = "supported" | "partial" | "unsupported";

/** 評価レベル（5段階） */
export type RatingLevel = 1 | 2 | 3 | 4 | 5;

/** Layer 1: 公式スペック情報 */
export interface ProductSpecs {
  /** 基本情報 */
  basic: {
    /** メーカー名 */
    manufacturer: string;
    /** 製品名 */
    productName: string;
    /** 型番 */
    modelNumber: string;
    /** 製品種類（例：自動調理鍋、電気圧力鍋） */
    productType: string;
    /** 参考価格（税込） */
    priceRange: string;
    /** 最低価格（数値、フィルター用） */
    priceMin: number;
    /** 最高価格（数値、フィルター用） */
    priceMax: number;
    /** 発売日 */
    releaseDate: string;
    /** カラーバリエーション */
    colors: string[];
  };

  /** 容量・サイズ */
  capacity: {
    /** 調理容量（リットル） */
    cookingCapacity: number;
    /** 満水容量（リットル、記載なしの場合null） */
    fullCapacity: number | null;
    /** 対応人数目安 */
    servingSize: string;
    /** 本体サイズ（幅×奥行×高さ mm） */
    dimensions: {
      width: number;
      depth: number;
      height: number;
    };
    /** 重量（kg） */
    weight: number;
  };

  /** 調理機能 */
  features: {
    /** 圧力調理 */
    pressureCooking: {
      supported: boolean;
      /** 圧力詳細（kPaなど） */
      details: string | null;
    };
    /** かきまぜ機能 */
    stirring: {
      supported: boolean;
      /** かきまぜ方式 */
      details: string | null;
    };
    /** 無水調理 */
    waterless: boolean;
    /** 低温調理 */
    lowTemp: {
      supported: boolean;
      /** 温度範囲 */
      tempRange: string | null;
    };
    /** 炒め調理 */
    stirFry: boolean;
    /** 揚げ物 */
    deepFry: boolean;
    /** 蒸し調理 */
    steaming: FeatureSupport;
    /** 発酵調理 */
    fermentation: boolean;
    /** 炊飯 */
    riceCooking: {
      supported: boolean;
      /** 炊飯量（例：3合） */
      capacity: string | null;
    };
  };

  /** メニュー・レシピ */
  menu: {
    /** 自動メニュー数 */
    autoMenuCount: string;
    /** レシピブック付属 */
    recipeBook: boolean;
    /** レシピブック詳細 */
    recipeBookDetails: string | null;
  };

  /** 便利機能 */
  convenience: {
    /** 予約調理 */
    reservation: {
      supported: boolean;
      /** 最大予約時間 */
      maxHours: number | null;
    };
    /** 保温機能 */
    keepWarm: boolean;
    /** Wi-Fi/アプリ連携 */
    wifi: {
      supported: boolean;
      /** アプリ名 */
      appName: string | null;
    };
    /** 食洗機対応 */
    dishwasherSafe: FeatureSupport;
    /** 食洗機対応詳細 */
    dishwasherDetails: string | null;
  };

  /** 電源・その他 */
  power: {
    /** 消費電力（W） */
    wattage: number;
    /** 電源コード長さ */
    cordLength: string;
    /** 設定温度範囲 */
    tempRange: string | null;
  };

  /** 独自特徴 */
  uniqueFeatures: string[];
}

/** Layer 2: SNS・コミュニティ情報 */
export interface ProductCommunity {
  /** 公式コミュニティ */
  officialCommunity: {
    /** 評価（5段階） */
    rating: RatingLevel;
    /** 説明 */
    description: string;
    /** ポイント（箇条書き） */
    points: string[];
  };

  /** SNS活発度（ユーザー発信） */
  snsActivity: {
    /** 評価（5段階） */
    rating: RatingLevel;
    /** 説明 */
    description: string;
    /** ポイント（箇条書き） */
    points: string[];
  };

  /** インスタ映え度 */
  instagrammability: {
    /** 評価（5段階） */
    rating: RatingLevel;
    /** 説明 */
    description: string;
    /** ポイント（箇条書き） */
    points: string[];
  };

  /** お手入れ評判 */
  maintenanceReputation: {
    /** 評価（5段階） */
    rating: RatingLevel;
    /** 説明 */
    description: string;
    /** ポイント（箇条書き） */
    points: string[];
  };

  /** ユーザー層 */
  targetUsers: string[];

  /** 購入後サポート・情報量 */
  postPurchaseSupport: {
    /** 評価（5段階） */
    rating: RatingLevel;
    /** 説明 */
    description: string;
    /** ポイント（箇条書き） */
    points: string[];
  };

  /** 総合コメント（デイブの目線） */
  overallComment: string;
}

/** 製品データ（Layer 1 + Layer 2 統合） */
export interface Product {
  /** 製品ID（一意識別子） */
  id: string;
  /** Layer 1: 公式スペック */
  specs: ProductSpecs;
  /** Layer 2: コミュニティ情報 */
  community: ProductCommunity;
}

/** フィルター条件 */
export interface FilterCriteria {
  /** 予算範囲 */
  budget?: {
    min?: number;
    max?: number;
  };
  /** 調理容量（リットル以上） */
  minCapacity?: number;
  /** 圧力調理必須 */
  requirePressure?: boolean;
  /** かきまぜ機能必須 */
  requireStirring?: boolean;
  /** Wi-Fi/アプリ連携必須 */
  requireWifi?: boolean;
  /** 食洗機対応必須 */
  requireDishwasherSafe?: boolean;
}
