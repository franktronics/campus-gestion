import { Box, Button, Center, Flex, useColorModeValue, Text, FormControl, FormLabel, Input, Alert, AlertIcon, AlertDescription, Spinner } from "@chakra-ui/react"
import axios from "axios"
import Link from 'next/link'
import { useState } from "react"
import { AiOutlineHome } from "react-icons/ai"
import SwitchTheme from "../components/generic/SwitchTheme"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Connexion = () => {
    const router = useRouter()

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    type RF = {
        req: boolean,
        message: string,
        status: "success" | "info" | "warning" | "error"
    }
    const [reqState, setReqState] = useState<RF>({
        req: false,
        status: 'success',
        message: ''
    })
    const connect = () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!data.email.match(regex)){
            setReqState(r => {return {...r, req: false, status: "warning", message: "Entrer une email valide"}})
            return
        }
        setReqState(r => {return {...r, req: true}})
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'user/login', data)
            .then((res) => {
                if(res.data.messageError){
                    setReqState(r => {return {...r, req: false, status: "warning", message: res.data.messageError}})
                }else{
                    Cookies.set('userId', res.data.userId)
                    Cookies.set('token', res.data.token)
                    setReqState(r => {return {...r, req: false, status: "success", message: res.data.message}})
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 1000)
                }
            })
            .catch(er => {
                setReqState(r => {return {...r, req: false, status: "error", message: "Une erreur est survenue"}})
            })
    }

    return <Flex justifyContent="center" alignItems="center" bg={useColorModeValue('secondary', 'secondary_d')} w="100%" minH="100vh">
        <Box w={{base: '90%', md: "500px"}} p="10px" my="20px" borderRadius="10px" bg={useColorModeValue('primary', 'primary_d')}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="20px">
                <Link href="/">
                    <a>
                        <Button>
                            <Center><AiOutlineHome/></Center>
                        </Button>
                    </a>
                </Link>
                <Text fontSize='2xl' align="center">Connexion etudiant</Text>
                <SwitchTheme/>
            </Box>
            <Box>
                <FormControl>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='text' value={data.email} onChange={(e) => {setData(d => {return {...d, email: e.target.value}})}}/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>Mot de passe</FormLabel>
                    <Input id='password' type='password' value={data.password} onChange={(e) => {setData(d => {return {...d, password: e.target.value}})}}/>
                </FormControl>
                <FormControl mt="10px">
                    <Button onClick={() => {connect()}}>Se connecter {reqState.req && <Spinner size='sm' ml="5px"/>}</Button>
                </FormControl>
                {reqState.message !== '' && <FormControl mt="10px">
                    <Alert 
                        status={reqState.status}
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='80px'
                    >
                        <AlertIcon />
                        <AlertDescription>{reqState.message}</AlertDescription>
                    </Alert>
                </FormControl>}
            </Box>
        </Box>
    </Flex>
}

export default Connexion