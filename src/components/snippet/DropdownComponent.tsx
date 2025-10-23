import { useState, useRef, useEffect } from 'react';
import type { DropdownComponent as DropdownType } from '../../types/snippet';

export const DropdownComponent = ({
  component,
  value,
  onChange,
}: {
  component: DropdownType;
  value: string;
  onChange: (id: string, value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // options 또는 items 형식 모두 지원
  const dropdownItems = component.options
    ? component.options.map((opt) => ({ id: opt.value, label: opt.label }))
    : component.items || [];

  const selectedItem = dropdownItems.find((item) => item.id === (value || component.value));

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ marginBottom: '12px' }} ref={dropdownRef}>
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#fff',
            color: selectedItem ? '#1a1a1a' : '#8b95a1',
            cursor: 'pointer',
            outline: 'none',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            borderColor: isOpen ? '#4A90E2' : '#e0e0e0',
            boxShadow: isOpen ? '0 0 0 3px rgba(74, 144, 226, 0.1)' : 'none',
          }}
        >
          <span>{selectedItem?.label || component.label}</span>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="#8b95a1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              maxHeight: '240px',
              overflowY: 'auto',
              zIndex: 1000,
            }}
          >
            {dropdownItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onChange(component.id, item.id);
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  cursor: 'pointer',
                  backgroundColor: item.id === (value || component.value) ? '#f8f9fa' : '#fff',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  if (item.id !== (value || component.value)) {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
