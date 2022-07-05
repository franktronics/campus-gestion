import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineOtherHouses } from "react-icons/md";
import { DataRoomType, Fac, Fil } from "../../types/base";

type C = {
    childExpand: number,
    data: DataRoomType,
    onHandleExpand: Function,
    index: number,
    onDeleteEns: Function
}

export default function CardRoom ({data, childExpand, onHandleExpand, index, onDeleteEns}: C) {
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
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'schedule/deleteroom?id='+cookies.masterId, data,config)
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
        h={childExpand === index? '170px': '60px'}
        transition="all ease-in-out .3s"
        p="10px"
        overflow="hidden"
        rounded="md"
    >
        <Flex justifyContent="space-between" alignItems={"center"}>
            <Flex
                alignItems="center"
                onClick={handleExpand}
                cursor="pointer"
            >
                <IconButton aria-label={data.room} icon={<MdOutlineOtherHouses />} />
                <Box>
                    <Text ml="10px">{`${data.room}`}</Text>
                </Box>
            </Flex>
            <Box>
                <IconButton onClick={onOpen} aria-label='Supprimer' icon={<AiOutlineDelete />} />
            </Box>
        </Flex>
        <Box mt="20px" display="flex" flexDirection="column">
            <Box><Text fontWeight="bold">Description:</Text></Box>
            <Box><Text>{data.description}</Text></Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={useColorModeValue('secondary', 'secondary_d')} m="10px">
                <ModalHeader>Supprimer la salle {`${data.room}`}</ModalHeader>
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