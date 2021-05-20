import faker from "faker";
import mapValues from "lodash/mapValues";

const fakerRef = Object.seal({ current: faker });

type FakerSelector = (faker: Faker.FakerStatic) => unknown;
type FakeFieldMap = Record<string, FakerSelector>;

export function makeRecord<T extends FakeFieldMap>(fields: T) {
  return mapValues(fields, (selector) => selector(fakerRef.current));
}

export function makeData<T extends FakeFieldMap>(fields: T, records: number) {
  const data = [];
  for (let i = 0; i < records; ++i) {
    const record = makeRecord(fields);
    data.push({ ...record, id: i });
  }

  return data;
}
