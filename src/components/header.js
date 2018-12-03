import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import {HeaderWelcome, HeaderPresentation} from '../styled'
import imageBackground from '../images/image-bg.png'

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            welcome
            presentation
          }
        }
      }
    `}
    render={data => (
      <>
        <img src={imageBackground} alt="portfolio" className="image-bg" />
        <HeaderWelcome>
          Hello, <br />
          <br />
          <br />
          <p className="welcome">{data.site.siteMetadata.welcome}</p>
        </HeaderWelcome>
        <HeaderPresentation>
          <p>{data.site.siteMetadata.presentation}</p>
        </HeaderPresentation>
      </>
    )}
  />
)

export default Header
