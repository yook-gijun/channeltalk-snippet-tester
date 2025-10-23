import type { DividerComponent as DividerType } from '../../types/snippet';

export const DividerComponent = ({ component }: { component: DividerType }) => {
  const sizeMap = {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  };

  const size = component.size || 'thin';

  return (
    <div
      style={{
        height: sizeMap[size],
        backgroundColor: '#e9ecef',
        margin: '16px 0',
      }}
    />
  );
};

