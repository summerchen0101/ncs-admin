import { Input, SimpleGrid, Stack, Switch, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormField from '../FormField'

export interface MarqueeFormProps {
  id?: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: string
  end_at: string
}

function FormData({ data }: { data: MarqueeFormProps }) {
  const { errors, register } = useFormContext<MarqueeFormProps>()
  return (
    <Stack as="form" spacing="20px">
      <SimpleGrid columns={[1, 2]} spacing="15px">
        <FormField label="起始日期" code="start_at" errors={errors}>
          <Input
            ref={register}
            name="start_at"
            defaultValue={data.start_at}
            bgColor="gray.100"
            placeholder="ex: 2021-01-02"
          />
        </FormField>
        <FormField label="結束日期" code="end_at" errors={errors}>
          <Input
            ref={register}
            name="end_at"
            defaultValue={data.end_at}
            bgColor="gray.100"
            placeholder="ex: 2021-01-02"
          />
        </FormField>
      </SimpleGrid>
      <FormField label="內容" code="content" errors={errors}>
        <Textarea
          name="content"
          ref={register({ required: '內容必填' })}
          defaultValue={data.content}
          bgColor="gray.100"
        />
      </FormField>

      <SimpleGrid columns={2} spacing="15px">
        <FormField label="啟用" code="is_active" errors={errors}>
          <Switch
            name="is_active"
            colorScheme="blue"
            size="lg"
            defaultChecked={data.is_active}
            ref={register}
          />
        </FormField>
      </SimpleGrid>
    </Stack>
  )
}

export default FormData
