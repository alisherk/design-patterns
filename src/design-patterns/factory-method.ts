interface Button {
  createButton(): string;
  click(): void;
}

abstract class Dialog {
  public abstract factoryMethod(): Button;

  private product = this.factoryMethod();

  public render() {
  
    const button = this.product.createButton();

    console.log(button);
  }

  public onClick() {
    this.product.click()
  }
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class WindowsButton implements Button {
  public createButton(): string {
    return 'Created windows button';
  }
  public click(): void {
    console.log('windows button clicked');
  }
}

class WebButton implements Button {
  public createButton(): string {
    return 'Created HTML button';
  }

  public click(): void {
    console.log('web button clicked');
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class WindowsDialog extends Dialog {
  public factoryMethod(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  public factoryMethod(): Button {
    return new WebButton();
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 * 
 function clientCode(dialog: Dialog) {
  console.log(dialog.render());
}
console.log('App: Launched with Web Dialog');
clientCode(new WebDialog());

console.log('App: Launched with Windows Dialog');
clientCode(new WindowsDialog());
 */

class Application {
  private dialog: Dialog | null = null;
  private OS: string;

  constructor(OS: string) {
    this.OS = OS;
  }

  public initialize() {
    if (this.OS === 'windows') {
      this.dialog = new WindowsDialog();
    } else if (this.OS === 'web') {
      this.dialog = new WebDialog();
    } else {
      throw new Error('Error! Unknown operating system.');
    }
  }

  public main() {
    return this.dialog?.render();
  }

  public onClick() {
    this.dialog?.onClick()
  }
}
const app = new Application('web');

app.initialize();

app.main();

app.onClick()


