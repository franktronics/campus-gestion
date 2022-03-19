import { Box, Flex } from "@chakra-ui/react";

export default function Logo(){

    return <Flex>
        <Box color="blue.500" fontSize={20} fontWeight="bold">Campus</Box>
        <Box color="gray.400" fontSize={20} fontWeight="bold">Gestion</Box>
    </Flex>
}