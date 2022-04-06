import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Box,
    Button,
    IconButton,
} from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { menuConfig } from '../../config/menuConfig'
import Logo from './Logo'

export default function MenuLeft({menuOpen, onHandleMenuOpen}: {menuOpen: boolean, onHandleMenuOpen: Function}) {


    const toggleMenu = () => {
        onHandleMenuOpen((c: boolean) => !c)
    }

    return <Box 
            as="aside" 
            bg="#0f0" 
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
        >
        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Logo/>
            <Box display={{base: "block", md: "none"}} onClick={toggleMenu}>
                <IconButton aria-label='Search database' icon={<CloseIcon />} />
            </Box>
        </Box>
        {
        menuConfig.map((item, k) => {
            if(item.subMenu){
                return <Box mb={1} w="100%">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {item.title}
                        </MenuButton>
                        <MenuList>
                            {item.subMenu.map((sub, j) => {
                                return <MenuItem>{sub.title}</MenuItem>
                            })}
                        </MenuList>
                    </Menu>
                </Box>
            }else{
                return <Box mb={1} w="100%">
                    <Menu>
                        <MenuButton as={Button} rightIcon={null}>
                            {item.title}
                        </MenuButton>
                    </Menu>
                </Box>
            }
        })
        }
    </Box>
}