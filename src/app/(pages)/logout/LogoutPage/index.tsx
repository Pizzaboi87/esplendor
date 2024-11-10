'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import Image from 'next/image'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <div className={classes.container}>
      {(error || success) && (
        <div className={classes.content}>
          <h3>{error || success}</h3>
          <p>
            {'What would you like to do next?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href="/products" className={classes.link}>
                  Click here
                </Link>
                {` to return to the shop.`}
              </Fragment>
            )}
          </p>
        </div>
      )}
      <div className={classes.imageWrapper}>
        <Image
          src="/assets/images/logout.webp"
          alt="Ring box"
          width={300}
          height={300}
          className={classes.image}
        />
      </div>
    </div>
  )
}
