# 채널톡 스니펫 테스트 도구

채널톡의 스니펫 기능을 테스트할 수 있는 React 기반 도구입니다.

## 주요 기능

### 1. JSON 직접 입력 모드
- textarea에 스니펫 JSON을 직접 입력하여 테스트
- 실시간 미리보기 제공
- JSON 검증 및 에러 표시

### 2. 서버 URL 모드
- 실제 스니펫 엔드포인트 URL을 입력하여 테스트
- Initialize 및 Submit 요청 지원
- Submit 로그 확인 가능

## 지원하는 컴포넌트

채널톡 스니펫의 모든 컴포넌트를 지원합니다:

- **Image**: 이미지 표시 (size, align 옵션)
- **Text**: 텍스트 표시 (header, subheader, body, caption 스타일)
- **Spacer**: 공간 (xs, sm, md, lg, xl 크기)
- **Button**: 버튼 (primary, secondary, danger, success 스타일)
- **KeyValue**: 키-값 쌍
- **List**: 리스트 아이템
- **Input**: 텍스트 입력 (단일/멀티라인)
- **Dropdown**: 드롭다운 선택
- **Divider**: 구분선 (thin, medium, thick)
- **Timeline**: 타임라인 (completed, active, pending 상태)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 사용 방법

### JSON 직접 입력

1. "JSON 직접 입력" 탭 선택
2. 왼쪽 textarea에 스니펫 JSON 입력
3. "테스트하기" 버튼 클릭
4. 오른쪽 패널에서 결과 확인

예제 JSON:

```json
{
  "snippet": {
    "version": "v0",
    "layout": [
      {
        "type": "text",
        "id": "header-text",
        "text": "Hello World",
        "style": "header"
      },
      {
        "type": "button",
        "id": "submit-button",
        "label": "Submit",
        "action": {
          "type": "submit"
        },
        "style": "primary"
      }
    ],
    "params": {
      "key": "value"
    }
  }
}
```

### 서버 URL 테스트

1. "서버 URL" 탭 선택
2. 스니펫 엔드포인트 URL 입력 (예: `http://localhost:3000/snippet`)
3. "테스트하기" 버튼 클릭
4. 버튼 클릭 시 자동으로 Submit 요청 전송
5. Submit 로그에서 전송된 데이터 확인

## 스니펫 서버 구현 예제

```javascript
// Express.js 예제
app.post('/snippet', (req, res) => {
  const { channel, user, manager, snippet, componentId, submit } = req.body;
  
  // Initialize 요청 (snippet이 없는 경우)
  if (!snippet) {
    return res.json({
      snippet: {
        version: 'v0',
        layout: [
          {
            type: 'text',
            id: 'text-1',
            text: 'Initial State',
            style: 'header'
          },
          {
            type: 'input',
            id: 'name-input',
            label: 'Name',
            placeholder: 'Enter your name'
          },
          {
            type: 'button',
            id: 'submit-btn',
            label: 'Submit',
            action: { type: 'submit' },
            style: 'primary'
          }
        ],
        params: {}
      }
    });
  }
  
  // Submit 요청 처리
  if (componentId === 'submit-btn') {
    const name = submit['name-input'];
    
    return res.json({
      snippet: {
        version: 'v0',
        layout: [
          {
            type: 'text',
            id: 'text-1',
            text: `Hello, ${name}!`,
            style: 'header'
          }
        ],
        params: {}
      }
    });
  }
  
  // 기본 응답
  res.json({ snippet });
});
```

## 참고 문서

- [채널톡 스니펫 플로우](https://developers.channel.io/docs/snippet-flow)
- [채널톡 스니펫 컴포넌트](https://developers.channel.io/docs/snippet-components)
- [채널톡 스니펫 빌더](https://snippet-builder.channel.io/)

## 기술 스택

- React 18
- TypeScript
- Vite
- CSS-in-JS (inline styles)

## 라이선스

MIT
