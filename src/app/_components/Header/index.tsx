import React from 'react'
import HeaderComponent from './HeaderComponent'

import { Header as HeaderType } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'

export async function Header() {
  let header: HeaderType | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.log(error)
  }

  return <HeaderComponent {...{ header }} />
}
