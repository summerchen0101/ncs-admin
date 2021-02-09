import { Stack } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Switch,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'

export interface OddsFormProps {
  id?: number
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  odds: number
  bet_amount_limit: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
  game_code: string
  section_code: string
  play_code: string
  handicap_id: number
}

function FormData({
  data,
  form,
}: {
  data: OddsFormProps
  form: FormInstance<OddsFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="內容(50字以下)" name="content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="期間" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">無限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker disabledDate={disabledDate} />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <Form.Item label="連結" name="url">
        <Input placeholder="ex: http://google.com" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="另開視窗" name="is_blank" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormData
