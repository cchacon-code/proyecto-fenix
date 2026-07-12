import type { BaseEntity } from '../../domain/entities';
import type { PageRequest, PageResult, TenantContext } from '../../domain/value-objects/context';

export interface Repository<T extends BaseEntity> {
  findById(context: TenantContext, id: string): Promise<T | null>;
  findAll(context: TenantContext, page?: PageRequest): Promise<PageResult<T>>;
  create(context: TenantContext, entity: T): Promise<T>;
  update(context: TenantContext, entity: T): Promise<T>;
  remove(context: TenantContext, id: string): Promise<void>;
}
