import { faker, type Faker } from "@faker-js/faker";

type FakeType = keyof Faker;
type Factory = (...args: unknown[]) => unknown;

interface FakeColumn<Key extends PropertyKey, F extends Factory> {
  key: Key;
  label: string;
  create: F;
}

function createFakeColumn<Key extends PropertyKey, F extends Factory>(
  key: Key,
  label: string,
  factory: F
): FakeColumn<Key, F> {
  return {
    key,
    label,
    create: factory,
  };
}

function createFakeRow<TData extends Record<string, unknown>>(
  columns: FakeColumn<keyof TData, () => TData[keyof TData]>[]
) {
  return columns.map(({ key, label, create }) => [key]);
}

export function makeFake() {
  const modifiedOn = faker.date.past();
  return {
    id: faker.unique(faker.datatype.number),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    createdOn: faker.date.past(1, modifiedOn),
    modifiedOn: faker.date.past(),
    description: faker.lorem.paragraph(5),
  };
}

export function makeFakeList(count: number) {
  return Array(count)
    .fill(0)
    .map(() => makeFake());
}

export type FakeRow = ReturnType<typeof makeFake>;
