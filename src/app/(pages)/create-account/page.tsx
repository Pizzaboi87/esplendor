import React from 'react'
import CreateAccountForm from './CreateAccountForm'
import Link from 'next/link'
import Image from 'next/image'

import { Metadata } from 'next'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RenderParams } from '../../_components/RenderParams'

import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <section className={classes.signup}>
      <div className={classes.heroImg}>
        <Link href="/" className={classes.link}>
          <Image src="/logo-white.png" alt="logo" width={250} height={25} />
        </Link>
      </div>

      <div className={classes.formContainer}>
        <RenderParams className={classes.params} />
        <div className={classes.formTitle}>
          <h5>Create your Esplend'or Account</h5>
        </div>
        <p>Please fill out the form below to create your account.</p>
        <CreateAccountForm />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
