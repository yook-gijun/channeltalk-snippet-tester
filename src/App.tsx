import { useState, useEffect } from 'react';
import type { SnippetModel } from './types/snippet';
import { SnippetRenderer } from './components/SnippetRenderer';
import Editor from '@monaco-editor/react';
import './App.css';

const defaultSnippetExample: SnippetModel = {
  snippet: {
    version: 'v0',
    layout: [
      {
        id: 'title',
        type: 'text',
        text: 'Snippet Demo 🍭',
        style: 'h1',
      },
      {
        id: 'promotion',
        type: 'key-value',
        items: [
          {
            key: 'Mileage',
            value: '213 points',
          },
          {
            key: 'Trip',
            value: 'Roadtrip to Space',
          },
          {
            key: 'Submitted at',
            value: '6:00PM, 2019/01/12',
          },
        ],
      },
      {
        id: 'promotion-image',
        type: 'image',
        url: 'https://cdn.channel.io/assets/snippet/snippet-img-demo.png',
      },
      {
        id: 'subtitle',
        type: 'text',
        text: 'Related Items',
        style: 'h2',
      },
      {
        id: 'related-list',
        type: 'list',
        items: [
          {
            id: 'related-list-trip-01',
            title: 'Couple trip to the Milky Stardust Fanatasy',
            description: '$5million ∙ 2seats ∙ 2050-12-25',
            image: 'https://cdn.channel.io/assets/snippet/snippet-demo-list-1.png',
            action: {
              type: 'url',
              url: 'https://channel.io',
            },
          },
          {
            id: 'related-list-trip-02',
            title: 'Dance on the Moon',
            description: '$17,980 ∙ Open in Summer',
            image: 'https://cdn.channel.io/assets/snippet/snippet-demo-list-2.png',
            action: {
              type: 'url',
              url: 'https://channel.io',
            },
          },
        ],
      },
      {
        id: 'divider',
        type: 'divider',
      },
      {
        id: 'mileage-input',
        type: 'input',
        label: 'Reset Mileage',
        placeholder: 'Please type numbers',
      },
      {
        id: 'submit-button',
        type: 'button',
        label: 'Submit',
        action: {
          type: 'submit',
        },
      },
    ],
    params: {},
  },
};

const defaultRequestBody = {
  channel: {
    id: '155508',
  },
  user: {
    id: '68b6c04748a1f144003f',
    channelId: '155508',
    memberId: '',
  },
  manager: {
    id: '473129',
    channelId: '155508',
  },
};

