'use client'

import Link from 'next/link'
import Image from 'next/image'

import { usePathname } from 'next/navigation'
import { noHeaderFooterUrls } from '../../../constants'
import { HeaderNav } from '../Nav'
import { Gutter } from '../../Gutter'
import { Header } from '../../../../payload/payload-types'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={240} height={50} />
        </Link>

        <HeaderNav {...{ header }} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
