const menu = {
  home: { name: '首頁', icon: 'HiOutlineStar', path: '/' },
  admin: {
    name: '管理員管理',
    icon: 'HiOutlineUser',
    path: '/admin',
    pages: {
      adminUser: { name: '管理員列表', path: '/admin/user' },
      adminRole: { name: '角色管理', path: '/admin/role' },
      menu: { name: '選單管理', path: '/admin/menu' },
    },
  },
  announce: {
    name: '公告管理',
    icon: 'HiOutlineSpeakerphone',
    path: '/announce',
    pages: {
      news: { name: '最新消息', path: '/announce/news' },
      marquee: { name: '跑馬燈', path: '/announce/marquee' },
      message: { name: '站內信', path: '/announce/message' },
    },
  },
  activity: {
    name: '優惠活動',
    icon: 'HiOutlineStar',
    path: '/activity',
    pages: {
      activity: { name: '活動管理', path: '/activity/manage' },
      activityReview: { name: '活動審核', path: '/activity/review' },
    },
  },
  sport: {
    name: '體育設定',
    icon: 'HiOutlineAdjustments',
    path: '/sport',
    pages: {
      country: { name: '國家管理', path: '/sport/country' },
      sport: { name: '運動管理', path: '/sport/sport' },
      game: { name: '球種管理', path: '/sport/game' },
      leagueGroup: { name: '聯盟群組管理', path: '/sport/league-group' },
      league: { name: '聯盟管理', path: '/sport/league' },
      team: { name: '隊伍管理', path: '/sport/team' },
      handicap: { name: '盤口管理', path: '/sport/handicap' },
      odds: { name: '賠率管理', path: '/sport/odds' },
    },
  },
  website: {
    name: '網站管理',
    icon: 'HiOutlineDesktopComputer',
    pages: {
      banner: { name: '首頁輪播圖', path: '/website/banner' },
      faqCategory: { name: '常見問題分類', path: '/website/faq-category' },
      faq: { name: '常見問題', path: '/website/faq' },
      pageContent: { name: '內容管理', path: '/website/page-content' },
    },
  },
  member: {
    name: '會員管理',
    icon: 'HiOutlineUserGroup',
    pages: {
      member: { name: '會員列表', path: '/member/manage' },
      memberParams: {
        name: '遊戲參數設定',
        path: (id: number) => `/member/manage/params/${id}`,
        menuHidden: true,
      },
      tag: { name: '會員標籤', path: '/member/tag' },
      bank: { name: '會員銀行卡', path: '/member/bank' },
      activity: { name: '會員活躍情況', path: '/member/activity' },
    },
  },
  block: {
    name: '黑名單管理',
    icon: 'HiOutlineExclamation',
    pages: {
      ipBlock: { name: 'IP黑名單', path: '/block/ip' },
      countryBlock: { name: '國家黑名單', path: '/block/country' },
    },
  },
  report: {
    name: '報表查詢',
    icon: 'HiOutlineTable',
    pages: {
      game: { name: '遊戲報表', path: '/report/game' },
    },
  },
  merchant: {
    name: '商戶管理',
    icon: 'HiOutlineBriefcase',
    pages: {
      manage: { name: '商戶列表', path: '/merchant/manage' },
    },
  },
}

export default menu
