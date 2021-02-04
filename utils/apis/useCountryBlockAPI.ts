import {
  CountryBlock,
  CountryBlockActiveRequest,
  CountryBlockCreateRequest,
  CountryBlockEditRequest,
  CountryBlockListRequest,
  CountryBlockListResponse,
} from '@/types/api/CountryBlock'
import useRequest from '../useRequest'

function useCountryBlockAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CountryBlockListRequest) =>
      post<CountryBlockListResponse>('country_ip_block/list', req),
    fetchById: (id: number) => get<CountryBlock>(`country_ip_block/view/${id}`),
    active: (req: CountryBlockActiveRequest) =>
      post<null>('country_ip_block/active', req),
    create: (req: CountryBlockCreateRequest) =>
      post<null>('country_ip_block/add', req),
    edit: (req: CountryBlockEditRequest) =>
      post<null>('country_ip_block/edit', req),
    removeById: (id: number) => post<null>('country_ip_block/remove', { id }),
  }
}

export default useCountryBlockAPI
