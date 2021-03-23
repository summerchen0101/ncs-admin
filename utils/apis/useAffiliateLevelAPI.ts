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
      post<AffiliateLevelListResponse>('marketing_plan_level/list', req),
    fetchById: (id: number) =>
      get<AffiliateLevel>(`marketing_plan_level/view/${id}`),
    active: (req: AffiliateLevelActiveRequest) =>
      post<null>('marketing_plan_level/active', req),
    create: (req: AffiliateLevelCreateRequest) =>
      post<null>('marketing_plan_level/add', req),
    edit: (req: AffiliateLevelEditRequest) =>
      post<null>('marketing_plan_level/edit', req),
    removeById: (id: number) =>
      post<null>('marketing_plan_level/remove', { id }),
  }
}

export default useAffiliateLevelAPI
