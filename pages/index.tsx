import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Signin from '../components/account/Signin'
import Signup from '../components/account/Signup'
import DashboardRoute from '../components/dashboard/DashboardRoute'

const Home: NextPage = () => {

  return <div>
    <DashboardRoute/>
    {/* <Signin/> selon les conditions de connexion
    <Signup/> */}
  </div>
}

export default Home
