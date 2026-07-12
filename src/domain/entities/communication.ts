import type { BaseEntity } from './base';

export interface CalendarEvent extends BaseEntity {
  title: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  audience: string[];
  type: 'academic' | 'institutional' | 'meeting' | 'activity';
}

export interface Notification extends BaseEntity {
  recipientUserId: string;
  title: string;
  message: string;
  readAt?: string;
  actionUrl?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
