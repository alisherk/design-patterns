
@classDecorator
class Boat {
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }
  //target will be "{ pilot: [Function(anonymous)]}""
  //key will be "pilot"
  @logError('Oops boat sank')
  pilot(@paramDecorator speed: string): void {
    throw new Error();
    console.log('swish');
  }
}

function classDecorator(constructor: typeof Boat) {
  //will print [Function: Boat]
  console.log(constructor)
}

function paramDecorator(target: any, key: string, index: number) {
  //key === pilot; index === 0 index is usually arguments order
  console.log(key, index)

}

function testDecorator(target: any, key: string){
  console.log('target', target);

  console.log('key', key);
  
}

function logError(errMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    /* 
    desc structure
  method {
    value: [Function (anonymous)],
    writable: true,
    enumerable: true,
    configurable: true
  } */

    const method = desc.value;

    desc.value = function () {
      try {
        method();
      } catch (error) {
        console.log(errMessage);
      }
    };
  };
}

new Boat().pilot('50');



/* const car = { make: 'honda', year: 2000 };

Object.getOwnPropertyDescriptor(car, 'make'); 

//this will prevent update to car.make = 'smth'
Object.defineProperty(car, 'make', { writable: false });  */
