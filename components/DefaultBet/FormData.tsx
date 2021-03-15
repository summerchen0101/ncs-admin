import { useOptionsContext } from '@/context/OptionsContext'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { HStack } from '@chakra-ui/react'
import { Form, FormInstance, Input, Switch, Select, Row, Col } from 'antd'
import React, { useEffect } from 'react'

export interface DefaultBetFormProps {
  id?: number
  game_code: string
}

function FormData({
  data,
  form,
}: {
  data: DefaultBetFormProps
  form: FormInstance<DefaultBetFormProps>
}) {
  const [countryOpts] = useOptionsContext().country
  const [sportOpts] = useOptionsContext().sport

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="球种" name="game_code" rules={[{ required: true }]}>
            <Select
              placeholder="请选择"
              options={gameOpts}
              disabled={!!data.id}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="场次"
            name="section_code"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="请选择"
              options={sectionOpts}
              disabled={!!data.id}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="玩法" name="play_code" rules={[{ required: true }]}>
            <Select
              placeholder="请选择"
              options={playOpts}
              disabled={!!data.id}
            />
          </Form.Item>
        </Col>
        <Col span={12} />
        <Col span={12}>
          <Form.Item
            label="单注上限"
            name="single_bet_limit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="单注下限"
            name="single_bet_least"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="单边上限"
            name="single_side_limit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="单场上限"
            name="single_game_limit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormData
