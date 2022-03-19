// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager,
  } from '@chakra-ui/react'
  import { GetServerSideProps } from 'next'
  import { InferGetServerSidePropsType } from 'next'
  
  export function Chakra({ cookies, children }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
    const colorModeManager =
      typeof cookies === 'string'
        ? cookieStorageManager(cookies)
        : localStorageManager
  
    return (
      <ChakraProvider colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    )
  }
  
  // also export a reusable function getServerSideProps
  export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    return {
      props: {
        // first time users will not have any cookies and you may not return
        // undefined here, hence ?? is necessary
        cookies: req.headers.cookie ?? '',
      },
    }
  }