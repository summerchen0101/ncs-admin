import { usePopupContext } from '@/context/PopupContext'
import useNewsService from '@/utils/services/useNewsService'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { NewsFormProps } from './FormData'
function CreatePopup() {
  const methods = useForm<NewsFormProps>()
  const { handleSubmit, formState } = methods
  const { doCreate } = useNewsService()
  const [visible, setVisible] = usePopupContext('createForm')
  const onSubmit = handleSubmit(async (d) => {
    await doCreate({
      title: d.title,
      content: d.content,
      news_type: +d.news_type,
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
            title: '',
            content: '',
            news_type: null,
            start_at: null,
            end_at: null,
            is_active: true,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default CreatePopup
