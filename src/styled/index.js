import styled from 'styled-components'

export const Container = styled.div`
  margin: 40px 120px;
  h1 {
    font-family: 'Cabin';
    text-align: center;
  }
  p  {
    margin-top: 20px;
    font-family: 'Titillium Web';
    font-size: 1.4rem;
    line-height: 35px;
  }
  ul {
    font-family: 'Titillium Web';
    text-align: left;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    text-align: center;
    margin: 10px 10px;
  }
`

export const ProfileDescription = styled.div`
  font-size: 1.4rem;
  width: 900px;
  margin: 50px 0 0 80px;
  font-family: 'Titillium Web';
  line-height: 35px;
  color: #22262a;
  @media (min-width: 320px) and (max-width: 768px) {
    text-align: center;
    width: 100%;
    margin: 0px;
  }
`

export const ContentImageProfile = styled.div`
  width: 11.5rem;
  height: auto;
  text-align: left;
  position: relative;
  display: -webkit-inline-box;
  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    display: block;
    text-align: center;
  }
`

export const HeaderWelcome = styled.div`
  position: absolute;
  top: 250px;
  left: 0;
  font-family: 'Cabin';
  color: white;
  z-index: 1000;
  letter-spacing: 1px;
  font-size: 5rem;
  width: 1400px;
  padding-left: 15px;
  text-shadow: rgba(255, 255, 255, 0.15) 0px 5px 35px;
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 27px;
    width: 100%;
  }
`

export const HeaderPresentation = styled.div`
  font-family: 'Helvetica';
  color: rgb(255, 255, 255);
  font-size: 2.5rem;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 2px 15px;
  position: absolute;
  margin-top: 40px;
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 20px;
    width: 100%;
    margin: 0;
  }
`
