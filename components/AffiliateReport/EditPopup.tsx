import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { MemberReport } from '@/types/api/MemberReport'
import useMemberReportService from '@/utils/services/useMemberReportService'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { HStack, Spacer, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Tag } from '@chakra-ui/tag'
import { Button, Descriptions, Divider, Modal } from 'antd'
import React, { useEffect } from 'react'
import { BiMinus, BiPlus, BiTime, BiX } from 'react-icons/bi'

function EditPopup() {
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<MemberReport>()
  const { toCurrency, toDateTime } = useTransfer()
  const [isSmaller] = useMediaQuery('(max-width : 768px)')

  const handleCancel = async () => {
    setVisible(false)
  }

  if (!viewData) return <></>
  return (
    <Modal
      title="绩效审核"
      visible={visible}
      onCancel={handleCancel}
      width={700}
      footer={false}
    >
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="基本资讯"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        <Descriptions.Item label="帐号/暱称" span={2}>
          apple3[苹果3]
        </Descriptions.Item>
        <Descriptions.Item label="总会员数">100</Descriptions.Item>
        <Descriptions.Item label="有效会员数">80</Descriptions.Item>
        <Descriptions.Item label="未提领佣金">2,200</Descriptions.Item>
        <Descriptions.Item label="总累计佣金">21,231</Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="本期会员绩效"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        <Descriptions.Item label="活跃会员数">90</Descriptions.Item>
        <Descriptions.Item label="会员净输值">123,200</Descriptions.Item>
        <Descriptions.Item label="累计流水量">121,300</Descriptions.Item>
        <Descriptions.Item label="累计储值金">322,221</Descriptions.Item>
        <Descriptions.Item label="绩效等级">
          <Text color="brown.500" fontWeight="600" fontSize="16px">
            白金级
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="本期佣金计算"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        <Descriptions.Item label="输赢结果">21,231</Descriptions.Item>
        <Descriptions.Item label="优惠礼金">10,231</Descriptions.Item>
        <Descriptions.Item label="公司费用">1,231</Descriptions.Item>
        {/* <Descriptions.Item label="派彩金额说明">
          <>
            <Text>代理佣金 = 当月纯盈利 X 佣金比例</Text>
            <Text>当月纯盈利 = 总输赢 - 优惠礼金 - 公司费用</Text>
          </>
        </Descriptions.Item> */}
        <Descriptions.Item label="佣金比例">
          <Text color="brown.500" fontWeight="600" fontSize="16px">
            20 %
          </Text>
        </Descriptions.Item>
        {!isSmaller && (
          <Descriptions.Item label="退佣计算" span={2}>
            <HStack>
              <HStack
                bg="gray.100"
                border="1px solid #ddd"
                px="10px"
                py="5px"
                borderRadius="md"
              >
                <Tag colorScheme="green" variant="solid">
                  会员输赢
                </Tag>
                <Icon as={BiMinus} />
                <Tag colorScheme="red" variant="solid">
                  优惠礼金
                </Tag>
                <Icon as={BiMinus} />
                <Tag colorScheme="red" variant="solid">
                  公司费用
                </Tag>
              </HStack>
              <Icon as={BiX} />
              <Tag colorScheme="brand" variant="solid">
                佣金比例
              </Tag>
            </HStack>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="派彩金额" span={2}>
          <Text color="pink.500" fontSize="22px" fontWeight="600">
            $ 5,231
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <Spacer mb="30px" />
    </Modal>
  )
}

export default EditPopup
