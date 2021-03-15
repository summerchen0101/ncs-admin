import { useOptionsContext } from '@/context/OptionsContext'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface LeagueFormProps {
  id?: number
  name: string
  game_code: string
  group_code: string
  is_active: boolean
  note: string
}

function FormData({
  data,
  form,
}: {
  data: LeagueFormProps
  form: FormInstance<LeagueFormProps>
}) {
  const [gameOpts] = useOptionsContext().game
  const [leagueGroupOpts] = useOptionsContext().leagueGroup
  const { fetchLeagueGroupOptions } = useOptionsService()
  // useEffect(() => {
  //   form.setFieldsValue(data)
  // }, [data])
  const handleGameChanged = (value: string) => {
    form.resetFields(['group_code'])
    fetchLeagueGroupOptions(value)
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
          disabled={!!data.id}
          onChange={handleGameChanged}
        />
      </Form.Item>
      <Form.Item label="联盟群组" name="group_code" rules={[{ max: 30 }]}>
        <Select
          options={leagueGroupOpts}
          placeholder="请选择"
          disabled={!!data.id}
        />
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="备注" name="note" rules={[{ max: 30 }]}>
        <Input />
      </Form.Item>

      <Form.Item label="状态" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
