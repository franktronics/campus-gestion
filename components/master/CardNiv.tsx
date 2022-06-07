import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function({data, onHandleClick}: {data: string, onHandleClick: Function}) {

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
            <Text textAlign="center">{data.toUpperCase()}</Text>
        </Box>
    </Box>
}