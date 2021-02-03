import {
  PageContent,
  PageContentActiveRequest,
  PageContentCreateRequest,
  PageContentEditRequest,
  PageContentListRequest,
  PageContentListResponse,
} from '@/types/api/PageContent'
import useRequest from '../useRequest'

function usePageContentAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: PageContentListRequest) =>
      post<PageContentListResponse>('page/list', req),
    fetchById: (id: number) => get<PageContent>(`page/view/${id}`),
    active: (req: PageContentActiveRequest) => post<null>('page/active', req),
    create: (req: PageContentCreateRequest) => post<null>('page/add', req),
    edit: (req: PageContentEditRequest) => post<null>('page/edit', req),
    removeById: (id: number) => post<null>('page/remove', { id }),
  }
}

export default usePageContentAPI
