import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Board from '../../components/generic/Board'
import BaseBoard from '../../components/master/BaseBoard'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Dashboard: NextPage = () => {
    const router = useRouter()

    const [cookies, setCookies] = useState({
        userId: '',
        token: ''
    })
    useEffect(() => {
        const id = Cookies.get('masterId')
        const token = Cookies.get('masterToken')
        if(!id || !token){
            router.push('/master/connexion')
        }else{
            setCookies(c => {return {...c, userId: id, token: token}})
        }
    }, [])

    return <Board>
        <BaseBoard/>
    </Board>
}

export default Dashboard