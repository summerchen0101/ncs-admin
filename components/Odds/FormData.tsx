import { useOptionsContext } from '@/context/OptionsContext'
import { AutoOddsType } from '@/lib/enums'
import { autoOddsTypeOpts, playOpts, sectionOpts } from '@/lib/options'
import { Box, HStack, SimpleGrid, Spacer } from '@chakra-ui/react'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface OddsFormProps {
  id?: number
  game_code: string
  section_code: string
  play_code: string
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  away_odds: number
  home_odds: number
  single_game_limit: number
  single_side_limit: number
  single_bet_least: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
  auto_odds_type: AutoOddsType
}

function FormData({
  data,
  form,
}: {
  data: OddsFormProps
  form: FormInstance<OddsFormProps>
}) {
  const [gameOpts] = useOptionsContext().game

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacing={3} mb="15px">
        <Form.Item label="球种" name="game_code">
          <Select options={gameOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="场次" name="section_code">
          <Select options={sectionOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="玩法" name="play_code">
          <Select options={playOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="启用" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="单注上限" name="single_bet_limit">
          <Input />
        </Form.Item>
        <Form.Item label="单注下限" name="single_bet_least">
          <Input />
        </Form.Item>
        <Form.Item label="单边上限" name="single_side_limit">
          <Input />
        </Form.Item>
        <Form.Item label="单场上限" name="single_game_limit">
          <Input />
        </Form.Item>
        <Form.Item label="主赔" name="home_odds">
          <Input />
        </Form.Item>
        <Form.Item label="客赔" name="away_odds">
          <Input />
        </Form.Item>

        <Form.Item label="押跳类型" name="auto_odds_type">
          <Select options={autoOddsTypeOpts} />
        </Form.Item>
        <Form.Item label="押跳金额" name="auto_odds_amount_unit">
          <Input />
        </Form.Item>
        <Form.Item label="押跳修正比例(%)" name="auto_odds_rate_unit">
          <Input placeholder="%" />
        </Form.Item>
        <Spacer />

        <Form.Item label="下注" name="is_open_bet" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="自动降赔" name="is_auto_odds" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
      <SimpleGrid columns={2} spacing={3} mb="15px">
        <Box as={Form.Item} label="主队(分数/输赢比例)" mb="0">
          <HStack>
            <Form.Item name="home_point">
              <Input placeholder="分数" />
            </Form.Item>
            <Form.Item name="home_percent">
              <Input placeholder="%" />
            </Form.Item>
          </HStack>
        </Box>
        <Box as={Form.Item} label="客队(分数/输赢比例)" mb="0">
          <HStack>
            <Form.Item name="away_point">
              <Input placeholder="分数" />
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
