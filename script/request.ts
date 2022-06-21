import axios from "axios"
import Cookies from "js-cookie"

export async function postMasterRequest (url: string, data: any) {
    const userCookies = {
        id: Cookies.get('masterId')? Cookies.get('masterId'): '',
        token: Cookies.get('masterToken')? Cookies.get('masterToken'): ''
    }
    const config = {
        headers: { Authorization: `Bearer ${userCookies.token}` }
    }
    
    return await axios.post(process.env.NEXT_PUBLIC_BACK+url+'?id='+userCookies.id , data, config)
}