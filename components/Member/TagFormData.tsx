import { useOptionsContext } from '@/context/OptionsContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import {
  accountingTypeOpts,
  memberTypeOpts,
  restoreTypeOpts,
} from '@/lib/options'
import { BetSetting, Member } from '@/types/api/Member'
import { SimpleGrid } from '@chakra-ui/react'
import { Form, FormInstance, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import ColorTagSelector from '../ColorTagSelector'

export interface TagFormProps {
  id?: number
  tag_ids: number[]
}

function TagFormData({
  data,
  form,
}: {
  data: TagFormProps
  form: FormInstance<TagFormProps>
}) {
  const [tagOpts] = useOptionsContext().tag

  useEffect(() => {
    form.setFieldsValue(data)
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標籤" name="tag_ids">
        <ColorTagSelector options={tagOpts} />
      </Form.Item>
    </Form>
  )
}

export default TagFormData
