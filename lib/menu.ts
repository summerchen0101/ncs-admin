const menu = {
  home: { name: '首页', icon: 'HiOutlineStar', path: '/' },
  admin: {
    name: '管理员管理',
    icon: 'HiOutlineUser',
    path: '/admin',
    pages: {
      adminUser: { name: '管理员列表', path: '/admin/user' },
      adminRole: { name: '角色管理', path: '/admin/role' },
      menu: { name: '选单管理', path: '/admin/menu' },
    },
  },
  announce: {
    name: '公告管理',
    icon: 'HiOutlineSpeakerphone',
    path: '/announce',
    pages: {
      news: { name: '最新消息', path: '/announce/news' },
      marquee: { name: '跑马灯', path: '/announce/marquee' },
      message: { name: '站内信', path: '/announce/message' },
    },
  },
  activity: {
    name: '优惠活动',
    icon: 'HiOutlineStar',
    path: '/activity',
    pages: {
      activity: { name: '活动管理', path: '/activity/manage' },
      activityReview: { name: '活动审核', path: '/activity/review' },
    },
  },
  sport: {
    name: '体育设定',
    icon: 'HiOutlineAdjustments',
    path: '/sport',
    pages: {
      country: { name: '国家管理', path: '/sport/country' },
      sport: { name: '运动管理', path: '/sport/sport' },
      game: { name: '球种管理', path: '/sport/game' },
      leagueGroup: { name: '联盟群组管理', path: '/sport/league-group' },
      league: { name: '联盟管理', path: '/sport/league' },
      team: { name: '队伍管理', path: '/sport/team' },
      // handicap: { name: '盘口管理', path: '/sport/handicap' },
      odds: { name: '赔率管理', path: '/sport/odds' },
      defaultBet: { name: '預設下注設定', path: '/sport/default-bet' },
    },
  },
  website: {
    name: '网站管理',
    icon: 'HiOutlineDesktopComputer',
    pages: {
      banner: { name: '首页轮播图', path: '/website/banner' },
      // faqCategory: { name: '常见问题分类', path: '/website/faq/category' },
      faq: { name: '常见问题', path: '/website/faq' },
      pageContent: { name: '内容管理', path: '/website/page-content' },
    },
  },
  member: {
    name: '会员管理',
    icon: 'HiOutlineUserGroup',
    pages: {
      member: { name: '会员列表', path: '/member/manage' },
      memberParams: {
        name: '游戏参数设定',
        path: (id: number) => `/member/manage/params/${id}`,
        menuHidden: true,
      },
      tag: { name: '会员标籤', path: '/member/tag' },
      bank: { name: '会员银行卡', path: '/member/bank' },
      activity: { name: '会员活跃情况', path: '/member/activity' },
    },
  },
  block: {
    name: '黑名单管理',
    icon: 'HiOutlineExclamation',
    pages: {
      ipBlock: { name: 'IP黑名单', path: '/block/ip' },
      countryBlock: { name: '国家黑名单', path: '/block/country' },
    },
  },
  report: {
    name: '报表查询',
    icon: 'HiOutlineTable',
    pages: {
      agent: { name: '代理報表', path: '/report/agent' },
      daily: { name: '日结算', path: '/report/daily' },
      // game: { name: '游戏报表', path: '/report/game' },
      revenue: { name: '营收报表', path: '/report/revenue' },
    },
  },
  merchant: {
    name: '商户管理',
    icon: 'HiOutlineBriefcase',
    pages: {
      manage: { name: '商户列表', path: '/merchant/manage' },
    },
  },
  event: {
    name: '赛事相关',
    icon: 'HiOutlineBriefcase',
    pages: {
      manage: { name: '赛事列表', path: '/event/manage' },
      betRecord: { name: '注单列表', path: '/event/bet-record' },
      accounting: { name: '赛事结帐', path: '/event/accounting' },
      monitor: { name: '赛事控盘', path: '/event/monitor' },
    },
  },
}

export default menu
