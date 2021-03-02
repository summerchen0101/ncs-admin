import { BetSettingFormProps } from '@/components/Member/FormData'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { BetSetting } from '@/types/api/Member'
import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import _ from 'lodash'
const useHelper = () => {
  const toast = useToast()
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ status: 'success', title: '已複製至剪貼簿' })
  }

  const createBetSettingObj = useCallback((bettings?: BetSetting[]) => {
    const remoteBetObj = _(bettings)
      .groupBy('game_code')
      .mapValues((bets) =>
        _(bets)
          .groupBy('section_code')
          .mapValues((bs) => _(bs).keyBy('play_code').value())
          .value(),
      )
      .value()
    const obj: BetSettingFormProps = {}
    gameOpts.forEach((g) => {
      obj[g.value] = {}
      sectionOpts.forEach((s) => {
        obj[g.value][s.value] = {}
        playOpts.forEach((p) => {
          const remoteParams = remoteBetObj[g.value]?.[s.value]?.[p.value]
          // console.log(remoteParams)
          if (remoteParams) {
            obj[g.value][s.value][p.value] = remoteParams
            return
          }
          obj[g.value][s.value][p.value] = {
            game_code: g.value,
            section_code: s.value,
            play_code: p.value,
            risk_percent: null,
            rebate_percent: null,
            fee_percent: null,
            single_game_limit: null,
            single_side_limit: null,
            single_bet_limit: null,
            single_bet_least: null,
            is_open_bet: true,
          } as BetSetting
        })
      })
    })
    return obj
  }, [])

  const betSettingObjToArr = useCallback(
    (betSettingObj: BetSettingFormProps) => {
      const bettings: BetSetting[] = []
      Object.entries(betSettingObj).forEach(([g, g_obj]) => {
        return Object.entries(g_obj).forEach(([s, s_obj]) => {
          return Object.entries(s_obj).forEach(([p, params]) => {
            bettings.push({
              game_code: g,
              section_code: s,
              play_code: p,
              risk_percent: +params.risk_percent,
              rebate_percent: +params.rebate_percent,
              fee_percent: +params.fee_percent,
              single_game_limit: +params.single_game_limit,
              single_side_limit: +params.single_side_limit,
              single_bet_limit: +params.single_bet_limit,
              single_bet_least: +params.single_bet_least,
              is_open_bet: params.is_open_bet,
            })
          })
        })
      })
      return bettings
    },
    [],
  )

  // const updateBetSettingParams = useCallback(
  //   (betSettingObj: BetSettingFormProps, paramName: string, value: number) => {
  //     const bettings: BetSetting[] = []
  //     Object.entries(betSettingObj).forEach(([g, g_obj]) => {
  //       return Object.entries(g_obj).forEach(([s, s_obj]) => {
  //         return Object.entries(s_obj).forEach(([p, params]) => {
  //           bettings.push({
  //             game_code: g,
  //             section_code: s,
  //             play_code: p,
  //             risk_percent: 0,
  //             rebate_percent: +params.rebate_percent,
  //             fee_percent: 0,
  //             single_game_limit: +params.single_game_limit,
  //             single_side_limit: +params.single_side_limit,
  //             single_bet_limit: +params.single_bet_limit,
  //             single_bet_least: +params.single_bet_least,
  //             is_open_bet: true,
  //           })
  //         })
  //       })
  //     })
  //     return bettings
  //   },
  //   [],
  // )
  return { copyToClipboard, betSettingObjToArr, createBetSettingObj }
}

export default useHelper
