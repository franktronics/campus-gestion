import { Box, Flex, FormControl, Text, FormLabel, Input, useColorModeValue, Button, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SwitchTheme from '../../components/generic/SwitchTheme'
import { AiOutlineHome } from "react-icons/ai";
import Link from 'next/link'

const Signin: NextPage = () => {

    return <>
        <Flex justifyContent="center" alignItems="center" bg={useColorModeValue('secondary', 'secondary_d')} w="100vw" h="100vh">
            <Box w={{base: '90%', md: "500px"}} p="10px" borderRadius="10px" maxH="90%" bg={useColorModeValue('primary', 'primary_d')}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb="20px">
                    <Link href="/">
                        <a>
                            <Button>
                                <Center><AiOutlineHome/></Center>
                            </Button>
                        </a>
                    </Link>
                    <Text fontSize='2xl'>Inscription</Text>
                    <SwitchTheme/>
                </Box>
                <FormControl>
                    <FormLabel htmlFor='name'>Nom</FormLabel>
                    <Input id='name' type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='firstname'>Prenom</FormLabel>
                    <Input id='firstname' type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='mat'>Matricule</FormLabel>
                    <Input id='mat' type='text' />
                </FormControl>
            </Box>
        </Flex>
    </>
  }
  
  export default Signin