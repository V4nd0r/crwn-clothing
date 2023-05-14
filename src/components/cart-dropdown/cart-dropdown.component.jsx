import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import {CartDrpdownContainer, 
        EmptyMessage, 
        CartItems} 
        from "./cart-dropdown.styles.jsx";


const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
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