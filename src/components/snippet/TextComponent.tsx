import type { TextComponent as TextType } from '../../types/snippet';

export const TextComponent = ({ component }: { component: TextType }) => {
  const styleMap: Record<string, { fontSize: string; fontWeight: string | number; lineHeight: string; marginBottom: string }> = {
    h1: { fontSize: '22px', fontWeight: 700, lineHeight: '30px', marginBottom: '12px' },
    h2: { fontSize: '16px', fontWeight: 700, lineHeight: '22px', marginBottom: '10px' },
    paragraph: { fontSize: '14px', fontWeight: 400, lineHeight: '20px', marginBottom: '8px' },
  };

  const colorMap: Record<string, string> = {
    default: '#1a1a1a',
    muted: '#868e96',
    success: '#28a745',
    highlighted: '#007bff',
    warning: '#ffc107',
  };

  const style = component.style || 'paragraph';
  const align = component.align || 'left';
  const color = component.color || 'default';
  const styleConfig = styleMap[style] || styleMap.paragraph;
  const textColor = colorMap[color] || colorMap.default;

  return (
    <div
      style={{
        fontSize: styleConfig.fontSize,
        lineHeight: styleConfig.lineHeight,
        textAlign: align as 'left' | 'center',
        fontWeight: styleConfig.fontWeight,
        color: textColor,
        marginBottom: styleConfig.marginBottom,
      }}
    >
      {component.text}
    </div>
  );
};
