import { Avatar, Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { DataEnseignantType } from "../../types/base";

type C = {
    childExpand: number,
    data: DataEnseignantType,
    onHandleExpand: Function,
    index: number,
    onDeleteEns: Function
}

export default function CardEns ({data, childExpand, onHandleExpand, index, onDeleteEns}: C) {
    const toast = useToast()
    const handleExpand = () => {
        if(childExpand === index) onHandleExpand(-1)
        else onHandleExpand(index)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cookies = {
        masterToken: Cookies.get('masterToken'),
        masterId: Cookies.get('masterId')
    }
    const config = {
        headers: { Authorization: `Bearer ${cookies.masterToken}` }
    }

    const deleteEns = () => {
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'master/deleteens?id='+cookies.masterId, data,config)
            .then(res => {
                if(res.data.messageError){
                    toast({
                        title: 'Erreur',
                        description: res.data.messageError,
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }else{
                    onClose()
                    toast({
                        title: 'Succes',
                        description: res.data.message,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                    onDeleteEns(data)
                }
            })
            .catch(err => {
                toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }

    return <Box
        bg={useColorModeValue('secondary', 'secondary_d')} 
        mb="20px"
        h={childExpand === index? '130px': '68px'}
        transition="all ease-in-out .3s"
        p="10px" 
        overflow="hidden"
        rounded="md"
    >
        <Flex alignItems="center" justifyContent="space-between">
            <Flex 
                alignItems="center" 
                onClick={handleExpand}
                cursor="pointer"
            >
                <Box mr="10px">
                    <Avatar name={`${data.name} ${data.firstname}`} src='' size="md" />
                </Box>
                <Box>
                    <Text>{`${data.name} ${data.firstname}`}</Text>
                </Box>
            </Flex>
            <Box>
                <IconButton onClick={onOpen} aria-label='Supprimer' icon={<AiOutlineDelete />} />
            </Box>
        </Flex>
        <Box mt="20px" display="flex" justifyContent="space-between">
            <Box><Text fontWeight="bold">Grade:</Text> {data.grade}</Box>
            <Box><Text fontWeight="bold">Phone:</Text> {data.phoneNumber}</Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={useColorModeValue('secondary', 'secondary_d')}>
                <ModalHeader>Supprimer {`${data.name} ${data.firstname}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Cette opération est irréversible</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='red' onClick={() => deleteEns()}>
                        Supprimer
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}