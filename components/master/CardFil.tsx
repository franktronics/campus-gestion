import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Fil } from "../../types/base";

export default function CardFil ({data, onHandleClick}: {data: Fil, onHandleClick: Function}) {

    return <Box
        w={{base: '100%', md: '200px'}} 
        height={{base: '150px', md: '250px'}} 
        bg={useColorModeValue('primary', 'primary_d')}
        p="10px"
        m="10px"
        rounded="lg"
        boxShadow="card"
        onClick={() => onHandleClick(data)}
        _hover={{cursor: 'pointer'}}
    >
        <Box h="70%">

        </Box>
        <Box h="30%">
            <Text textAlign="center">{data.title.toUpperCase()}</Text>
        </Box>
    </Box>
}