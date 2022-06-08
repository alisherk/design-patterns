/**
 * The Target defines the domain-specific interface used by the client code.
 */
class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}
/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
/* function clientCode(target: Target) {
  console.log(target.request());
} */

/* console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log(
  "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter); */

class RoundHole {
  constructor(private radius: number) {}

  getRadius() {
    return this.radius;
  }

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius();
  }
}

class RoundPeg {
  constructor(private radius: number) {}

  getRadius() {
    return this.radius;
  }
}

class SquarePeg {
  constructor(private width: number) {}

  getWidth() {
    return this.width;
  }
}

class SquarePegAdapter extends RoundPeg {
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    super(0);
    this.peg = peg;
  }

  getRadius(): number {
    // The adapter pretends that it's a round peg with a
    // radius that could fit the square peg that the adapter
    // actually wraps.
    return this.peg.getWidth() * Math.sqrt(2) / 2;
  }
}

const hole = new RoundHole(5); 
const rpeg = new RoundPeg(5); 

const small_sqpeg = new SquarePeg(5); 
const large_sqpeg = new SquarePeg(10); 
//console.log(hole.fits(small_sqpeg)) // this won't compile (incompatible types)

const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg); 
const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg); 
console.log(hole.fits(small_sqpeg_adapter)) //true
console.log(hole.fits(large_sqpeg_adapter)) //false as size 10 does not fit size 5


