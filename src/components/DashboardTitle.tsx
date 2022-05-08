import { Project } from '@evoqua/types/models';
import React from 'react';

export default function DashboardTitle(
  { projectName }: { projectName: Project['name'] }
) {
  return (
    <h2 style={{ textAlign: 'center' }}>
      Calidad de diseño del proyecto {projectName}
    </h2>
  );
}
