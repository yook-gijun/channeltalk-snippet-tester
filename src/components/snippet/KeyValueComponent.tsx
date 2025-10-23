import type { KeyValueComponent as KeyValueType } from '../../types/snippet';

export const KeyValueComponent = ({ component }: { component: KeyValueType }) => {
  // items 배열이 있으면 배열 렌더링, 없으면 단일 key-value 렌더링
  const items = component.items || (component.key && component.value ? [{ key: component.key, value: component.value }] : []);

  return (
    <div style={{ marginBottom: '10px' }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '4px',
            gap: '8px',
          }}
        >
          <div style={{ 
            fontSize: '14px', 
            color: '#8b95a1', 
            fontWeight: 400,
            flexShrink: 0,
          }}>
            {item.key}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#1a1a1a', 
            fontWeight: 400,
          }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

