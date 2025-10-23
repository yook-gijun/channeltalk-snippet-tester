import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 스니펫 엔드포인트
app.post('/snippet', (req, res) => {
  const { channel, user, manager, snippet, componentId, submit } = req.body;

  console.log('Request received:', {
    hasSnippet: !!snippet,
    componentId,
    submit,
  });

  // Initialize 요청 (snippet이 없는 경우)
  if (!snippet) {
    console.log('Initialize request');
    return res.json({
      snippet: {
        version: 'v0',
        layout: [
          {
            type: 'text',
            id: 'welcome-text',
            text: '주문 정보 조회',
            style: 'header',
          },
          {
            type: 'divider',
            id: 'divider-1',
            size: 'thin',
          },
          {
            type: 'spacer',
            id: 'spacer-1',
            size: 'md',
          },
          {
            type: 'text',
            id: 'description',
            text: '주문 번호를 입력하여 주문 정보를 조회할 수 있습니다.',
            style: 'body',
          },
          {
            type: 'spacer',
            id: 'spacer-2',
            size: 'sm',
          },
          {
            type: 'input',
            id: 'order-number',
            label: '주문번호',
            placeholder: 'ORD-12345',
            required: true,
          },
          {
            type: 'dropdown',
            id: 'order-status',
            label: '주문 상태',
            placeholder: '전체',
            options: [
              { label: '결제 완료', value: 'paid' },
              { label: '배송중', value: 'shipping' },
              { label: '배송 완료', value: 'delivered' },
              { label: '취소', value: 'cancelled' },
            ],
          },
          {
            type: 'spacer',
            id: 'spacer-3',
            size: 'md',
          },
          {
            type: 'button',
            id: 'search-button',
            label: '조회하기',
            action: {
              type: 'submit',
            },
            style: 'primary',
          },
        ],
        params: {
          step: 'search',
        },
      },
    });
  }

  // Submit 요청 처리
  if (componentId === 'search-button') {
    const orderNumber = submit['order-number'];
    const orderStatus = submit['order-status'];

    console.log('Search request:', { orderNumber, orderStatus });

    return res.json({
      snippet: {
        version: 'v0',
        layout: [
          {
            type: 'text',
            id: 'result-header',
            text: '주문 조회 결과',
            style: 'header',
          },
          {
            type: 'divider',
            id: 'divider-2',
            size: 'thin',
          },
          {
            type: 'spacer',
            id: 'spacer-4',
            size: 'md',
          },
          {
            type: 'keyvalue',
            id: 'kv-1',
            key: '주문번호',
            value: orderNumber || 'N/A',
          },
          {
            type: 'keyvalue',
            id: 'kv-2',
            key: '주문 상태',
            value: orderStatus || '전체',
          },
          {
            type: 'keyvalue',
            id: 'kv-3',
            key: '주문금액',
            value: '₩89,000',
          },
          {
            type: 'spacer',
            id: 'spacer-5',
            size: 'md',
          },
          {
            type: 'text',
            id: 'product-header',
            text: '주문 상품',
            style: 'subheader',
          },
          {
            type: 'spacer',
            id: 'spacer-6',
            size: 'sm',
          },
          {
            type: 'list',
            id: 'product-list',
            items: [
              {
                title: '상품 A',
                description: '₩45,000 x 1개',
              },
              {
                title: '상품 B',
                description: '₩44,000 x 1개',
              },
            ],
          },
          {
            type: 'spacer',
            id: 'spacer-7',
            size: 'md',
          },
          {
            type: 'text',
            id: 'timeline-header',
            text: '배송 현황',
            style: 'subheader',
          },
          {
            type: 'spacer',
            id: 'spacer-8',
            size: 'sm',
          },
          {
            type: 'timeline',
            id: 'delivery-timeline',
            items: [
              {
                title: '주문 접수',
                description: '주문이 접수되었습니다',
                timestamp: '2025-01-20 10:30',
                status: 'completed',
              },
              {
                title: '상품 준비중',
                description: '상품을 준비중입니다',
                timestamp: '2025-01-21 14:20',
                status: 'completed',
              },
              {
                title: '배송 출발',
                description: '상품이 배송 출발했습니다',
                timestamp: '2025-01-22 09:15',
                status: 'active',
              },
              {
                title: '배송 완료',
                description: '배송이 완료됩니다',
                status: 'pending',
              },
            ],
          },
          {
            type: 'spacer',
            id: 'spacer-9',
            size: 'md',
          },
          {
            type: 'button',
            id: 'back-button',
            label: '다시 조회하기',
            action: {
              type: 'submit',
            },
            style: 'secondary',
          },
        ],
        params: {
          step: 'result',
          orderNumber: orderNumber,
        },
      },
    });
  }

  if (componentId === 'back-button') {
    console.log('Back to search');
    // 다시 검색 화면으로
    return res.json({
      snippet: {
        version: 'v0',
        layout: [
          {
            type: 'text',
            id: 'welcome-text',
            text: '주문 정보 조회',
            style: 'header',
          },
          {
            type: 'divider',
            id: 'divider-1',
            size: 'thin',
          },
          {
            type: 'spacer',
            id: 'spacer-1',
            size: 'md',
          },
          {
            type: 'input',
            id: 'order-number',
            label: '주문번호',
            placeholder: 'ORD-12345',
            required: true,
          },
          {
            type: 'spacer',
            id: 'spacer-2',
            size: 'md',
          },
          {
            type: 'button',
            id: 'search-button',
            label: '조회하기',
            action: {
              type: 'submit',
            },
            style: 'primary',
          },
        ],
        params: {
          step: 'search',
        },
      },
    });
  }

  // 기본 응답
  res.json({ snippet });
});

app.listen(PORT, () => {
  console.log(`✅ 채널톡 스니펫 서버가 http://localhost:${PORT} 에서 실행중입니다`);
  console.log(`테스트 URL: http://localhost:${PORT}/snippet`);
});

