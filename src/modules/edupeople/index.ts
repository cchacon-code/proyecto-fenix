import { PeopleService } from './services/peopleService';

export const peopleService = new PeopleService();

export type {
  Person,
  PersonType,
} from './domain/person';

export {
  getPersonFullName,
  personTypeLabels,
} from './domain/person';
