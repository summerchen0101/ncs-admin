import { useOptionsContext } from '@/context/OptionsContext'
import { playOpts, sectionOpts } from '@/lib/options'
import { Box, HStack, NumberInput, SimpleGrid, Stack } from '@chakra-ui/react'
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

export interface OddsFormProps {
  id?: number
  game_code: string
  section_code: string
  play_code: string
  handicap_id: number
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  odds: number
  bet_amount_limit: number
  single_bet_least: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: OddsFormProps
  form: FormInstance<OddsFormProps>
}) {
  const [gameOpts] = useOptionsContext('game')
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={3} spacing={3} mb="15px">
        <Form.Item label="球種" name="game_code">
          <Select options={gameOpts} placeholder="請選擇" />
        </Form.Item>
        <Form.Item label="場次" name="section_code">
          <Select options={sectionOpts} placeholder="請選擇" />
        </Form.Item>
        <Form.Item label="玩法" name="play_code">
          <Select options={playOpts} placeholder="請選擇" />
        </Form.Item>
        <Form.Item label="單注上限" name="single_bet_limit">
          <Input />
        </Form.Item>
        <Form.Item label="單注下限" name="single_bet_least">
          <Input />
        </Form.Item>
        <Form.Item label="單場上限" name="bet_amount_limit">
          <Input />
        </Form.Item>
        <Form.Item label="賠率" name="odds">
          <Input />
        </Form.Item>
        <Form.Item label="降賠金額" name="auto_odds_amount_unit">
          <Input />
        </Form.Item>
        <Form.Item label="降賠比例(%)" name="auto_odds_rate_unit">
          <Input placeholder="%" />
        </Form.Item>
        <Form.Item label="啟用" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="下注" name="is_open_bet" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="自動降賠" name="is_auto_odds" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
      <SimpleGrid columns={2} spacing={3} mb="15px">
        <Box as={Form.Item} label="主隊(分數/輸贏比例)" mb="0">
          <HStack>
            <Form.Item name="home_point">
              <Input placeholder="分數" />
            </Form.Item>
            <Form.Item name="home_percent">
              <Input placeholder="%" />
            </Form.Item>
          </HStack>
        </Box>
        <Box as={Form.Item} label="客隊(分數/輸贏比例)" mb="0">
          <HStack>
            <Form.Item name="away_point">
              <Input placeholder="分數" />
            </Form.Item>
            <Form.Item name="away_percent">
              <Input placeholder="%" />
            </Form.Item>
          </HStack>
        </Box>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
