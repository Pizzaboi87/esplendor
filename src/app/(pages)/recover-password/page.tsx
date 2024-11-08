import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Metadata } from 'next'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'
import { RenderParams } from '../../_components/RenderParams'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
    <section className={classes.recover}>
      <div className={classes.heroImg}>
        <Link href="/" className={classes.link}>
          <Image src="/logo.png" alt="logo" width={250} height={25} />
        </Link>
      </div>

      <div className={classes.formContainer}>
        <RenderParams className={classes.params} />
        <div className={classes.formTitle}>
          <h5>Recover your Password</h5>
        </div>
        <p>Please enter your email address to recover your password.</p>
        <RecoverPasswordForm />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
