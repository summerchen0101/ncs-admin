import {
  CountryIpBlock,
  CountryIpBlockActiveRequest,
  CountryIpBlockCreateRequest,
  CountryIpBlockEditRequest,
  CountryIpBlockListRequest,
  CountryIpBlockListResponse,
} from '@/types/api/CountryIpBlock'
import useRequest from '../useRequest'

function useCountryIpBlockAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CountryIpBlockListRequest) =>
      post<CountryIpBlockListResponse>('country_ip_block/list', req),
    fetchById: (id: number) =>
      get<CountryIpBlock>(`country_ip_block/view/${id}`),
    active: (req: CountryIpBlockActiveRequest) =>
      post<null>('country_ip_block/active', req),
    create: (req: CountryIpBlockCreateRequest) =>
      post<null>('country_ip_block/add', req),
    edit: (req: CountryIpBlockEditRequest) =>
      post<null>('country_ip_block/edit', req),
    removeById: (id: number) => post<null>('country_ip_block/remove', { id }),
  }
}

export default useCountryIpBlockAPI
