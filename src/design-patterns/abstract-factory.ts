/**
 *  Use the Abstract Factory when your code needs to work with various families of related products, but you don’t want it to depend on the concrete classes of those products—they might be unknown beforehand or you simply want to allow for future extensibility.
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface IButton {
  paint(): string;
}
/**
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface ICheckbox {
  /**
   * Product B is able to do its own thing...
   */
  paint(): string;
  /**
   * ...but it also can collaborate with the ProductA.
   *
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible.
   */
  talk(collaborator: IButton): string;
}

/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface GuiFactory {
  createButton(): IButton;

  createCheckbox(): ICheckbox;
}
/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WinButton implements IButton {
  public paint(): string {
    return 'windows button painted';
  }
}

class MacButton implements IButton {
  public paint(): string {
    return 'mac button painted';
  }
}

class WinCheckbox implements ICheckbox {
  public paint(): string {
    return 'windows checkbox painted';
  }
  /**
   * The variant Windowns, is only able to work correctly with the variant,
   * WinButton. S, it accepts any instance of WinButton as
   * an argument.
   */
  public talk(collaborator: WinButton): string {
    const result = collaborator.paint();
    return `The result of WinCheckbox talking to (${result})`;
  }
}

class MacCheckbox implements ICheckbox {
  public paint(): string {
    return 'mac checkbox painted';
  }

  /**
   * The variant of Mac, is only able to work correctly with the variant,
   * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
   * an argument.
   */
  public talk(collaborator: MacButton): string {
    const result = collaborator.paint();
    return `The result of MacCheckbox talking (${result})`;
  }
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class WinFactory implements GuiFactory {
  public createButton(): IButton {
    return new WinButton();
  }

  public createCheckbox(): ICheckbox {
    return new WinCheckbox();
  }
}
/**
 * Each Concrete Factory has a corresponding product variant.
 */
class MacFactory implements GuiFactory {
  public createButton(): IButton {
    return new MacButton();
  }

  public createCheckbox(): ICheckbox {
    return new MacCheckbox();
  }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: GuiFactory) {
  const button = factory.createButton();

  const checkBox = factory.createCheckbox();

  console.log(checkBox.talk(button));
}

/**
 * The client code can work with any concrete factory class.
 */
clientCode(new MacFactory());


// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
/* class Application is
    private field factory: GUIFactory
    private field button: Button
    constructor Application(factory: GUIFactory) is
        this.factory = factory
    method createUI() is
        this.button = factory.createButton()
    method paint() is
        button.paint()


// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
class ApplicationConfigurator is
    method main() is
        config = readApplicationConfigFile()

        if (config.OS == "Windows") then
            factory = new WinFactory()
        else if (config.OS == "Mac") then
            factory = new MacFactory()
        else
            throw new Exception("Error! Unknown operating system.")

        Application app = new Application(factory) */