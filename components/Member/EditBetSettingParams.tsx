import { useDataContext } from '@/context/DataContext'
import { MemberType } from '@/lib/enums'
import { OptionType } from '@/types'
import { BetSetting } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import { Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Checkbox, Form, InputNumber, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useMemo } from 'react'
import { paramsOpts } from './FormData'

interface BetSettingParamsProps {
  game: OptionType
  section: OptionType
  play: OptionType
  data: BetSetting
}

function EditBetSettingParams({
  game,
  section,
  play,
  data,
}: BetSettingParamsProps) {
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
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <HStack mb="3px" fontWeight="600" fontSize="16px">
        <Text>{game.label}</Text>
        <Text color="teal.500">{section.label}</Text>
        <Text color="orange.500">{play.label}</Text>
      </HStack>
      <SimpleGrid spacingX="20px" columns={[2, 5]}>
        {paramsOpts[betSettingMemberType]?.map((t, t_i) => (
          <Form.Item
            key={t_i}
            help={
              parentParams?.[t.value] &&
              t.value !== 'is_open_bet' &&
              `上限为 ${parentParams?.[t.value]}`
            }
            label={t.label}
            valuePropName={t.value === 'is_open_bet' ? 'checked' : 'value'}
            rules={[
              { required: true },
              {
                validator: async (rule, value) => {
                  if (
                    parentParams?.[t.value] &&
                    value > parentParams?.[t.value]
                  ) {
                    throw new Error(`上限为 ${parentParams?.[t.value]}`)
                  }
                },
              },
            ]}
            name={t.value}
          >
            {t.value === 'is_open_bet' ? (
              <Checkbox
                id={`${game.value}-${section.value}-${play.value}-${t.value}`}
              />
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
