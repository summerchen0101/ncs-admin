import PageHeader from '@/components/MemberParams/PageHeader'
import { useDataContext } from '@/context/DataContext'
import { AccountingType, MemberType } from '@/lib/enums'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import Dashboard from '../Dashboard'
import FooterButtons from './FooterButtons'
import ParamsForm, { MemberFormProps } from './ParamsForm'

const EditEntry: React.FC = () => {
  const { doEdit } = useMemberService()
  const { viewData } = useDataContext<Member>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
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
      {viewData && (
        <ParamsForm
          form={form}
          data={{
            id: viewData.id,
            acc: viewData.acc,
            name: viewData.name,
            pass: '',
            member_type: MemberType.Agent,
            accounting_type: AccountingType.Cash,
            is_active: viewData.is_active,
          }}
        />
      )}

      <FooterButtons onSubmit={handleSubmit} />
    </Dashboard>
  )
}

export default EditEntry
