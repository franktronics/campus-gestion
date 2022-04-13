import { Box, useColorModeValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Signin from '../components/account/Signin'
import Signup from '../components/account/Signup'
import DashboardRoute from '../components/dashboard/DashboardRoute'

const Home: NextPage = () => {

  return <Box bg={useColorModeValue('secondary', 'secondary_d')} minH="100vh">
    <DashboardRoute/>
    {/* <Signin/> selon les conditions de connexion
    <Signup/> */}
  </Box>
}

export default Home
