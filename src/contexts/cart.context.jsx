import { createContext, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
});

export const CartProvider = ({childen}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};
    return <CartContext.Provider value={value}> {childen} </CartContext.Provider>;

};