import type { TextComponent as TextType } from '../../types/snippet';

export const TextComponent = ({ component }: { component: TextType }) => {
  const styleMap: Record<string, { fontSize: string; fontWeight: string | number; lineHeight: string; color?: string; marginBottom?: string }> = {
    header: { fontSize: '18px', fontWeight: 600, lineHeight: '26px', color: '#1a1a1a', marginBottom: '10px' },
    subheader: { fontSize: '15px', fontWeight: 600, lineHeight: '22px', color: '#1a1a1a', marginBottom: '8px' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#1a1a1a', marginBottom: '8px' },
    caption: { fontSize: '12px', fontWeight: 400, lineHeight: '16px', color: '#868e96', marginBottom: '8px' },
    h1: { fontSize: '22px', fontWeight: 700, lineHeight: '30px', color: '#1a1a1a', marginBottom: '12px' },
    h2: { fontSize: '16px', fontWeight: 700, lineHeight: '22px', color: '#1a1a1a', marginBottom: '10px' },
    h3: { fontSize: '15px', fontWeight: 600, lineHeight: '22px', color: '#1a1a1a', marginBottom: '8px' },
    muted: { fontSize: '13px', fontWeight: 400, lineHeight: '18px', color: '#868e96', marginBottom: '8px' },
  };

  const style = component.style || 'body';
  const align = component.align || 'left';
  const styleConfig = styleMap[style] || styleMap.body;

  return (
    <div
      style={{
        fontSize: styleConfig.fontSize,
        lineHeight: styleConfig.lineHeight,
        textAlign: align,
        fontWeight: component.bold ? 700 : styleConfig.fontWeight,
        color: component.color || styleConfig.color,
        marginBottom: styleConfig.marginBottom,
      }}
    >
      {component.text}
    </div>
  );
};

