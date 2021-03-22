import { useDataContext } from '@/context/DataContext'
import { MemberType, Play, Section, SportGame } from '@/lib/enums'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { BetSetting } from '@/types/api/Member'
import { Box, SimpleGrid } from '@chakra-ui/react'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { Fragment, useCallback, useMemo } from 'react'
import { paramsOpts } from './FormData'

export type PartialBetSettingFormProps = Record<
  string,
  Record<string, Record<string, Partial<BetSetting>>>
>

interface BatchBetSettingsProps {
  onChange: (settings: PartialBetSettingFormProps) => void
}

type FormProps = {
  gameCodes: SportGame[]
  sectionCodes: Section[]
  playCodes: Play[]
  risk_percent: number
  fee_percent: number
  rebate_percent: number
  single_game_limit: number
  single_side_limit: number
  single_bet_limit: number
  single_bet_least: number
  is_open_bet: boolean
}

function BatchBetSettings({ onChange }: BatchBetSettingsProps) {
  const [form] = useForm<FormProps>()
  const { betSettingMemberType } = useDataContext()

  const data = useMemo<FormProps>(
    () => ({
      gameCodes: gameOpts.map((t) => t.value),
      sectionCodes: sectionOpts.map((t) => t.value),
      playCodes: playOpts.map((t) => t.value),
      risk_percent: null,
      rebate_percent: null,
      fee_percent: null,
      single_game_limit: null,
      single_side_limit: null,
      single_bet_limit: null,
      single_bet_least: null,
      is_open_bet: true,
    }),
    [],
  )

  const handleBatchUpdate = useCallback((paramKey) => {
    const settings: PartialBetSettingFormProps = {}
    form.getFieldValue('gameCodes').forEach((g) => {
      settings[g] = {}
      form.getFieldValue('sectionCodes').forEach((s) => {
        settings[g][s] = {}
        form.getFieldValue('playCodes').forEach((p) => {
          settings[g][s][p] = {
            [paramKey]: form.getFieldValue(paramKey),
          }
        })
      })
    })
    onChange(settings)
    if (paramKey !== 'is_open_bet') {
      form.resetFields([paramKey])
    }
  }, [])

  return (
    <Box as={Form} form={form} initialValues={data}>
      <Divider orientation="left">游戏参数设置</Divider>
      <SimpleGrid spacingX="20px" columns={[1, 3]}>
        <Form.Item label="球种" name="gameCodes">
          <Select mode="multiple" options={gameOpts} />
        </Form.Item>
        <Form.Item label="场次" name="sectionCodes">
          <Select mode="multiple" options={sectionOpts} />
        </Form.Item>
        <Form.Item label="玩法" name="playCodes">
          <Select mode="multiple" options={playOpts} />
        </Form.Item>
      </SimpleGrid>
      <SimpleGrid spacingX="20px" columns={[2, 5]}>
        {paramsOpts[betSettingMemberType || MemberType.Agent].map(
          (params, p_i) => (
            <Fragment key={p_i}>
              {params.value === 'is_open_bet' ? (
                <Form.Item
                  name={params.value}
                  label={params.label}
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => handleBatchUpdate(params.value)} />
                </Form.Item>
              ) : (
                <Form.Item label={params.label}>
                  <Input.Group compact>
                    <Form.Item noStyle name={params.value}>
                      <InputNumber
                        style={{ width: '60%' }}
                        step={100}
                        min={0}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleBatchUpdate(params.value)}
                      >
                        OK
                      </Button>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              )}
            </Fragment>
          ),
        )}
      </SimpleGrid>
    </Box>
  )
}

export default BatchBetSettings
