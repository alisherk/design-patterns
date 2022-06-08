import * as R from 'ramda';

function zipBy<A, B>(
  as: A[],
  bs: B[],
  keyA: (a: A) => string,
  keyB: (b: B) => string
): [A | undefined, B | undefined][] {
  const aById = R.indexBy(keyA, as); 
  //will produce aById { '1': { id: 1, foo: 'foo' } }
  const bById = R.indexBy(keyB, bs);
  //wil produce bById { '2': { id: 2, foo: 'foo' } }

  const unionKeys = R.union(R.keys(aById), R.keys(bById));
  //will produce [ '1', '2' ]
  return unionKeys.map((key) => [aById[key], bById[key]]);
}

const model = {
  id: 1,
};
const before = [{ id: 1, foo: 'foo' }];

const after = [{ id: 2, foo: 'foo' }];

const getKey = (model: any) => model.id;

const value = zipBy(before, after, getKey, getKey);

console.log(value);

interface Diff<T> {
  creates: T[];
  updates: [T, T][];
  deletes: T[];
}

function diff<T>(before: T[], after: T[], key: (model: T) => string): Diff<T> {
  const pairs = zipBy(before, after, key, key);

  return R.reduce(
    (result, [before, after]) =>
      !before && after
        ? R.over(R.lensProp("creates"), R.append(after), result)
        : before && after && !R.equals(before, after)
        ? R.over(R.lensProp("updates"), R.append([before, after]), result)
        : before && !after
        ? R.over(R.lensProp("deletes"), R.append(before), result)
        : result,
    { creates: [], updates: [], deletes: [] } as Diff<T>,
    pairs
  );
}
