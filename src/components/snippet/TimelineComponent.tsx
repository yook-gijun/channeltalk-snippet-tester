import type { TimelineComponent as TimelineType } from '../../types/snippet';

export const TimelineComponent = ({ component }: { component: TimelineType }) => {
  const colorMap: Record<string, string> = {
    white: '#868e96',
    green: '#28a745',
    blue: '#007bff',
    red: '#dc3545',
    yellow: '#ffc107',
  };

  const getEventColor = (color?: string): string => {
    return colorMap[color || 'white'] || colorMap['white'];
  };

  const formatTime = (ts: number, hour24: boolean = true) => {
    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      return '';
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    if (hour24) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
  };

  const formatDate = (ts: number) => {
    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 날짜별로 이벤트 그룹화
  const groupedEvents: Record<string, typeof component.events> = {};
  component.events.forEach((event) => {
    if (!event.ts) return;
    const dateKey = formatDate(event.ts);
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });

  return (
    <div style={{ marginBottom: '12px' }}>
      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date} style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#495057',
            marginBottom: '8px',
          }}>
            {date}
          </div>
          {events.map((event, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '8px',
                paddingLeft: '8px',
                borderLeft: `3px solid ${getEventColor(event.color)}`,
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#868e96',
                minWidth: '60px',
                marginRight: '12px',
              }}>
                {formatTime(event.ts, component.hour24)}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#1a1a1a',
                flex: 1,
              }}>
                {event.value}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
