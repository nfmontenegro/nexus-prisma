import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import imageBackground from '../images/image-bg.png'

const ContentImageBackground = styled.div`
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
`

const PositionHeader = styled.div`
  position: absolute;
  left: 50%;
`

const HeaderWelcome = styled.p`
  font-family: 'Cabin';
  position: relative;
  left: -50%;
  color: white;
  font-size: 5rem;
  width: 1200px;
  bottom: 650px;
  text-shadow: rgba(255, 255, 255, 0.15) 0px 5px 35px;
`

const HeaderPresentation = styled.p`
  font-family: 'Helvetica';
  color: rgb(255, 255, 255);
  margin-top: 4.5rem;
  font-size: 2rem;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 2px 15px;
`

const Header = ({welcome, presentation}) => {
  return (
    <>
      <ContentImageBackground>
        <Img fixed={imageBackground} alt="portfolio" />
      </ContentImageBackground>
      <PositionHeader>
        <HeaderWelcome>
          Hello, <br />
          <br />
          <br />
          {welcome}
          <HeaderPresentation>{presentation}</HeaderPresentation>
        </HeaderWelcome>
      </PositionHeader>
    </>
  )
}

Header.propTypes = {
  welcome: PropTypes.string,
}

Header.defaultProps = {
  welcome: 'Hola, Soy Nicolás Flores',
}

export default Header
