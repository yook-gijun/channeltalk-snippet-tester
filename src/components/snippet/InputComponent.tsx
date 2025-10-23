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
      <label style={{ 
        display: 'block', 
        fontSize: '14px', 
        fontWeight: 700, 
        marginBottom: '8px', 
        color: '#1a1a1a' 
      }}>
        {component.label}
        {component.required && <span style={{ color: '#FF6B6B', marginLeft: '4px' }}>*</span>}
      </label>
      {component.multiline ? (
        <textarea
          value={value || component.value || ''}
          onChange={(e) => onChange(component.id, e.target.value)}
          placeholder={component.placeholder}
          required={component.required}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            resize: 'vertical',
            minHeight: '80px',
            fontFamily: 'inherit',
            color: '#1a1a1a',
            backgroundColor: '#fff',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#4A90E2';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      ) : (
        <input
          type="text"
          value={value || component.value || ''}
          onChange={(e) => onChange(component.id, e.target.value)}
          placeholder={component.placeholder}
          required={component.required}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            color: '#1a1a1a',
            backgroundColor: '#fff',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#4A90E2';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      )}
    </div>
  );
};

