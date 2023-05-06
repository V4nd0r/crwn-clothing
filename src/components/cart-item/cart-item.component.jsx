import {CartItemConatiner, 
        Image, 
        ItemDetails, 
        Name} 
        from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;

  return (
    <CartItemConatiner>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemConatiner>
  );
};

export default CartItem;