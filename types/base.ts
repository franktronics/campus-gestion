
export type Form = {
    birthdayJ: string,
    birthdayM: string,
    birthdayA: string,
    bornat: string,
    faculty: string,
    firstname: string,
    level: string,
    matricule: string,
    name: string,
    phoneNumber: string,
    speciality: string,
    pseudo: string
    password: string,
    cpassword: string
}

export type MenuConfig = {
    title: string,
    link: string,
    icon: JSX.Element,
    query: string
}

export type Fac = {
    id: string,
    title: string
}

export type Fil = {
    id: string,
    title: string,
    facId: string,
}

export type CookiesMaster = {
    masterId: string,
    masterToken: string,
    identifier: string
}

export type ModifCardType = {
    type: 'fac' | 'fil',
    title: string,
    fac?: string,
    onHandleFac: Function,
    onHandleFil: Function
}
export type AlertType = {
    status: 'error' | 'success' | 'warning' | 'info',
    title: string,
    description: string
}
export type DataEnseignantType = {
    name: string,
    firstname: string,
    grade: string,
    identifier: string,
    password?: string,
    phoneNumber: string
}
export type DataMatType = {
    fac: string,
    fil: string,
    niv: '1' | '2' | '3' | '4' | '5',
    intitled: string,
    code: string
}