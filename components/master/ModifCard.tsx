import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, IconButton, Input, Spinner, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAlert } from "../../hooks/useAlert";
import { postMasterRequest } from "../../script/request";
import { ModifCardType } from "../../types/base";


export default function ModifCard ({type, title, fac = '', onHandleFac, onHandleFil}: ModifCardType) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement>(null)
    const [isPending, alertStatus, alertTitle, alertDes, handlePending, handleAlert] = useAlert()
    const [name, setName] = useState('')
    
    const handleSubmit = async () => {
        handlePending(true)
        handleAlert()
        try{
            const res = await postMasterRequest(`master/${type === 'fac'? 'addfac': 'addfil'}`, {name, fac})
            if(res.data.message) handleAlert('success', 'Succes', res.data.message)
            if(res.data.messageError) handleAlert('warning', 'Alerte', res.data.messageError)
            handlePending(false)
            setName('')
            if(type === 'fac'){
                onHandleFac(res.data.id, res.data.title)
            }else if(type === 'fil'){
                onHandleFil(res.data.id, res.data.title, res.data.facId)
            }
            const timer = setTimeout(() => {
                handleAlert()
                clearTimeout(timer)
            }, 3000)
        }catch (err) {
            handleAlert('error', 'Erreur', 'Une erreur s\'est produite')
            handlePending(false)
            setName('')
            const timer = setTimeout(() => {
                handleAlert()
                clearTimeout(timer)
            }, 3000)
        }
    }

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
                        <Input 
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            id="new-name" 
                            placeholder='Completez...' 
                            minLength={4}
                        />
                    </FormControl>
                    {alertTitle !== '' && <FormControl mt="20px">
                        <Alert status={alertStatus}>
                            <AlertIcon />
                            <AlertTitle>{alertTitle}</AlertTitle>
                            <AlertDescription>{alertDes}</AlertDescription>
                        </Alert>
                    </FormControl>}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Annuler
                    </Button>
                    <Button 
                        colorScheme='blue'
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        Creer {isPending && <Spinner size='sm' ml="5px"/>}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}