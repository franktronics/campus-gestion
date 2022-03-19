import { Button, useColorMode } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return <div>
    <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  </div>
}

export default Home
