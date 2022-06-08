import R from 'ramda';

const value = R.unnest([
  [`"${'name'}"`],
  ['type'],
  'required' ? ['NOT NULL'] : [],
  'defaultValue' ? [`DEFAULT ${'defaultValue'}`] : [],
  'id' ? ['PRIMARY KEY'] : [],
]).join(' ');

const columns = [
  {
    name: 'id',
    type: 'text',
    required: true,
    id: true,
    key: 'identifier',
  },
  { name: 'name', type: 'text', required: true },
  { name: 'workDayStart', type: 'text' },
  { name: 'workDayFinish', type: 'text' },
  {
    name: 'latitude',
    type: 'float8',
    transform: (latitude: string) => Number(latitude) || null,
  },
  {
    name: 'longitude',
    type: 'float8',
    transform: (longitude: string) => Number(longitude) || null,
  },
  { name: 'address', type: 'text' },
  {
    name: 'restaurantURL',
    type: 'text',
    required: true,
    key: 'Restaurant URL',
  },
];

const createColumns = columns
  .flatMap(
    ({ name, type, required, default: defaultValue, id, relation }: any) => {
      const column = R.unnest([
        [`"${name}"`],
        [type],
        required ? ['NOT NULL'] : [],
        defaultValue ? [`DEFAULT ${defaultValue}`] : [],
        id ? ['PRIMARY KEY'] : [],
      ]).join(' ');

      return relation
        ? [
            column,
            `CONSTRAINT "${'foo'}_${name}_fkey" FOREIGN KEY ("${name}") REFERENCES "${
              relation.table
            }"("${relation.column}") ON DELETE CASCADE ON UPDATE CASCADE`,
          ]
        : column;
    }
  )
  .join();

console.log(createColumns)

const cols = [{ id: 1, name: 'foo ' }];

const tColumn = cols
  .flatMap((col) => {
    const column = R.unnest([['NOT NULL'], [col.id], ['PRIMARY KEY']]).join(' ');

    return column;
  })
  .join();

console.log(tColumn);
