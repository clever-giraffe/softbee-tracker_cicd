import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'theme';

export const NavLink = styled(Link)`
  text-decoration: unset;
  &.active {
    background-color: ${theme.palette.action.hover};
    border-radius: 5%;
  }
`;