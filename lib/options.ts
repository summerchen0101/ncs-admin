import {
  AccountingStatus,
  AccountingType,
  ActivityRecStatus,
  ActivityType,
  AutoOddsType,
  BlockStatus,
  ConfirmStatus,
  DateRangeType,
  Device,
  GameStatus,
  IPBlockType,
  MemberType,
  NewsType,
  PlatformType,
  Play,
  ProcessStatus,
  RechargeType,
  RestoreType,
  ReviewStatus,
  RewardProcess,
  Section,
  SportGame,
  Status,
  WalletRecType,
} from '@/lib/enums'
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
  { label: '台式电脑', value: Device.PC },
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
  { label: '已通过', value: ProcessStatus.Finish },
  { label: '已驳回', value: ProcessStatus.Cancel },
]

export const rewardProcessOpts = [
  { label: '未派彩', value: RewardProcess.Pending },
  { label: '已派彩', value: RewardProcess.Finish },
]

export const reviewStatusOpts = [
  { label: '未審核', value: ReviewStatus.Pending },
  { label: '已通過', value: ReviewStatus.Recieve },
  { label: '已駁回', value: ReviewStatus.Reject },
]

export const accountingStatusOpts = [
  { label: '未结帐', value: AccountingStatus.Pending },
  // { label: '结帐中', value: AccountingStatus.Running },
  { label: '已结帐', value: AccountingStatus.Finish },
  { label: '已取消', value: AccountingStatus.Cancel },
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
  { label: '不恢复', value: RestoreType.NoRollback },
  { label: '日恢复', value: RestoreType.Daily },
  { label: '週恢复', value: RestoreType.Weekly },
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

export const rechargeTypeOpts = [
  { label: '加点', value: RechargeType.Add },
  { label: '扣点', value: RechargeType.Subtract },
]
export const walletRecTypeOpts = [
  { label: '充值', value: WalletRecType.Deposit },
  { label: '人工加扣', value: WalletRecType.Manual },
  { label: '提领', value: WalletRecType.Withdraw },
  { label: '投注', value: WalletRecType.Bet },
  { label: '投注取消退还', value: WalletRecType.BetCancel },
  { label: '投注结果', value: WalletRecType.BetResult },
  { label: '结帐修正', value: WalletRecType.AccountingFix },
  { label: '退水', value: WalletRecType.Rebate },
  { label: '转帐', value: WalletRecType.Transfer },
  { label: '活动奖励', value: WalletRecType.Activirty },
]

export const dateRangeOpts = [
  { label: '今日', value: DateRangeType.Today },
  { label: '昨日', value: DateRangeType.Yesterday },
  { label: '本週', value: DateRangeType.ThisWeek },
  { label: '上週', value: DateRangeType.LastWeek },
  { label: '本月', value: DateRangeType.ThisMonth },
  { label: '上月', value: DateRangeType.LastMonth },
]

export const activityRecStatusOpts = [
  { label: '申请中', value: ActivityRecStatus.Applying },
  { label: '同意', value: ActivityRecStatus.Recieve },
  { label: '完成', value: ActivityRecStatus.Finish },
  { label: '驳回', value: ActivityRecStatus.Reject },
  { label: '已派发', value: ActivityRecStatus.Paid },
]

export const autoOddsTypeOpts = [
  { label: '变动分盘', value: AutoOddsType.Handicap },
  { label: '变动赔率', value: AutoOddsType.Odds },
]

export const activityTypeOpts = [
  { label: '储值金額', value: ActivityType.Recharge },
  { label: '洗码量', value: ActivityType.Betting },
  { label: '连续登录', value: ActivityType.LoginTimes },
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
