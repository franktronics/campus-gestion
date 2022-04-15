import { Box, Flex, Image, FormControl, Text, FormLabel, Input, useColorModeValue, Button, Center, HStack, PinInput, PinInputField, Badge, Select, Avatar, AvatarBadge, InputGroup, InputRightElement } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SwitchTheme from '../../components/generic/SwitchTheme'
import { AiOutlineDelete, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import DropProfilPicture from '../../components/generic/DropProfilPicture';

const SigninEtudiant: NextPage = () => {
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
    /*** password*/
    const [show, setShow] = useState<boolean>(false)
    /*** */

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
                    <Text fontSize='2xl'>Inscription etudiant {state}/6</Text>
                    <SwitchTheme/>
                </Box>

                {state === 1 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='speciality'>Filiere</FormLabel>
                        <Select defaultValue="Informatique" id='speciality'>
                            <option value='informatique'>Informatique</option>
                            <option value='maths'>Mathématiques</option>
                            <option value='physique'>Physique</option>
                            <option value='chimie'>Chimie</option>
                            <option value='geoscience'>GeoScience</option>
                            <option value='bioscience'>BioScience</option>
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
                    <FormControl>
                        <FormLabel htmlFor='phone-number'>Numéro de télephone</FormLabel>
                        <HStack id='phone-number'>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </FormControl>
                </Box>}

                {state === 3 && <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize='xs' mb="10px" fontStyle="italic">Image carée au format 128*128 (2Mo max) </Text>
                    <Box position="relative" display="inline-block" role="group">
                        <Avatar size='2xl' name='Nom Default'/>
                        <Image id="profil-picture" position="absolute" left="50%" top="0" transform="translateX(-50%)" borderRadius="50%" width="128px" height="128px"/>
                        <Box position="absolute" left="50%" top="0" transform="translateX(-50%)">
                            <DropProfilPicture
                                fileType={["JPG", "JPEG", "PNG"]}
                                maxSize={2}
                                onHandleFile={setPicture}
                            />
                            <Box position="absolute" right="-5%" top="60%" pointerEvents={picture? 'auto': 'none'}>
                                <Button borderRadius="50%" h="40px" w="40px" pointerEvents={picture? 'auto': 'none'}>
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

                {state === 4 && <Box>
                    <FormControl>
                        <Button>Valider</Button>
                    </FormControl>
                </Box>}

                {state === 5 && <Box>
                    <Text align="center" fontSize="xl">Entrer le code de validation</Text>
                    <FormControl mt="20px" mb="20px">
                        <Center>
                            <HStack id='birthday'>
                                <PinInput>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                    <PinInputField border="0" _hover={{border: "0"}} _focus={{border: "0"}}/>
                                </PinInput>
                            </HStack>
                        </Center> 
                    </FormControl>
                    <FormControl>
                        <Center>
                            <Button>Valider</Button>
                        </Center>
                    </FormControl>
                </Box>}

                {state === 6 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='login'>Login</FormLabel>
                        <Input id='login' type='text' value="fftenepo@gmail.com" disabled={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password'>Mot de passe*</FormLabel>
                        <InputGroup>
                            <Input
                                type={show ? 'text' : 'password'}
                                id="password"
                                placeholder='Entrer le mot de passe'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => {setShow(s => !s)}}>
                                    {!show? <AiOutlineEye size={20}/>: <AiOutlineEyeInvisible size={20}/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='c-password'>Confirmer*</FormLabel>
                        <Input id='c-password' type='password' />
                    </FormControl>
                </Box>}

                <Flex justifyContent="space-between">
                    {(state > 1 && state < 6)&& <Button mt="4" onClick={() => {if(state > 1) setState(s => s - 1)}}>
                        Precedent
                    </Button>}
                    <Box></Box>
                    {state < 6 && <Button mt="4" onClick={() => {if(state < 6) setState(s => s + 1)}}>
                        Suivant
                    </Button>}
                </Flex>
            </Box>
        </Flex>
    </>
  }
  
  export default SigninEtudiant