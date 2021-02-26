import { Play, Section, SportGame } from '@/lib/enums'
import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, Input, InputNumber } from 'antd'
import React from 'react'
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
  return (
    <Box>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 5]}>
        {paramsOpts.map((t, t_i) => (
          <Form.Item
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
            <InputNumber
              style={{ width: '100%' }}
              step={100}
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default BetSettingParams
