export interface SnippetModel {
  snippet: {
    version: string;
    layout: SnippetComponent[];
    params?: Record<string, unknown>;
  };
}

export type SnippetComponent =
  | ImageComponent
  | TextComponent
  | SpacerComponent
  | ButtonComponent
  | KeyValueComponent
  | ListComponent
  | InputComponent
  | DropdownComponent
  | DividerComponent
  | TimelineComponent;

export interface BaseComponent {
  type: string;
  id: string;
}

export interface ImageComponent extends BaseComponent {
  type: 'image';
  url: string;
}

export interface TextComponent extends BaseComponent {
  type: 'text';
  text: string;
  style?: 'h1' | 'h2' | 'paragraph';
  align?: 'center' | 'left';
  color?: 'default' | 'muted' | 'success' | 'highlighted' | 'warning';
}

export interface SpacerComponent extends BaseComponent {
  type: 'spacer';
  size?: 'xs' | 's' | 'm' | 'l';
}

export interface ButtonComponent extends BaseComponent {
  type: 'button';
  label: string;
  action: {
    type: 'submit' | 'link' | 'url';
    url?: string;
  };
  style?: 'primary' | 'default' | 'outline' | 'link';
}

export interface KeyValueComponent extends BaseComponent {
  type: 'keyvalue' | 'key-value';
  // 단일 key-value
  key?: string;
  value?: string;
  // 배열 형식
  items?: Array<{
    key: string;
    value: string;
  }>;
}

export interface ListComponent extends BaseComponent {
  type: 'list';
  items: Array<{
    id?: string;
    title: string;
    description?: string;
    image?: string;
    action?: {
      type: 'submit' | 'link' | 'url';
      url?: string;
    };
  }>;
}

export interface InputComponent extends BaseComponent {
  type: 'input';
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

export interface DropdownComponent extends BaseComponent {
  type: 'dropdown';
  label: string;
  placeholder?: string;
  value?: string;
  // options 형식 (value/label)
  options?: Array<{
    label: string;
    value: string;
  }>;
  // items 형식 (id/label) - 채널톡 서버 응답
  items?: Array<{
    id: string;
    label: string;
  }>;
  required?: boolean;
}

export interface DividerComponent extends BaseComponent {
  type: 'divider';
}

export interface TimelineComponent extends BaseComponent {
  type: 'timeline';
  hour24?: boolean;
  events: Array<{
    ts: number;
    value: string;
    color?: string;
  }>;
}

