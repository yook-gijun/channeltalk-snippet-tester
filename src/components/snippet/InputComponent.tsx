import type { InputComponent as InputType } from '../../types/snippet';

export const InputComponent = ({
  component,
  value,
  onChange,
}: {
  component: InputType;
  value: string;
  onChange: (id: string, value: string) => void;
}) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 700,
          color: '#495057',
          marginBottom: '8px',
        }}
      >
        {component.label}
      </label>
      <input
        type="text"
        value={value || component.value || ''}
        onChange={(e) => onChange(component.id, e.target.value)}
        placeholder={component.placeholder}
        disabled={component.disabled}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          boxSizing: 'border-box',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Segoe UI", sans-serif',
          backgroundColor: component.disabled ? '#f8f9fa' : '#fff',
          cursor: component.disabled ? 'not-allowed' : 'text',
          opacity: component.disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          if (!component.disabled) {
            e.target.style.borderColor = '#4A90E2';
            e.target.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};
