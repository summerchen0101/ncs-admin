import { usePopupContext } from '@/context/PopupContext'
import useOddsService from '@/utils/services/useOddsService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { OddsFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useOddsService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        game_code: d.game_code,
        section_code: d.section_code,
        play_code: d.play_code,
        handicap_id: +d.handicap_id,
        home_point: +d.home_point,
        away_point: +d.away_point,
        home_percent: +d.home_percent,
        away_percent: +d.away_percent,
        odds: +d.odds,
        bet_amount_limit: +d.bet_amount_limit,
        single_bet_least: +d.single_bet_least,
        single_bet_limit: +d.single_bet_limit,
        auto_odds_amount_unit: +d.auto_odds_amount_unit,
        auto_odds_rate_unit: +d.auto_odds_rate_unit,
        is_open_bet: d.is_open_bet,
        is_auto_odds: d.is_auto_odds,
        is_active: d.is_active,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<OddsFormProps>()
  return (
    <Modal
      title="新增赔率"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          game_code: 'SC',
          section_code: 'F',
          play_code: 'NCS',
          handicap_id: null,
          home_point: null,
          away_point: null,
          home_percent: 0,
          away_percent: 0,
          odds: 0.01,
          bet_amount_limit: 1000000,
          single_bet_least: 100,
          single_bet_limit: 50000,
          auto_odds_amount_unit: 100000,
          auto_odds_rate_unit: 0.1,
          is_open_bet: true,
          is_auto_odds: false,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
