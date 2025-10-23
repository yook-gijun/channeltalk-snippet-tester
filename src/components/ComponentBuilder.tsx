import { useState } from 'react';
import Editor from '@monaco-editor/react';

type ComponentType = 'image' | 'text' | 'spacer' | 'button' | 'keyvalue' | 'list' | 'input' | 'dropdown' | 'divider' | 'timeline';

const componentTemplates: Record<ComponentType, string> = {
  image: `{
  "id": "",
  "type": "image",
  "url": ""
}`,
  text: `{
  "id": "",
  "type": "text",
  "text": "",
  "style": "paragraph",
  "align": "left",
  "color": "default"
}`,
  spacer: `{
  "id": "",
  "type": "spacer",
  "size": "m"
}`,
  button: `{
  "id": "",
  "type": "button",
  "label": "",
  "action": {
    "type": "submit"
  },
  "style": "primary"
}`,
  keyvalue: `{
  "id": "",
  "type": "keyvalue",
  "items": [
    {
      "key": "",
      "value": ""
    }
  ]
}`,
  list: `{
  "id": "",
  "type": "list",
  "items": [
    {
      "id": "",
      "title": "",
      "description": "",
      "image": "",
      "action": {
        "type": "submit"
      }
    }
  ]
}`,
  input: `{
  "id": "",
  "type": "input",
  "label": "",
  "placeholder": "",
  "value": "",
  "disabled": false
}`,
  dropdown: `{
  "id": "",
  "type": "dropdown",
  "label": "",
  "items": [
    {
      "id": "",
      "label": ""
    }
  ]
}`,
  divider: `{
  "id": "",
  "type": "divider"
}`,
  timeline: `{
  "id": "",
  "type": "timeline",
  "hour24": true,
  "events": [
    {
      "ts": 0,
      "value": "",
      "color": "white"
    }
  ]
}`,
};

export const ComponentBuilder = () => {
  const [selectedType, setSelectedType] = useState<ComponentType>('text');
  const [jsonContent, setJsonContent] = useState(componentTemplates['text']);

  const handleTypeChange = (type: ComponentType) => {
    setSelectedType(type);
    setJsonContent(componentTemplates[type]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent).then(() => {
      alert('JSON이 클립보드에 복사되었습니다!');
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };

  return (
    <div className="component-builder">
      <div className="builder-form-section">
        <div className="form-group">
          <label>컴포넌트 타입</label>
          <select 
            value={selectedType} 
            onChange={(e) => handleTypeChange(e.target.value as ComponentType)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Segoe UI", sans-serif',
            }}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="button">Button</option>
            <option value="keyvalue">KeyValue</option>
            <option value="list">List</option>
            <option value="input">Input</option>
            <option value="dropdown">Dropdown</option>
            <option value="spacer">Spacer</option>
            <option value="divider">Divider</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#495057' }}>
            컴포넌트 JSON 템플릿
          </label>
          <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden', height: '500px' }}>
            <Editor
              height="100%"
              defaultLanguage="json"
              value={jsonContent}
              onChange={(value) => setJsonContent(value || '')}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>
        </div>

        <button 
          onClick={handleCopy} 
          className="add-component-btn"
          style={{
            marginTop: '16px',
            width: '100%',
          }}
        >
          📋 JSON 복사하기
        </button>
      </div>
    </div>
  );
};
