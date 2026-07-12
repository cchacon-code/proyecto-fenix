export interface EntityMetadata {
  organizationId: string;
  academicYearId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface BaseEntity extends EntityMetadata {
  id: string;
  active: boolean;
}
