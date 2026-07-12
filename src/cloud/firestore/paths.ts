export const cloudPaths = {
  user: (uid: string) => `users/${uid}`,
  organization: (organizationId: string) => `organizations/${organizationId}`,
  people: (organizationId: string) => `organizations/${organizationId}/people`,
  courses: (organizationId: string) => `organizations/${organizationId}/courses`,
  profile: (organizationId: string) =>
    `organizations/${organizationId}/settings/profile`,
};
