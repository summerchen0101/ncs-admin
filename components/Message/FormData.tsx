import { MemberType } from '@/lib/enums'
import { memberTypeOpts, newsTypeOpts } from '@/lib/options'
import {
  FormHelperText,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { HiOutlineLightBulb } from 'react-icons/hi'
import BasicSelect from '../BasicSelect'
import FormField from '../FormField'

export interface MessageFormProps {
  id?: number
  title: string
  content: string
  receivers: string
  member_type: MemberType
  is_all: boolean
}

function FormData({ data }: { data: MessageFormProps }) {
  const { errors, register } = useFormContext<MessageFormProps>()
  return (
    <Stack as="form" spacing="20px">
      <SimpleGrid columns={[1, 2]} spacing="15px">
        <FormField label="標題" code="title" errors={errors}>
          <Input
            name="title"
            ref={register({ required: '標題必填' })}
            defaultValue={data.title}

          />
        </FormField>
        <FormField label="類型" code="member_type" errors={errors}>
          <Select
            as={BasicSelect}
            ref={register({ required: '類型必填' })}
            name="member_type"
            options={memberTypeOpts}
            placeholder="請選擇"

            defaultValue={data.member_type}
          />
        </FormField>
        <FormField label="帳號" code="receivers" errors={errors}>
          <Textarea
            ref={register({ required: true })}
            name="receivers"
            placeholder="ex: summer,cindy"

            defaultValue={data.receivers}
          />
          <FormHelperText>＊多組請用「,」分隔。</FormHelperText>
        </FormField>
        <FormField label="全部帳號" code="is_all" errors={errors}>
          <Switch
            ref={register}
            name="is_all"
            size="lg"
            defaultChecked={data.is_all}
            colorScheme="brand"
          />
        </FormField>
      </SimpleGrid>

      <FormField label="內容" code="content" errors={errors}>
        <Textarea
          name="content"
          ref={register({ required: '內容必填' })}
          defaultValue={data.content}

        />
      </FormField>
    </Stack>
  )
}

export default FormData
