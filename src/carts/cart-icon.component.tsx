import { IconButton, styled } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "../models/cart";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

interface CartIconProps {
  cart: Cart
}

const CartIcon: React.FC<CartIconProps> = ({cart}) => {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={cart?.products.length} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}

export default CartIcon;