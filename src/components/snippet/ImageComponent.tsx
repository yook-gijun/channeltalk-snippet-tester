import type { ImageComponent as ImageType } from '../../types/snippet';

export const ImageComponent = ({ component }: { component: ImageType }) => {
  const sizeMap = {
    small: '100px',
    medium: '200px',
    large: '300px',
    full: '100%',
  };

  const size = component.size || 'full';
  const align = component.align || 'left';

  return (
    <div style={{ textAlign: align, marginBottom: '12px', maxWidth: '400px' }}>
      <img
        src={component.url}
        alt={component.alt || ''}
        style={{
          maxWidth: sizeMap[size],
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </div>
  );
};

