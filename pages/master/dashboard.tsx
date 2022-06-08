import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Board from '../../components/generic/Board'
import BaseBoard from '../../components/master/BaseBoard'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { CookiesMaster } from '../../types/base'

const Dashboard: NextPage = () => {
    const router = useRouter()

    const [cookies, setCookies] = useState<CookiesMaster>({
        masterId: Cookies.get('masterId') || '',
        masterToken: Cookies.get('masterToken') || '',
        identifier: Cookies.get('identifier') || ''
    })
    useEffect(() => {
        const id = Cookies.get('masterId')
        const token = Cookies.get('masterToken')
        const identf = Cookies.get('identifier')
        
        if(!id || !token || !identf){
            router.push('/master/connexion')
        }else{
            setCookies(c => {
                return {...c, masterId: id, masterToken: token, identifier: identf}
            })
        }
    }, [])

    return <Board>
        <BaseBoard cookies={cookies}/>
    </Board>
}

export default Dashboard