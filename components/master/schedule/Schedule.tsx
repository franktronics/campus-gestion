import { Box, IconButton, Table, Text, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue, Flex, HStack, PinInput, PinInputField, useToast, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { rounder } from "../../../script/utils";
import {  ScheduleData, Utils } from "../../../types/base";
import SchedulerCompact from "./SchedulerCompact";
import SchedulerDetailed from "./SchedulerDetailed";

const HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
const DAYS = [1, 2, 3, 4, 5, 6, 7]
const DAYS_NAME = ['Heures', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const cookies = {
    masterToken: Cookies.get('masterToken'),
    masterId: Cookies.get('masterId')
}
const config = {
    headers: { Authorization: `Bearer ${cookies.masterToken}` }
}

type C = {
    day: number, 
    hour: number, 
    version: 'detailed' | 'compact',
    utils: Utils,
    path: string,
    data: ScheduleData
}
const CardHours = ({day, hour, version, utils, path, data}: C) => {

    return <Flex w="80px" h="80px" justifyContent="center" alignItems="center" m="0 auto">
        {version === 'detailed' && <SchedulerDetailed day={day} hour={hour} utils={utils} path={path} data={data}/>}
        {version === 'compact' && <SchedulerCompact day={day} hour={hour} utils={utils} path={path} data={data}/>}
    </Flex> 
}
type S = {
    version: 'detailed' | 'compact',
    utils: Utils,
    path: string,
}

export default function Schedule ({version, utils, path}: S) {
    const toast = useToast()
    const [maxElt, setMaxElt] = useState("5")
    const [actualPage, setActualPage] = useState(1)
    const [schedule, setSchedule] = useState<any[]>([])

    const handlePage = (val: 1 | -1) => {
        if(actualPage < rounder(HOURS.length/parseInt(maxElt)) && val === 1) setActualPage(p => p + 1)
        else if(actualPage > 1 && val === -1) setActualPage(p => p - 1)  
    }
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'schedule/getschedule?id='+cookies.masterId, config)
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
                setSchedule(res.data)
            }
        })
        .catch(err => {
            toast({
                title: 'Erreur',
                description: "Une erreur est survenue pendant la recuperation des données",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }, [])

    const findData = (path: string, day: number, hour: number): ScheduleData => {
        const d = schedule.filter(a => a.path === path)
        if(d.length > 0){
            return d[0][`${DAYS_NAME[day].toLowerCase()}`][HOURS.indexOf(hour)]
        }else{
            return {
                mat: 'none',
                ens: 'none',
                room: 'none'
            }
        }
    }
    const { colorMode, toggleColorMode } = useColorMode()

    return <Box 
        bg={useColorModeValue('primary', 'primary_d')} 
        borderRadius="10px"
        w="100%"
    >
        <TableContainer w="100%" fontFamily="body">
            <Table >
                <Thead>
                    <Tr color={useColorModeValue('primary_d', 'text1_d')}>
                        {DAYS_NAME.map((name: string) => {
                            return <Th key={name}>
                                <Text 
                                    textAlign="center" 
                                    fontFamily="body"
                                >{name}</Text>
                            </Th>
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {HOURS.map((hour, k) => {
                        return <Tr key={hour+k} bg={k % 2 === 0? (colorMode === 'light'? 'color1': 'color1_d'): ''}>
                            <Td textAlign="center">{hour>9? hour: '0'+hour}h - {hour+1>9? hour+1: '0'+(hour + 1)}h</Td>
                            {DAYS.map((day, j) => {
                                return <Td 
                                    key={day+j} 
                                    p="10px" 
                                    _hover={colorMode === 'light'? {bg: 'color2'}: {bg: 'color2_d'}}
                                >
                                    <CardHours 
                                        day={day} 
                                        hour={hour} 
                                        version={version}
                                        utils={utils}
                                        path={path}
                                        data={findData(path, day, hour)}
                                    />
                                </Td>
                            })}
                        </Tr>
                    }).slice(parseInt(maxElt) * (actualPage - 1), parseInt(maxElt) * actualPage)}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td colSpan={7}>
                            <Flex alignItems="center" gap="10px">
                                <Text>Page {actualPage}/{rounder(HOURS.length/parseInt(maxElt))}</Text>
                                <IconButton disabled={actualPage <= 1} aria-label='rentrer' icon={<AiOutlineArrowLeft />} onClick={() => handlePage(-1)}/>
                                <IconButton disabled={actualPage >= rounder(HOURS.length/parseInt(maxElt))} aria-label='avancer' icon={<AiOutlineArrowRight />} onClick={() => handlePage(1)}/>
                                <Text>Nombre de lignes</Text>
                                <HStack>
                                    <PinInput defaultValue={"5"} value={maxElt} onChange={(e: string) => {parseInt(e) > 0?setMaxElt(e):maxElt}}>
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </Flex>
                        </Td>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    </Box>
}