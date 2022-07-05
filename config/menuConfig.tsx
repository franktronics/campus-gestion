import { CalendarIcon } from "@chakra-ui/icons"
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai"
import { MenuConfig } from "../types/base"
import { FaChalkboardTeacher } from "react-icons/fa"
import { BsJournalBookmark } from "react-icons/bs"
import { MdOutlineHomeWork } from "react-icons/md"
import { FiUsers } from "react-icons/fi"

const size = 25

export const menuConfig1: MenuConfig[] = [
    {
        title: 'Accueil',
        link: '',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
    {
        title: 'Semestre 1',
        link: '',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
    {
        title: 'Semestre 2',
        link: '',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
    {
        title: 'Diffusion',
        link: '',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
    {
        title: 'Emploi de temps',
        link: '',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
]
//////
export const menuConfigMaster: MenuConfig[] = [
    {
        title: 'Accueil',
        link: '/master/dashboard',
        icon: <AiOutlineHome size={size}/>,
        query: ''
    },
    {
        title: 'Enseignants',
        link: '/master/dashboard?name=enseignants',
        icon: <FaChalkboardTeacher size={size}/>,
        query: 'enseignants'
    },
    {
        title: 'Matieres',
        link: '/master/dashboard?name=matieres',
        icon: <BsJournalBookmark size={size}/>,
        query: 'matieres'
    },
    {
        title: 'Salles',
        link: '/master/dashboard?name=salles',
        icon: <MdOutlineHomeWork size={size}/>,
        query: 'salles'
    },
    {
        title: 'Etudiants',
        link: '/master/dashboard?name=etudiants',
        icon: <FiUsers size={size}/>,
        query: 'etudiants'
    },
    {
        title: 'Reglage',
        link: '/master/dashboard?name=reglage',
        icon: <AiOutlineSetting size={size}/>,
        query: 'reglage'
    },
]