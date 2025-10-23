import type { ListComponent as ListType } from '../../types/snippet';

export const ListComponent = ({
  component,
  onSubmit,
}: {
  component: ListType;
  onSubmit: (componentId: string) => void;
}) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      {component.items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (item.action?.type === 'submit') {
              onSubmit(component.id);
            } else if ((item.action?.type === 'link' || item.action?.type === 'url') && item.action.url) {
              window.open(item.action.url, '_blank');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '8px 0',
            marginBottom: '8px',
            cursor: item.action ? 'pointer' : 'default',
            transition: 'background-color 0.15s ease',
            backgroundColor: 'transparent',
          }}
          onMouseOver={(e) => {
            if (item.action) {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt=""
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '6px',
                marginRight: '10px',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: '#1a1a1a', 
              marginBottom: '4px',
              lineHeight: '1.3',
            }}>
              {item.title}
            </div>
            {item.description && (
              <div style={{ 
                fontSize: '12px', 
                color: '#8b95a1',
                lineHeight: '1.3',
              }}>
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

