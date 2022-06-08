type ConnectorResolvers = {
  oauthRedirect: BaseResolver<string, { code: string }>;
  params: BaseResolver<any, any>;
};

type BaseResolver<T, TResp> = {
  req: T;
  res: TResp;
};

type ConnectorResolver = <
  TParams extends Record<string, string>,
  T extends keyof ConnectorResolvers
>(
  type: T,
  payload: T extends 'params' ? any : ConnectorResolvers[T]['req'],
  timeout?: string | number
) => Promise<T extends 'params' ? any : ConnectorResolvers[T]['res']>;

export type Connector<TSchema extends Record<string, string>> = {
  type: 'connector';
  oauthUri?: (
    context: { redirectUri: string },
    log: any
  ) => Promise<string> | string;
  schema?: TSchema;
  shape?: any;
  run: (
    event: any & {
      useService: (service: { new (...args: any[]): any }) => Promise<any>;
      dispatch: (payload: Omit<any, '$base'>) => string;
      resolve: ConnectorResolver;
    }
  ) => Promise<void | Omit<any, '$base'>>;
};

export type SerializedConnector = {
  type: 'connector';
  oauthUri?: string;
  shape?: any;
};

function createConnector(run: Connector<any>['run']): Connector<any>;
function createConnector(
  oauthUri: Connector<{
    code: string;
    [s: string]: string;
  }>['oauthUri'],
  run: Connector<{
    code: string;
    [s: string]: string;
  }>['run']
): Connector<{
  code: string;
  [s: string]: string;
}>;

function createConnector<TSchema extends Record<string, any>>(
  schema: Connector<TSchema>['schema'],
  run: Connector<TSchema>['run']
): Connector<TSchema>;

function createConnector(arg: any, run?: any): Connector<any> {
  if (typeof arg === 'function' && !run) return { type: 'connector', run: arg };
  else if (arg && run && typeof arg === 'function' && typeof run === 'function')
    return { type: 'connector', oauthUri: arg, run };
  else if (arg && run && typeof run === 'function')
    return { type: 'connector', schema: arg, run };
  return { type: 'connector', run };
}

const connector = createConnector({ apiKey: 'djdj' }, async ({ useService }) => {
  return {
    name: 'Alisher name',
  };
});

console.log(connector)
//connector is an object that has { type: 'connector', schema: { key: 1 }, run: [Function (anonymous)] }


function pad(num: string | number, size: number) {
  num = num.toString();
  
  while (num.length < size) {
    num = '0' + num;
  };
  return num;
}

const num = pad(7, 4); 

console.log(num)

console.log('7'.toString().length);
