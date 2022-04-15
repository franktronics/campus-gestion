import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Box, Center, Text } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

export default function DropProfilPicture({fileType = ["JPG"], maxSize = 2, onHandleFile}: {fileType?: string[], maxSize?: number, onHandleFile: Function}){

    const [file, setFile] = useState(null);

    const defaultChild = <Box transition="opacity .2s" opacity={0} _groupHover={{opacity: 1}}><AiOutlineEdit size="30"/></Box>
    const [child, setChild] = useState<JSX.Element>(defaultChild)

    const fileSize = [0.001, maxSize]

    function onError(err: "size" | "type"){
        setFile(null)

        if(err === "size") setChild(<Text align="center" fontSize='sm'>Trop loud! 2Mo max</Text>)
        else setChild(<Text align="center" fontSize='sm'>Uniquement {fileType.map(f => {return f + ", "})}</Text>)

        const timer = setTimeout(() => {
            setChild(defaultChild)
            clearTimeout(timer)
        }, 2000)
    }
    const handleChange = (file: any) => {
        setFile(file);
        onHandleFile(file)
    };

    return <Box>
        <FileUploader 
            handleChange={handleChange} 
            onDrop={handleChange}
            name="file" 
            types={fileType}
            maxSize={fileSize[1]}
            minSize={fileSize[0]}
            onSizeError={() => onError("size")}
            onTypeError={() => onError("type")}
            hoverTitle=" "
        >
            <Box borderRadius="50%" width="128px" height="128px" display="flex" justifyContent="center" alignItems="center" _hover={{cursor: "pointer"}}>
                {child}
            </Box>
        </FileUploader>
    </Box>
}