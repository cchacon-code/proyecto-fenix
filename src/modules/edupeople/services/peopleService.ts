import type { Person, PersonType } from '../domain/person';
import { storage } from '../../../shared/storage';

const STORAGE_KEY = 'fenix.edupeople';

export class PeopleService {
  private people: Person[] = [];

  constructor() {
    this.people = storage.get<Person[]>(STORAGE_KEY) ?? [];
  }

  getAll(): Person[] {
    return [...this.people];
  }

  getById(personId: string): Person | null {
    return this.people.find((person) => person.id === personId) ?? null;
  }

  add(person: Person): void {
    if (this.people.some((item) => item.id === person.id)) {
      throw new Error(`La persona ${person.id} ya existe.`);
    }

    this.people = [...this.people, person];
    this.persist();
  }

  update(person: Person): void {
    const exists = this.people.some((item) => item.id === person.id);

    if (!exists) {
      throw new Error(`La persona ${person.id} no existe.`);
    }

    this.people = this.people.map((item) =>
      item.id === person.id ? person : item,
    );

    this.persist();
  }

  remove(personId: string): void {
    this.people = this.people.filter((person) => person.id !== personId);
    this.persist();
  }

  search(query: string, type: PersonType | 'all'): Person[] {
    const normalized = query.trim().toLowerCase();

    return this.people.filter((person) => {
      const matchesType = type === 'all' || person.type === type;
      const fullText =
        `${person.firstName} ${person.lastName} ${person.email ?? ''}`.toLowerCase();

      return matchesType && fullText.includes(normalized);
    });
  }

  seed(initialPeople: Person[]): void {
    if (this.people.length > 0) {
      return;
    }

    this.people = [...initialPeople];
    this.persist();
  }

  count(): number {
    return this.people.length;
  }

  private persist(): void {
    storage.set(STORAGE_KEY, this.people);
  }
}
