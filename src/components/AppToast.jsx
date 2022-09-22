import React from 'react';
import { CToast, CToastBody, CToastHeader } from '@coreui/react';

export default function AppToast({ delay, title, description, color }) {
  return (
    <CToast visible autohide delay={delay} color={color}>
      <CToastHeader closeButton>
        <strong className="me-auto">{title}</strong>
      </CToastHeader>
      <CToastBody>{description}.</CToastBody>
    </CToast>
  );
}
