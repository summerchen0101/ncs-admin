import { useOptionsContext } from '@/context/OptionsContext'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface TeamFormProps {
  id?: number
  name: string
  name_en: string
  note: string
  game_id: number
  league_id: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: TeamFormProps
  form: FormInstance<TeamFormProps>
}) {
  const [gameOpts] = useOptionsContext('game')
  const [leagueOpts, setLeagueOpts] = useOptionsContext('league')
  const { fetchLeagueOptions } = useOptionsService()
  // useEffect(() => {
  //   form.setFieldsValue(data)
  // }, [data])
  const handleGameChanged = (game_id: number) => {
    fetchLeagueOptions(game_id)
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="球種" name="game_id" rules={[{ required: true }]}>
        <Select
          options={gameOpts}
          placeholder="請選擇"
          onChange={handleGameChanged}
          disabled={!!data.id}
        />
      </Form.Item>
      <Form.Item label="聯盟" name="league_id" rules={[{ required: true }]}>
        <Select
          options={leagueOpts}
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
      <Form.Item
        label="英文名稱"
        name="name_en"
        rules={[{ required: true }, { max: 30 }]}
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
