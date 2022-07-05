import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { CookiesMaster, Fac, Fil } from "../../types/base";
import CardFac from "./CardFac";
import CardFil from "./CardFil";
import CardNiv from "./CardNiv";
import ModifCard from "./ModifCard";
import ScheduleLayout from "./schedule/ScheduleLayout";

export default function BaseBoard ({cookies}: {cookies: CookiesMaster}) {
    const [status, setStatus] = useState({
        fac: '',
        fil: '',
        niv: ''
    })
    const [dataFac, setDataFac] = useState([{
        id: '',
        title: '',
    }])
    const [dataFil, setDataFil] = useState([{
        id: '',
        title: '',
        facId: '',
    }])
    
    const onFacClick = (facCliked: Fac) => {
        setStatus(s => {return {
            ...s,
            fac: facCliked.id, //indique qu'on est dans une faculte et on doit afficher les fil
        }})
    }
    const onFilClick = (filCliked: Fil) => {
        setStatus(s => {return {
            ...s,
            fil: filCliked.id, //indique qu'on est dans une faculte et on doit afficher les fil
        }})
    }
    const onNivClick = (nivClick: string) => {
        setStatus(s => {return {
            ...s,
            niv: nivClick, //indique qu'on est dans une faculte et on doit afficher les fil
        }})
    }
    const backState = () => {
        if(status.niv !== '') {
            setStatus(s => {
                return {
                    ...s,
                    niv: ''
                }
            })
        }else if(status.fil !== '' && status.niv === '') {
            setStatus(s => {
                return {
                    ...s,
                    fil: ''
                }
            })
        }else if(status.fac !== '' && status.fil === '' && status.niv === '') {
            setStatus(s => {
                return {
                    ...s,
                    fac: ''
                }
            })
        }
    }
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${cookies.masterToken}` }
        }
        axios.get(process.env.NEXT_PUBLIC_BACK+ 'master/getdata?id='+cookies.masterId, config)
        .then((res) => {  
            if(res.data.messageError){
                
            }else{ 
                setDataFac([])
                setDataFac(f => {return [...f, ...res.data.fac]})
                setDataFil([])
                setDataFil(f => {return [...f, ...res.data.fil]})
            }
        })
        .catch((error) => {
            console.log(error);
            
        })
    }, [])

    const handleFac = (id: string, title: string) => {
        setDataFac(
            dataFac.concat({id, title})
        )
    }
    const handleFil = (id: string, title: string, facId: string) => {
        setDataFil(
            dataFil.concat({id, title, facId})
        )
    }

    return <Box>
        {status.fac === '' && <>
            <Flex alignItems="center">
                <Text fontSize="4xl" mr="10px">Facultés</Text>
                <ModifCard
                    type="fac"
                    title="Creer une faculté"
                    onHandleFac={handleFac}
                    onHandleFil={handleFil}
                />
            </Flex>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {typeof(dataFac) !== 'string' && dataFac.map((fac, k) => {
                    return <CardFac key={fac.id} data={fac} onHandleClick={onFacClick}/>
                })}
            </Box>
        </>}
        {(status.fac !== '' && status.fil === '') && <>
            <Box fontSize="4xl" display="flex" alignItems="center">
                <IconButton aria-label='retour' mr="10px" icon={<AiOutlineLeft/>} onClick={backState}/>
                <Text mr="10px">Filieres</Text>
                <ModifCard
                    type="fil"
                    title="Creer une filiere"
                    fac={status.fac}
                    onHandleFac={setDataFac}
                    onHandleFil={setDataFil}
                />
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {typeof(dataFil) !== 'string' && dataFil.map((fil, k) => {
                    if(status.fac === fil.facId) return <CardFil key={fil.id} data={fil} onHandleClick={onFilClick}/>
                })}
            </Box>
        </>}
        {(status.fil !== '' && status.niv === '') && <>
            <Box fontSize="4xl" display="flex" alignItems="center">
                <IconButton aria-label='retour' mr="10px" icon={<AiOutlineLeft/>} onClick={backState}/>
                <Text>Niveaux</Text>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {['1', '2', '3', '4', '5'].map((niv, k) => {
                    return <CardNiv key={niv} data={niv} onHandleClick={onNivClick}/>
                })}
            </Box>
        </>}
        {(status.fac !== '' && status.fil !== '' && status.niv !== '') && <>
            <Box fontSize="4xl" display="flex" alignItems="center">
                <IconButton aria-label='retour' mr="10px" icon={<AiOutlineLeft/>} onClick={backState}/>
                <Text>Niveau</Text>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                <ScheduleLayout 
                    dataFac={dataFac} 
                    dataFil={dataFil}
                    path={status.fac+'-'+status.fil+'-'+status.niv}
                />
            </Box>
        </>}
    </Box>
}