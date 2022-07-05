import type { AppProps } from 'next/app'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from '../config/theme'
import { Chakra } from '../config/Chakra'
import '../style/app.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Chakra cookies={pageProps.cookies}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Chakra>
  )
}

export default MyApp
