import type { ImageComponent as ImageType } from '../../types/snippet';

export const ImageComponent = ({ component }: { component: ImageType }) => {
  return (
    <div style={{ marginBottom: '12px', maxWidth: '400px' }}>
      <img
        src={component.url}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </div>
  );
};

