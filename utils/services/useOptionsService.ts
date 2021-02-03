import { useOptionsContext } from '@/context/OptionsContext'
import { OptionBasic } from '@/types'
import useOptionsAPI from '../apis/useOptionsAPI'
import useErrorHandler from '../useErrorHandler'

const toOptionTypes = (opts: OptionBasic[]) =>
  opts.map((t) => ({ label: t.name, value: t.id }))

function useOptionsService() {
  const { apiErrHandler } = useErrorHandler()
  const [, setRoles] = useOptionsContext('role')
  const [, setPermissions] = useOptionsContext('permission')
  const [, setCountries] = useOptionsContext('country')
  const [, setSports] = useOptionsContext('sport')
  const [, setGames] = useOptionsContext('game')
  const [, setLeagues] = useOptionsContext('league')
  const [, setTeams] = useOptionsContext('team')
  const API = useOptionsAPI()

  const fetchPermissionOptions = async () => {
    try {
      const res = await API.permissions()
      setPermissions(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchRoleOptions = async () => {
    try {
      const res = await API.roles()
      setRoles(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchCountryOptions = async () => {
    try {
      const res = await API.countries()
      setCountries(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchSportOptions = async () => {
    try {
      const res = await API.sports()
      setSports(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchGameOptions = async () => {
    try {
      const res = await API.games()
      setGames(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchLeagueOptions = async () => {
    try {
      const res = await API.leagues()
      setLeagues(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchTeamOptions = async () => {
    try {
      const res = await API.teams()
      setTeams(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchPermissionOptions,
    fetchRoleOptions,
    fetchCountryOptions,
    fetchSportOptions,
    fetchGameOptions,
    fetchLeagueOptions,
    fetchTeamOptions,
  }
}

export default useOptionsService
