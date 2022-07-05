import { Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataMatType, DataRoomType } from "../../../types/base";
import CardRoom from "../CardRoom";


export default function Salles () {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [childExpand, setChildExpand] = useState<number>(-1)
    const [isPending, setIsPending] = useState(false)
    const toast = useToast()
    const [dataRoom, setDataRoom] = useState<Array<DataRoomType>>([])


    const cookies = {
        masterToken: Cookies.get('masterToken'),
        masterId: Cookies.get('masterId')
    }
    const config = {
        headers: { Authorization: `Bearer ${cookies.masterToken}` }
    }

    const addRoom = (data: any) => {
        setIsPending(true)
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'master/addroom?id='+cookies.masterId, data, config)
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
                    setDataRoom(dataRoom.concat(res.data.room))
                    reset({
                        fac: '',
                        fil: '',
                        niv: '',
                        intitled: '',
                        code: ''
                    })
                    toast({
                        title: 'Succes',
                        description: "La salle a été ajoutée",
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
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'master/getroom?id='+cookies.masterId, config)
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
                    const data = res.data.room.map((el: any) => {
                        delete el._id
                        return {...el}
                    })
                    setDataRoom(data)
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
    const deleteRoom = (data: DataRoomType) => {
        setDataRoom(dataRoom.filter((el) => el.room !== data.room))
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
            <Text fontSize="3xl" mb="30px">Ajouter une salle</Text>    
            <FormControl>
                <FormLabel htmlFor='room'>Nom de la salle</FormLabel>
                <Input 
                    isInvalid={errors.room? true: false} 
                    errorBorderColor="error" 
                    _focus={errors.room? {borderColor: 'error'}: {}} 
                    id='room' type='text' 
                    {...register("room", {required: "Le nom est obligatoire", minLength: {value: 1, message: "Entrer un nom valide"}})}
                />
                {errors.room && <Text fontSize="14px" fontStyle="italic" color="error">{errors.room.message}</Text>}
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='room-description'>Description</FormLabel>
                <Textarea 
                    isInvalid={errors.description? true: false} 
                    errorBorderColor="error" 
                    maxLength={50}
                    _focus={errors.description? {borderColor: 'error'}: {}} 
                    id='room-description'
                    defaultValue={""}
                    {...register("description")}
                />
                {errors.description && <Text fontSize="14px" fontStyle="italic" color="error">{errors.description.message}</Text>}
            </FormControl>
            <FormControl mt="10px">
                <Button 
                    onClick={handleSubmit(addRoom)}
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
            {dataRoom.map((el: DataRoomType, k: number) => {
                return <CardRoom
                    data={el} 
                    key={k}
                    index={k}
                    childExpand={childExpand}
                    onHandleExpand={setChildExpand}
                    onDeleteEns={deleteRoom}
                />
            }).reverse()}
        </Box>
    </Flex>
}