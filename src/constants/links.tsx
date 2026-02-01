import { FaWhatsappSquare} from 'react-icons/fa'
import { FaInstagram } from "react-icons/fa6";

export const navbarlinks = [
    {
        id: 1,
        title: 'Papeleria',
        href: '/papereria'
    },
    {
        id: 2,
        title: 'Equipos de oficina',
        href: '/products'
    },
    {
        id: 3,
        title: 'varios',
        href: '/about'
    },
    {
        id: 4,
        title: 'Contacto',
        href: '/contact'
    }
]

export const SocialLinks = [
    {
        id: 1,
        title: 'whatsapp',
        href: 'https://www.facebook.com/profile.php?id=100090553708820',
        icon: <FaWhatsappSquare size={20}/>
    },
    {
        id: 2,  
        title: 'Instagram',
        href: 'https://www.instagram.com/officecityve/',
        icon: <FaInstagram size={20}/>
    },
]
