import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import { Input, SimpleGrid, Stack, Switch, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import BasicSelect from '../BasicSelect'
import FormField from '../FormField'

export interface NewsFormProps {
  id?: number
  title: string
  content: string
  news_type: NewsType
  is_active: boolean
  start_at: number
  end_at: number
}

function FormData({ data }: { data: NewsFormProps }) {
  const { errors, register } = useFormContext<NewsFormProps>()
  return (
    <Stack as="form" spacing="20px">
      <SimpleGrid columns={[1, 2]} spacing="15px">
        <FormField label="標題" code="title" errors={errors}>
          <Input
            name="title"
            ref={register({ required: '標題必填' })}
            defaultValue={data.title}
            bgColor="gray.100"
          />
        </FormField>
        <FormField label="類型" code="title" errors={errors}>
          <BasicSelect options={newsTypeOpts} />
        </FormField>
        <FormField label="起始日期" code="start_at" errors={errors}>
          <Input type="date" ref={register} name="start_at" />
        </FormField>
        <FormField label="結束日期" code="end_at" errors={errors}>
          <Input type="date" ref={register} name="end_at" />
        </FormField>
      </SimpleGrid>
      <FormField label="內容" code="title" errors={errors}>
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
            colorScheme="teal"
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
