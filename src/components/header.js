import React from 'react'
import styled from 'styled-components'
import {StaticQuery, graphql} from 'gatsby'

import imageBackground from '../images/image-bg.png'

const PositionHeader = styled.div`
  position: absolute;
  left: 50%;
`

const HeaderWelcome = styled.div`
  font-family: 'Cabin';
  position: relative;
  left: -50%;
  color: white;
  letter-spacing: 1px;
  font-size: 5rem;
  width: 1200px;
  bottom: 650px;
  text-shadow: rgba(255, 255, 255, 0.15) 0px 5px 35px;
  @media (max-width: 768px) {
    font-size: 26px;
    top: -350px;
    width: 100%;
  }
`

const HeaderPresentation = styled.div`
  font-family: 'Helvetica';
  color: rgb(255, 255, 255);
  margin-top: 4.5rem;
  font-size: 2rem;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 2px 15px;
  @media (max-width: 768px) {
    position: absolute;
    font-size: 17px;
    width: 100%;
    bottom: -80px;
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
        <PositionHeader>
          <HeaderWelcome>
            Hello, <br />
            <br />
            <br />
            <p className="welcome">{data.site.siteMetadata.welcome}</p>
            <HeaderPresentation>
              <p>{data.site.siteMetadata.presentation}</p>
            </HeaderPresentation>
          </HeaderWelcome>
        </PositionHeader>
      </>
    )}
  />
)

export default Header
