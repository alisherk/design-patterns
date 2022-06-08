import R from 'ramda';

type File = {[key:string]: string }

const scores = {'Omar': '50', Alisher: [] }

function producePairs(scores: any) {
  return R.reduce<[string, string], [string, string][]>(
    (results, [name, score]) => {
      if (Array.isArray(score)) {
        return []
      }
      return R.append([name, score], results);
    },
    [],
    Object.entries(scores)
  );
}

const pairs = producePairs(scores); 


console.log(pairs);