function App() {
  const [mode, setMode] = useState<'json' | 'url'>('json');
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultSnippetExample, null, 2));
  const [urlInput, setUrlInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [requestBodyInput, setRequestBodyInput] = useState(JSON.stringify(defaultRequestBody, null, 2));
  const [snippetModel, setSnippetModel] = useState<SnippetModel | null>(defaultSnippetExample);
  const [renderKey, setRenderKey] = useState(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitLog, setSubmitLog] = useState<string[]>([]);

  // mode가 변경될 때 자동으로 JSON 파싱
  useEffect(() => {
    if (mode === 'json' && jsonInput.trim()) {
      try {
        const parsed = JSON.parse(jsonInput);
        setSnippetModel(parsed);
        setError('');
      } catch (err) {
        setSnippetModel(null);
        setError('Invalid JSON: ' + (err as Error).message);
      }
    }
  }, [mode, jsonInput]);

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    
    // 빈 값이면 초기화
    if (!value.trim()) {
      setSnippetModel(null);
      setError('');
      return;
    }
    
    // 실시간으로 파싱 시도
    try {
      const parsed = JSON.parse(value);
      setSnippetModel(parsed);
      setError('');
    } catch (err) {
      // JSON이 완성되지 않았거나 잘못된 경우
      // 이전 모델 유지하지 않고 null로 설정
      setSnippetModel(null);
      setError('Invalid JSON: ' + (err as Error).message);
    }
  };

  const copyLayoutToClipboard = () => {
    navigator.clipboard.writeText(jsonInput).then(() => {
      alert('레이아웃이 클립보드에 복사되었습니다! 📋');
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };

  const refreshRenderer = () => {
    setRenderKey(prev => prev + 1);
  };

  const handleUrlTest = async () => {
    if (!urlInput.trim()) {
      setError('URL을 입력해주세요');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Request body 파싱
      let requestBody;
      try {
        requestBody = JSON.parse(requestBodyInput);
      } catch (parseErr) {
        setError('Request Body JSON이 유효하지 않습니다: ' + (parseErr as Error).message);
        setLoading(false);
        return;
      }

      // 토큰이 있으면 URL에 쿼리 파라미터로 추가
      let requestUrl = urlInput;
      if (tokenInput.trim()) {
        const separator = urlInput.includes('?') ? '&' : '?';
        requestUrl = `${urlInput}${separator}token=${encodeURIComponent(tokenInput)}`;
      }

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSnippetModel(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch snippet: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (componentId: string, values: Record<string, string>) => {
    const logEntry = `[${new Date().toLocaleTimeString()}] Submit - Component: ${componentId}, Values: ${JSON.stringify(values)}`;
    setSubmitLog((prev) => [...prev, logEntry]);

    if (mode === 'url' && urlInput) {
      try {
        // Request body 파싱
        let requestBody;
        try {
          requestBody = JSON.parse(requestBodyInput);
        } catch (parseErr) {
          console.error('Request Body JSON parsing failed:', parseErr);
          return;
        }

        // 토큰이 있으면 URL에 쿼리 파라미터로 추가
        let requestUrl = urlInput;
        if (tokenInput.trim()) {
          const separator = urlInput.includes('?') ? '&' : '?';
          requestUrl = `${urlInput}${separator}token=${encodeURIComponent(tokenInput)}`;
        }

        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...requestBody,
            snippet: snippetModel?.snippet,
            componentId: componentId,
            submit: values,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSnippetModel(data);
        }
      } catch (err) {
        console.error('Submit failed:', err);
      }
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>채널톡 스니펫 테스트</h1>
        <p>채널톡 스니펫 컴포넌트를 테스트할 수 있는 도구입니다</p>
      </div>

      <div className="container">
        <div className="left-panel">
          <div className="mode-selector">
            <button
              className={mode === 'json' ? 'active' : ''}
              onClick={() => setMode('json')}
            >
              JSON 직접 입력
            </button>
            <button
              className={mode === 'url' ? 'active' : ''}
              onClick={() => setMode('url')}
            >
              서버 URL
            </button>
          </div>

          {mode === 'json' ? (
            <div className="input-section">
              <label style={{ flexShrink: 0, marginBottom: '8px' }}>스니펫 JSON (실시간 렌더링)</label>
              <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden', flex: 1, minHeight: 0 }}>
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={jsonInput}
                  onChange={(value) => handleJsonChange(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexShrink: 0 }}>
                <button
                  onClick={copyLayoutToClipboard}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#51CF66',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#47b85d';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#51CF66';
                  }}
                >
                  📋 레이아웃 복사하기
                </button>
                <button
                  onClick={refreshRenderer}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#6C5CE7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#5b4cdb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#6C5CE7';
                  }}
                >
                  🔄 새로고침
                </button>
              </div>
            </div>
          ) : (
            <div className="input-section">
              <div style={{ flexShrink: 0 }}>
                <label>스니펫 엔드포인트 URL</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/snippet"
                />
                <div style={{ marginTop: '12px' }}>
                  <label>토큰 (선택사항)</label>
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="your-token-here"
                    style={{ fontFamily: 'monospace' }}
                  />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                    토큰을 입력하면 URL에 ?token=... 형태로 자동 추가됩니다
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <label style={{ flexShrink: 0, marginBottom: '6px' }}>Request Body (channel, user, manager)</label>
                <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden', flex: 1, minHeight: 0 }}>
                  <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={requestBodyInput}
                    onChange={(value) => setRequestBodyInput(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                    }}
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px', flexShrink: 0 }}>
                  서버에 전송할 channel, user, manager 정보를 입력하세요
                </div>
              </div>
              <button
                onClick={handleUrlTest}
                className="test-button"
                disabled={loading}
                style={{ flexShrink: 0, marginTop: '12px' }}
              >
                {loading ? '로딩중...' : '테스트하기'}
              </button>
            </div>
          )}

          {error && (
            <div className="error-box" style={{ flexShrink: 0 }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {submitLog.length > 0 && (
            <div className="log-section">
              <h3>Submit 로그</h3>
              <div className="log-box">
                {submitLog.map((log, index) => (
                  <div key={index} className="log-entry">
                    {log}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSubmitLog([])}
                className="clear-button"
              >
                로그 지우기
              </button>
            </div>
          )}
        </div>

        <div className="right-panel">
          {snippetModel ? (
            <SnippetRenderer
              key={renderKey}
              snippetModel={snippetModel}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="snippet-preview" style={{ padding: '40px', textAlign: 'center', color: '#868e96' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <div style={{ fontSize: '15px' }}>
                JSON을 입력하거나<br />URL을 테스트하세요
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
