import { useToast, Box, Text, Button, FormControl, FormLabel, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Select, useColorModeValue, Spinner, Tag, Flex } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler  } from "react-hook-form";
import { ScheduleData, Utils } from "../../../types/base";

const cookies = {
    masterToken: Cookies.get('masterToken'),
    masterId: Cookies.get('masterId')
}
const config = {
    headers: { Authorization: `Bearer ${cookies.masterToken}` }
}

const DAYS_NAME = ['Heures', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
type SC = {
    mat: string,
    ens: string,
    room: string
}

export default function SchedulerDetailed ({day, hour, utils, path, data}: {day: number, hour: number, utils: Utils, path: string, data: ScheduleData}) {
    const toast = useToast()
    const initialFocusRef = useRef<any>()
    const { register, handleSubmit, watch, reset, formState: { errors }, control } = useForm<SC>();
    const [isPending, setIspending] = useState(false)
    const [state, setState] = useState({
        mat: data.mat,
        ens: data.ens,
        room: data.room
    })
    useEffect(() => {
        setState(s => {return {
            ...s,
            mat: data.mat,
            ens: data.ens,
            room: data.room
        }})
    }, [data])

    const submit: SubmitHandler<SC> = (data) => {
        setIspending(true)
        const postData = {
            ...data,
            path: path,
            day,
            hour
        }
        
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'schedule/postschedule?id='+cookies.masterId, postData, config)
        .then(res => {
            setIspending(false)
            if(res.data.messageError){
                toast({
                    title: 'Erreur',
                    description: res.data.messageError,
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
            }else{
                toast({
                    title: 'Succes',
                    description: res.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                setState(s => {return {
                    ...s,
                    mat: data.mat,
                    ens: data.ens,
                    room: data.room
                }})
            }
        })
        .catch(err => {
            setIspending(false)
            toast({
                title: 'Erreur',
                description: "Une erreur est survenue",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }

    return <Box>
        <Popover
            initialFocusRef={initialFocusRef}
        >
            <PopoverTrigger>
                <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="80px" h="80px" cursor="pointer">
                    {state.mat !== 'none' && <Tag colorScheme='teal' borderRadius='full'>
                        <Text overflow="hidden" textAlign="center" w="100%">{utils.mat.filter(a => a.code === state.mat)[0]?.intitled}</Text>
                    </Tag>}
                    {state.ens !== 'none' && <Tag colorScheme='red' borderRadius='full'>
                        <Text overflow="hidden" textAlign="center" w="100%">{utils.ens.filter(a => a.identifier === state.ens)[0]?.name}</Text>
                    </Tag>}
                    {state.room !== 'none' && <Tag colorScheme='yellow' borderRadius='full'>
                        <Text overflow="hidden" textAlign="center" w="100%">{utils.room.filter(a => a.room === state.room)[0]?.room}</Text>
                    </Tag>}
                </Flex>
            </PopoverTrigger>
            <PopoverContent bg={useColorModeValue('primary', 'primary_d')} _focus={{boder: 'none'}}>
                <PopoverArrow bg={useColorModeValue('primary', 'primary_d')}/>
                <PopoverHeader>Attribuer un cours</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <FormControl>
                        <FormLabel htmlFor='matiere'>Matiere</FormLabel>
                        <Select 
                            placeholder='Choisir la matiere'
                            isInvalid={errors.mat? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.mat? {borderColor: 'error'}: {}} 
                            {...register("mat", {required: "La matiere est obligatoire"})}
                        >
                            {utils.mat.map(el => {
                                return <option value={el.code} key={el.code}>{el.intitled}</option>
                            })}
                        </Select>
                        {errors.mat && <Text fontSize="14px" fontStyle="italic" color="error">{errors.mat.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='enseignant'>Enseignant</FormLabel>
                        <Select 
                            placeholder={'Choisir la l\'enseignant'}
                            isInvalid={errors.ens? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.ens? {borderColor: 'error'}: {}} 
                            {...register("ens", {required: "Specifiez l'enseignant"})}
                        >
                            {utils.ens.map(el => {
                                return <option value={el.identifier} key={el.identifier}>{el.name} {el.firstname}</option>
                            })}
                        </Select>
                        {errors.ens && <Text fontSize="14px" fontStyle="italic" color="error">{errors.ens.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='room'>Salle</FormLabel>
                        <Select 
                            placeholder='Choisir la salle'
                            isInvalid={errors.room? true: false} 
                            errorBorderColor="error" 
                            _focus={errors.room? {borderColor: 'error'}: {}} 
                            {...register("room", {required: "Specifiez la salle"})}
                        >
                            {utils.room.map(el => {
                                return <option value={el.room} key={el.room}>{el.room}</option>
                            })}
                        </Select>
                        {errors.room && <Text fontSize="14px" fontStyle="italic" color="error">{errors.room.message}</Text>}
                    </FormControl>
                    <FormControl>
                        <Button mt="10px" onClick={handleSubmit(submit)} disabled={isPending}>
                            Enregistrer 
                            {isPending && <Spinner size="sm" ml="5px"/>}
                        </Button>
                    </FormControl>
                </PopoverBody>
                <PopoverFooter>{DAYS_NAME[day]} de {hour>9?hour:'0'+hour}h à {hour+1>9?hour+1:'0'+(hour+1)}h</PopoverFooter>
            </PopoverContent>
        </Popover>
    </Box>
}