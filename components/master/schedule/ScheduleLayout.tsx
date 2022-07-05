import { Box, useToast } from "@chakra-ui/react"
import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Fac, Fil, Utils } from "../../../types/base"
import Schedule from "./Schedule"

type S = {
    dataFac: Fac[],
    dataFil: Fil[],
    path: string //fac-fil-niv
}
const cookies = {
    masterToken: Cookies.get('masterToken'),
    masterId: Cookies.get('masterId')
}
const config = {
    headers: { Authorization: `Bearer ${cookies.masterToken}` }
}

export default function ScheduleLayout ({dataFac, dataFil, path}: S) {
    const toast = useToast()
    const [utils, setUtils] = useState<Utils>({
        mat: [],
        ens: [],
        room: []
    })
    
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'schedule/getscheduleutils?id='+cookies.masterId, config)
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
                setUtils(u => {return {
                    ...u,
                    mat: res.data.mat,
                    ens: res.data.ens,
                    room: res.data.room
                }})
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
    
    return <Box w="100%" maxW="1200px">
        <Schedule version="detailed" utils={utils} path={path}/>
    </Box>
}