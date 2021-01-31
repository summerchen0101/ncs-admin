import { Box, Icon } from '@chakra-ui/react'
import React from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from './TipIconButton'

const SearchButton: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  return (
    <TipIconButton
      label="搜尋列表"
      icon={<HiSearch />}
      onClick={onToggle}
      colorScheme="teal"
      borderRadius="full"
    />
    // <Box
    //   color="teal"
    //   onClick={onToggle}
    //   cursor="pointer"
    //   textColor="teal"
    //   p="1"
    //   borderRadius="full"
    // >
    //   <Icon as={HiSearch} fontSize="23px" />
    // </Box>
  )
}

export default SearchButton
