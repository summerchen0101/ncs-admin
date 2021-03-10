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
        <AccordionButton
          borderTopRadius="4px"
          bg="brand.600"
          color="white"
          _hover={{ bg: 'brand.500' }}
          _focus={{}}
        >
          <HStack flex="1" textAlign="left" spacing="5px">
            <Icon as={icon} fontSize="20px" />
            <Text>{title}</Text>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel
        py="4"
        bg="gray.400"
        overflowX="auto"
        borderBottomRadius="4px"
      >
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default MyAccordionItem
