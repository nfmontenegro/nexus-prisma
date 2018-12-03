import React from 'react'
import styled from 'styled-components'
import {StaticQuery, graphql} from 'gatsby'

import imageBackground from '../images/image-bg.png'

const HeaderWelcome = styled.div`
  font-family: 'Cabin';
  position: relative;
  left: 10%;
  color: white;
  letter-spacing: 1px;
  font-size: 5rem;
  width: 1200px;
  bottom: 650px;
  text-shadow: rgba(255, 255, 255, 0.15) 0px 5px 35px;
  @media (max-width: 768px) {
    font-size: 27px;
    left: 5%;
    top: -350px;
    width: 100%;
  }
`

const HeaderPresentation = styled.div`
  position: relative;
  bottom: 600px;
  left: 10%;
  font-family: 'Helvetica';
  color: rgb(255, 255, 255);
  font-size: 2.5rem;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 2px 15px;
  @media (max-width: 768px) {
    position: absolute;
    font-size: 20px;
    width: 100%;
    left: 5%;
    bottom: 480px;
  }
`

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
