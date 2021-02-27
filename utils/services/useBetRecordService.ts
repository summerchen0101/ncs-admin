import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { BetRatioListRequest } from '@/types/api/BetRatio'
import { BetRecord, BetRecordListRequest } from '@/types/api/BetRecord'
import { useToast } from '@chakra-ui/react'
import useBetRatioAPI from '../apis/useBetRatioAPI'
import useBetRecordAPI from '../apis/useBetRecordAPI'
import useErrorHandler from '../useErrorHandler'

function useBetRecordService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setBetRatios, setViewId } = useDataContext<BetRecord>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<BetRecordListRequest>()
  const API = useBetRecordAPI()
  const BetRatioAPI = useBetRatioAPI()
  const toast = useToast()

  const fetchBetRatios = async (id: number) => {
    try {
      const res = await BetRatioAPI.fetchAll({
        page: 1,
        perpage: 100,
        bet_rec_id: id,
      })
      setBetRatios(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchList = async (req?: BetRecordListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
    fetchBetRatios,
  }
}

export default useBetRecordService
