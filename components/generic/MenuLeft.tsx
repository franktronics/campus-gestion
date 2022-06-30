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
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MenuLeft({menuOpen, onHandleMenuOpen, menuConfig}: {menuOpen: boolean, onHandleMenuOpen: Function, menuConfig: MenuConfig[]}) {
    const router = useRouter()
    const query = router.query.name? router.query.name: ''

    const toggleMenu = () => {
        onHandleMenuOpen((c: boolean) => !c)
    }

    return <Box 
            as="aside" 
            position="fixed" 
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
            zIndex={1000}
        >
        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center" mb="40px">
            <Logo/>
            <Box display={{base: "block", md: "none"}} onClick={toggleMenu}>
                <IconButton aria-label='Search database' icon={<CloseIcon />} />
            </Box>
        </Box>
        {
            menuConfig.map((item, k) => {
                return <Flex key={k} p={2} mb="15px" bg={query === item.query? 'bg1' :"var(--primary)"} alignItems="center" borderRadius="10px" _hover={{cursor: 'pointer', background: 'bg1'}} transition="all .3s">
                    {item.icon}
                    <Link href={item.link}>
                        <a><Text ml={2}>{item.title}</Text></a>
                    </Link>
                </Flex>
            })
        }
    </Box>
}