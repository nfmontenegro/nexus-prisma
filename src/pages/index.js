import React from 'react'

import Layout from '../components/layout'
import Header from '../components/header'
import About from '../components/about'
import Stack from '../components/stack'

const IndexPage = () => {
  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <About />
      <Stack />
    </>
  )
}

export default IndexPage
