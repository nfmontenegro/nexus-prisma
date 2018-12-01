import React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

import Header from './header'

import './layout.css'

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            welcome
            presentation
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {name: 'description', content: 'Sample'},
            {name: 'keywords', content: 'sample, something'},
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>
          <Header
            welcome={data.site.siteMetadata.welcome}
            presentation={data.site.siteMetadata.presentation}
          />
        </div>
      </>
    )}
  />
)

export default Layout
