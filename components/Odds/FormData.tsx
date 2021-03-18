import { useOptionsContext } from '@/context/OptionsContext'
import { AutoOddsType } from '@/lib/enums'
import { autoOddsTypeOpts, playOpts, sectionOpts } from '@/lib/options'
import { Box, Flex, HStack, SimpleGrid, Spacer } from '@chakra-ui/react'
import {
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
  Switch,
} from 'antd'
import React, { useEffect } from 'react'

export interface OddsFormProps {
  id?: number
  game_code: string
  section_code: string
  play_code: string
  home_point: number
  away_point: number
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

  fix_point: number
  fix_percent: number
  home_fix_odds: number
  away_fix_odds: number
}

function FormData({
  data,
  form,
}: {
  data: OddsFormProps
  form: FormInstance<OddsFormProps>
}) {
  const [gameOpts] = useOptionsContext().game

  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacingX="20px" mb="15px">
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
      </SimpleGrid>
      <SimpleGrid columns={2} spacingX="20px" mb="15px">
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

        <Form.Item label="比分(主/客)">
          <HStack>
            <Form.Item name="home_point" noStyle>
              <Input placeholder="主" />
            </Form.Item>
            <Form.Item name="away_point" noStyle>
              <Input placeholder="客" />
            </Form.Item>
          </HStack>
        </Form.Item>
        <Form.Item label="下注" name="is_open_bet" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="修正赔率(主/客)">
          <HStack>
            <Form.Item name="home_fix_odds" noStyle>
              <Input placeholder="主" />
            </Form.Item>
            <Form.Item name="away_fix_odds" noStyle>
              <Input placeholder="客" />
            </Form.Item>
          </HStack>
        </Form.Item>
        <Form.Item label="修正盘口值(分数/获胜％)">
          <HStack>
            <Form.Item name="fix_point" noStyle>
              <Input placeholder="分数" />
            </Form.Item>
            <Form.Item name="fix_percent" noStyle>
              <Input placeholder="％" />
            </Form.Item>
          </HStack>
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">押跳设置</Divider>
      <SimpleGrid columns={2} spacingX="20px" mb="15px">
        <Form.Item label="变动类型" name="auto_odds_type">
          <Select options={autoOddsTypeOpts} />
        </Form.Item>
        <Form.Item label="触发金额" name="auto_odds_amount_unit">
          <Input />
        </Form.Item>
        <Form.Item label="修正比例(%)" name="auto_odds_rate_unit">
          <Input placeholder="%" />
        </Form.Item>
        <Form.Item label="启用押跳" name="is_auto_odds" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
