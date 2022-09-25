import React, { useState } from 'react';
import { cilPuzzle, cilShieldAlt, cilSpeedometer, cibApacheAirflow } from '@coreui/icons';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCloseButton,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from 'app/statusSlice';

/**
 * AppSidebar is a component that displays a list of menu link
 *
 * @param {bool} visible is parameter toggle display sidebar menu
 * @param {function} setVisible is parameter set toggle for sidebar menu
 * @returns component sidebar menu
 */
export default function AppSidebar() {
  const dispatch = useDispatch();
  const [unfoldable, setUnfoldable] = useState(false);
  const { showSidebar } = useSelector((state) => state.status);

  return (
    // eslint-disable-next-line no-console
    <CSidebar position="fixed" unfoldable={unfoldable} visible={showSidebar}>
      <CSidebarBrand className="d-none d-md-flex p-3" to="/">
        <CIcon className="sidebar-brand-full" icon={cilShieldAlt} height={35} />
        <CCloseButton white onClick={() => dispatch(toggle())} />
      </CSidebarBrand>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="products">
          <CIcon customClassName="nav-icon" icon={cibApacheAirflow} />
          Products
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          With badge
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavGroup toggler="Nav dropdown">
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => setUnfoldable(!unfoldable)} />
    </CSidebar>
  );
}
