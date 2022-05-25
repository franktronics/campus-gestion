import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Fac, Fil } from "../../types/base";
import CardFac from "./CardFac";
import CardFil from "./CardFil";

export default function BaseBoard () {
    const [status, setStatus] = useState({
        actual: 'fac',
        preview: ''
    })
    const dataFac: Fac[] = [
        {
            id: 'fac1',
            title: 'Faculté des arts, lettres et sciences humaines',
        },
        {
            id: 'fac2',
            title: 'Faculté des sciences informatique'
        }
    ]
    const dataFil: Fil[] = [
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
    ]
    const onFacClick = (facCliked: Fac) => {
        setStatus(s => {return {
            ...s,
            actual: 'fil', //indique qu'on est dans une facule et on doit afficher les fil
            preview: facCliked.id //id de la faculte choisie
        }})
    }
    const backState = () => {
        setStatus(s => {return {
            ...s,
            actual: 'fac',
            preview: ''
        }})
    }

    return <Box>
        {status.actual === 'fac' && <>
            <Text fontSize="4xl">Facultés</Text>
            <Flex wrap="wrap">
                {dataFac.map((fac, k) => {
                    return <CardFac key={fac.id} data={fac} onHandleClick={onFacClick}/>
                })}
            </Flex>
        </>}
        {status.actual === 'fil' && <>
            <Box fontSize="4xl" display="flex" alignItems="center">
                <IconButton aria-label='retour' mr="10px" icon={<AiOutlineLeft/>} onClick={backState}/>
                <Text>Filieres</Text>
            </Box>
            <Box display="flex" flexWrap="wrap">
                {dataFil.map((fil, k) => {
                    if(status.preview === fil.facId) return <CardFil key={fil.id} data={fil}/>
                })}
            </Box>
        </>}
    </Box>
}