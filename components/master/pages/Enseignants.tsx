import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, PinInput, PinInputField, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DataEnseignantType } from "../../../types/base";
import CardEns from "../CardEns";


export default function Enseignants () {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const [show, setShow] = useState(false)
    const [childExpand, setChildExpand] = useState<number>(-1)
    const [isPending, setIsPending] = useState(false)
    const toast = useToast()
    const [dataEnseignant, setDataEnseignant] = useState<Array<DataEnseignantType>>([])

    const cookies = {
        masterToken: Cookies.get('masterToken'),
        masterId: Cookies.get('masterId')
    }
    const config = {
        headers: { Authorization: `Bearer ${cookies.masterToken}` }
    }

    const addEns = (data: any) => {
        setIsPending(true)
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'master/addens?id='+cookies.masterId, data, config)
            .then(res => {
                setIsPending(false)
                if(res.data.messageError){
                    toast({
                        title: 'Erreur',
                        description: res.data.messageError,
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }else{
                    setDataEnseignant(dataEnseignant.concat(res.data.ens))
                    reset({
                        name: '',
                        firstname: '',
                        identifier: '',
                        password: '',
                        phoneNumber: ''
                    })
                    toast({
                        title: 'Succes',
                        description: "L'enseignant a été ajouté",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                }
            })
            .catch(err => {
                console.log(err);
                
                setIsPending(false)
                toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'master/getens?id='+cookies.masterId, config)
            .then(res => {
                if(res.data.messageError){
                    toast({
                        title: 'Erreur',
                        description: res.data.messageError,
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }else{
                    const data = res.data.ens.map((el: any) => {
                        delete el._id
                        return {...el}
                    })
                    setDataEnseignant(data)
                }
            })
            .catch(err => {
                toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }, [])
    const deleteEns = (data: DataEnseignantType) => {
        setDataEnseignant(dataEnseignant.filter((el) => el.identifier !== data.identifier))
    }


    return <Flex gap="20px" 
            justifyContent={{base: 'flex-start', md: 'center'}} 
            flexDirection={{base: 'column', md: 'row'}}
            alignItems={{base: 'center', md: 'flex-start'}}
        >
        <Box 
            w={{base: '100%', md: '60%'}} 
            bg={useColorModeValue('primary', 'primary_d')}
            boxShadow="card"
            p="20px"
            rounded="md"
        >
            <Text fontSize="3xl" mb="30px">Inscrire un enseignant</Text>
            <FormControl>
                <FormLabel htmlFor='name'>Nom *</FormLabel>
                <Input 
                    isInvalid={errors.name? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.name? {borderColor: 'error'}: {}} 
                    id='name' type='text' 
                    {...register("name", {required: "Le nom est obligatoire", minLength: {value: 2, message: "Entrer un nom valide"}})}
                />
                {errors.name && <Text fontSize="14px" fontStyle="italic" color="error">{errors.name.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='firstname'>Prenom *</FormLabel>
                <Input 
                    isInvalid={errors.firstname? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.firstname? {borderColor: 'error'}: {}} 
                    id='firstname' type='text' 
                    {...register("firstname", {required: "Le prenom est obligatoire", minLength: {value: 2, message: "Entrer un prenom valide"}})}
                />
                {errors.firstname && <Text fontSize="14px" fontStyle="italic" color="error">{errors.firstname.message}</Text>}
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
            <FormControl>
                <FormLabel htmlFor='grade'>Grade *</FormLabel>
                <Input 
                    isInvalid={errors.grade? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.grade? {borderColor: 'error'}: {}} 
                    id='grade' type='text' 
                    {...register("grade", {required: "Le grade est obligatoire", minLength: {value: 2, message: "Entrer un grade valide"}})}
                />
                {errors.grade && <Text fontSize="14px" fontStyle="italic" color="error">{errors.grade.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='identifier'>Identifiant *</FormLabel>
                <Input 
                    isInvalid={errors.identifier? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.identifier? {borderColor: 'error'}: {}} 
                    id='identifier' type='text' 
                    {...register("identifier", {required: "L'identifiant est obligatoire", minLength: {value: 2, message: "Entrer un identifiant valide"}})}
                />
                {errors.identifier && <Text fontSize="14px" fontStyle="italic" color="error">{errors.identifier.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Mot de passe*</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        id="password"
                        placeholder='Entrer le mot de passe'
                        errorBorderColor="error" 
                        _focus={errors.password? {borderColor: 'error'}: {}} 
                        {...register("password", {required: "Entrer un mot de passe", minLength: {value: 6, message: "Un minimum de 6 caracteres est requis"}})}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => {setShow(s => !s)}}>
                            {!show? <AiOutlineEye size={20}/>: <AiOutlineEyeInvisible size={20}/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl mt="10px">
                <Button 
                    onClick={handleSubmit(addEns)}
                    disabled={isPending}
                >
                    Inscrire
                    {isPending && <Spinner size='sm' ml="5px"/>}
                </Button>
            </FormControl>
        </Box>
        <Box 
            w={{base: '100%', md: '40%'}} 
            bg={useColorModeValue('primary', 'primary_d')}
            boxShadow="card"
            p="20px"
            rounded="md"
        >
            {dataEnseignant.map((el: DataEnseignantType, k: number) => {
                return <CardEns 
                    data={el} 
                    key={k}
                    index={k}
                    childExpand={childExpand}
                    onHandleExpand={setChildExpand}
                    onDeleteEns={deleteEns}
                />
            }).reverse()}
        </Box>
    </Flex>
}