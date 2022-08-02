import { faker } from "@faker-js/faker";

export function makeFake() {
  return {
    id: faker.unique(faker.datatype.number),
    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),
    createdOn: new Date(),
    modifiedOn: new Date(),
    description: faker.lorem.paragraph(5),
  };
}

export function makeFakeList(count: number) {
  return Array(count)
    .fill(0)
    .map(() => makeFake());
}

export type FakeRow = ReturnType<typeof makeFake>;
