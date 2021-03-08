import {
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
} from '@chakra-ui/accordion'
import Icon from '@chakra-ui/icon'
import { HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import { IconType } from 'react-icons'
import { BiLink } from 'react-icons/bi'

function PanelHeader({
  title,
  icon,
  ...props
}: { title: string; icon: IconType } & AccordionButtonProps) {
  return (
    <h2>
      <AccordionButton
        shadow="sm"
        bg="gray.500"
        color="white"
        borderTopRadius="md"
        _hover={null}
        _focus={null}
        {...props}
      >
        <HStack flex="1" textAlign="left" spacing="3px" fontWeight="500">
          <Icon as={icon} fontSize="20px" />
          <Text>{title}</Text>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  )
}

export default PanelHeader
