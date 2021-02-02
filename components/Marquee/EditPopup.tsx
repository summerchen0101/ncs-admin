import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import moment from 'moment'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { MarqueeFormProps } from './FormData'

function EditPopup() {
  const methods = useForm<MarqueeFormProps>()
  const { handleSubmit, formState } = methods
  const { doEdit } = useMarqueeService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { toDate } = useTransfer()
  const { viewData } = useDataContext<Marquee>()
  const onSubmit = handleSubmit(async (d) => {
    await doEdit({
      id: viewData.id,
      content: d.content,
      url: d.url,
      is_blank: d.is_blank,
      is_active: d.is_active,
      start_at: moment(d.start_at).startOf('d').unix(),
      end_at: moment(d.end_at).endOf('d').unix(),
    })
  })
  if (!viewData) return <></>
  return (
    <PopupForm
      title="編輯跑馬燈"
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
            url: viewData.url,
            content: viewData.content,
            start_at: toDate(viewData.start_at),
            end_at: toDate(viewData.end_at),
            is_blank: viewData.is_blank,
            is_active: viewData.is_active,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default EditPopup
