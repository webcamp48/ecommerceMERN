import { createContext, useEffect, useState } from "react";
// import all_product from './../assets/Frontend_Assets/all_product';

export const ShoppingContext = createContext(null);

const ShoppingContextProvider = (props)=>{

    // for add to cart item
    const getDefaultCart =()=>{
        let cart = {};
        for(let index = 0; index < 300+1; index++){
            cart[index] = 0;
        }
        return cart;
    }

    const [all_product, setAll_Product] = useState([])
    const [cartItem, setCartItem] = useState(getDefaultCart());

    // get all_product data for category section from EndPoint API
    useEffect(() => {
        fetch('http://localhost:5173/allproducts')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setAll_Product(data);
          })
          .catch((error) => console.error('Error fetching all products:', error));

          
        //   set product in cart when page load or login
          if(localStorage.getItem('auth-token')){
            fetch("http://localhost:5173/getcart",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem('auth-token')}`
                    },
                    body: "",
            }).then((response)=> response.json())
            .then((data)=>{
                setCartItem(data);
                })
                .catch((error) => console.error('Error fetching cart data:', error)); 
          }

      }, []);


    // add To Cart function
    const addToCart = (itemId)=>{
        setCartItem((prev)=> ({
            ...prev,
            [itemId] : prev[itemId] + 1,
        }));


        // set cart count in database
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5173/addtocart',{
                method: 'POST',
                headers:{
                    Accept: "application/form-data",
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({"itemId": itemId})
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }

    }


  // Remove from cart function
    const removeFromCart = (itemId)=>{
        setCartItem((prev)=> ({
            ...prev,
            [itemId] : prev[itemId] - 1,
        }));

        // remove cart cont in database
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5173/removefromcart',{
                method: 'POST',
                headers:{
                    Accept: "application/form-data",
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({"itemId": itemId})
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    // total cart amount calculator
   // Calculate shipping amount based on cart contents
   const shippingAmount = Object.keys(cartItem).reduce((acc, item) => {
    if (cartItem[item] > 0) {
      return acc + 10;
    }
    return acc;
  }, 0);
  
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };
    
    // get Total Cart Item Count
    const getTotalCartItemCount = ()=>{
        let totalItemCount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                totalItemCount += cartItem[item];
                }
            }
        return totalItemCount;
    }

    
    const contextValue = {all_product,cartItem,addToCart,removeFromCart, getTotalCartAmount, shippingAmount, getTotalCartItemCount}

    return (
    <ShoppingContext.Provider value={contextValue}>
        {props.children}
    </ShoppingContext.Provider>
    );

}

export default ShoppingContextProvider;