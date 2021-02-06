import { useOptionsContext } from '@/context/OptionsContext'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface LeagueFormProps {
  id?: number
  name: string
  bet365_code: string
  game_code: string
  group_code: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: LeagueFormProps
  form: FormInstance<LeagueFormProps>
}) {
  const [gameOpts] = useOptionsContext('game')
  const [leagueGroupOpts] = useOptionsContext('leagueGroup')
  const { fetchLeagueGroupOptions } = useOptionsService()
  // useEffect(() => {
  //   form.setFieldsValue(data)
  // }, [data])
  const handleGameChanged = (value: string) => {
    form.resetFields(['group_code'])
    fetchLeagueGroupOptions(value)
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="球種" name="game_code" rules={[{ required: true }]}>
        <Select
          options={gameOpts}
          placeholder="請選擇"
          disabled={!!data.id}
          onChange={handleGameChanged}
        />
      </Form.Item>
      <Form.Item label="聯盟群組" name="group_code" rules={[{ max: 30 }]}>
        <Select
          options={leagueGroupOpts}
          placeholder="請選擇"
          disabled={!!data.id}
        />
      </Form.Item>
      <Form.Item
        label="名稱"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="365代碼" name="bet365_code" rules={[{ max: 30 }]}>
        <Input />
      </Form.Item>

      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
