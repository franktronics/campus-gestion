import { Box, Button, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from "next/link"
import Image from 'next/image'
import background from '../public/img/background.png'

const BtnLink = ({link, name, style}: {link: string, name: string, style: any}) => {
  return <Link href={link}>
    <a>
      <Box style={style} display="inline-block" p="10px" rounded="md" border="2px" borderColor="#fff" role="group" _hover={{borderColor: '#2bb2d9', bg: "#fff"}} transition="all .3s">
        <Text color="#fff" _groupHover={{color: "#2bb2d9"}} transition="all .3s">{name}</Text>
      </Box>
    </a>
  </Link>
}

const Home: NextPage = () => {

  const style1 = {
    position: 'absolute',
    top: '100px',
    right: '20%'
  }
  const style2 = {
    position: 'absolute',
    top: '180px',
    right: '25%'
  }
  const style3 = {
    position: 'absolute',
    top: '260px',
    right: '30%'
  }
  const style4 = {
    right: '50%',
    transform: 'translateX(50%)'
  }

  return <Box>
    <Box as="header" position="relative" h="100vh" w="100%">
      <Box position="absolute" inset="0">
        <Image src={background} layout="fill" objectFit='cover' objectPosition="left"/>
      </Box>
      <Box as="nav" position="relative" zIndex="10" bg="#2bb2d9" display="flex" justifyContent="center">
        <Box display="flex" justifyContent="space-between" alignItems="center" maxW="1000px" height="60px">
          <Box><Text color="#fff">Campus Gestion</Text></Box>
        </Box>
      </Box>
      <Box position="relative" zIndex="10">
        <BtnLink link="/inscription" name="Inscription etudiant" style={style1}/>
        <BtnLink link="/connexion" name="Connexion etudiant" style={style2}/>
        <BtnLink link="/connexion-en" name="Inscription enseignant" style={style3}/>
      </Box>
    </Box>
  </Box>
}

export default Home