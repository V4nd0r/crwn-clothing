import { createContext, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    //see if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    //If found increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity++}
        : cartItem
        )
    }

    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1 }];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

export const CartProvider = ({childen}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] =useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem (cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };
    return <CartContext.Provider value={value}>{childen}</CartContext.Provider>;

};