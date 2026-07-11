import type { UserIdentity } from '../identity';

export class SessionService {
  private readonly STORAGE_KEY = 'fenix.session';

  save(user: UserIdentity): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(user),
    );
  }

  load(): UserIdentity | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as UserIdentity;
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  exists(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}