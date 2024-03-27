export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}
//herencia en types
export type CartItem = Guitar & {
    quantity: number
}

//herencia en interfaces
// export interface GuitarItem extends Guitar {
//    quantity: number 
// }