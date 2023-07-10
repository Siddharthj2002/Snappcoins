import React from 'react'
import Footer from '../../components/general-components/Footer'
import Content from '../../components/merchant-components/Content'
import Header from '../../components/merchant-components/Header'
import SessionExp from '../../components/merchant-components/SessionExp'
import FullpageLoader from '../../components/general-components/FullpageLoader'

const Home = () => {
  
  return (
    <div>
      <FullpageLoader />
      <Header />
      <Content />
      <Footer />
      <SessionExp />
    </div>
  )
}

export default Home
