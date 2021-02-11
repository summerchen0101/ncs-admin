import {
  Menu,
  MenuActiveRequest,
  MenuCreateRequest,
  MenuEditRequest,
  MenuListRequest,
  MenuListResponse,
} from '@/types/api/Menu'
import useRequest from '../useRequest'

function useMenuAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MenuListRequest) =>
      post<MenuListResponse>('admin_menu/list', req),
    fetchById: (id: number) => get<Menu>(`admin_menu/view/${id}`),
    active: (req: MenuActiveRequest) => post<null>('admin_menu/active', req),
    create: (req: MenuCreateRequest) => post<null>('admin_menu/add', req),
    edit: (req: MenuEditRequest) => post<null>('admin_menu/edit', req),
    removeById: (id: number) => post<null>('admin_menu/remove', { id }),
  }
}

export default useMenuAPI
