import {
  Device,
  IPBlockType,
  IssueStatus,
  IssueType,
  NewsType,
  ProcessStatus,
  Status,
  UsdtType,
  WalletType,
} from '@/lib/enums'
import bankCodes from './bankCodes'
import countries from './countries'

export const newsTypeOpts = [
  { label: '全部', value: NewsType.ALL },
  { label: '系統通知', value: NewsType.System },
  { label: '賽事公告', value: NewsType.Game },
  { label: '活動優惠', value: NewsType.Activity },
]

export const statusOpts = [
  { label: '全部', value: Status.ALL },
  { label: '啟用', value: Status.ON },
  { label: '停用', value: Status.OFF },
]
export const deviceOpts = [
  { label: '桌上型電腦', value: Device.PC },
  { label: '手機', value: Device.Mobile },
]
export const IPBlockTypeOpts = [
  { label: '黑名單', value: IPBlockType.Black },
  { label: '白名單', value: IPBlockType.White },
]

export const countryOpts = countries.map((t) => ({
  label: t.name,
  value: t.alpha3.toUpperCase(),
}))

export const bankCodeOpts = bankCodes.map((t) => ({
  label: `${t.name}(${t.code})`,
  value: t.code,
}))

export const processStatusOpts = [
  { label: '處理中', value: ProcessStatus.Processing },
  { label: '已完成', value: ProcessStatus.Done },
  { label: '已取消', value: ProcessStatus.Canceled },
]

export const usdtTypeOpts = [
  { label: 'TRC20', value: UsdtType.TRC20 },
  { label: 'ERC20', value: UsdtType.ERC20 },
  { label: 'OMNI', value: UsdtType.OMNI },
]
export const walletTypeOpts = [
  { label: 'USDT', value: WalletType.USDT },
  { label: '元寶', value: WalletType.Balance },
]

export const issueStatusOpts = [
  { label: '未讀取', value: IssueStatus.Processing },
  { label: '已讀取', value: IssueStatus.Readed },
  { label: '已回覆', value: IssueStatus.Finished },
]

export const issueTypeOpts = [
  { label: '遊戲相關', value: IssueType.Game },
  { label: '存提相關', value: IssueType.Trade },
  { label: '組織相關', value: IssueType.Team },
  { label: '帳號相關', value: IssueType.User },
  { label: '其他', value: IssueType.Other },
]
