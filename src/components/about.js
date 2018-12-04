import React from 'react'
import Img from 'gatsby-image'
import {StaticQuery, graphql} from 'gatsby'

import {Container, ContentImageProfile, ProfileDescription} from '../styled'

const About = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            profileDescription
            aboutMe
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
        <div className="section">
          <div className="wave" />
          <Container>
            <h1>Sobre mí</h1>
            <ContentImageProfile>
              <Img
                fluid={data.file.childImageSharp.fluid}
                alt="profile"
                className="img-profile"
              />
              <ProfileDescription>
                {data.site.siteMetadata.profileDescription}
              </ProfileDescription>
            </ContentImageProfile>
            <p>{data.site.siteMetadata.aboutMe}</p>
          </Container>
        </div>
      </>
    )}
  />
)

export default About
