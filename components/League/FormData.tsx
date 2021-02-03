import { useOptionsContext } from '@/context/OptionsContext'
import { HStack } from '@chakra-ui/react'
import { Form, FormInstance, Input, Switch, Select, Row, Col } from 'antd'
import React, { useEffect } from 'react'

export interface LeagueFormProps {
  id?: number
  name: string
  bet365_code: string
  note: string
  game_id: number
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
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="球種" name="game_id" rules={[{ required: true }]}>
        <Select options={gameOpts} placeholder="請選擇" disabled={!!data.id} />
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
