import {
  AccountingType,
  BlockStatus,
  ConfirmStatus,
  Device,
  IPBlockType,
  IssueStatus,
  IssueType,
  MemberType,
  NewsType,
  PlatformType,
  ProcessStatus,
  Status,
  UsdtType,
  WalletType,
} from '@/lib/enums'
import { OptionType } from '@/types'
import bankCodes from './bankCodes'
import countries from './countries'

export const newsTypeOpts = [
  { label: '系統通知', value: NewsType.System },
  { label: '賽事公告', value: NewsType.Game },
  { label: '活動優惠', value: NewsType.Activity },
]

export const statusOpts = [
  { label: '啟用', value: Status.ON },
  { label: '停用', value: Status.OFF },
]
export const confirmStatusOpts = [
  { label: '已通過', value: ConfirmStatus.Confirmed },
  { label: '未審核', value: ConfirmStatus.Processing },
]
export const deviceOpts = [
  { label: '桌上型電腦', value: Device.PC },
  { label: '手機', value: Device.Mobile },
]
export const IPBlockTypeOpts = [
  { label: '黑名單', value: IPBlockType.Black },
  { label: '白名單', value: IPBlockType.White },
]

export const platformTypeOpts = [
  { label: '管端', value: PlatformType.Admin },
  { label: '代理端', value: PlatformType.Agent },
  { label: '會員端', value: PlatformType.Member },
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
export const memberTypeOpts = [
  { label: '會員', value: MemberType.Member },
  { label: '代理', value: MemberType.Agent },
]

export const blockStatusOpts = [
  { label: '正常', value: BlockStatus.Normal },
  { label: '鎖定', value: BlockStatus.Blocked },
]
export const accountingTypeOpts = [
  { label: '現金', value: AccountingType.Cash },
  { label: '信用', value: AccountingType.Credit },
]

export const gameOpts = [{ label: '足球', value: 'SC' }]

export const gameStatusOpts = [
  { label: '盤前', value: 1 },
  { label: '走地', value: 2 },
  { label: '完賽', value: 3 },
  { label: '取消', value: 4 },
  { label: '延期', value: 5 },
]
// 全場 F
// 上半場 FH
// 下半場 SH
// 第一節 Q1
// 第二節 Q2
// 第三節 Q3
// 第四節 Q4

// 走地全場 FL
// 走地上半場 FHL
// 走地下半場 SHL
// 走地第一節 QL1
// 走地第二節 QL2
// 走地第三節 QL3
// 走地第四節 QL4

// 大小 OU
// 搶首分 FG
// 讓分 H
// 和局 D
// 搶尾分 LG
// 獨贏 PK
// 單雙 OE
// 一輸二贏 OPFH
// 波膽 CS
// 反波膽 NCS
