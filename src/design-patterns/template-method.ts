/* 
Template Method is a behavioral design pattern that 
defines the skeleton of an algorithm in the 
superclass but lets subclasses override 
specific steps of the algorithm without changing its structure.

The Template Method pattern suggests that you break down 
an algorithm into a series of steps, turn these steps 
into methods, and put a series of calls to these methods 
inside a single template method. The steps may either 
be abstract, or have some default implementation. 
To use the algorithm, the client is supposed to provide 
its own subclass,
 implement all abstract steps, 
 and override some of the optional ones 
 if needed (but not the template method itself).

  Use the Template Method pattern when you want to let clients extend only particular steps of an algorithm, 
  but not the whole algorithm or its structure.
*/

/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 */
abstract class AbstractClass {
  /**
   * The template method defines the skeleton of an algorithm.
   */
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /**
   * These operations already have implementations.
   */
  protected baseOperation1(): void {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  protected baseOperation2(): void {
    console.log(
      'AbstractClass says: But I let subclasses override some operations'
    );
  }

  protected baseOperation3(): void {
    console.log(
      'AbstractClass says: But I am doing the bulk of the work anyway'
    );
  }

  /**
   * These operations have to be implemented in subclasses.
   */
  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;

  /**
   * These are "hooks." Subclasses may override them, but it's not mandatory
   * since the hooks already have default (but empty) implementation. Hooks
   * provide additional extension points in some crucial places of the
   * algorithm.
   */
  protected hook1(): void {}

  protected hook2(): void {}
}

/**
 * Concrete classes have to implement all abstract operations of the base class.
 * They can also override some operations with a default implementation.
 */
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

/**
 * Usually, concrete classes override only a fraction of base class' operations.
 */
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

/**
 * The client code calls the template method to execute the algorithm. Client
 * code does not have to know the concrete class of an object it works with, as
 * long as it works with objects through the interface of their base class.
 */
function clientCode(abstractClass: AbstractClass) {
  // ...
  abstractClass.templateMethod();
  // ...
}

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
