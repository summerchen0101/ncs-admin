import {
  Marquee,
  MarqueeActiveRequest,
  MarqueeCreateRequest,
  MarqueeEditRequest,
  MarqueeListRequest,
  MarqueeListResponse,
} from '@/types/api/Marquee'
import useRequest from '../useRequest'

function useMarqueeAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MarqueeListRequest) =>
      post<MarqueeListResponse>('marquee/list', req),
    fetchById: (id: number) => get<Marquee>(`marquee/view/${id}`),
    active: (req: MarqueeActiveRequest) => post<null>('marquee/active', req),
    create: (req: MarqueeCreateRequest) => post<null>('marquee/add', req),
    edit: (req: MarqueeEditRequest) => post<null>('marquee/edit', req),
    removeById: (id: number) => post<null>('marquee/remove', { id }),
  }
}

export default useMarqueeAPI
