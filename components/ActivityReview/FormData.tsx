import { ActivityReview } from '@/types/api/ActivityReview'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Form, FormInstance } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
export interface ActivityReviewFormProps extends ActivityReview {}

function FormData({
  data,
  form,
}: {
  data: ActivityReviewFormProps
  form: FormInstance<ActivityReviewFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  const { toCurrency, toDateTime } = useTransfer()
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="活動名稱">
          {data.activity.title}
        </Descriptions.Item>
        <Descriptions.Item label="申請人">
          {data.member.acc}[{data.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="活動獎金">
          ${toCurrency(data.bonus)}
        </Descriptions.Item>
        <Descriptions.Item label="申請時間">
          {toDateTime(data.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Form>
  )
}

export default FormData
