import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import {Container} from '../styled'

const Stack = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            profileDescription
            aboutMe
          }
        }
      }
    `}
    render={data => (
      <>
        <div className="section2">
          <Container>
            <h1>Stack</h1>
            <p>Actualmente manejo muchas tecnologías basadas en Javascript</p>
            <ul>
              <li>Javascript</li>
              <li>Nodejs</li>
              <li>GraphQL</li>
              <li>Apollo</li>
              <li>React</li>
              <li>Redux</li>
              <li>MongoDB</li>
              <li>PostgreSQL</li>
              <li>AWS</li>
              <li>Librerías NPM</li>
              <li>...etc</li>
            </ul>
          </Container>
        </div>
      </>
    )}
  />
)

export default Stack
