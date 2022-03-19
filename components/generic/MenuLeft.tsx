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
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { menuConfig } from '../../config/menuConfig'

export default function MenuLeft() {

    return <Box as="aside" display="flex" flexDirection="column" maxW="200px">
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