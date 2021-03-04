import { MenuCategory, MenuPage } from '@/components/MenuItem'

type MenuCategoryLabel =
  | 'user'
  | 'admin'
  | 'announce'
  | 'activity'
  | 'sport'
  | 'website'
  | 'member'
  | 'block'
  | 'report'
  | 'trade'
  | 'merchant'
  | 'event'

type MenuTree = {
  [category in MenuCategoryLabel]: MenuCategory
} & {
  home: MenuPage
}

const menu: MenuTree = {
  home: { name: '首页', icon: 'HiOutlineStar', path: '/' },
  user: {
    name: '個人管理',
    icon: 'HiOutlineUser',
    path: '/user',
    pages: {
      profile: { name: '個人資料', path: '/user/profile' },
      shadow: { name: '子帳號', path: '/user/shadow' },
    },
  },
  admin: {
    name: '管理员管理',
    icon: 'HiOutlineStar',
    path: '/admin',
    menuHidden: true,
    pages: {
      adminUser: { name: '管理员列表', path: '/admin/user' },
      adminRole: { name: '角色管理', path: '/admin/role' },
      menu: { name: '选单管理', path: '/admin/menu', menuHidden: true },
    },
  },
  announce: {
    name: '公告管理',
    icon: 'HiOutlineSpeakerphone',
    path: '/announce',
    pages: {
      news: { name: '最新消息', path: '/announce/news' },
      marquee: { name: '跑马灯', path: '/announce/marquee', menuHidden: true },
      message: { name: '站内信', path: '/announce/message' },
    },
  },
  activity: {
    name: '优惠活动',
    icon: 'HiOutlineTag',
    path: '/activity',
    menuHidden: true,
    pages: {
      activity: { name: '活动管理', path: '/activity/manage' },
      activityReview: { name: '活动审核', path: '/activity/review' },
    },
  },
  sport: {
    name: '体育设定',
    icon: 'HiOutlineAdjustments',
    path: '/sport',
    menuHidden: true,
    pages: {
      country: { name: '国家管理', path: '/sport/country' },
      sport: { name: '运动管理', path: '/sport/sport' },
      game: { name: '球种管理', path: '/sport/game' },
      leagueGroup: { name: '联盟群组管理', path: '/sport/league-group' },
      league: { name: '联盟管理', path: '/sport/league' },
      team: { name: '队伍管理', path: '/sport/team' },
      odds: { name: '赔率管理', path: '/sport/odds' },
      defaultBet: {
        name: '預設下注設定',
        path: '/sport/default-bet',
        menuHidden: true,
      },
    },
  },
  website: {
    name: '网站管理',
    icon: 'HiOutlineDesktopComputer',
    menuHidden: true,
    pages: {
      banner: { name: '首页轮播图', path: '/website/banner' },
      faqCategory: {
        name: '常见问题分类',
        path: '/website/faq/category',
        menuHidden: true,
      },
      faq: { name: '常见问题', path: '/website/faq' },
      pageContent: { name: '内容管理', path: '/website/page-content' },
    },
  },
  member: {
    name: '会员管理',
    icon: 'HiOutlineUserGroup',
    pages: {
      member: { name: '会员列表', path: '/member/manage' },
      tag: { name: '会员标籤', path: '/member/tag', menuHidden: true },
      bank: { name: '会员银行卡', path: '/member/bank', menuHidden: true },
    },
  },
  block: {
    name: '黑名单管理',
    icon: 'HiOutlineExclamation',
    menuHidden: true,
    pages: {
      ipBlock: { name: 'IP黑名单', path: '/block/ip' },
      countryBlock: { name: '国家黑名单', path: '/block/country' },
    },
  },
  report: {
    name: '报表查询',
    icon: 'HiOutlineTable',
    pages: {
      memberActivity: { name: '会员活跃情况', path: '/report/member-activity' },
      agent: { name: '代理報表', path: '/report/agent' },
      daily: { name: '日结算', path: '/report/daily' },
      // game: { name: '游戏报表', path: '/report/game' },
      revenue: { name: '营收报表', path: '/report/revenue' },
    },
  },
  trade: {
    name: '帐务管理',
    icon: 'HiOutlineCurrencyDollar',
    menuHidden: true,
    pages: {
      recharge: { name: '人工加扣點', path: '/trade/recharge-rec' },
      withdraw: { name: '提領審核', path: '/trade/withdraw-rec' },
    },
  },
  merchant: {
    name: '商户管理',
    icon: 'HiOutlineBriefcase',
    menuHidden: true,
    pages: {
      manage: { name: '商户列表', path: '/merchant/manage' },
    },
  },
  event: {
    name: '赛事相关',
    icon: 'HiOutlineLightningBolt',
    pages: {
      manage: { name: '赛事列表', path: '/event/manage' },
      betRecord: { name: '注单列表', path: '/event/bet-record' },
      accounting: {
        name: '赛事结帐',
        path: '/event/accounting',
        menuHidden: true,
      },
      monitor: { name: '赛事控盘', path: '/event/monitor', menuHidden: true },
    },
  },
}

export default menu
