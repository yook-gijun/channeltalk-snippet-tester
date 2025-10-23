import type { DividerComponent as DividerType } from '../../types/snippet';

export const DividerComponent = ({ component }: { component: DividerType }) => {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: '#e9ecef',
        margin: '8px 0',
      }}
    />
  );
};
