import { AuditService } from './audit/AuditService';
import { FeatureFlags } from './config/FeatureFlags';
import { EventBus } from './events/EventBus';
import { Logger } from './logging/Logger';

export const eduKernel = {
  events: new EventBus(),
  features: new FeatureFlags(),
  audit: new AuditService(),
  logger: new Logger(),
};

export { appConfig } from './config/AppConfig';
export type { AppConfig } from './config/AppConfig';
export type { FeatureKey } from './config/FeatureFlags';
export type { AuditEntry } from './audit/AuditService';
export type { DomainEvent } from './events/EventBus';
