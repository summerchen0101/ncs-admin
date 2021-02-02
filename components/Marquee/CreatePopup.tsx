import { usePopupContext } from '@/context/PopupContext'
import useMarqueeService from '@/utils/services/useMarqueeService'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { MarqueeFormProps } from './FormData'
function CreatePopup() {
  const methods = useForm<MarqueeFormProps>()
  const { handleSubmit, formState } = methods
  const { doCreate } = useMarqueeService()
  const [visible, setVisible] = usePopupContext('createForm')
  const onSubmit = handleSubmit(async (d) => {
    await doCreate({
      content: d.content,
      url: d.url,
      is_blank: d.is_blank,
      is_active: d.is_active,
      start_at: moment(d.start_at).startOf('d').unix(),
      end_at: moment(d.end_at).endOf('d').unix(),
    })
  })
  return (
    <PopupForm
      title="新增最新消息"
      isOpen={visible}
      onSubmit={onSubmit}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <FormProvider {...methods}>
        <FormData
          data={{
            content: '',
            url: '',
            start_at: null,
            end_at: null,
            is_blank: false,
            is_active: true,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default CreatePopup
