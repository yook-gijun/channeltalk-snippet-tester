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
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  align?: 'left' | 'center' | 'right';
}

export interface TextComponent extends BaseComponent {
  type: 'text';
  text: string;
  align?: 'left' | 'center' | 'right';
  style?: 'header' | 'subheader' | 'body' | 'caption' | 'h1' | 'h2' | 'h3' | 'muted';
  bold?: boolean;
  color?: string;
}

export interface SpacerComponent extends BaseComponent {
  type: 'spacer';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonComponent extends BaseComponent {
  type: 'button';
  label: string;
  action: {
    type: 'submit' | 'link' | 'url';
    url?: string;
  };
  style?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
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
  required?: boolean;
  multiline?: boolean;
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
  size?: 'thin' | 'medium' | 'thick';
}

export interface TimelineComponent extends BaseComponent {
  type: 'timeline';
  items: Array<{
    title: string;
    description?: string;
    timestamp?: string;
    status?: 'completed' | 'active' | 'pending';
  }>;
}

