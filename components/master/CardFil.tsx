import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Fil } from "../../types/base";

export default function CardFil ({data}: {data: Fil}) {

    return <Box
        w="200px" height="250px"
        bg={useColorModeValue('primary', 'primary_d')}
        p="10px"
        m="10px"
        rounded="lg"
        boxShadow="card"
    >
        <Box h="70%">

        </Box>
        <Box h="30%">
            <Text textAlign="center">{data.title.toUpperCase()}</Text>
        </Box>
    </Box>
}