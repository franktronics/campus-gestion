import { CalendarIcon } from "@chakra-ui/icons"
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai"
import { MenuConfig } from "../types/base"
import { FaChalkboardTeacher } from "react-icons/fa"
import { BsJournalBookmark } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"

const size = 25

export const menuConfig1: MenuConfig[] = [
    {
        title: 'Accueil',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
    {
        title: 'Semestre 1',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
    {
        title: 'Semestre 2',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
    {
        title: 'Diffusion',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
    {
        title: 'Emploi de temps',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
]
//////
export const menuConfigMaster: MenuConfig[] = [
    {
        title: 'Accueil',
        link: '',
        icon: <AiOutlineHome size={size}/>
    },
    {
        title: 'Enseignants',
        link: '',
        icon: <FaChalkboardTeacher size={size}/>
    },
    {
        title: 'Matieres',
        link: '',
        icon: <BsJournalBookmark size={size}/>
    },
    {
        title: 'Etudiants',
        link: '',
        icon: <FiUsers size={size}/>
    },
    {
        title: 'Reglage',
        link: '',
        icon: <AiOutlineSetting size={size}/>
    },
]