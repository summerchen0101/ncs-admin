import {
  Faq,
  FaqActiveRequest,
  FaqCreateRequest,
  FaqEditRequest,
  FaqListRequest,
  FaqListResponse,
} from '@/types/api/Faq'
import useRequest from '../useRequest'

function useFaqAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: FaqListRequest) => post<FaqListResponse>('qa/list', req),
    fetchById: (id: number) => get<Faq>(`qa/view/${id}`),
    active: (req: FaqActiveRequest) => post<null>('qa/active', req),
    create: (req: FaqCreateRequest) => post<null>('qa/add', req),
    edit: (req: FaqEditRequest) => post<null>('qa/edit', req),
    removeById: (id: number) => post<null>('qa/remove', { id }),
  }
}

export default useFaqAPI
