/*
a different way to instatiate classes by cloning vs subclassing
simplifies creation of class object
*/

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
  public primitive: any;
  public component: Object = {};
  public circularReference: ComponentWithBackReference | null = null;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);
    // Cloning an object that has a nested object with backreference
    // requires special treatment. After the cloning is completed, the
    // nested object should point to the cloned object, instead of the
    // original object. Spread operator can be handy for this case.
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

/**
 * The client code.
 */
function clientCode1() {
  const p1 = new Prototype();

  p1.primitive = 245;

  p1.component = new Date();

  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
    console.log(
      'Primitive field values have been carried over to a clone. Yay!'
    );
  } else {
    console.log('Primitive field values have not been copied. Booo!');
  }
  if (p1.component === p2.component) {
    console.log('Simple component has not been cloned. Booo!');
  } else {
    console.log('Simple component has been cloned. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('Component with back reference has not been cloned. Booo!');
  } else {
    console.log('Component with back reference has been cloned. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference?.prototype) {
    console.log(
      'Component with back reference is linked to original object. Booo!'
    );
  } else {
    console.log('Component with back reference is linked to the clone. Yay!');
  }
}

//clientCode1()

// real example
abstract class Shape {

  abstract clone(): Shape;
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(source: Rectangle) {
    super()
    this.width = source.width;
    this.height = source.height;
  }

  clone(): Rectangle {
    return new Rectangle(this);
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  clone(): Circle {
    return Object.create(this);
  }
}

function clientCode2() {
  const circle = new Circle(10);

  const clonedCircle = circle.clone(); 



  if(circle === clonedCircle) {
      console.log('true')
  } else {
      console.log('false')
  }
  if(circle.radius === clonedCircle.radius) {
      console.log('objects are happily cloned')
  }

}

clientCode2()
