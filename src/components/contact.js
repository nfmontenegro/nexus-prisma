import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import {Container, ProfileDescription} from '../styled'

const Contact = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            github
            linkedin
          }
        }
        file(relativePath: {eq: "profile.png"}) {
          childImageSharp {
            resize(width: 100, height: 100) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Container style={{marginTop: '40px'}}>
          <h1>Contáctame</h1>
          <ProfileDescription>
            <div style={{textAlign: 'center'}}>
              Dime <b>Hola</b> o encuéntrame en las siguientes plataformas:{' '}
              <b>
                <a href={data.site.siteMetadata.github}>Github</a>
              </b>{' '}
              &{' '}
              <b>
                <a href={data.site.siteMetadata.linkedin}>Linkedin</a>
              </b>
            </div>
            <p className="copyright">® 2018 by Nicolás Flores Montenegro.</p>
          </ProfileDescription>
        </Container>
      </>
    )}
  />
)

export default Contact
