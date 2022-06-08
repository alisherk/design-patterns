const makeVar =
  (initial?: string) =>
  (value?: string) =>
    value ? value : initial;

const store = (key: string, value: string) =>
  new Promise<string>(function (resolve, reject) {
     const obj: {[key: string]: any} = {
        key: value
     }
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve(obj[key]), 1000);
  });

export function makePersistedVar(key: string, initialValue: string) {
  const variable = makeVar(initialValue);

  console.log('exe 1')

  store(key, initialValue).then((item: string) => {
    return variable(item);
  });

  return Object.assign((newValue?: string) => {
    if (!newValue) {
      console.log('exe 2')
      return variable();
    }

    console.log('exe 3')

    return variable(newValue);
  }, variable);
}

const address = makePersistedVar('address', '202 DelMonica')

const val = address()

console.log(val);



