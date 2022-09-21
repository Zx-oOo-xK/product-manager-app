import React from 'react';
import { cilList } from '@coreui/icons';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { toggle } from 'app/statusSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

/**
 * AppHeader is component header page
 *
 * @param {bool} toggle is the toggle sidebar
 * @returns header component
 */
export default function AppHeader() {
  const dispatch = useDispatch();

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1 border" onClick={() => dispatch(toggle())}>
          <CIcon className="sidebar-brand-full" icon={cilList} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          Hello
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink> */}
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">{/* <CIcon icon={cilBell} size="lg" /> */}</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">{/* <CIcon icon={cilList} size="lg" /> */}</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">{/* <CIcon icon={cilEnvelopeOpen} size="lg" /> */}</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">{/* <AppHeaderDropdown /> */}</CHeaderNav>
      </CContainer>
    </CHeader>
  );
}
