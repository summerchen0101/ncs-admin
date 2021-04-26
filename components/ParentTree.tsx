import { MemberType } from '@/lib/enums'
import { ParentTreeItem } from '@/types/api/Member'
import { Stack, Text } from '@chakra-ui/layout'
import React, { Fragment } from 'react'

interface ParentTreeProps {
  tree: ParentTreeItem[]
}

export default function ParentTree({ tree }: ParentTreeProps) {
  return (
    <Stack
      direction={['column', 'row']}
      mb="7px"
      fontWeight="500"
      color="gray.700"
    >
      {tree?.map((t, i) => (
        <Fragment key={i}>
          <Text>
            {t.acc}[{t.name}]
            <Text as="span" color="brown.500">
              ({t.member_type === MemberType.Agent ? '代' : '會'})
            </Text>
            {i !== tree.length - 1 && (
              <Text as="span" ml="2" color="gray.500">
                {'>'}
              </Text>
            )}
          </Text>
        </Fragment>
      ))}
    </Stack>
  )
}
