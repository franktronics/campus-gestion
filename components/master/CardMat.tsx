import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import { DataMatType, Fac, Fil } from "../../types/base";

type C = {
    childExpand: number,
    data: DataMatType,
    onHandleExpand: Function,
    index: number,
    onDeleteEns: Function,
    dataTable: {fac: Fac[], fil: Fil[]}
}

export default function CardMat ({data, childExpand, onHandleExpand, index, onDeleteEns, dataTable}: C) {
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
        axios.post(process.env.NEXT_PUBLIC_BACK+ 'master/deletemat?id='+cookies.masterId, data,config)
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
        h={childExpand === index? '250px': '60px'}
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
                <IconButton aria-label={data.intitled} icon={<BiBookOpen />} />
                <Box>
                    <Text ml="10px">{`${data.code} ${data.intitled}`}</Text>
                </Box>
            </Flex>
            <Box>
                <IconButton onClick={onOpen} aria-label='Supprimer' icon={<AiOutlineDelete />} />
            </Box>
        </Flex>
        <Box mt="20px" display="flex" flexDirection="column">
            <Box><Text fontWeight="bold">Faculte:</Text>{dataTable.fac.filter((el: Fac) => el.id === data.fac)[0]?.title}</Box>
            <Box><Text fontWeight="bold">Filiere:</Text>{dataTable.fil.filter((el: Fac) => el.id === data.fil)[0]?.title}</Box>
            <Box><Text fontWeight="bold">Niveau:</Text> {data.niv}</Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={useColorModeValue('secondary', 'secondary_d')} m="10px">
                <ModalHeader>Supprimer {`${data.intitled}`}</ModalHeader>
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