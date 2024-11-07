import React from 'react'
import FooterComponent from './FooterComponent'

import { Footer as FooterType } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'

export async function Footer() {
  let footer: FooterType | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.log(error)
  }

  return <FooterComponent {...{ footer }} />
}
