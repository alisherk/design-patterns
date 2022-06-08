import 'reflect-metadata';
//this package adds Reflect to global scope

const plane = {
  color: 'red',
};

//add some meta data
Reflect.defineMetadata('note', 'hi there', plane);

//add metadata to specific property on the obj
Reflect.defineMetadata('note', 'hi there', plane, 'color');

//find the associated meta data
const note = Reflect.getMetadata('note', plane, 'color');

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('123')
  fly(): void {
    console.log('vrrr');
  }
}
function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}
