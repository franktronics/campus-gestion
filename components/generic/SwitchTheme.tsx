import { Center, Button, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function SwitchTheme () {
    const { colorMode, toggleColorMode } = useColorMode()

    return <Button onClick={toggleColorMode}>
        {colorMode === 'light' && <Center>
            <MoonIcon/>
        </Center>}
        {colorMode === 'dark' && <Center>
            <SunIcon/>
        </Center>}
    </Button>
}