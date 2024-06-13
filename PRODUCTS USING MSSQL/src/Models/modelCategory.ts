 export interface Category {
    id: string,
    description: string,
    name: string
}
export interface categoryRequest extends Request {
    description: string,
    name: string
}