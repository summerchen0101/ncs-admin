import {
  Banner,
  BannerActiveRequest,
  BannerCreateRequest,
  BannerEditRequest,
  BannerListRequest,
  BannerListResponse,
} from '@/types/api/Banner'
import useRequest from '../useRequest'

function useBannerAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: BannerListRequest) =>
      post<BannerListResponse>('banner/list', req),
    fetchById: (id: number) => get<Banner>(`banner/view/${id}`),
    active: (req: BannerActiveRequest) => post<null>('banner/active', req),
    create: (req: BannerCreateRequest) => post<null>('banner/add', req),
    edit: (req: BannerEditRequest) => post<null>('banner/edit', req),
    removeById: (id: number) => post<null>('banner/remove', { id }),
  }
}

export default useBannerAPI
