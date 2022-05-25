import {
    Box,
    IconButton,
    Text,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import Logo from './Logo'
import { MenuConfig } from '../../types/base'

export default function MenuLeft({menuOpen, onHandleMenuOpen, menuConfig}: {menuOpen: boolean, onHandleMenuOpen: Function, menuConfig: MenuConfig[]}) {


    const toggleMenu = () => {
        onHandleMenuOpen((c: boolean) => !c)
    }

    return <Box 
            as="aside" 
            position="absolute" 
            left={{base: menuOpen? "0": "-200px", md: "0"}} 
            top="0" bottom="0" 
            height="100vh" 
            display="flex" 
            flexDirection="column" 
            w="200px"
            p="10px"
            pt="20px"
            transition="left ease-in-out .2s"
            bg={useColorModeValue('primary', 'primary_d')}
            boxShadow="card"
        >
        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center" mb="40px">
            <Logo/>
            <Box display={{base: "block", md: "none"}} onClick={toggleMenu}>
                <IconButton aria-label='Search database' icon={<CloseIcon />} />
            </Box>
        </Box>
        {
            menuConfig.map((item, k) => {
                return <Flex key={k} p={2} bg="var(--primary)" alignItems="center" borderRadius="10px">
                    {item.icon}
                    <Text ml={2}>{item.title}</Text>
                </Flex>
            })
        }
    </Box>
}