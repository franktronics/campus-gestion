
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
    icon: JSX.Element
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
    type: string,
    title: string
}
export type AlertType = {
    status: 'error' | 'success' | 'warning' | 'info',
    title: string,
    description: string
}