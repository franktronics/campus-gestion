import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, IconButton, Input, Spinner, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { stringify } from "querystring";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AlertType, ModifCardType } from "../../types/base";


export default function ModifCard ({type, title}: ModifCardType) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement>(null)
    const [isPending, setIsPending] = useState(false)
    const [alert, setAlert] = useState<AlertType>({
        status: 'success',
        title: 'Test',
        description: 'Lorem ipsum dolor sit amet.'
    })

    return <>
        <IconButton aria-label='Ajouter' icon={<AiOutlinePlus />} ref={btnRef} onClick={onOpen} />
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent bg={useColorModeValue('primary', 'primary_d')}>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth='1px'>{title}</DrawerHeader>

                <DrawerBody>
                    <FormControl>
                        <FormLabel htmlFor='new-name'>Entrer le nom</FormLabel>
                        <Input id="new-name" placeholder='Faculté de...' />
                    </FormControl>
                    {alert.title !== '' && <FormControl mt="20px">
                        <Alert status={alert.status}>
                            <AlertIcon />
                            <AlertTitle>{alert.title}</AlertTitle>
                            <AlertDescription>{alert.description}</AlertDescription>
                        </Alert>
                    </FormControl>}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Annuler
                    </Button>
                    <Button colorScheme='blue'>Creer {isPending && <Spinner size='sm' ml="5px"/>}</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}