import { Box, useColorModeValue } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import DashboardRoute from '../components/dashboard/DashboardRoute'
import { useRouter } from 'next/router'

const Dashboard: NextPage = () => {
    const router = useRouter()

    const [cookies, setCookies] = useState({
        userId: '',
        token: ''
    })
    useEffect(() => {
        const id = Cookies.get('userId')
        const token = Cookies.get('token')
        if(!id || !token){
            router.push('/connexion')
        }else{
            setCookies(c => {return {...c, userId: id, token: token}})
        }
    }, [])

    return <Box bg={useColorModeValue('secondary', 'secondary_d')} minH="100vh">
        <DashboardRoute/>
        {/* <Signin/> selon les conditions de connexion
        <Signup/> */}
    </Box>
}

export default Dashboard