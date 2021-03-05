import { useOptionsContext } from '@/context/OptionsContext'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface LeagueGroupFormProps {
  id?: number
  name: string
  code: string
  note: string
  game_code: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: LeagueGroupFormProps
  form: FormInstance<LeagueGroupFormProps>
}) {
  const [gameOpts] = useOptionsContext('game')

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="體育" name="game_code" rules={[{ required: true }]}>
        <Select options={gameOpts} placeholder="請選擇" disabled={!!data.id} />
      </Form.Item>
      <Form.Item
        label="名稱"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="代碼"
        name="code"
        rules={[{ required: true }, { max: 10 }]}
      >
        <Input disabled={!!data.id} />
      </Form.Item>
      <Form.Item label="備註" name="note" rules={[{ max: 30 }]}>
        <Input />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
