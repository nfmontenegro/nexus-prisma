import React from 'react'
import Img from 'gatsby-image'
import {StaticQuery, graphql} from 'gatsby'

import {HeaderWelcome, HeaderPresentation} from '../styled'

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
        file(relativePath: {eq: "image-bg.png"}) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Img
          fluid={data.file.childImageSharp.fluid}
          alt="portfolio"
          className="image-bg"
        />
        <HeaderWelcome>
          Hello, <br />
          <br />
          <br />
          <p className="welcome">{data.site.siteMetadata.welcome}</p>
          <HeaderPresentation>
            <p>{data.site.siteMetadata.presentation}</p>
          </HeaderPresentation>
        </HeaderWelcome>
      </>
    )}
  />
)

export default Header
