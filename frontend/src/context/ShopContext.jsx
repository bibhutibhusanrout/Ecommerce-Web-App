import React, { createContext, useState, useEffect } from 'react'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}



export default function ShopContextProvider(props) {

    const [all_product, setall_product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());
    const [count, setcount] = useState(0);
    const url="https://fullstack-ecommerce-app-gw43.onrender.com"

    useEffect(() => {
        let sum = 0;
        for (let key in cartItems) {

            if (cartItems[key] >= 1) {
                sum += cartItems[key];
            }
        }
        setcount(sum);
    }, [cartItems])


    useEffect(() => {
        fetch("https://fullstack-ecommerce-app-gw43.onrender.com/allproducts")
            .then((res) => res.json())
            .then((product) => {
                setall_product(product)
                // console.log(data);
            })

        if (localStorage.getItem("auth-token")) {
            fetch("https://fullstack-ecommerce-app-gw43.onrender.com/getcart",{
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "content-Type": "application/json"
                },
                body: "",
            }).then((res) => res.json())
                .then((data) => {
                    setcartItems(data)

                });
        }
    }, [])


    const addtoCart = (itemId) => {
        console.log(itemId);

        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem("auth-token")) {
            fetch("https://fullstack-ecommerce-app-gw43.onrender.com/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/formData",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
        }
    }
    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (localStorage.getItem("auth-token")) {
            fetch("https://fullstack-ecommerce-app-gw43.onrender.com/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/formData",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
        }
    }

    const getTotalcartAmount = () => {
        let total = 0;
        for (let id in cartItems) {
            const product = all_product.find(e => e.id === parseInt(id));
            if (product && cartItems[id] > 0) {
                total += product.new_price * cartItems[id];
            }
        }
        return total;
    }


    const contextValue = {count, all_product, cartItems, addtoCart, removeFromCart, getTotalcartAmount }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
