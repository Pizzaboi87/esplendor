import React from 'react'
import LoginForm from './LoginForm'
import Link from 'next/link'
import Image from 'next/image'

import { Metadata } from 'next'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RenderParams } from '../../_components/RenderParams'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <section className={classes.login}>
      <div className={classes.heroImg}>
        <Link href="/" className={classes.link}>
          <Image src="/logo.png" alt="logo" width={250} height={25} />
        </Link>
      </div>

      <div className={classes.formContainer}>
        <RenderParams className={classes.params} />
        <div className={classes.formTitle}>
          <h5>Welcome to our Webshop!</h5>
        </div>
        <p>Please sign in to your Esplend'or Account.</p>
        <LoginForm />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
