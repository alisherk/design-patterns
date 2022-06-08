/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 */
interface Implementation {
  operationImplementation(): string;
}

/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}
/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}
/**
 * Except for the initialization phase, where an Abstraction object gets linked
 * with a specific Implementation object, the client code should only depend on
 * the Abstraction class. This way the client code can support any abstraction-
 * implementation combination.
 */
function clientCode(abstraction: Abstraction) {
  // ..
  console.log(abstraction.operation());
  // ..
}

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
/*  let implementation = new ConcreteImplementationA();
 let abstraction = new Abstraction(implementation);
 clientCode(abstraction);
 
 console.log('');
 
 implementation = new ConcreteImplementationB();
 abstraction = new Abstraction(implementation);
 clientCode(abstraction) */

interface Device {
  isEnabled(): boolean;
  getVolume(): number;
}

class RemoteControl implements Device {
  constructor(protected device: Device) {}
  isEnabled(): boolean {
    return this.device.isEnabled();
  }

  getVolume(): number {
    return this.device.getVolume();
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute() {
    return this.isEnabled();
  }
}

class Tv implements Device {
  state: boolean = false;
  volume: number = 5;

  isEnabled(): boolean {
    return !this.state;
  }

  getVolume(): number {
    return this.volume;
  }
}
class Radio implements Device {
  state: boolean = false;
  volume: number = 5;

  isEnabled(): boolean {
    return !this.state;
  }

  getVolume(): number {
    return this.volume;
  }
}

const tv = new Tv()
const remote = new RemoteControl(tv)
console.log(remote.getVolume())

const radio = new Radio()
const advancedRemote = new AdvancedRemoteControl(radio)
console.log(advancedRemote.mute())