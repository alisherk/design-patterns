//Builder pattern lets you construct complex objects step by step.
//Builder doesn’t allow other objects to access the product
//while it’s being built.
interface Builder {
  produceWheels(): void;
  produceSeats(): void;
  produceEngine(): void;
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */

class Car {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Car parts: ${this.parts.join(', ')}\n`);
  }
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class CarBuilder implements Builder {
  private car: Car;

  /**
   * A fresh builder instance should contain a blank product object, which is
   * used in further assembly.
   */
  constructor() {
    this.car = new Car();
  }

  public reset(): void {
    this.car = new Car();
  }

  /**
   * All production steps work with the same product instance.
   */
  public produceWheels(): void {
    this.car.parts.push('wheels');
  }

  public produceSeats(): void {
    this.car.parts.push('seats');
  }

  public produceEngine(): void {
    this.car.parts.push('engine');
  }

  /**
   * Concrete Builders are supposed to provide their own methods for
   * retrieving results. That's because various types of builders may create
   * entirely different products that don't follow the same interface.
   * Therefore, such methods cannot be declared in the base Builder interface
   * (at least in a statically typed programming language).
   *
   * Usually, after returning the end result to the client, a builder instance
   * is expected to be ready to start producing another product. That's why
   * it's a usual practice to call the reset method at the end of the
   * `getProduct` method body. However, this behavior is not mandatory, and
   * you can make your builders wait for an explicit reset call from the
   * client code before disposing of the previous result.
   */
  public getProduct(): Car {
    const result = this.car;

    this.reset();

    return result;
  }
}

class Manual {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Car parts: ${this.parts.join(', ')}\n`);
  }
}

class CarManualBuilder implements Builder {
  private manual: Manual;

  constructor() {
    this.manual = new Manual();
  }

  public reset(): void {
    this.manual = new Manual();
  }

  public produceWheels(): void {
    this.manual.parts.push('wheels');
  }

  public produceSeats(): void {
    this.manual.parts.push('seats');
  }

  public produceEngine(): void {
    this.manual.parts.push('engine');
  }

  public getProduct(): Manual {
    const result = this.manual;

    this.reset();

    return result;
  }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, Director class is
 * optional, since the client can control builders directly.
 */
class Director {
  private builder: Builder | null = null;

  /**
   * The Director works with any builder instance that the client code passes
   * to it. This way, the client code may alter the final type of the newly
   * assembled product.
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * The Director can construct several product variations using the same
   * building steps.
   */
  public buildMinimalViableProduct(): void {
    this.builder?.produceEngine();
  }

  public buildFullFeaturedProduct(): void {
    this.builder?.produceEngine();
    this.builder?.produceSeats();
    this.builder?.produceWheels();
  }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */

function makeCar() {
  const director = new Director();

  const carBuilder = new CarManualBuilder();

  director.setBuilder(carBuilder);

  //director.buildMinimalViableProduct();

  director.buildFullFeaturedProduct()

  const car = carBuilder.getProduct();

  car.listParts();
}

makeCar()

/* function clientCode(director: Director) {
  const builder = new CarManualBuilder();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log('Custom product:');
  builder.produceEngine();
  builder.produceSeats();
  builder.produceWheels();
}

const director = new Director();
clientCode(director); */
