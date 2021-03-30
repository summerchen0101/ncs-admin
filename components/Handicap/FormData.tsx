import { useOptionsContext } from '@/context/OptionsContext'
import { GameStatus, IPBlockType, PlatformType } from '@/lib/enums'
import { gameOpts, IPBlockTypeOpts, platformTypeOpts } from '@/lib/options'
import { SportGame } from '@/types/api/SportGame'
import useOptionsService from '@/utils/services/useOptionsService'
import { SimpleGrid } from '@chakra-ui/layout'
import {
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Switch,
} from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'

export interface HandicapFormProps {
  // id?: number
  game_status: GameStatus
  is_open_bet: boolean
  is_active: boolean
  is_auto_accounting: boolean
  play_at: string
  accounting_at: Moment
  team_home_id: number
  team_away_id: number
  game_code: SportGame
}

function FormData({
  data,
  form,
}: {
  data: HandicapFormProps
  form: FormInstance<HandicapFormProps>
}) {
  const { fetchLeagueOptions, fetchTeamOptions } = useOptionsService()
  const [leagueOpts, setLeagueOpts] = useOptionsContext().league
  const [teamOpts, setTeamOpts] = useOptionsContext().team

  const handleGameChanged = (game_code: string) => {
    fetchLeagueOptions(game_code)
  }
  const handleLeagueChanged = (league_id: number) => {
    fetchTeamOptions(league_id)
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item label="球種" name="game_code" rules={[{ required: true }]}>
          <Select options={gameOpts} onChange={handleGameChanged} />
        </Form.Item>
        <Form.Item label="聯盟" name="league_id">
          <Select
            options={leagueOpts}
            showSearch
            optionFilterProp="label"
            onChange={handleLeagueChanged}
          />
        </Form.Item>
        <Form.Item
          label="主隊"
          name="team_home_id"
          rules={[{ required: true }]}
        >
          <Select options={teamOpts} showSearch optionFilterProp="label" />
        </Form.Item>
        <Form.Item
          label="客隊"
          name="team_away_id"
          rules={[{ required: true }]}
        >
          <Select options={teamOpts} showSearch optionFilterProp="label" />
        </Form.Item>
        <Form.Item
          label="開賽日期"
          name="play_at"
          rules={[{ required: true }]}
          extra="ex: 2021-03-02 08:30"
        >
          <Input placeholder="ex: 2021-03-02 08:30" />
        </Form.Item>
        <Form.Item
          label="帳務日期"
          name="accounting_at"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
