import { usePopupContext } from '@/context/PopupContext'
import useMessageService from '@/utils/services/useMessageService'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { MessageFormProps } from './FormData'
function CreatePopup() {
  const methods = useForm<MessageFormProps>()
  const { handleSubmit, formState } = methods
  const { doCreate } = useMessageService()
  const [visible, setVisible] = usePopupContext('createForm')
  const onSubmit = handleSubmit(async (d) => {
    await doCreate({
      title: d.title,
      content: d.content,
      member_type: +d.member_type,
      receivers: d.receivers.split(',').map((t) => t.trim()),
    })
  })
  return (
    <PopupForm
      title="寄送站內信"
      isOpen={visible}
      onSubmit={onSubmit}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <FormProvider {...methods}>
        <FormData
          data={{
            title: '',
            content: '',
            member_type: null,
            receivers: '',
            is_all: false,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default CreatePopup
