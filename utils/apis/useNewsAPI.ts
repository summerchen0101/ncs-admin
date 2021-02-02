import {
  News,
  NewsActiveRequest,
  NewsCreateRequest,
  NewsEditRequest,
  NewsListRequest,
  NewsListResponse,
} from '@/types/api/News'
import useRequest from '../useRequest'

function useNewsAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: NewsListRequest) =>
      post<NewsListResponse>('news/list', req),
    fetchById: (id: number) => get<News>(`news/view/${id}`),
    active: (req: NewsActiveRequest) => post<null>('news/active', req),
    create: (req: NewsCreateRequest) => post<null>('news/add', req),
    edit: (req: NewsEditRequest) => post<null>('news/edit', req),
    removeById: (id: number) => post<null>('news/remove', { id }),
  }
}

export default useNewsAPI
