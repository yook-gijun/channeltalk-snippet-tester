import { useState } from 'react';
import type { SnippetModel, SnippetComponent } from '../types/snippet';
import { ImageComponent } from './snippet/ImageComponent';
import { TextComponent } from './snippet/TextComponent';
import { SpacerComponent } from './snippet/SpacerComponent';
import { ButtonComponent } from './snippet/ButtonComponent';
import { KeyValueComponent } from './snippet/KeyValueComponent';
import { ListComponent } from './snippet/ListComponent';
import { InputComponent } from './snippet/InputComponent';
import { DropdownComponent } from './snippet/DropdownComponent';
import { DividerComponent } from './snippet/DividerComponent';
import { TimelineComponent } from './snippet/TimelineComponent';

export const SnippetRenderer = ({
  snippetModel,
  onSubmit,
}: {
  snippetModel: SnippetModel | null;
  onSubmit: (componentId: string, values: Record<string, string>) => void;
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // snippetModel이 null이면 빈 상태 표시
  if (!snippetModel) {
    return (
      <div
        className="snippet-preview"
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#868e96',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
        <div style={{ fontSize: '16px', fontWeight: 500 }}>
          JSON을 입력하면 여기에 미리보기가 표시됩니다
        </div>
      </div>
    );
  }

  const handleInputChange = (id: string, value: string) => {
    const newValues = { ...formValues, [id]: value };
    setFormValues(newValues);
  };

  const handleSubmit = (componentId: string) => {
    onSubmit(componentId, formValues);
    // Submit 후 form 값 초기화
    setFormValues({});
  };

  const renderComponent = (component: SnippetComponent) => {
    switch (component.type) {
      case 'image':
        return <ImageComponent component={component} />;
      case 'text':
        return <TextComponent component={component} />;
      case 'spacer':
        return <SpacerComponent component={component} />;
      case 'button':
        return <ButtonComponent component={component} onSubmit={handleSubmit} />;
      case 'keyvalue':
      case 'key-value':
        return <KeyValueComponent component={component} />;
      case 'list':
        return <ListComponent component={component} onSubmit={handleSubmit} />;
      case 'input':
        return (
          <InputComponent
            component={component}
            value={formValues[component.id] || ''}
            onChange={handleInputChange}
          />
        );
      case 'dropdown':
        return (
          <DropdownComponent
            component={component}
            value={formValues[component.id] || ''}
            onChange={handleInputChange}
          />
        );
      case 'divider':
        return <DividerComponent />;
      case 'timeline':
        return <TimelineComponent component={component} />;
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <div
      className="snippet-preview"
    >
      {snippetModel.snippet.layout.map((component) => (
        <div key={component.id}>{renderComponent(component)}</div>
      ))}
    </div>
  );
};

