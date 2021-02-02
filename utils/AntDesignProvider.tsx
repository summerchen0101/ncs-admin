import React from 'react'
import { ConfigProvider } from 'antd'
import zh_TW from 'antd/lib/locale/zh_TW'
import 'antd/dist/antd.css'

const AntDesignProvider: React.FC = ({ children }) => {
  return (
    <ConfigProvider locale={zh_TW} autoInsertSpaceInButton={false}>
      {children}
    </ConfigProvider>
  )
}

export default AntDesignProvider
