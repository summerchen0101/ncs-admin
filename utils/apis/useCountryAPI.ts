import {
  Country,
  CountryCreateRequest,
  CountryEditRequest,
  CountryListRequest,
  CountryListResponse,
} from '@/types/api/Country'
import useRequest from '../useRequest'

function useCountryAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CountryListRequest) =>
      post<CountryListResponse>('country/list', req),
    fetchById: (id: number) => get<Country>(`country/view/${id}`),
    create: (req: CountryCreateRequest) => post<null>('country/add', req),
    edit: (req: CountryEditRequest) => post<null>('country/edit', req),
    removeById: (id: number) => post<null>('country/remove', { id }),
  }
}

export default useCountryAPI
