import { Box, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { menuConfigMaster } from "../../config/menuConfig"
import MenuLeft from "./MenuLeft"
import NavBar from "./NavBar"

type B = {
    children: JSX.Element | string,
}

export default function Board ({children}: B) {

    const [menuOpen, setMenuOpen] = useState(false)
    
    return <Box as="main" position="relative" bg={useColorModeValue('secondary', 'secondary_d')} minH="100vh">
        <NavBar menuOpen={menuOpen} onHandleMenuOpen={setMenuOpen}/>
        <MenuLeft 
            menuOpen={menuOpen} 
            onHandleMenuOpen={setMenuOpen} 
            menuConfig={menuConfigMaster}
        />
        <Box 
            w={{base: "100%", md: "calc(100% - 200px)"}} 
            ml={{base: 0, md: "200px"}} p="10"
        >
            {children}
        </Box>
    </Box>
}