import type { ButtonComponent as ButtonType } from '../../types/snippet';

export const ButtonComponent = ({
  component,
  onSubmit,
}: {
  component: ButtonType;
  onSubmit: (componentId: string) => void;
}) => {
  const styleMap = {
    primary: {
      backgroundColor: '#4A90E2',
      color: '#fff',
      border: 'none',
      hoverBg: '#3A7BC8',
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#1a1a1a',
      border: '1px solid #dee2e6',
      hoverBg: '#f8f9fa',
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: 'none',
      hoverBg: '#f8f9fa',
    },
    danger: {
      backgroundColor: '#FF6B6B',
      color: '#fff',
      border: 'none',
      hoverBg: '#FF5252',
    },
    success: {
      backgroundColor: '#51CF66',
      color: '#fff',
      border: 'none',
      hoverBg: '#40C057',
    },
  };

  const style = component.style || 'primary';
  const styleConfig = styleMap[style];

  const handleClick = () => {
    if (component.action.type === 'submit') {
      onSubmit(component.id);
    } else if ((component.action.type === 'link' || component.action.type === 'url') && component.action.url) {
      window.open(component.action.url, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={component.disabled}
      style={{
        backgroundColor: styleConfig.backgroundColor,
        color: styleConfig.color,
        border: styleConfig.border,
        padding: '10px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: component.disabled ? 'not-allowed' : 'pointer',
        opacity: component.disabled ? 0.5 : 1,
        width: '100%',
        marginBottom: '8px',
        transition: 'all 0.15s ease',
        boxSizing: 'border-box',
      }}
      onMouseOver={(e) => {
        if (!component.disabled) {
          e.currentTarget.style.backgroundColor = styleConfig.hoverBg;
        }
      }}
      onMouseOut={(e) => {
        if (!component.disabled) {
          e.currentTarget.style.backgroundColor = styleConfig.backgroundColor;
        }
      }}
    >
      {component.label}
    </button>
  );
};

