import { Box, Flex, Image, FormControl, Text, FormLabel, Input, useColorModeValue, Button, Center, HStack, PinInput, PinInputField, Badge, Select, Avatar, AvatarBadge, InputGroup, InputRightElement } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SwitchTheme from '../components/generic/SwitchTheme'
import { AiOutlineDelete, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import DropProfilPicture from '../components/generic/DropProfilPicture';
import {useForm, Controller} from "react-hook-form"
import { Form } from '../types/base';

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
    const {register, handleSubmit, formState: { errors }, control} = useForm()

    const [formData, setFormData] = useState<Form>()
    const onSubmit = (data: any) => {
        setFormData(f => {return {...f, ...data}})
        if(state < 6) {
            setState(s => s + 1)
            handleSubmit(onSubmit)
        }
    }

    return <>
        <Flex justifyContent="center" alignItems="center" bg={useColorModeValue('secondary', 'secondary_d')} w="100%" minH="100vh">
            <Box w={{base: '90%', md: "500px"}} p="10px" my="20px" borderRadius="10px" bg={useColorModeValue('primary', 'primary_d')}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb="20px">
                    <Link href="/">
                        <a>
                            <Button>
                                <Center><AiOutlineHome/></Center>
                            </Button>
                        </a>
                    </Link>
                    <Text fontSize='2xl' align="center">Inscription etudiant {state}/6</Text>
                    <SwitchTheme/>
                </Box>

                {state === 1 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='speciality'>Faculter *</FormLabel>
                        <Select isInvalid={errors.faculty? true: false} defaultValue="Faculté des Sciences" id='faculty' {...register("faculty", {required: "Vous devez selectionner une faculté"})}>
                            <option value='fds'>Faculté des Sciences</option>
                            <option value='fdl'>Faculté des Lettres</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='speciality'>Filiere *</FormLabel>
                        <Select isInvalid={errors.speciality? true: false} defaultValue="Informatique" id='speciality' {...register("speciality", {required: "Selectionnez votre filiere"})}>
                            <option value='informatique'>Informatique</option>
                            <option value='maths'>Mathématiques</option>
                            <option value='physique'>Physique</option>
                            <option value='chimie'>Chimie</option>
                            <option value='geoscience'>GeoScience</option>
                            <option value='bioscience'>BioScience</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='level'>Niveau *</FormLabel>
                        <Select isInvalid={errors.level? true: false} defaultValue="1" id='level' {...register("level", {required: "Quel est votre niveau ?"})}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='mat'>Matricule *</FormLabel>
                        <Input 
                            isInvalid={errors.matricule? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.matricule? {borderColor: 'error'}: {}} 
                            id='mat' type='text' 
                            {...register("matricule", {required: "Le matricule est obligatoire", minLength: {value: 7, message: "Un minimum de 7 caracteres est requis"}})}
                        />
                        {errors.matricule && <Text fontSize="14px" fontStyle="italic" color="error">{errors.matricule.message}</Text>}
                    </FormControl>
                </Box>}

                {state === 2 && <Box>
                    <FormControl>
                        <FormLabel htmlFor='name'>Nom*</FormLabel>
                        <Input
                            isInvalid={errors.name? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.name? {borderColor: 'error'}: {}}  
                            id='name' type='text' 
                            {...register("name", {required: "Entrez votre nom"})}
                        />
                        {errors.name && <Text fontSize="14px" fontStyle="italic" color="error">{errors.name.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='firstname'>Prenom</FormLabel>
                        <Input 
                            isInvalid={errors.firstname? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.firstname? {borderColor: 'error'}: {}}  
                            id='firstname' type='text' 
                            {...register("firstname", {required: "Entrer votre prenom"})}
                        />
                        {errors.firstname && <Text fontSize="14px" fontStyle="italic" color="error">{errors.firstname.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='birthday'>Data de naissance</FormLabel>
                        <HStack id='birthday'>
                            <Controller
                                control={control}
                                name="birthdayJ"
                                rules={{required: "Entrer votre jour de naissance", min: {value: 1, message: "Entrer un nombre valide"}}}
                                render={({
                                    field: { onChange, onBlur, value, name, ref }
                                }) => (
                                    <PinInput value={value} onChange={onChange} placeholder="j">
                                        <PinInputField/>
                                        <PinInputField/>
                                    </PinInput>
                                )}
                            />
                            <Box as="span">-</Box>
                            <Controller
                                control={control}
                                name="birthdayM"
                                rules={{required: "Entrer votre mois de naissance", min: {value: 1, message: "Entrer un nombre valide"}}}
                                render={({
                                    field: { onChange, onBlur, value, name, ref }
                                }) => (
                                    <PinInput value={value} onChange={onChange} placeholder="m">
                                        <PinInputField/>
                                        <PinInputField/>
                                    </PinInput>
                                )}
                            />
                            <Box as="span">-</Box>
                            <Controller
                                control={control}
                                name="birthdayA"
                                rules={{required: "Entrer votre année de naissance", min: {value: 1, message: "Entrer un nombre valide"}}}
                                render={({
                                    field: { onChange, onBlur, value, name, ref }
                                }) => (
                                    <PinInput value={value} onChange={onChange} placeholder="a">
                                        <PinInputField/>
                                        <PinInputField/>
                                    </PinInput>
                                )}
                            />
                        </HStack>
                        {errors.birthdayJ && <Text fontSize="14px" fontStyle="italic" color="error">{errors.birthdayJ.message}</Text>}
                        {errors.birthdayM && <Text fontSize="14px" fontStyle="italic" color="error">{errors.birthdayM.message}</Text>}
                        {errors.birthdayA && <Text fontSize="14px" fontStyle="italic" color="error">{errors.birthdayA.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='bornat'>Lieu de naissance</FormLabel>
                        <Input 
                            isInvalid={errors.bornat? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.bornat? {borderColor: 'error'}: {}}  
                            id='bornat' type='text' 
                            {...register("bornat", {required: "Nous avons besoin de votre lieu de naissance"})}
                        />
                        {errors.bornat && <Text fontSize="14px" fontStyle="italic" color="error">{errors.bornat.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='phone-number'>Numéro de télephone*</FormLabel>
                        <HStack id='phone-number'>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                rules={{required: "Entrer votre numéro de télephone", min: {value: 611111111, message: "Entrer un numéro valide"}}}
                                render={({
                                    field: { onChange, onBlur, value, name, ref }
                                }) => (
                                    <PinInput value={value} onChange={onChange}>
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
                                )}
                            />
                        </HStack>
                        {errors.phoneNumber && <Text fontSize="14px" fontStyle="italic" color="error">{errors.phoneNumber.message}</Text>}
                    </FormControl>
                </Box>}

                {state === 3 && <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize='xs' mb="10px" fontStyle="italic">Image carée au format 128*128 (2Mo max) </Text>
                    <Box position="relative" display="inline-block" role="group">
                        <Avatar size='2xl' name={formData? formData.name + " " + formData.firstname: 'User Name'}/>
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
                    <Center><Text fontSize="xl">{formData? formData.pseudo: ''}</Text></Center>
                    <FormControl mt="20px">
                        <Center>
                            <Input 
                                id='pseudo' type='text' maxW="200px" 
                                placeholder='Pseudonyme'
                                errorBorderColor="error" 
                                _focus={errors.pseudo? {borderColor: 'error'}: {}} 
                                {...register("pseudo", {required: "Le pseudonyme est obligatoire", minLength: {value: 4, message: "Un minimum de 4 caracteres est requis"}})}
                            />
                        </Center>
                        {errors.pseudo && <Center><Text fontSize="14px" fontStyle="italic" color="error">{errors.pseudo.message}</Text></Center>}
                    </FormControl>
                    
                </Box>}

                {state === 4 && <Box>
                    <FormControl>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Nom:</Text><Text>{formData?.name}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Prenom:</Text><Text>{formData?.firstname}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Faculté:</Text><Text>{formData?.faculty}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Niveau:</Text><Text>{formData?.level}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Matricule:</Text><Text>{formData?.matricule}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Specialité:</Text><Text>{formData?.speciality}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Né a:</Text><Text>{formData?.bornat}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Né le:</Text><Text>{formData?.birthdayJ}-{formData?.birthdayM}-{formData?.birthdayA}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight="bold">Numéro de téléphone:</Text><Text>{formData?.phoneNumber}</Text>
                        </Flex>
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
                    {state < 6 && <Button mt="4" onClick={handleSubmit(onSubmit)}>
                        {state === 4 || state === 5? 'Valider': 'Suivant'}
                    </Button>}
                    
                </Flex>
            </Box>
        </Flex>
    </>
  }
  
  export default SigninEtudiant