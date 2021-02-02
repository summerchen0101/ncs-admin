import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { memberTypeOpts } from '@/lib/options'
import { Message } from '@/types/api/Message'
import useMessageService from '@/utils/services/useMessageService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Input,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormField from '../FormField'
import PopupForm from '../PopupForm'
import FormData, { MessageFormProps } from './FormData'

const inputStyle = {
  bgColor: 'gray.100',
  disabled: true,
  _disabled: { color: 'gray.700' },
}

function EditPopup() {
  const [visible, setVisible] = usePopupContext('editForm')
  const { toDate, toOptionName } = useTransfer()
  const { viewData } = useDataContext<Message>()
  if (!viewData) return <></>
  return (
    <PopupForm
      title="站內信詳情"
      isOpen={visible}
      onClose={() => setVisible(false)}
      size="lg"
    >
      <Stack spacing="20px">
        <SimpleGrid columns={[1, 2]} spacing="15px">
          <FormField label="標題" code="title">
            <Input defaultValue={viewData.title} {...inputStyle} />
          </FormField>
          <FormField label="類型" code="member_type">
            <Input
              defaultValue={toOptionName(memberTypeOpts, viewData.member_type)}
              {...inputStyle}
            />
          </FormField>
          <FormField label="帳號" code="receivers">
            <Input name="receivers" {...inputStyle} />
          </FormField>
          <FormField label="全部" code="receivers">
            <Switch
              isChecked={viewData.is_all}
              size="lg"
              colorScheme="brand"
              disabled
            />
          </FormField>
        </SimpleGrid>

        <FormField label="內容" code="content">
          <Textarea defaultValue={viewData.content} {...inputStyle} />
        </FormField>
      </Stack>
    </PopupForm>
  )
}

export default EditPopup
