import { useState } from "react"
import { AlertType } from "../types/base"

type Al = [
    boolean,
    'error' | 'success' | 'warning' | 'info',
    string,
    string,
    (b: boolean) => void,
    (s?: 'error' | 'success' | 'warning' | 'info', t?: string, d?: string) => void
]

export function useAlert(): Al{
    const [isPending, setIsPending] = useState(false)
    const [alert, setAlert] = useState<AlertType>({
        status: 'success',
        title: '',
        description: ''
    })
    const handleSetPending = function (val: boolean) {
        setIsPending(val)
    }
    const handleAlert = function (st: ('error' | 'success' | 'warning' | 'info') = 'success', ti: string = '', de: string = '') {
        setAlert(a => {return {
            ...a,
            status: st,
            title: ti,
            description: de
        }})
    }
    return [
        isPending, 
        alert.status, 
        alert.title, 
        alert.description,
        handleSetPending,
        handleAlert
    ]
}