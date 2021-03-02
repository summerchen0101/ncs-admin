import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
} from '@chakra-ui/accordion'
import Icon from '@chakra-ui/icon'
import { HStack, Text } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons'

interface MyAccordionItemProps {
  title: string
  icon?: IconType
  children?: ReactNode
}

function MyAccordionItem({
  title,
  icon,
  children,
  ...props
}: MyAccordionItemProps & AccordionItemProps) {
  return (
    <AccordionItem {...props}>
      <h2>
        <AccordionButton bg="white" _hover={{ bg: 'white' }}>
          <HStack flex="1" textAlign="left" spacing="3px">
            <Icon as={icon} />
            <Text>{title}</Text>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel py="4" bg="gray.400" overflowX="auto">
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default MyAccordionItem
