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
  Section,
  Status,
  UsdtType,
  WalletType,
  Play,
  GameStatus,
  SportGame,
  RestoreType,
} from '@/lib/enums'
import { OptionType } from '@/types'
import bankCodes from './bankCodes'
import countries from './countries'

export const newsTypeOpts = [
  { label: '系统通知', value: NewsType.System },
  { label: '赛事公告', value: NewsType.Game },
  { label: '活动优惠', value: NewsType.Activity },
]

export const statusOpts = [
  { label: '启用', value: Status.ON },
  { label: '停用', value: Status.OFF },
]
export const confirmStatusOpts = [
  { label: '已通过', value: ConfirmStatus.Confirmed },
  { label: '未审核', value: ConfirmStatus.Processing },
]
export const deviceOpts = [
  { label: '桌上型电脑', value: Device.PC },
  { label: '手机', value: Device.Mobile },
]
export const IPBlockTypeOpts = [
  { label: '黑名单', value: IPBlockType.Black },
  { label: '白名单', value: IPBlockType.White },
]

export const platformTypeOpts = [
  { label: '管端', value: PlatformType.Admin },
  { label: '代理端', value: PlatformType.Agent },
  { label: '会员端', value: PlatformType.Member },
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
  { label: '处理中', value: ProcessStatus.Pending },
  { label: '已完成', value: ProcessStatus.Finish },
  { label: '已取消', value: ProcessStatus.Cancel },
]
export const accountingStatusOpts = [
  { label: '未结帐', value: ProcessStatus.Pending },
  // { label: '结帐中', value: ProcessStatus.Running },
  { label: '已结帐', value: ProcessStatus.Finish },
  { label: '已取消', value: ProcessStatus.Cancel },
]

export const usdtTypeOpts = [
  { label: 'TRC20', value: UsdtType.TRC20 },
  { label: 'ERC20', value: UsdtType.ERC20 },
  { label: 'OMNI', value: UsdtType.OMNI },
]
export const walletTypeOpts = [
  { label: 'USDT', value: WalletType.USDT },
  { label: '元宝', value: WalletType.Balance },
]

export const issueStatusOpts = [
  { label: '未读取', value: IssueStatus.Processing },
  { label: '已读取', value: IssueStatus.Readed },
  { label: '已回复', value: IssueStatus.Finished },
]

export const issueTypeOpts = [
  { label: '游戏相关', value: IssueType.Game },
  { label: '存提相关', value: IssueType.Trade },
  { label: '组织相关', value: IssueType.Team },
  { label: '帐号相关', value: IssueType.User },
  { label: '其他', value: IssueType.Other },
]
export const memberTypeOpts = [
  { label: '会员', value: MemberType.Member },
  { label: '代理', value: MemberType.Agent },
]

export const blockStatusOpts = [
  { label: '正常', value: BlockStatus.Normal },
  { label: '锁定', value: BlockStatus.Blocked },
]
export const accountingTypeOpts = [
  { label: '现金', value: AccountingType.Cash },
  { label: '信用', value: AccountingType.Credit },
]
export const restoreTypeOpts = [
  { label: '不恢復', value: RestoreType.NoRollback },
  { label: '日恢復', value: RestoreType.Daily },
  { label: '週恢復', value: RestoreType.Weekly },
]

export const gameOpts = [
  { label: '欧足', value: SportGame.Soccor },
  { label: '美棒', value: SportGame.Basball },
  // { label: '美蓝', value: 'BSK' },
]

export const gameStatusOpts = [
  { label: '走地', value: GameStatus.Live },
  { label: '未开赛', value: GameStatus.Preparing },
  { label: '完赛', value: GameStatus.Finished },
  { label: '待定', value: GameStatus.Determining },
  { label: '取消', value: GameStatus.Canceled },
  { label: '延期', value: GameStatus.Postpone },
]

export const sectionOpts = [
  { label: '全场', value: Section.Full },
  { label: '半场', value: Section.FirstHalf },
]

export const playOpts = [
  { label: '反波胆', value: Play.NCS },
  { label: '大小', value: Play.Total },
  { label: '让分', value: Play.Spread },
]

// 全场 F
// 上半场 FH
// 下半场 SH
// 第一节 Q1
// 第二节 Q2
// 第三节 Q3
// 第四节 Q4

// 走地全场 FL
// 走地上半场 FHL
// 走地下半场 SHL
// 走地第一节 QL1
// 走地第二节 QL2
// 走地第三节 QL3
// 走地第四节 QL4
