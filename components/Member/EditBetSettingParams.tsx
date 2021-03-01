import { useDataContext } from '@/context/DataContext'
import { MemberType } from '@/lib/enums'
import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, InputNumber, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useMemo } from 'react'
import { paramsOpts } from './FormData'

interface BetSettingParamsProps {
  game: OptionType
  section: OptionType
  play: OptionType
  parentParams?: Partial<BetSetting>
  data: BetSetting
}

function EditBetSettingParams({
  game,
  section,
  play,
  parentParams,
  data,
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
  const { doEditBetSetting, fetchBetSetting } = useMemberService()
  const [form] = useForm<BetSetting>()
  const handleSubmit = async () => {
    const d = await form.validateFields()
    try {
      await doEditBetSetting({
        id: data.id,
        ...d,
      })
    } catch (err) {}
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 6]}>
        {memberParamsOpts.map((t, t_i) => (
          <Form.Item
            key={t_i}
            label={t.label}
            valuePropName={t.value === 'is_open_bet' ? 'checked' : 'value'}
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
            name={t.value}
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
        <Button
          size="sm"
          borderRadius="sm"
          colorScheme="teal"
          mt={['auto', '30px']}
          mb={['30px', 'auto']}
          onClick={handleSubmit}
        >
          更新
        </Button>
      </SimpleGrid>
    </Form>
  )
}

export default EditBetSettingParams
