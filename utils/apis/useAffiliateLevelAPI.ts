import {
  AffiliateLevel,
  AffiliateLevelActiveRequest,
  AffiliateLevelCreateRequest,
  AffiliateLevelEditRequest,
  AffiliateLevelListRequest,
  AffiliateLevelListResponse,
} from '@/types/api/AffiliateLevel'
import useRequest from '../useRequest'

function useAffiliateLevelAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AffiliateLevelListRequest) =>
      post<AffiliateLevelListResponse>('promo_level/list', req),
    fetchById: (id: number) => get<AffiliateLevel>(`promo_level/view/${id}`),
    active: (req: AffiliateLevelActiveRequest) =>
      post<null>('promo_level/active', req),
    create: (req: AffiliateLevelCreateRequest) =>
      post<null>('promo_level/add', req),
    edit: (req: AffiliateLevelEditRequest) =>
      post<null>('promo_level/edit', req),
    removeById: (id: number) => post<null>('promo_level/remove', { id }),
  }
}

export default useAffiliateLevelAPI
