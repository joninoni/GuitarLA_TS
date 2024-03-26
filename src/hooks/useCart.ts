import { useEffect, useState, useMemo } from "react"
import {db} from "../data/db.js"

const useCart = () => {
    const initialCart= () =>{
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] =useState(db)
    const [cart,setCart] = useState(initialCart)

    useEffect( ()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    function addToCart(item){
        //verificar si una guitarra ya existe
        const itemExists=cart.findIndex( guitar => guitar.id === item.id)
        if(itemExists >=0){
            console.log("ya existe")
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updateCart=[...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        }
        else{
            console.log("No existe... agregando al carrito")
            item.quantity = 1
            setCart([...cart,item])
            // setCart( prevCart => [...prevCart,item])
        }
    }

    function removeFromCart(id){
        // metodo 1 para eliminar un elemento del carrito
        // const newCartItems = cart.filter(item => item.id !== id )
        // setCart(newCartItems)
        //metodo 2 para eliminar un elemento del carrito
        setCart(prevCart => prevCart.filter( guitar => guitar.id !== id))
    }

    function increaseQuantity(id){

        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        setCart(updateCart)
    }

    function decreaseQuantity(id){

        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity : item.quantity - 1
                }
            }
            return item                       
        })

        setCart(updateCart)
    }

    function clearCart(){
       setCart([])
    }

    //state derivado
    const isEmpty = useMemo ( () => cart.length === 0 ,[cart])
    //sumar la cantidad de las guitarras
    const cartTotal = useMemo (() => cart.reduce((acc,el) => acc + (el.price * el.quantity),0),[cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    }
}

export default useCart