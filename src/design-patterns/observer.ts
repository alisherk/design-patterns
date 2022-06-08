/*
Observer is a behavioral design pattern that lets you define 
a subscription mechanism to notify multiple objects about 
any events that happen to the object they’re observing.

Use the Observer pattern when changes to the state of one object may require changing other objects, and the 
actual set of objects is unknown beforehand or changes dynamically.
*/

/**
 * The Observer interface declares the update method, used by subjects.
 */
interface Observer1 {
  // Receive update from subject.
  update(subject: Subject1): void;
}

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
interface Subject1 {
  // Attach an observer to the subject.
  attach(observer: Observer1): void;

  // Detach an observer from the subject.
  detach(observer: Observer1): void;

  // Notify all observers about an event.
  notify(): void;
}

/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
class ConcreteSubject implements Subject1 {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state: number = 0;

  /**
   * @type {Observer1[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer1[] = [];

  /**
   * The subscription management methods.
   */
  public attach(observer: Observer1): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer1): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      /*
      console.log('this', this);
         this ConcreteSubject {
         state: 7,
         observers: [ ConcreteObserverA {}, ConcreteObserverB {} ]
}
      */

      observer.update(this);
    }
  }

  /**
   * Usually, the subscription logic is only a fraction of what a Subject can
   * really do. Subjects commonly hold some important business logic, that
   * triggers a notification method whenever something important is about to
   * happen (or after it).
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
class ConcreteObserverA implements Observer1 {
  public update(subject: Subject1): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

class ConcreteObserverB implements Observer1 {
  public update(subject: Subject1): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log('ConcreteObserverB: Reacted to the event.');
    }
  }
}

/**
 * The client code.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
