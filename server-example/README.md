# 채널톡 스니펫 서버 예제

채널톡 스니펫 기능을 테스트하기 위한 간단한 Express 서버 예제입니다.

## 설치 및 실행

```bash
# 패키지 설치
npm install

# 서버 실행
npm start
```

서버는 `http://localhost:3001` 에서 실행됩니다.

## 엔드포인트

### POST /snippet

채널톡 스니펫 요청을 처리하는 엔드포인트입니다.

#### Initialize 요청 (snippet 없음)

```json
{
  "channel": { "id": "demo-channel" },
  "user": { "id": "demo-user" },
  "manager": { "id": "demo-manager" }
}
```

#### Submit 요청 (버튼 클릭 등)

```json
{
  "channel": { "id": "demo-channel" },
  "user": { "id": "demo-user" },
  "manager": { "id": "demo-manager" },
  "snippet": { ... },
  "componentId": "search-button",
  "submit": {
    "order-number": "ORD-12345",
    "order-status": "paid"
  }
}
```

## 테스트 방법

1. 서버 실행
   ```bash
   npm start
   ```

2. 메인 앱에서 "서버 URL" 모드 선택

3. URL 입력: `http://localhost:3001/snippet`

4. "테스트하기" 버튼 클릭

5. 폼 입력 후 버튼 클릭하여 Submit 테스트

## 예제 시나리오

이 서버는 주문 조회 시나리오를 구현합니다:

1. **초기 화면**: 주문번호 입력 폼
2. **조회 결과**: 주문 정보, 상품 목록, 배송 타임라인 표시
3. **다시 조회**: 다시 검색 화면으로 돌아가기

## 로그

서버는 모든 요청을 콘솔에 로깅하므로 디버깅이 쉽습니다:

```
Request received: {
  hasSnippet: false,
  componentId: undefined,
  submit: undefined
}
Initialize request
```

## 커스터마이징

`server.js` 파일을 수정하여 원하는 시나리오를 구현할 수 있습니다. 
채널톡 스니펫 문서를 참고하여 다양한 컴포넌트 조합을 테스트해보세요.

