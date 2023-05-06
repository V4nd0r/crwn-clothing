import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {CartDrpdownContainer, 
        EmptyMessage, 
        CartItems} 
        from "./cart-dropdown.styles.jsx";


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToChekoutHandler = () => {
        navigate('/checkout')
    };

    return (
        <CartDrpdownContainer>
        <CartItems>
            {cartItems.length ? (
            cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
            ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
            )}
        </CartItems>
        <Button onClick = {goToChekoutHandler}>GO TO CHECKOUT</Button>
        </CartDrpdownContainer>
    );
    };


export default CartDropdown;