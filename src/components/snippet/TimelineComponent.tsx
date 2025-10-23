import type { TimelineComponent as TimelineType } from '../../types/snippet';

export const TimelineComponent = ({ component }: { component: TimelineType }) => {
  const statusColors = {
    completed: '#51CF66',
    active: '#4A90E2',
    pending: '#dee2e6',
  };

  // Epoch timestamp를 날짜로 그룹화
  const groupedItems = component.items.reduce((acc, item) => {
    // timestamp가 없거나 유효하지 않으면 건너뛰기
    if (!item.timestamp) {
      return acc;
    }
    
    // timestamp가 Epoch 형식일 경우 변환
    const timestamp = typeof item.timestamp === 'number' ? item.timestamp : Date.parse(item.timestamp);
    
    // 유효하지 않은 timestamp면 건너뛰기
    if (isNaN(timestamp)) {
      return acc;
    }
    
    const date = new Date(timestamp);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push({
      ...item,
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    });
    
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ 
        fontSize: '17px', 
        fontWeight: 700, 
        color: '#1a1a1a', 
        marginBottom: '16px' 
      }}>
        Timeline
      </h3>
      {Object.entries(groupedItems).map(([date, items], groupIndex) => (
        <div key={groupIndex} style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: 500, 
            color: '#868e96', 
            marginBottom: '12px' 
          }}>
            {date}
          </div>
          {items.map((item, index) => {
            const status = item.status || 'pending';
            
            return (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#868e96',
                  width: '80px',
                  flexShrink: 0,
                }}>
                  {item.time}
                </div>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: statusColors[status],
                    marginRight: '12px',
                    flexShrink: 0,
                  }}
                />
                <div style={{ 
                  fontSize: '15px', 
                  fontWeight: 400, 
                  color: '#1a1a1a',
                  flex: 1,
                }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

