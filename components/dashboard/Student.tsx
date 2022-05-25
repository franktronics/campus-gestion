import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { menuConfig1 } from "../../config/menuConfig";
import MenuLeft from "../generic/MenuLeft";
import NavBar from "../generic/NavBar";



export default function Student(){
    const [menuOpen, setMenuOpen] = useState(false)
    
    return <Box as="main" position="relative">
        <NavBar menuOpen={menuOpen} onHandleMenuOpen={setMenuOpen}/>
        <MenuLeft menuOpen={menuOpen} onHandleMenuOpen={setMenuOpen} menuConfig={menuConfig1}/>
        <Box w={{base: "100%", md: "calc(100% - 200px)"}} ml={{base: 0, md: "200px"}} p="10">
            e
        </Box>
    </Box>
}