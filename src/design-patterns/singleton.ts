/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Database {
  private static instance: Database;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public query(sql: string) {
    console.log(`quering databases using ${sql}`);
  }
}

/**
 * The client code.
 */
function clientCode() {
  const s1 = Database.getInstance();
  const s2 = Database.getInstance();

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }

  s1.query('SELECT FROM users');
}

clientCode();
