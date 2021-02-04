import { MenuItemProps } from '@/components/MenuItem'
import pages from './pages'

const menu: MenuItemProps[] = [
  { name: '首頁', path: '/' },
  {
    name: '管理員管理',
    icon: 'HiOutlineUser',
    children: [
      { name: '管理員列表', path: '/admin/user' },
      { name: '角色管理', path: '/admin/role' },
    ],
  },
  {
    name: '公告管理',
    icon: 'HiOutlineSpeakerphone',
    children: [
      { name: '最新消息', path: '/announce/news' },
      { name: '跑馬燈', path: '/announce/marquee' },
      { name: '站內信', path: '/announce/message' },
    ],
  },
  {
    name: '優惠活動',
    icon: 'HiOutlineStar',
    children: [
      { name: '活動管理', path: '/activity/manage' },
      { name: '活動審核', path: '/activity/review' },
    ],
  },
  {
    name: '體育設定',
    icon: 'HiOutlineAdjustments',
    children: [
      { name: '國家管理', path: '/sport/country' },
      { name: '運動管理', path: '/sport/sport' },
      { name: '球種管理', path: '/sport/game' },
      { name: '聯盟管理', path: '/sport/league' },
      { name: '隊伍管理', path: '/sport/team' },
    ],
  },
  {
    name: '網站管理',
    icon: 'HiOutlineDesktopComputer',
    children: [pages.banner, pages.faq, pages.pageContent],
  },
  {
    name: '會員管理',
    icon: 'HiOutlineUserGroup',
    children: [pages.member, pages.tag],
  },
]

export default menu
