import {
  FaqCategory,
  FaqCategoryActiveRequest,
  FaqCategoryCreateRequest,
  FaqCategoryEditRequest,
  FaqCategoryListRequest,
  FaqCategoryListResponse,
} from '@/types/api/FaqCategory'
import useRequest from '../useRequest'

function useFaqCategoryAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: FaqCategoryListRequest) =>
      post<FaqCategoryListResponse>('qa_catalogue/list', req),
    fetchById: (id: number) => get<FaqCategory>(`qa_catalogue/view/${id}`),
    active: (req: FaqCategoryActiveRequest) =>
      post<null>('qa_catalogue/active', req),
    create: (req: FaqCategoryCreateRequest) =>
      post<null>('qa_catalogue/add', req),
    edit: (req: FaqCategoryEditRequest) => post<null>('qa_catalogue/edit', req),
    removeById: (id: number) => post<null>('qa_catalogue/remove', { id }),
  }
}

export default useFaqCategoryAPI
