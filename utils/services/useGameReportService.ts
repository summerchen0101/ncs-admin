import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { GameReport, GameReportListRequest } from '@/types/api/GameReport'
import { useToast } from '@chakra-ui/react'
import useGameReportAPI from '../apis/useGameReportAPI'
import useErrorHandler from '../useErrorHandler'

function useGameReportService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<GameReport>()
  const { setSearch } = useSearchContext<GameReportListRequest>()
  const API = useGameReportAPI()
  const toast = useToast()

  const fetchList = async (req?: GameReportListRequest) => {
    try {
      const res = await API.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useGameReportService
