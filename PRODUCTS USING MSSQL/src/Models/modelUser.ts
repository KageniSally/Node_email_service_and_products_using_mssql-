export interface User{
    id:string,
    email:string,
    name:string,
    password:string,
    isDeleted:number,
    isEmailSent:number
}

export interface Payload{
    sub:string,
    name:string
}