import React from 'react'

import Layout from '../components/layout'
import Header from '../components/header'
import About from '../components/about'
import Stack from '../components/stack'
import Contact from '../components/contact'

const IndexPage = () => {
  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <About />
      <Stack />
      <Contact />
    </>
  )
}

export default IndexPage
