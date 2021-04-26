import PageEntry from '@/components/AffiliateReport/PageEntry'
import DataProvider from '@/context/DataContext'
import PaginateProvider from '@/context/PaginateContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import React, { useEffect } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      query: context.query,
    },
  }
}

function affiliateReport({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DataProvider>
      <PopupProvider>
        <SearchProvider>
          <PaginateProvider>
            <PageEntry query={query} />
          </PaginateProvider>
        </SearchProvider>
      </PopupProvider>
    </DataProvider>
  )
}

export default affiliateReport
