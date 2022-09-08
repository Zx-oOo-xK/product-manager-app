import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function AppHeader({ toggle }) {
  return (
    <div className="wrapper d-flex flex-column bg-light">
      <div className="header header-sticky mb-4" style={{ padding: '0 1rem' }}>
        <div className="d-flex align-items-center">
          <button
            className="border-0 btn-sm"
            style={{ width: '2rem', height: '2rem' }}
            type="button"
            onClick={toggle}
          >
            <FontAwesomeIcon icon={solid('bars')} />
          </button>
          <CNav>
            <CNavItem>
              <CNavLink href="#" active>
                Dashboard
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Users</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Settings</CNavLink>
            </CNavItem>
          </CNav>
        </div>

        <div className="d-flex align-items-center">
          <CNav>
            <CNavItem>
              <CNavLink>
                <FontAwesomeIcon icon={solid('bell')} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <FontAwesomeIcon icon={solid('list')} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <FontAwesomeIcon icon={solid('envelope')} />
              </CNavLink>
            </CNavItem>
          </CNav>
          <CDropdown>
            <CDropdownToggle variant="ghost">
              <CAvatar src="https://image.winudf.com/v2/image/Y29tLmNvb2wud2FsbHBhcGVyLnBhdHRlcm4ubG9ja3NjcmVlbi5hcHBsb2NrX2ljb25fMTUzMTk4NjQ2Nl8wOTU/icon.png?fakeurl=1&h=240&type=webp" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>
    </div>
  );
}
