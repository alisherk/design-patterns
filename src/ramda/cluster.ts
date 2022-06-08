import R from "ramda";

function clusters<T extends R.Ord>(elements: T[]) {
  if (R.isEmpty(elements)) {
    return [];
  }

  const unique = R.uniq(elements);
  const sorted = unique.slice().sort();

  // in case there were duplicates among the elements
  // we need to adjust the size of a chunk
  const scale = sorted.length / elements.length;

  console.log('scale', scale)

  const resize = Math.ceil(scale * 2);

  console.log('resize', resize)

  const dividers = R.pipe(
    R.splitEvery(resize),
    R.drop<T[]>(1),
    R.map<T[], T>(R.head)
  )(sorted);

  console.log('dividers', dividers)

  //dividers [ 3, 5, 7, 9 ]
  const pairs = R.zip(
    R.prepend(undefined, dividers),
    R.append(undefined, dividers)
  );

  return pairs;
}

const value = clusters([1, 2, 3, 4, 5, 5, 6, 7, 8, 9])

console.log(value)
