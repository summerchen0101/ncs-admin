import React, { useEffect } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import TipIconButton from './TipIconButton'

type SearchButtonProps = { onClick: () => void; isOpen: boolean }

function SearchButton({ onClick, isOpen }: SearchButtonProps) {
  return (
    <TipIconButton
      label="搜尋列表"
      icon={isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      onClick={onClick}
      colorScheme="brand"
      bgColor="gray.600"
    />
  )
}

export default SearchButton
