import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Odds } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { OddsFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useOddsService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Odds>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        home_point: +d.home_point,
        away_point: +d.away_point,
        home_percent: +d.home_percent,
        away_percent: +d.away_percent,
        odds: +d.odds,
        single_game_limit: +d.single_game_limit,
        single_side_limit: +d.single_side_limit,
        single_bet_least: +d.single_bet_least,
        single_bet_limit: +d.single_bet_limit,
        auto_odds_amount_unit: +d.auto_odds_amount_unit,
        auto_odds_rate_unit: +d.auto_odds_rate_unit,
        is_open_bet: d.is_open_bet,
        is_auto_odds: d.is_auto_odds,
        is_active: d.is_active,
      })
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {

    setVisible(false)
  }
  const [form] = Form.useForm<OddsFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑赔率"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          game_code: viewData.game_code,
          section_code: viewData.section_code,
          play_code: viewData.play_code,
          handicap_id: viewData.handicap_id,
          home_point: viewData.home_point,
          away_point: viewData.away_point,
          home_percent: viewData.home_percent,
          away_percent: viewData.away_percent,
          odds: viewData.odds,
          single_game_limit: viewData.single_game_limit,
          single_side_limit: viewData.single_side_limit,
          single_bet_least: viewData.single_bet_limit,
          single_bet_limit: viewData.single_bet_limit,
          auto_odds_amount_unit: viewData.auto_odds_amount_unit,
          auto_odds_rate_unit: viewData.auto_odds_rate_unit,
          is_open_bet: viewData.is_open_bet,
          is_auto_odds: viewData.is_auto_odds,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
