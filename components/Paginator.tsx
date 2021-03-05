import { usePaginateContext } from '@/context/PaginateContext'
import { Box, BoxProps } from '@chakra-ui/layout'
import { Pagination } from 'antd'
import React, { useEffect } from 'react'

function Paginator(props: BoxProps) {
  const { totalCount, page, perpage, onPageChanged } = usePaginateContext()
  return (
    <Box {...props}>
      {totalCount > 0 && (
        <Pagination
          current={page}
          total={totalCount}
          pageSize={perpage}
          onChange={onPageChanged}
          // onShowSizeChange={onPerpageChanged}
        />
      )}
    </Box>
  )
}

export default Paginator
