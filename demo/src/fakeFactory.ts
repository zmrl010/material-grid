import { faker } from "@faker-js/faker";

export function createFakeRow(id: number) {
  const modifiedOn = faker.date.past();
  return {
    id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 10, max: 75 }),
    bio: faker.lorem.paragraph(5),
    createdOn: faker.date.past(1, modifiedOn),
    modifiedOn,
  };
}

export function createFakeList(length: number) {
  return Array.from({ length }, (_, i) => createFakeRow(i + 1));
}

export type FakeRow = ReturnType<typeof createFakeRow>;
