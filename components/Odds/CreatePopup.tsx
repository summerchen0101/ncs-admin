import { usePopupContext } from '@/context/PopupContext'
import { AutoOddsType } from '@/lib/enums'
import useOddsService from '@/utils/services/useOddsService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
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
        home_point: +d.home_point,
        away_point: +d.away_point,
        home_percent: +d.home_percent,
        away_percent: +d.away_percent,
        single_game_limit: +d.single_game_limit,
        single_side_limit: +d.single_side_limit,
        single_bet_least: +d.single_bet_least,
        single_bet_limit: +d.single_bet_limit,
        auto_odds_amount_unit: +d.auto_odds_amount_unit,
        auto_odds_rate_unit: +d.auto_odds_rate_unit,
        is_open_bet: d.is_open_bet,
        is_auto_odds: d.is_auto_odds,
        is_active: d.is_active,
        home_odds: +d.home_odds,
        away_odds: +d.away_odds,
        auto_odds_type: +d.auto_odds_type,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
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
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          game_code: 'SC',
          section_code: 'F',
          play_code: 'NCS',
          home_point: null,
          away_point: null,
          home_percent: 0,
          away_percent: 0,
          home_odds: 0.01,
          away_odds: 0.01,
          single_game_limit: 800000,
          single_side_limit: 500000,
          single_bet_least: 100,
          single_bet_limit: 50000,
          auto_odds_amount_unit: 100000,
          auto_odds_rate_unit: 0.1,
          is_open_bet: true,
          is_auto_odds: false,
          is_active: true,
          auto_odds_type: AutoOddsType.Odds,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
