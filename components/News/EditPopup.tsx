import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { News } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
import useTransfer from '@/utils/useTransfer'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { NewsFormProps } from './FormData'

function EditPopup() {
  const methods = useForm<NewsFormProps>()
  const { handleSubmit, formState } = methods
  const { doEdit } = useNewsService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { toDate } = useTransfer()
  const { viewData } = useDataContext<News>()
  const onSubmit = handleSubmit(async (d) => {
    await doEdit({
      id: viewData.id,
      title: d.title,
      content: d.content,
      news_type: +d.news_type,
      is_active: d.is_active,
      start_at: moment(d.start_at).startOf('d').unix(),
      end_at: moment(d.end_at).endOf('d').unix(),
    })
  })
  if (!viewData) return <></>
  return (
    <PopupForm
      title="編輯最新消息"
      onSubmit={onSubmit}
      isOpen={visible}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <FormProvider {...methods}>
        <FormData
          data={{
            id: viewData.id,
            title: viewData.title,
            content: viewData.content,
            news_type: viewData.news_type,
            start_at: toDate(viewData.start_at),
            end_at: toDate(viewData.end_at),
            is_active: viewData.is_active,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default EditPopup
