import type { SpacerComponent as SpacerType } from '../../types/snippet';

export const SpacerComponent = ({ component }: { component: SpacerType }) => {
  const sizeMap: Record<string, string> = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  };

  const size = component.size || 'md';

  return <div style={{ height: sizeMap[size] }} />;
};
