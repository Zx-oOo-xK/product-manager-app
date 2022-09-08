import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CBadge,
  CCloseButton,
} from '@coreui/react';

const themes = [
  {
    name: 'Colors',
    link: '/theme/colors',
  },
  {
    name: 'Typography',
    link: '/theme/typography',
  },
];

const bases = [
  {
    name: 'Accordion',
    link: '/bases/accordion',
  },
  {
    name: 'Breadcrumbs',
    link: '/bases/breadcrumbs',
  },
  {
    name: 'Cards',
    link: '/bases/cards',
  },
];

const buttons = [
  {
    name: 'Buttons',
    link: 'buttons/buttons',
  },
  {
    name: 'Button Groups',
    link: 'buttons/buttons-groups',
  },
  {
    name: 'Dropdowns',
    link: 'buttons/dropdowns',
  },
];

const forms = [
  {
    name: 'Form Control',
    link: '/forms/form-control',
  },
  {
    name: 'Select',
    link: 'forms/select',
  },
  {
    name: 'Checks & Radios',
    link: 'forms/check-radios',
  },
  {
    name: 'Range',
    link: 'forms/range',
  },
];

export default function AppSidebar({ visible, toggle }) {
  const toggleSidebar = visible ? 'sidebar sidebar-fixed' : 'sidebar sidebar-fixed hide';

  return (
    <CSidebar className={toggleSidebar}>
      <CSidebarBrand className="d-flex justify-content-around">
        Sidebar Brand
        <CCloseButton white onClick={toggle} />
      </CSidebarBrand>
      <CSidebarNav>
        <CNavItem href="/dashboard" className="d-flex justify-content-start align-items-center">
          <FontAwesomeIcon icon={solid('pen')} />
          <span style={{ marginLeft: '0.5rem' }}>dashboard</span>
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavTitle>THEME</CNavTitle>
        {themes.map((item) => (
          <CNavItem
            href={item.link}
            key={item.name}
            className="d-flex justify-content-start align-items-center"
          >
            <FontAwesomeIcon icon={solid('pen')} />
            &nbsp;
            <span>{item.name}</span>
          </CNavItem>
        ))}
        <CNavTitle>COMPONENTS</CNavTitle>
        <CNavGroup toggler="Bases">
          {bases.map((item) => (
            <CNavItem href={item.link} key={item.name}>
              {item.name}
            </CNavItem>
          ))}
        </CNavGroup>
        <CNavGroup toggler="Buttons">
          {buttons.map((item) => (
            <CNavItem href={item.link} key={item.name}>
              {item.name}
            </CNavItem>
          ))}
        </CNavGroup>
        <CNavGroup toggler="Forms">
          {forms.map((item) => (
            <CNavItem href={item.link} key={item.name}>
              {item.name}
            </CNavItem>
          ))}
        </CNavGroup>
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
  );
}
