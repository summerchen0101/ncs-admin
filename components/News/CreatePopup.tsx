import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { News } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
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
      news_type: d.news_type,
      is_active: d.is_active,
      start_at: 0,
      end_at: 0,
    })
  })
  return (
    <PopupForm
      title="新增管理員"
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
