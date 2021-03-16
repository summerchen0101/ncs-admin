import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, FormInstance, Input, InputNumber, Select } from 'antd'
import React, { useEffect } from 'react'

export interface DefaultBetFormProps {
  id?: number
  game_code: string
}

function FormData({
  data,
  form,
}: {
  data: DefaultBetFormProps
  form: FormInstance<DefaultBetFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacingX="15px">
        <Form.Item label="球种" name="game_code" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
            options={gameOpts}
            disabled={!!data.id}
          />
        </Form.Item>
        <Form.Item label="名称" name="game_code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="备注" name="game_code">
        <Input />
      </Form.Item>
      {sectionOpts.map((s) => (
        <Box key={s.value}>
          <Text color="teal.500" fontSize="md" mb="5px" fontWeight="500">
            {s.label}
          </Text>
          <SimpleGrid columns={playOpts.length} spacing="15px">
            {playOpts.map((p) => (
              <Form.Item key={p.value} label={p.label}>
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={0}
                  step={0.1}
                />
              </Form.Item>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Form>
  )
}

export default FormData
