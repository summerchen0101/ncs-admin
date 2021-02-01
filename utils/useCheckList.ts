import { useState } from 'react'

const useCheckList = function <T>(targetArr: T[]) {
  const [checked, setChecked] = useState<number[]>([])

  const addChecked = (index: number) => setChecked((arr) => arr.concat(index))

  const subChecked = (index: number) =>
    setChecked((arr) => arr.filter((n) => n !== index))

  const toggleChecked = (index: number) => {
    checked.includes(index) ? subChecked(index) : addChecked(index)
  }

  const checkedAll = () =>
    setChecked([...Array(targetArr.length)].map((_, i) => i))

  const unCheckedAll = () => setChecked([])

  const toggleCheckedAll = () => {
    checked.length < targetArr.length ? checkedAll() : unCheckedAll()
  }

  return {
    toggleChecked,
    toggleCheckedAll,
    unCheckedAll,
    addChecked,
    subChecked,
    checkedAll,
    checked,
  }
}

export default useCheckList
