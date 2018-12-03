import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import profile from '../images/profile.png'
import {Container, ContentImageProfile, ProfileDescription} from '../styled'

const About = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            profileDescription
          }
        }
      }
    `}
    render={data => (
      <>
        <div className="section">
          <Container>
            <h1>About</h1>
            <ContentImageProfile>
              <img
                src={profile}
                alt="Nicolás Flores Montenegro"
                className="img-profile"
              />
              <ProfileDescription>
                {data.site.siteMetadata.profileDescription}
              </ProfileDescription>
            </ContentImageProfile>
          </Container>
        </div>
      </>
    )}
  />
)

export default About
