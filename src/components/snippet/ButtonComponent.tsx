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
    default: {
      backgroundColor: '#4A90E2',
      color: '#fff',
      border: 'none',
      hoverBg: '#3A7BC8',
    },
    outline: {
      backgroundColor: '#fff',
      color: '#1a1a1a',
      border: '1px solid #dee2e6',
      hoverBg: '#f8f9fa',
    },
    link: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: 'none',
      hoverBg: 'transparent',
    },
  };

  const style = component.style || 'primary';
  const styleConfig = styleMap[style] || styleMap.primary;

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
      style={{
        backgroundColor: styleConfig.backgroundColor,
        color: styleConfig.color,
        border: styleConfig.border,
        padding: '10px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
        marginBottom: '8px',
        transition: 'all 0.15s ease',
        boxSizing: 'border-box',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = styleConfig.hoverBg;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = styleConfig.backgroundColor;
      }}
    >
      {component.label}
    </button>
  );
};
