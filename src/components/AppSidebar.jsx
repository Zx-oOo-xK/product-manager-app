import React, { useState } from 'react';
import { cilShieldAlt } from '@coreui/icons';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CCloseButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from 'app/statusSlice';
// import 'simplebar/dist/simplebar.min.css';

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
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={showSidebar}
      onVisibleChange={() => dispatch(toggle())}
    >
      <CSidebarBrand className="d-none d-md-flex p-3" to="/">
        <CIcon className="sidebar-brand-full" icon={cilShieldAlt} height={35} />
        <CCloseButton white />
      </CSidebarBrand>
      <CSidebarNav>
        {/* <SimpleBar>
          <AppSidebarNav items={navigation} />
        // </SimpleBar> */}
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => setUnfoldable(!unfoldable)} />
    </CSidebar>
  );
}
