import { IconButton, styled } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from "../../app/hooks";
import { useGetCartByIdQuery } from "../api/orderApiSlice";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const CartIcon = () => {
  const cartId = useAppSelector(state => state.cart.cartId);
  const { data: getCartResponse } = useGetCartByIdQuery(cartId ?? "");

  console.log(getCartResponse);

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={getCartResponse && getCartResponse.carts.length > 0 && getCartResponse.carts[0].products.size > 0 && Array.from(getCartResponse.carts[0].products.values()).reduce((accumulator, currentValue) => accumulator + currentValue, 0)} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}

export default CartIcon;