export type FeatureKey =
  | 'edupeople'
  | 'educourses'
  | 'eduorganization'
  | 'edusubjects'
  | 'eduplanning'
  | 'eduassessment'
  | 'eduattendance'
  | 'educalendar'
  | 'eduanalytics'
  | 'edubrain';

export class FeatureFlags {
  private flags: Record<FeatureKey, boolean> = {
    edupeople: true,
    educourses: true,
    eduorganization: true,
    edusubjects: false,
    eduplanning: false,
    eduassessment: false,
    eduattendance: false,
    educalendar: false,
    eduanalytics: false,
    edubrain: false,
  };

  isEnabled(key: FeatureKey): boolean {
    return this.flags[key];
  }

  set(key: FeatureKey, enabled: boolean): void {
    this.flags[key] = enabled;
  }

  snapshot(): Readonly<Record<FeatureKey, boolean>> {
    return { ...this.flags };
  }
}
