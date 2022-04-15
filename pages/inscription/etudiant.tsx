import { Box, Flex, Image, FormControl, Text, FormLabel, Input, useColorModeValue, Button, Center, HStack, PinInput, PinInputField, Badge, Select, Avatar, AvatarBadge } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SwitchTheme from '../../components/generic/SwitchTheme'
import { AiOutlineDelete, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import DropProfilPicture from '../../components/generic/DropProfilPicture';

const Signin: NextPage = () => {
    const [state, setState] = useState<number>(1)
    const [picture, setPicture] = useState<MediaSource | null>()

    useEffect(() => {
        const profilPicture = document.getElementById('profil-picture') as HTMLImageElement
        if(picture) profilPicture.src = URL.createObjectURL(picture)
    }, [picture])
    const deleteImg = () => {
        const profilPicture = document.getElementById('profil-picture') as HTMLImageElement
        if(picture) profilPicture.src = "https://i.ibb.co/yXYZWmD/vide.png"
        setPicture(null)
    }

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
                            <PinInput placeholder='j'>
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                            <Box as="span">-</Box>
                            <PinInput placeholder='m'>
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                            <Box as="span">-</Box>
                            <PinInput placeholder='a'>
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

                {state === 3 && <Box display="flex" flexDirection="column" alignItems="center">
                    <Box position="relative" display="inline-block" role="group">
                        <Avatar size='2xl' name='Nom Default'/>
                        <Image id="profil-picture" position="absolute" left="50%" top="0" transform="translateX(-50%)" borderRadius="50%" width="128px" height="128px"/>
                        <Box position="absolute" left="50%" top="0" transform="translateX(-50%)">
                            <DropProfilPicture
                                fileType={["JPG", "JPEG", "PNG"]}
                                maxSize={2}
                                onHandleFile={setPicture}
                            />
                            <Box position="absolute" right="-5%" top="60%">
                                <Button borderRadius="50%" bg="#ff0000" h="40px" w="40px">
                                    {picture && <Center onClick={() => deleteImg()}><AiOutlineDelete size={20}/></Center>}
                                    {!picture && <Center><AiOutlinePlus size={20}/></Center>}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Center><Text fontSize="xl">Pseudonyme</Text></Center>
                    <FormControl mt="20px">
                        <Center><Input id='pseudo' type='text' maxW="200px" placeholder='Pseudonyme'/></Center>
                    </FormControl>
                    
                </Box>}

                <Flex justifyContent="space-between">
                    {state > 1 && <Button mt="4" onClick={() => {if(state > 1) setState(s => s - 1)}}>
                        Precedent
                    </Button>}
                    <Box></Box>
                    {state < 4 && <Button mt="4" onClick={() => {if(state < 4) setState(s => s + 1)}}>
                        Suivant
                    </Button>}
                </Flex>
            </Box>
        </Flex>
    </>
  }
  
  export default Signin