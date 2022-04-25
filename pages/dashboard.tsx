import { Box, useColorModeValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import DashboardRoute from '../components/dashboard/DashboardRoute'

const Dashboard: NextPage = () => {

    return <Box bg={useColorModeValue('secondary', 'secondary_d')} minH="100vh">
        <DashboardRoute/>
        {/* <Signin/> selon les conditions de connexion
        <Signup/> */}
    </Box>
}

export default Dashboard