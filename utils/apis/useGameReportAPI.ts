import {
  GameReportListRequest,
  GameReportListResponse,
} from '@/types/api/GameReport'
import useRequest from '../useRequest'

function useGameReportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: GameReportListRequest) =>
      post<GameReportListResponse>('marquee/list', req),
  }
}

export default useGameReportAPI
