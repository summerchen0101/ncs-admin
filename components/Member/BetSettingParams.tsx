import { useDataContext } from '@/context/DataContext'
import { MemberType } from '@/lib/enums'
import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import useHelper from '@/utils/useHelper'
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, InputNumber, Switch } from 'antd'
import React, { useMemo } from 'react'
import { paramsOpts } from './FormData'

interface BetSettingParamsProps {
  game: OptionType
  section: OptionType
  play: OptionType
}

function BetSettingParams({ game, section, play }: BetSettingParamsProps) {
  const { betSettingMemberType } = useDataContext()
  const { createBetSettingObj } = useHelper()
  const { parentBetSettings } = useDataContext()
  const parentParams = useMemo(
    () =>
      createBetSettingObj(parentBetSettings)?.[game.value]?.[section.value]?.[
        play.value
      ],
    [parentBetSettings],
  )
  return (
    <Box>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 5]}>
        {paramsOpts[betSettingMemberType || MemberType.Agent].map((t, t_i) => (
          <Form.Item
            help={
              parentParams?.[t.value] &&
              t.value !== 'is_open_bet' &&
              `上限為 ${parentParams?.[t.value]}`
            }
            valuePropName={t.value === 'is_open_bet' ? 'checked' : 'value'}
            key={t_i}
            label={t.label}
            rules={[
              { required: true },
              {
                validator: async (rule, value) => {
                  if (value > parentParams?.[t.value]) {
                    throw new Error(`上限為 ${parentParams?.[t.value]}`)
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
