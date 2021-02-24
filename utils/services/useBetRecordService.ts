import { useDataContext } from '@/context/DataContext'
import { useSearchContext } from '@/context/SearchContext'
import { BetRecord, BetRecordListRequest } from '@/types/api/BetRecord'
import { useToast } from '@chakra-ui/react'
import useBetRecordAPI from '../apis/useBetRecordAPI'
import useErrorHandler from '../useErrorHandler'

function useBetRecordService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<BetRecord>()
  const { setSearch } = useSearchContext<BetRecordListRequest>()
  const API = useBetRecordAPI()
  const toast = useToast()

  const fetchList = async (req?: BetRecordListRequest) => {
    try {
      const res = await API.fetchAll({
        page: 1,
        perpage: 50,
        ...req,
      })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useBetRecordService
