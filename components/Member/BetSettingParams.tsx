import { useDataContext } from '@/context/DataContext'
import { MemberType } from '@/lib/enums'
import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, InputNumber, Switch } from 'antd'
import React, { useMemo } from 'react'
import { paramsOpts } from './FormData'

interface BetSettingParamsProps {
  game: OptionType
  section: OptionType
  play: OptionType
  parentParams?: Partial<BetSetting>
}

function BetSettingParams({
  game,
  section,
  play,
  parentParams,
}: BetSettingParamsProps) {
  const { betSettingMemberType } = useDataContext()
  const memberParamsOpts = useMemo(() => {
    if (betSettingMemberType === MemberType.Member) {
      return paramsOpts.filter(
        (t) => !['rebate_percent', 'fee_percent'].includes(t.value),
      )
    }
    return paramsOpts
  }, [betSettingMemberType])
  return (
    <Box>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 5]}>
        {memberParamsOpts.map((t, t_i) => (
          <Form.Item
            valuePropName={t.value === 'is_open_bet' ? 'checked' : 'value'}
            key={t_i}
            label={t.label}
            rules={[
              { required: true },
              {
                validator: async (rule, value) => {
                  if (value > parentParams?.[t.value]) {
                    throw new Error(`最大值為${parentParams?.[t.value]}`)
                  }
                },
              },
            ]}
            name={[
              'bet_settings',
              game.value,
              section.value,
              play.value,
              t.value,
            ]}
            fieldKey={[
              'bet_settings',
              game.value,
              section.value,
              play.value,
              t.value,
            ]}
          >
            {t.value === 'is_open_bet' ? (
              <Switch />
            ) : (
              <InputNumber
                id={`${game.value}-${section.value}-${play.value}-${t.value}`}
                style={{ width: '100%' }}
                step={100}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            )}
          </Form.Item>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default BetSettingParams
