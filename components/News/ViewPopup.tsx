import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { News } from '@/types/api/News'
import useMemberBankService from '@/utils/services/useMemberBankService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { newsTypeOpts } from '@/lib/options'

function ViewPopup() {
  const { setConfirm } = useMemberBankService()
  const [visible, setVisible] = usePopupContext('view')
  const { viewData } = useDataContext<News>()
  const { toDate, toDateTime, toOptionName } = useTransfer()
  const handleSubmit = async () => {
    try {
      await setConfirm(viewData.id, true)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="公告內容"
      visible={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      footer={false}
    >
      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ width: '100px' }}
      >
        <Descriptions.Item label="分類">
          {toOptionName(newsTypeOpts, viewData.news_type)}
        </Descriptions.Item>
        <Descriptions.Item label="標題">{viewData.title}</Descriptions.Item>
        <Descriptions.Item label="活動期間">
          {viewData.start_at
            ? `${toDate(viewData.start_at)} ~ ${toDate(viewData.end_at)}`
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="內容">
          <Box whiteSpace="pre-wrap">{viewData.content}</Box>
        </Descriptions.Item>

        <Descriptions.Item label="發布時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
