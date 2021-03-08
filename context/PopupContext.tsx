import React, { createContext, useContext, useState } from 'react'

type PopupProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface IState {
  searchBar: PopupProps<boolean>
  createForm: PopupProps<boolean>
  editForm: PopupProps<boolean>
  passForm: PopupProps<boolean>
  tradePassForm: PopupProps<boolean>
  view: PopupProps<boolean>
  betSetting: PopupProps<boolean>
  score: PopupProps<boolean>
  credit: PopupProps<boolean>
}

const PopupContext = createContext<IState | null>(null)

const PopupProvider: React.FC = ({ children }) => {
  const initialState: IState = {
    searchBar: useState(true),
    createForm: useState(false),
    editForm: useState(false),
    passForm: useState(false),
    tradePassForm: useState(false),
    view: useState(false),
    betSetting: useState(false),
    score: useState(false),
    credit: useState(false),
  }
  return (
    <PopupContext.Provider value={initialState}>
      {children}
    </PopupContext.Provider>
  )
}

export default PopupProvider

export const usePopupContext = (popupName: keyof IState) => {
  const state = useContext(PopupContext)
  return state[popupName]
}
