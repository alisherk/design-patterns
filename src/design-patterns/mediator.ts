/*
Mediator is a behavioral design pattern that lets you reduce 
chaotic dependencies between objects. The pattern restricts 
direct communications between the objects and forces them 
to collaborate only via a mediator object.

The Mediator pattern suggests that you should cease all direct 
communication between the components which you want to make 
independent of each other. 
Instead, these components must collaborate indirectly, 
by calling a special mediator object that redirects 
the calls to appropriate components. As a result, the components depend only on a single mediator class instead of being coupled to dozens of their colleagues.

Use the Mediator pattern when it’s hard to change some of the classes 
because they are tightly coupled to a bunch of other classes.
*/

/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.');
    /*
    console.log('this', this);
    this <ref *1> Component1 {
      mediator: <ref *2> ConcreteMediator {
      component1: [Circular *1],
      component2: Component2 { mediator: [Circular *2] }
     }
    */
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
class ConcreteMediator implements Mediator {
  private component1: Component1;

  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    //console.log('this', this);
    //this ConcreteMediator { component1: Component1 { mediator: undefined } }
    this.component1.setMediator(this);
    /*
     this <ref *1> ConcreteMediator {
     component1: Component1 { mediator: [Circular *1] }
     }
    */
    this.component2 = c2;
    this.component2.setMediator(this);
    //console.log('this', this);
    /*
      this <ref *1> ConcreteMediator {
      component1: Component1 { mediator: [Circular *1] },
      component2: Component2 { mediator: [Circular *1] }
      }
    */
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

/**
 * The client code.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

/*
Client triggers operation A.
Component 1 does A.
Mediator reacts on A and triggers following operations:
Component 2 does C.
*/

/* console.log('');
console.log('Client triggers operation D.');
c2.doD(); */
/*
Client triggers operation A.
Component 1 does A.
Mediator reacts on A and triggers following operations:
Component 2 does C.

Client triggers operation D.
Component 2 does D.
Mediator reacts on D and triggers following operations:
Component 1 does B.
Component 2 does C.

*/