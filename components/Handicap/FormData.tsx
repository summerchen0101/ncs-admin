import { GameStatus, IPBlockType, PlatformType } from '@/lib/enums'
import { IPBlockTypeOpts, platformTypeOpts } from '@/lib/options'
import { SportGame } from '@/types/api/SportGame'
import { Form, FormInstance, Input, Radio, Switch } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'

export interface HandicapFormProps {
  // id?: number
  game_status: GameStatus
  is_open_bet: boolean
  is_active: boolean
  is_auto_accounting: boolean
  play_at: Moment
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
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="类型" name="block_type">
        <Radio.Group options={IPBlockTypeOpts} />
      </Form.Item>
      <Form.Item
        label="IP"
        name="ip"
        help="请使用 IP_V4 格式，例如 192.168.1.1 (0~255.0~255.0~255.0~255)"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="端口设置" name="platform_type">
        <Radio.Group options={platformTypeOpts} />
      </Form.Item>
      <Form.Item label="备注" name="note" rules={[{ max: 30 }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="状态" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
