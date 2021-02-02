import React from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from './TipIconButton'

const SearchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TipIconButton
      label="搜尋列表"
      icon={<HiSearch />}
      onClick={onClick}
      colorScheme="blue"
      borderRadius="full"
    />
  )
}

export default SearchButton
