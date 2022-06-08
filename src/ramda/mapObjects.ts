const xyz = { x: 1, y: 2, z: 3 };

const prependKeyAndDouble = (num: any, key: any, obj: any) => key + num * 2;

R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
