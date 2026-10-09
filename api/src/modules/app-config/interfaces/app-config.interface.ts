export interface AppConfigItem {
  key: string;
  value: number;
  unit: string;
  description: string | null;
  /** Only whole numbers are accepted. */
  integer: boolean;
  /** Smallest accepted value. */
  min: number;
  /** False when the row does not exist yet and the built-in default is being used. */
  stored: boolean;
  updated_at: string | null;
}

/** What a unit of provider usage costs us: credits consumed and the USD price of them. */
export interface CostFigures {
  credits: number | null;
  cost_usd: number;
  /** True when the USD figure comes from app_config prices rather than a provider-reported amount. */
  estimated: boolean;
}
