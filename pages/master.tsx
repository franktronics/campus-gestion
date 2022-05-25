import type { NextPage } from 'next'
import Board from '../components/generic/Board'
import BaseBoard from '../components/master/BaseBoard'

const Master: NextPage = () => {

    return <Board>
        <BaseBoard/>
    </Board>
}

export default Master