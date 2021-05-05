export interface AppSetting {
  bank_card_limit: number
  bet_fee_percent: number
  bet_confirm_min: number
  live_help_url: string
  online_count_min: number
  online_count_max: number
}

export interface AppSettingEditRequest extends AppSetting {}
