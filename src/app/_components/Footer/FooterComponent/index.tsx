'use client'

import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { Footer, Media } from '../../../../payload/payload-types'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { Gutter } from '../../Gutter'

import classes from './index.module.scss'
import { Button } from '../../Button'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map(inclusion => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={50}
                height={50}
                className={classes.icon}
              />

              <h5>{inclusion.title}</h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>
          <Link href="/">
            <Image src="/logo-white.png" alt="logo" width={240} height={50} />
          </Link>
          <p>{footer.copyright}</p>

          <div className={classes.socialLinks}>
            {navItems.map(item => {
              const icon = item?.link?.icon as Media

              return (
                <Button
                  key={item.link.label}
                  el="link"
                  href={item.link.url}
                  newTab={true}
                  className={classes.socialLinkItem}
                >
                  <Image
                    src={icon?.url}
                    alt={item.link.label}
                    width={50}
                    height={50}
                    className={classes.socialIcon}
                  />
                </Button>
              )
            })}
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
