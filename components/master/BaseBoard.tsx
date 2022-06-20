import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { CookiesMaster, Fac, Fil } from "../../types/base";
import CardFac from "./CardFac";
import CardFil from "./CardFil";
import CardNiv from "./CardNiv";
import ModifCard from "./ModifCard";

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
    /*const dataFac: Fac[] = [
        {
            id: 'fac1',
            title: 'Faculté des arts, lettres et sciences humaines',
        },
        {
            id: 'fac2',
            title: 'Faculté des sciences'
        }
    ]*/
    /*const dataFil: Fil[] = [
        {
            id: 'fil1',
            title: 'Allemand',
            facId: 'fac1',
        },
        {
            id: 'fil2',
            title: 'Anglais',
            facId: 'fac1',
        },
        {
            id: 'fil3',
            title: 'Anthropologie',
            facId: 'fac1',
        },
        {
            id: 'fil4',
            title: 'Informatique',
            facId: 'fac2',
        },
        {
            id: 'fil5',
            title: 'Mathématiques',
            facId: 'fac2',
        },
        {
            id: 'fil6',
            title: 'Microbiologie',
            facId: 'fac2',
        },
        {
            id: 'fil7',
            title: 'Biochimie',
            facId: 'fac2',
        },
    ]*/
    
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
                console.log(res);
                
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

    return <Box>
        {status.fac === '' && <>
            <Flex alignItems="center">
                <Text fontSize="4xl" mr="10px">Facultés</Text>
                <ModifCard
                    type="fac"
                    title="Creer une faculté"
                />
            </Flex>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {dataFac.map((fac, k) => {
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
                />
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {dataFil.map((fil, k) => {
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
                {status.fac}/{status.fil}/{status.niv}
            </Box>
        </>}
    </Box>
}