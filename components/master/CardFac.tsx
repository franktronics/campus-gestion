import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { Fac } from "../../types/base";

export default function CardFac({data, onHandleClick}: {data: Fac, onHandleClick: any}){

    return <Box 
        w="200px" height="250px"
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