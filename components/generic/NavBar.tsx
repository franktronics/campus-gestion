import { Box } from "@chakra-ui/react";
import Logo from "./Logo";
import SwitchTheme from "./SwitchTheme";

export default function NavBar(){

    return <Box as="nav" display="flex" alignItems="center" justifyContent="space-between" h="60px" px={5}>
        <Box>
            <Logo/>
        </Box>
        <Box>
            <SwitchTheme/>
        </Box>
    </Box>
}