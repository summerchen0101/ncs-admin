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
    />
  )
}

export default SearchButton
