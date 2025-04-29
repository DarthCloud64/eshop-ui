import { IconButton, styled } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from "../../app/hooks";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const CartIcon = () => {  
  const cart = useAppSelector(state => state.cart.cart);

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={Array.from(cart?.products?.values()).reduce((accumulator, currentValue) => accumulator + currentValue, 0)} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}

export default CartIcon;