import { useOptionsContext } from '@/context/OptionsContext'
import { AutoOddsType } from '@/lib/enums'
import { autoOddsTypeOpts, playOpts, sectionOpts } from '@/lib/options'
import { Odds } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import { Box, Flex, HStack, Icon, SimpleGrid, Spacer } from '@chakra-ui/react'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
} from 'antd'
import numeral from 'numeral'
import React, { useEffect, useMemo } from 'react'
import { HiArrowDown, HiArrowUp } from 'react-icons/hi'

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

  fake_bet_sum: number

  home_odds: number
  away_odds: number

  incr_point?: number
  incr_percent?: number
  incr_odds?: number
  is_home?: boolean
  is_balance_odds?: boolean

  final_home_odds?: number
  final_away_odds?: number
}

function FormData({
  data,
  form,
}: {
  data: OddsFormProps
  form: FormInstance<OddsFormProps>
}) {
  const [gameOpts] = useOptionsContext().game
  const isLiveEvent = useMemo(() => !!data.home_odds, [data])
  const { addOdds } = useOddsService()

  const handleOddsFix = async (incr_odds: number, side: 'home' | 'away') => {
    const fixOdds = numeral(form.getFieldValue(`${side}_fix_odds`))
      .add(incr_odds)
      .value()
    await addOdds({ id: data.id, incr_odds, is_home: side === 'home' })
    form.setFieldsValue({
      [`${side}_fix_odds`]: fixOdds,
      [`final_${side}_odds`]: numeral(form.getFieldValue(`${side}_odds`))
        .add(fixOdds)
        .value(),
    })
  }

  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={[2, 4]} spacingX="20px" mb="15px">
        <Form.Item label="球种" name="game_code">
          <Select
            options={gameOpts}
            placeholder="请选择"
            disabled={!!data.id}
          />
        </Form.Item>
        <Form.Item label="场次" name="section_code">
          <Select
            options={sectionOpts}
            placeholder="请选择"
            disabled={!!data.id}
          />
        </Form.Item>
        <Form.Item label="玩法" name="play_code">
          <Select
            options={playOpts}
            placeholder="请选择"
            disabled={!!data.id}
          />
        </Form.Item>
        <Form.Item label="启用" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="比分(主/客)">
          <HStack>
            <Form.Item name="home_point" noStyle>
              <Input placeholder="主" disabled={isLiveEvent} />
            </Form.Item>
            <Form.Item name="away_point" noStyle>
              <Input placeholder="客" disabled={isLiveEvent} />
            </Form.Item>
          </HStack>
        </Form.Item>
        <Form.Item label="虚拟交易量" name="fake_bet_sum">
          <InputNumber placeholder="0" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="下注" name="is_open_bet" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">限额设置</Divider>
      <SimpleGrid columns={[2, 4]} spacingX="20px" mb="15px">
        <Form.Item label="单注下限" name="single_bet_least">
          <Input />
        </Form.Item>
        <Form.Item label="单注上限" name="single_bet_limit">
          <Input />
        </Form.Item>
        <Form.Item label="单边上限" name="single_side_limit">
          <Input />
        </Form.Item>
        <Form.Item label="单场上限" name="single_game_limit">
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">盘口及赔率设置</Divider>
      {isLiveEvent ? (
        <SimpleGrid columns={[2, 3]} spacingX="20px" mb="15px">
          <Form.Item label="抓盘赔率(主/客)">
            <HStack>
              <Form.Item name="home_odds" noStyle>
                <Input placeholder="主" disabled />
              </Form.Item>
              <Form.Item name="away_odds" noStyle>
                <Input placeholder="客" disabled />
              </Form.Item>
            </HStack>
          </Form.Item>

          <Form.Item label="修正赔率(主/客)">
            <HStack>
              <Form.Item name="home_fix_odds" noStyle>
                <Input placeholder="主" disabled />
              </Form.Item>
              <Icon
                as={HiArrowUp}
                onClick={() => handleOddsFix(0.01, 'home')}
              />
              <Icon
                as={HiArrowDown}
                onClick={() => handleOddsFix(-0.01, 'home')}
              />
              <Form.Item name="away_fix_odds" noStyle>
                <Input placeholder="客" disabled />
              </Form.Item>
              <Icon
                as={HiArrowUp}
                onClick={() => handleOddsFix(0.01, 'away')}
              />
              <Icon
                as={HiArrowDown}
                onClick={() => handleOddsFix(-0.01, 'away')}
              />
            </HStack>
          </Form.Item>
          <Form.Item label="最终赔率(主/客)">
            <HStack>
              <Form.Item noStyle name="final_home_odds">
                <Input placeholder="主" disabled />
              </Form.Item>
              <Form.Item noStyle name="final_away_odds">
                <Input placeholder="客" disabled />
              </Form.Item>
            </HStack>
          </Form.Item>
          <Form.Item label="修正盘口值(分数/可赢%)">
            <HStack>
              <Form.Item name="fix_point" noStyle>
                <Input placeholder="分数" disabled />
              </Form.Item>
              <Form.Item name="fix_percent" noStyle>
                <Input placeholder="％" disabled />
              </Form.Item>
            </HStack>
          </Form.Item>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={[2, 3]} spacingX="20px" mb="15px">
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

          <Form.Item label="修正盘口值(分数/可赢%)">
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
      )}

      <Divider orientation="left">押跳设置</Divider>
      <SimpleGrid columns={[2, 4]} spacingX="20px" mb="15px">
        <Form.Item label="变动类型" name="auto_odds_type">
          <Select
            options={[{ label: '未设置', value: 0 }, ...autoOddsTypeOpts]}
          />
        </Form.Item>
        <Form.Item label="触发金额" name="auto_odds_amount_unit">
          <Input />
        </Form.Item>
        <Form.Item label="修正率" name="auto_odds_rate_unit">
          <Input />
        </Form.Item>
        <Form.Item label="启用押跳" name="is_auto_odds" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
