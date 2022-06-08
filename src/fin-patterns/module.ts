export type Extractor = {
  type: 'extractor';
  run: (
    e: any & {
      useService: (service: {
        new (
          context: any,
          onUpdateCredentials: (newCredentials: any) => Promise<void>,
          onUpdateState: (newState: any) => Promise<void>
        ): any;
      }) => Promise<any>;
      dispatch: any;
    }
  ) => Promise<void | {
    cursor?: { start?: string; end?: string };
    batch?: string;
    hasMore?: boolean;
  }>;
} & any;

function createExtractor(run: Extractor['run'], options?: any): Extractor {
  return {
    type: 'extractor',
    run,
    cursor: options?.cursor || 'default',
    scope: options?.scope || false,
  };
}

export type SerializedEntityDefinition = {
  name: string;
  shape: any;
};

export type EntityInsertPayload<T> = {
  datedAt?: string;
  uniqueRef: string;
  data: T;
  description: string;
};

export type Dispatchable<TType extends string, TShape, TEnsure = TShape> = {
  type: TType;
  shape: TShape;
  ensure: (data: any) => TEnsure;
};

export type EntityDefinition<T> = Dispatchable<
  'entity',
  EntityInsertPayload<T>,
  EntityInsertPayload<T> & {
    type: string;
  }
> & {
  name: string;
};

export type StrongEntityDefinition<TSchema extends Record<string, string>> =
  EntityDefinition<any> & {
    schema: any;
  };

function createEntityDefinition<T>(name: string): EntityDefinition<T>;

function createEntityDefinition<T extends Record<string, any>>(
  name: string,
  schema: T
): StrongEntityDefinition<T>;

function createEntityDefinition(
  name: string,
  schema?: any
): StrongEntityDefinition<any> | EntityDefinition<any> {
  if (schema) {
    return {
      type: 'entity',
      name,
      schema: schema,
      shape: undefined as any,
      ensure: (payload: EntityInsertPayload<any>) => ({
        ...payload,
        type: name,
        data: payload.data,
      }),
    };
  }
  return {
    type: 'entity',
    name,
    shape: undefined as any,
    ensure: (payload: EntityInsertPayload<any>) => ({
      ...payload,
      type: name,
    }),
  };
}

export type DispatchFn<T extends string> = <TShape = unknown>(
  action: Dispatchable<T, TShape>,
  payload: TShape,
  dispatches?: { id: string; entityId: string }[]
) => string;

export type Transformation<TPlain> = {
  type: 'transformation';
  entity: EntityDefinition<TPlain>;
  run: (
    event: any & {
      dispatch: DispatchFn<'transform'>;
    }
  ) => Promise<void>;
};

export function createTransformation<TPlain>(
  entity: Transformation<TPlain>['entity'],
  run: Transformation<TPlain>['run']
): Transformation<TPlain> {
  return { type: 'transformation', entity, run };
}

export type SerializedModuleType = {
  type: 'module';
  entity: SerializedEntityDefinition;
  extractor?: boolean;
  transformer?: boolean;
};

export type ModuleType<TEntity, TTransform> = {
  type: 'module';
  entity: EntityDefinition<TEntity>;
  extractor?: Extractor;
  transformer?: any;
};

function createModule<TEntity, TTransform>(
  entityDefinition: EntityDefinition<TEntity>,
  optionals?: {
    extractor?: Extractor;
    transformer?: any;
  }
): ModuleType<TEntity, TTransform>;

function createModule<T>(
  name: string,
  extractor: Extractor['run'],
  transformer?: any
): ModuleType<T, any>;

function createModule<T extends Record<string, any>>(
  name: string,
  schema: T,
  extractor: Extractor['run'],
  transformer?: any
): any;

function createModule(
  name: any,
  schema?: any,
  extractor?: any,
  transformer?: any
): ModuleType<any, any> {
  if (typeof name !== 'string') {
    return {
      type: 'module',
      entity: name,
      ...schema,
    };
  } else if (schema && typeof schema === 'object') {
    const entity = createEntityDefinition(name, schema);
    return {
      type: 'module',
      entity,
      extractor: createExtractor(extractor),
      transformer: createTransformation(entity, transformer),
    };
  } else {
    transformer = extractor;

    extractor = schema;

    const entity = createEntityDefinition(name);

    return {
      type: 'module',
      entity: createEntityDefinition(name),
      extractor: createExtractor(extractor),
      transformer: createTransformation(entity, transformer),
    };
  }
}

const property = createModule('property', async ({ dispatch }: Extractor) => {
  dispatch(property.entity, { uniqueRef: '1' });

  return { hasMore: true };
});

console.log(property);
/*
property prints 
{
  type: 'module',
  entity: {
    type: 'entity',
    name: 'property',
    shape: undefined,
    ensure: [Function: ensure]
  },
  extractor: {
    type: 'extractor',
    run: [Function (anonymous)],
    cursor: 'default',
    scope: false
  },
  transformer: {
    type: 'transformation',
    entity: {
      type: 'entity',
      name: 'property',
      shape: undefined,
      ensure: [Function: ensure]
    },
    run: undefined
  }
}

*/