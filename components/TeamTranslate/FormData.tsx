import { useOptionsContext } from '@/context/OptionsContext'
import useOptionsService from '@/utils/services/useOptionsService'
import { Stack } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Switch,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'

export interface TeamTranslateFormProps {
  id?: number
  name: string
  fix_name: string
  is_active: boolean
  league_id: number
  game_code: string
}

function FormData({
  data,
  form,
}: {
  data: TeamTranslateFormProps
  form: FormInstance<TeamTranslateFormProps>
}) {
  const [gameOpts] = useOptionsContext().game
  const [leagueOpts, setLeagueOpts] = useOptionsContext().league
  const { fetchLeagueOptions } = useOptionsService()

  const handleGameChanged = (game_code: string) => {
    fetchLeagueOptions(game_code)
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="球种" name="game_code" rules={[{ required: true }]}>
        <Select
          options={gameOpts}
          placeholder="请选择"
          onChange={handleGameChanged}
          disabled={!!data.id}
        />
      </Form.Item>
      <Form.Item label="联盟" name="league_id" rules={[{ required: true }]}>
        <Select
          options={leagueOpts}
          placeholder="请选择"
          disabled={!!data.id}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
      <Form.Item label="抓盘名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="修正名称" name="fix_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="状态" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
