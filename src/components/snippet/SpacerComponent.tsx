import type { SpacerComponent as SpacerType } from '../../types/snippet';

export const SpacerComponent = ({ component }: { component: SpacerType }) => {
  const sizeMap: Record<string, string> = {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
  };

  const size = component.size || 'xs';
  const height = sizeMap[size] || sizeMap['xs'];

  return <div style={{ height }} />;
};
