export interface AppSetting {
  bank_card_limit: number
  bet_fee_percent: number
  bet_confirm_min: number
}

export interface AppSettingEditRequest extends AppSetting {}
