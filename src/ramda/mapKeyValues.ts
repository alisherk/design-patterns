import R from 'ramda';

/* model,
[
  oneRequiredKeys,
  (key) => [`${key}Id` as keyof OneRequired],
  ([keyId]) => {
    const id = model[keyId];
    return { connect: { id } };
  },
],
 */

function mapKeyValues<
  T0,
  T extends Record<string, any>,
  R extends Record<string, any>
>(
  model: T0 & T,
  ...pairs:
    | Array<
        [
          (keyof R)[],
          (key: keyof R) => (keyof T)[],
          (keys: (keyof T)[]) => R[keyof R]
        ]
      >
    | any
): T0 & R {
  //@ts-ignore
  return R.pipe(
    () => pairs,
    //@ts-ignore
    R.chain(([keys, transformKey, transformValue]) =>
      R.map((key) => [key, transformKey, transformValue] as const, keys)
    ),
    R.reduce((result, [keyR, transformKey, transformValue]) => {
      const keysT = transformKey(keyR);

      return R.o(
        R.assoc(keyR as string, transformValue(keysT)),
        R.omit(keysT as string[]),
        result
      ) as T0 & R;
    }, model as T0 & R)
  )();
}

const model = { foo: 'foo' };

const pairs = [
  'D',
  (key: any) => [`${key}Id`],
  (key: any) => {
    return { connect: { key } };
  },
];

const values = mapKeyValues(model, pairs);

console.log(values);
