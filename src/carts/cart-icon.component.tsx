import { useContext } from "react";
import { CartContext, CartContextModel } from "./cart.context";
import { IconButton, styled } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const CartIcon = () => {
    const [cart, setCart] = useContext<CartContextModel | undefined>(CartContext);

    <IconButton aria-label="cart">
    <StyledBadge badgeContent={cart?.products.length} color="secondary">
      <ShoppingCartIcon />
    </StyledBadge>
  </IconButton>
}

export default CartIcon;