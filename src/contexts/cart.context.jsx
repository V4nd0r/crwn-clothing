import { createContext, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    //see if cartItems contains productToAdd

    //If found increment quantity

    //return new array with modified cartItems/ new cart item
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

    const value = { isCartOpen, setIsCartOpen };
    return <CartContext.Provider value={value}>{childen}</CartContext.Provider>;

};