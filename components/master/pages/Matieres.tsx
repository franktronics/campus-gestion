import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, PinInput, PinInputField, Select, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataMatType } from "../../../types/base";
import CardMat from "../CardMat";


export default function Matieres () {
    const { register, handleSubmit, watch, reset, formState: { errors }, control } = useForm();
    const [childExpand, setChildExpand] = useState<number>(-1)
    const [isPending, setIsPending] = useState(false)
    const toast = useToast()
    const [dataMat, setDataMat] = useState<Array<DataMatType>>([])

    const [dataFac, setDataFac] = useState([{
        id: '',
        title: '',
    }])
    const [dataFil, setDataFil] = useState([{
        id: '',
        title: '',
        facId: '',
    }])

    const cookies = {
        masterToken: Cookies.get('masterToken'),
        masterId: Cookies.get('masterId')
    }
    const config = {
        headers: { Authorization: `Bearer ${cookies.masterToken}` }
    }

    const addMat = (data: any) => {
        setIsPending(true)
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'master/addmat?id='+cookies.masterId, data, config)
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
                    setDataMat(dataMat.concat(res.data.mat))
                    reset({
                        fac: '',
                        fil: '',
                        niv: '',
                        intitled: '',
                        code: ''
                    })
                    toast({
                        title: 'Succes',
                        description: "La matiere a été ajouté",
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
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'master/getmat?id='+cookies.masterId, config)
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
                    const data = res.data.mat.map((el: any) => {
                        delete el._id
                        return {...el}
                    })
                    setDataMat(data)
                }
            })
            .catch(err => {
                console.log(err);
                
                toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }, [])
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${cookies.masterToken}` }
        }
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'master/getdata?id='+cookies.masterId, config)
        .then((res) => {  
            if(res.data.messageError){
                toast({
                    title: 'Erreur',
                    description: res.data.messageError,
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
            }else{ 
                setDataFac([])
                setDataFac(f => {return [...f, ...res.data.fac]})
                setDataFil([])
                setDataFil(f => {return [...f, ...res.data.fil]})
            }
        })
        .catch((error) => {
            toast({
                title: 'Erreur',
                description: "Erreur lors de la recuperation de donnees",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }, [])
    const deleteEns = (data: DataMatType) => {
        setDataMat(dataMat.filter((el) => !(el.intitled === data.intitled && el.fil === data.fil && el.niv === data.niv)))
    }

    const selectedFac = watch('fac')
    

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
            <Text fontSize="3xl" mb="30px">Ajouter une matiere</Text>
            <FormControl>
                <FormLabel htmlFor='faculte'>Faculté</FormLabel>
                <Select 
                    placeholder='Choisir la faculté'
                    isInvalid={errors.fac? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.fac? {borderColor: 'error'}: {}} 
                    {...register("fac", {required: "La faculté est obligatoire", minLength: {value: 2, message: "Entrer une faculté valide"}})}
                >
                    {dataFac.map(el => {
                        return <option value={el.id} key={el.id}>{el.title}</option>
                    })}
                </Select>
                {errors.fac && <Text fontSize="14px" fontStyle="italic" color="error">{errors.fac.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='filiere'>Filiere</FormLabel>
                <Select 
                    placeholder='Choisir la filiere'
                    isInvalid={errors.fil? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.fil? {borderColor: 'error'}: {}} 
                    {...register("fil", {required: "La filiere est obligatoire", minLength: {value: 2, message: "Entrer une filiere valide"}})}
                >
                    {dataFil.map(el => {
                        return el.facId === selectedFac? <option value={el.id} key={el.id}>{el.title}</option>: ''
                    })}
                </Select>
                {errors.fil && <Text fontSize="14px" fontStyle="italic" color="error">{errors.fil.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='niveau'>Niveau</FormLabel>
                <Select 
                    placeholder='Choisir le niveau'
                    isInvalid={errors.niv? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.niv? {borderColor: 'error'}: {}} 
                    {...register("niv", {required: "Le niveau est obligatoire"})}
                >
                    {['1', '2', '3', '4', '5'].map(el => {
                        return <option value={el} key={el}>{el}</option>
                    })}
                </Select>
                {errors.niv && <Text fontSize="14px" fontStyle="italic" color="error">{errors.niv.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='code'>Code *</FormLabel>
                <Input 
                    isInvalid={errors.code? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.code? {borderColor: 'error'}: {}} 
                    id='code' type='text' 
                    {...register("code", {required: "Le code est obligatoire", minLength: {value: 2, message: "Entrer un code valide"}})}
                />
                {errors.code && <Text fontSize="14px" fontStyle="italic" color="error">{errors.code.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='intitled'>Intitulé *</FormLabel>
                <Input 
                    isInvalid={errors.intitled? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.intitled? {borderColor: 'error'}: {}} 
                    id='intitled' type='text' 
                    {...register("intitled", {required: "Le nom est obligatoire", minLength: {value: 2, message: "Entrer un intitulé valide"}})}
                />
                {errors.intitled && <Text fontSize="14px" fontStyle="italic" color="error">{errors.intitled.message}</Text>}
            </FormControl>
            <FormControl mt="10px">
                <Button 
                    onClick={handleSubmit(addMat)}
                    disabled={isPending}
                >
                    Ajouter
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
            {dataMat.map((el: DataMatType, k: number) => {
                return <CardMat 
                    data={el} 
                    key={k}
                    index={k}
                    childExpand={childExpand}
                    onHandleExpand={setChildExpand}
                    onDeleteEns={deleteEns}
                    dataTable={{fac: dataFac, fil: dataFil}}
                />
            }).reverse()}
        </Box>
    </Flex>
}