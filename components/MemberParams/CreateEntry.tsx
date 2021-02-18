import PageHeader from '@/components/MemberParams/PageHeader'
import { AccountingType, MemberType } from '@/lib/enums'
import useMemberService from '@/utils/services/useMemberService'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import Dashboard from '../Dashboard'
import FooterButtons from './FooterButtons'
import ParamsForm, { MemberFormProps } from './ParamsForm'

const CreateEntry: React.FC = () => {
  const { doCreate } = useMemberService()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        acc: d.acc,
        name: d.name,
        pass: d.pass,
        member_type: d.member_type,
        accounting_type: d.accounting_type,
        parent_id: 0,
        is_active: d.is_active,
      })
      form.resetFields()
    } catch (err) {}
  }
  const [form] = useForm<MemberFormProps>()
  return (
    <Dashboard>
      <PageHeader />
      <ParamsForm
        form={form}
        data={{
          acc: '',
          name: '',
          pass: '',
          member_type: MemberType.Agent,
          accounting_type: AccountingType.Cash,
          is_active: true,
        }}
      />
      <FooterButtons onSubmit={handleSubmit} />
    </Dashboard>
  )
}

export default CreateEntry
