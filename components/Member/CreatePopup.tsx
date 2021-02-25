import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { BetSetting } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useMemo } from 'react'
import FormData, { BetSettingFormProps, MemberFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      const bettings: BetSetting[] = []
      Object.entries(d.bet_settings).forEach(([g, g_obj]) => {
        return Object.entries(g_obj).forEach(([s, s_obj]) => {
          return Object.entries(s_obj).forEach(([p, params]) => {
            bettings.push({
              game_code: g,
              section_code: s,
              play_code: p,
              risk_percent: 0,
              rebate_percent: +params.rebate_percent,
              fee_percent: 0,
              single_game_limit: +params.single_game_limit,
              single_side_limit: +params.single_side_limit,
              single_bet_limit: +params.single_bet_limit,
              single_bet_least: +params.single_bet_least,
              is_open_bet: true,
            })
          })
        })
      })
      await doCreate({
        acc: d.acc,
        name: d.name,
        pass: d.pass,
        member_type: d.member_type,
        accounting_type: d.accounting_type,
        restore_type: d.restore_type,
        note: d.note,
        parent_id: 0,
        is_active: d.is_active,
        bet_settings: bettings,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<MemberFormProps>()
  const betSettings = useMemo<BetSettingFormProps>(() => {
    const obj = {}
    gameOpts.forEach((g) => {
      obj[g.value] = {}
      sectionOpts.forEach((s) => {
        obj[g.value][s.value] = {}
        playOpts.forEach((p) => {
          obj[g.value][s.value][p.value] = {
            game_code: g.value,
            section_code: s.value,
            play_code: p.value,
            risk_percent: 0,
            rebate_percent: null,
            fee_percent: 0,
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
  return (
    <Modal
      title="新增会员"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      width={800}
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          pass: '',
          note: '',
          balance: null,
          member_type: MemberType.Agent,
          accounting_type: AccountingType.Cash,
          restore_type: RestoreType.Daily,
          is_active: true,
          bet_settings: betSettings,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
