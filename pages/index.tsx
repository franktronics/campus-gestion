import { Box, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from "next/link"

const Home: NextPage = () => {

  return <Box>
    <Button>
      <Link href="/connexion">
        <a>Connexion</a>
      </Link>
    </Button>
    <Button>
      <Link href="/inscription">
        <a>Inscription</a>
      </Link>
    </Button>
    <Button>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
    </Button>
  </Box>
}

export default Home
