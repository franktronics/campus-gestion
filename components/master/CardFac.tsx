import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Fac } from "../../types/base";

export default function CardFac({data, onHandleClick}: {data: Fac, onHandleClick: any}){

    return <Box 
        w={{base: '100%', md: '200px'}} 
        height={{base: '150px', md: '250px'}} 
        bg={useColorModeValue('primary', 'primary_d')}
        p="10px"
        m="10px"
        rounded="lg"
        boxShadow="card"
        _hover={{cursor: 'pointer'}}
    >
        <Box h="30%">
        </Box>
        <Box onClick={() => onHandleClick(data)}>

            <Box h="70%">
                <Text textAlign="center">{data.title.toUpperCase()}</Text>
            </Box>
        </Box>
    </Box>
}