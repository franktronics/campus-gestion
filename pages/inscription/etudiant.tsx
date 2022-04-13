import { Box, Flex, FormControl, Text, FormLabel, Input, useColorModeValue, Button, Center, HStack, PinInput, PinInputField, Badge, Select, Avatar } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SwitchTheme from '../../components/generic/SwitchTheme'
import { AiOutlineHome } from "react-icons/ai";
import Link from 'next/link'
import { useState } from 'react';

const Signin: NextPage = () => {
    const [state, setState] = useState<number>(1)

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
                    <Text fontSize='2xl'>Inscription {state}/4</Text>
                    <SwitchTheme/>
                </Box>

                {state === 1 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='speciality'>Filiere</FormLabel>
                        <Select defaultValue="Informatique" id='speciality'>
                            <option value='Informatique'>Informatique</option>
                            <option value='Gestion'>Gestion</option>
                            <option value='Chimie'>Chimie</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='level'>Niveau</FormLabel>
                        <Select defaultValue="1" id='level'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='mat'>Matricule</FormLabel>
                        <Input id='mat' type='text' />
                    </FormControl>
                </Box>}

                {state === 2 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='name'>Nom</FormLabel>
                        <Input id='name' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='firstname'>Prenom</FormLabel>
                        <Input id='firstname' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='birthday'>Data de naissance</FormLabel>
                        <HStack id='birthday'>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                            <Box as="span">-</Box>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                            <Box as="span">-</Box>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='bornat'>Lieu de naissance</FormLabel>
                        <Input id='bornat' type='text' />
                    </FormControl>
                </Box>}

                {state === 3 && <Box>
                    <Center>
                        <Avatar size='2xl' name='Nom Default' src='https://bit.ly/dan-abramov' />
                    </Center>
                    <Center><Text fontSize="xl">Pseudonyme</Text></Center>
                    <FormControl mt="20px">
                        <Center><Input id='pseudo' type='text' maxW="200px" placeholder='Pseudonyme'/></Center>
                    </FormControl>
                    
                </Box>}

                <Flex justifyContent="space-between">
                    {state > 1 && <Button mt="4" onClick={() => {if(state > 1) setState(s => s - 1)}}>
                        Precedent
                    </Button>}
                    {state < 4 && <Button mt="4" onClick={() => {if(state < 4) setState(s => s + 1)}}>
                        Suivant
                    </Button>}
                </Flex>
            </Box>
        </Flex>
    </>
  }
  
  export default Signin