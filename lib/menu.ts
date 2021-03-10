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
  home: { name: '首页', icon: 'HiHome', path: '/' },
  user: {
    name: '個人管理',
    icon: 'HiUser',
    path: '/user',
    pages: {
      profile: { name: '個人資料', path: '/user/profile' },
      shadow: { name: '子帳號', path: '/user/shadow' },
    },
  },
  announce: {
    name: '公告管理',
    icon: 'HiSpeakerphone',
    path: '/announce',
    pages: {
      news: { name: '最新消息', path: '/announce/news' },
      banner: {
        name: '首页轮播图',
        path: '/announce/banner',
        menuHidden: true,
      },
      marquee: { name: '跑马灯', path: '/announce/marquee', menuHidden: true },
      message: { name: '站内信', path: '/announce/message', menuHidden: true },
    },
  },
  member: {
    name: '会员管理',
    icon: 'HiUserGroup',
    pages: {
      member: { name: '会员列表', path: '/member/manage' },
      tag: { name: '会员标籤', path: '/member/tag', menuHidden: true },
      bank: { name: '会员银行卡', path: '/member/bank', menuHidden: true },
      realName: {
        name: '實名認證',
        path: '/member/real-name',
        menuHidden: true,
      },
      contact: { name: '聯絡資料', path: '/member/contact', menuHidden: true },
      log: { name: '會員登入紀錄', path: '/member/log' },
    },
  },
  event: {
    name: '赛事相关',
    icon: 'HiLightningBolt',
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
  report: {
    name: '报表查询',
    icon: 'HiChartBar',
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
    icon: 'HiCurrencyDollar',
    menuHidden: true,
    pages: {
      recharge: { name: '人工加扣點', path: '/trade/recharge-rec' },
      wallet: { name: '帳變紀錄', path: '/trade/wallet-rec' },
      transfer: { name: '轉移紀錄', path: '/trade/transfer-rec' },
      withdraw: { name: '提領審核', path: '/trade/withdraw-rec' },
    },
  },

  activity: {
    name: '优惠活动',
    icon: 'HiTag',
    path: '/activity',
    menuHidden: true,
    pages: {
      activity: { name: '活动管理', path: '/activity/manage' },
      review: { name: '活动审核', path: '/activity/review' },
    },
  },

  admin: {
    name: '管理员管理',
    icon: 'HiStar',
    path: '/admin',
    menuHidden: true,
    pages: {
      adminUser: { name: '管理员列表', path: '/admin/user' },
      adminRole: { name: '角色管理', path: '/admin/role' },
      menu: { name: '选单管理', path: '/admin/menu', menuHidden: true },
    },
  },

  block: {
    name: '黑名单管理',
    icon: 'HiExclamation',
    menuHidden: true,
    pages: {
      ipBlock: { name: 'IP黑名单', path: '/block/ip' },
      countryBlock: { name: '国家黑名单', path: '/block/country' },
    },
  },
  merchant: {
    name: '商户管理',
    icon: 'HiBriefcase',
    menuHidden: true,
    pages: {
      manage: { name: '商户列表', path: '/merchant/manage' },
    },
  },
  website: {
    name: '网站管理',
    icon: 'HiDesktopComputer',
    menuHidden: true,
    pages: {
      faqCategory: {
        name: '常见问题分类',
        path: '/website/faq/category',
        menuHidden: true,
      },
      faq: { name: '常见问题', path: '/website/faq' },
      pageContent: { name: '内容管理', path: '/website/page-content' },
    },
  },

  sport: {
    name: '体育设定',
    icon: 'HiAdjustments',
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
}

export default menu
