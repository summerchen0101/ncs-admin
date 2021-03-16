import { BetSetting } from '@/types/api/Member'
import { Form, FormInstance } from 'antd'
import React, { useEffect } from 'react'
import BatchBetSettings from './BatchBetSettings'
import BetSettingsTabGroup from './BetSettingsTabGroup'
import { BetSettingFormProps } from './FormData'

export interface EditBetSettingFormProps {
  bet_settings: BetSettingFormProps
}

function EditBetSettingFormData({ data }: { data: EditBetSettingFormProps }) {
  return (
    <Form layout="vertical" initialValues={data}>
      <BetSettingsTabGroup />
    </Form>
  )
}

export default EditBetSettingFormData
