import { Box } from "@chakra-ui/react";
import SwitchTheme from "./SwitchTheme";
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from "@chakra-ui/icons";

export default function NavBar({menuOpen, onHandleMenuOpen}: {menuOpen: boolean, onHandleMenuOpen: Function}){

    const toggleMenu = () => {
        onHandleMenuOpen((c: boolean) => !c)
    }

    return <Box as="nav" ml={{base: 0, md: "200px"}} display="flex" alignItems="center" justifyContent="space-between" h="60px" px={2}>
        <Box>
            <Box display={{base: "block", md: "none"}} onClick={toggleMenu}>
                <IconButton aria-label='Search database' icon={<HamburgerIcon />} />
            </Box>
        </Box>
        <Box>
            <SwitchTheme/>
        </Box>
    </Box>
}