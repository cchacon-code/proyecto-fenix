export interface TenantContext {
  organizationId: string;
  academicYearId: string;
  userId: string;
}

export interface PageRequest {
  page: number;
  pageSize: number;
}

export interface PageResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
