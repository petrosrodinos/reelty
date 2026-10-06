
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model EmailVerificationToken
 * 
 */
export type EmailVerificationToken = $Result.DefaultSelection<Prisma.$EmailVerificationTokenPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>
/**
 * Model Consent
 * 
 */
export type Consent = $Result.DefaultSelection<Prisma.$ConsentPayload>
/**
 * Model JobEvent
 * 
 */
export type JobEvent = $Result.DefaultSelection<Prisma.$JobEventPayload>
/**
 * Model UsageLedger
 * 
 */
export type UsageLedger = $Result.DefaultSelection<Prisma.$UsageLedgerPayload>
/**
 * Model AppConfig
 * 
 */
export type AppConfig = $Result.DefaultSelection<Prisma.$AppConfigPayload>
/**
 * Model SystemFlag
 * 
 */
export type SystemFlag = $Result.DefaultSelection<Prisma.$SystemFlagPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthRole: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPORT: 'SUPPORT'
};

export type AuthRole = (typeof AuthRole)[keyof typeof AuthRole]


export const SourceType: {
  website: 'website',
  airbnb: 'airbnb',
  upload: 'upload'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const ProjectStatus: {
  DRAFT: 'DRAFT',
  FETCHING: 'FETCHING',
  READY: 'READY',
  QUEUED: 'QUEUED',
  CREATING: 'CREATING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const RenderStep: {
  QUEUED: 'QUEUED',
  PREPARING: 'PREPARING',
  GENERATING: 'GENERATING',
  ASSEMBLING: 'ASSEMBLING',
  UPLOADING: 'UPLOADING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  BLOCKED_NO_CREDITS: 'BLOCKED_NO_CREDITS'
};

export type RenderStep = (typeof RenderStep)[keyof typeof RenderStep]


export const WatermarkStatus: {
  none: 'none',
  processing: 'processing',
  done: 'done',
  failed: 'failed'
};

export type WatermarkStatus = (typeof WatermarkStatus)[keyof typeof WatermarkStatus]


export const ClipStatus: {
  none: 'none',
  submitted: 'submitted',
  completed: 'completed',
  failed: 'failed'
};

export type ClipStatus = (typeof ClipStatus)[keyof typeof ClipStatus]


export const RoomType: {
  AUTO: 'AUTO',
  EXTERIOR: 'EXTERIOR',
  LIVING_ROOM: 'LIVING_ROOM',
  KITCHEN: 'KITCHEN',
  BEDROOM: 'BEDROOM',
  BATHROOM: 'BATHROOM',
  TERRACE_VIEW: 'TERRACE_VIEW',
  OTHER: 'OTHER'
};

export type RoomType = (typeof RoomType)[keyof typeof RoomType]


export const ConsentType: {
  rights: 'rights',
  watermark: 'watermark'
};

export type ConsentType = (typeof ConsentType)[keyof typeof ConsentType]


export const LedgerKind: {
  video: 'video',
  video_refund: 'video_refund',
  dewatermark: 'dewatermark',
  scrape: 'scrape',
  higgsfield: 'higgsfield'
};

export type LedgerKind = (typeof LedgerKind)[keyof typeof LedgerKind]

}

export type AuthRole = $Enums.AuthRole

export const AuthRole: typeof $Enums.AuthRole

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type RenderStep = $Enums.RenderStep

export const RenderStep: typeof $Enums.RenderStep

export type WatermarkStatus = $Enums.WatermarkStatus

export const WatermarkStatus: typeof $Enums.WatermarkStatus

export type ClipStatus = $Enums.ClipStatus

export const ClipStatus: typeof $Enums.ClipStatus

export type RoomType = $Enums.RoomType

export const RoomType: typeof $Enums.RoomType

export type ConsentType = $Enums.ConsentType

export const ConsentType: typeof $Enums.ConsentType

export type LedgerKind = $Enums.LedgerKind

export const LedgerKind: typeof $Enums.LedgerKind

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailVerificationToken`: Exposes CRUD operations for the **EmailVerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailVerificationTokens
    * const emailVerificationTokens = await prisma.emailVerificationToken.findMany()
    * ```
    */
  get emailVerificationToken(): Prisma.EmailVerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consent`: Exposes CRUD operations for the **Consent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consents
    * const consents = await prisma.consent.findMany()
    * ```
    */
  get consent(): Prisma.ConsentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobEvent`: Exposes CRUD operations for the **JobEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobEvents
    * const jobEvents = await prisma.jobEvent.findMany()
    * ```
    */
  get jobEvent(): Prisma.JobEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageLedger`: Exposes CRUD operations for the **UsageLedger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageLedgers
    * const usageLedgers = await prisma.usageLedger.findMany()
    * ```
    */
  get usageLedger(): Prisma.UsageLedgerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appConfig`: Exposes CRUD operations for the **AppConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigs
    * const appConfigs = await prisma.appConfig.findMany()
    * ```
    */
  get appConfig(): Prisma.AppConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemFlag`: Exposes CRUD operations for the **SystemFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemFlags
    * const systemFlags = await prisma.systemFlag.findMany()
    * ```
    */
  get systemFlag(): Prisma.SystemFlagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    EmailVerificationToken: 'EmailVerificationToken',
    PasswordResetToken: 'PasswordResetToken',
    Project: 'Project',
    Image: 'Image',
    Consent: 'Consent',
    JobEvent: 'JobEvent',
    UsageLedger: 'UsageLedger',
    AppConfig: 'AppConfig',
    SystemFlag: 'SystemFlag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "emailVerificationToken" | "passwordResetToken" | "project" | "image" | "consent" | "jobEvent" | "usageLedger" | "appConfig" | "systemFlag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      EmailVerificationToken: {
        payload: Prisma.$EmailVerificationTokenPayload<ExtArgs>
        fields: Prisma.EmailVerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailVerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.EmailVerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          findMany: {
            args: Prisma.EmailVerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[]
          }
          create: {
            args: Prisma.EmailVerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          createMany: {
            args: Prisma.EmailVerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailVerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.EmailVerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          update: {
            args: Prisma.EmailVerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.EmailVerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailVerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailVerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.EmailVerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.EmailVerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailVerificationToken>
          }
          groupBy: {
            args: Prisma.EmailVerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailVerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      Consent: {
        payload: Prisma.$ConsentPayload<ExtArgs>
        fields: Prisma.ConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findFirst: {
            args: Prisma.ConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findMany: {
            args: Prisma.ConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          create: {
            args: Prisma.ConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          createMany: {
            args: Prisma.ConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          delete: {
            args: Prisma.ConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          update: {
            args: Prisma.ConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          deleteMany: {
            args: Prisma.ConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          upsert: {
            args: Prisma.ConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          aggregate: {
            args: Prisma.ConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsent>
          }
          groupBy: {
            args: Prisma.ConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsentCountArgs<ExtArgs>
            result: $Utils.Optional<ConsentCountAggregateOutputType> | number
          }
        }
      }
      JobEvent: {
        payload: Prisma.$JobEventPayload<ExtArgs>
        fields: Prisma.JobEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          findFirst: {
            args: Prisma.JobEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          findMany: {
            args: Prisma.JobEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>[]
          }
          create: {
            args: Prisma.JobEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          createMany: {
            args: Prisma.JobEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>[]
          }
          delete: {
            args: Prisma.JobEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          update: {
            args: Prisma.JobEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          deleteMany: {
            args: Prisma.JobEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>[]
          }
          upsert: {
            args: Prisma.JobEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEventPayload>
          }
          aggregate: {
            args: Prisma.JobEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobEvent>
          }
          groupBy: {
            args: Prisma.JobEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobEventCountArgs<ExtArgs>
            result: $Utils.Optional<JobEventCountAggregateOutputType> | number
          }
        }
      }
      UsageLedger: {
        payload: Prisma.$UsageLedgerPayload<ExtArgs>
        fields: Prisma.UsageLedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageLedgerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageLedgerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          findFirst: {
            args: Prisma.UsageLedgerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageLedgerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          findMany: {
            args: Prisma.UsageLedgerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>[]
          }
          create: {
            args: Prisma.UsageLedgerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          createMany: {
            args: Prisma.UsageLedgerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageLedgerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>[]
          }
          delete: {
            args: Prisma.UsageLedgerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          update: {
            args: Prisma.UsageLedgerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          deleteMany: {
            args: Prisma.UsageLedgerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageLedgerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageLedgerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>[]
          }
          upsert: {
            args: Prisma.UsageLedgerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLedgerPayload>
          }
          aggregate: {
            args: Prisma.UsageLedgerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageLedger>
          }
          groupBy: {
            args: Prisma.UsageLedgerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageLedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageLedgerCountArgs<ExtArgs>
            result: $Utils.Optional<UsageLedgerCountAggregateOutputType> | number
          }
        }
      }
      AppConfig: {
        payload: Prisma.$AppConfigPayload<ExtArgs>
        fields: Prisma.AppConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findFirst: {
            args: Prisma.AppConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findMany: {
            args: Prisma.AppConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          create: {
            args: Prisma.AppConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          createMany: {
            args: Prisma.AppConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          delete: {
            args: Prisma.AppConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          update: {
            args: Prisma.AppConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          deleteMany: {
            args: Prisma.AppConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          upsert: {
            args: Prisma.AppConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfig>
          }
          groupBy: {
            args: Prisma.AppConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigCountAggregateOutputType> | number
          }
        }
      }
      SystemFlag: {
        payload: Prisma.$SystemFlagPayload<ExtArgs>
        fields: Prisma.SystemFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          findFirst: {
            args: Prisma.SystemFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          findMany: {
            args: Prisma.SystemFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>[]
          }
          create: {
            args: Prisma.SystemFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          createMany: {
            args: Prisma.SystemFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>[]
          }
          delete: {
            args: Prisma.SystemFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          update: {
            args: Prisma.SystemFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          deleteMany: {
            args: Prisma.SystemFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemFlagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>[]
          }
          upsert: {
            args: Prisma.SystemFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemFlagPayload>
          }
          aggregate: {
            args: Prisma.SystemFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemFlag>
          }
          groupBy: {
            args: Prisma.SystemFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemFlagCountArgs<ExtArgs>
            result: $Utils.Optional<SystemFlagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    emailVerificationToken?: EmailVerificationTokenOmit
    passwordResetToken?: PasswordResetTokenOmit
    project?: ProjectOmit
    image?: ImageOmit
    consent?: ConsentOmit
    jobEvent?: JobEventOmit
    usageLedger?: UsageLedgerOmit
    appConfig?: AppConfigOmit
    systemFlag?: SystemFlagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refresh_tokens: number
    password_reset_tokens: number
    email_verification_tokens: number
    projects: number
    consents: number
    usage_ledger: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refresh_tokens?: boolean | UserCountOutputTypeCountRefresh_tokensArgs
    password_reset_tokens?: boolean | UserCountOutputTypeCountPassword_reset_tokensArgs
    email_verification_tokens?: boolean | UserCountOutputTypeCountEmail_verification_tokensArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    consents?: boolean | UserCountOutputTypeCountConsentsArgs
    usage_ledger?: boolean | UserCountOutputTypeCountUsage_ledgerArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPassword_reset_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmail_verification_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsage_ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLedgerWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    images: number
    consents: number
    job_events: number
    usage_ledger: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProjectCountOutputTypeCountImagesArgs
    consents?: boolean | ProjectCountOutputTypeCountConsentsArgs
    job_events?: boolean | ProjectCountOutputTypeCountJob_eventsArgs
    usage_ledger?: boolean | ProjectCountOutputTypeCountUsage_ledgerArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountJob_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobEventWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountUsage_ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLedgerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    monthly_video_quota: number | null
  }

  export type UserSumAggregateOutputType = {
    monthly_video_quota: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.AuthRole | null
    email_verified_at: Date | null
    monthly_video_quota: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.AuthRole | null
    email_verified_at: Date | null
    monthly_video_quota: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    role: number
    email_verified_at: number
    monthly_video_quota: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    monthly_video_quota?: true
  }

  export type UserSumAggregateInputType = {
    monthly_video_quota?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    role?: true
    email_verified_at?: true
    monthly_video_quota?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    role?: true
    email_verified_at?: true
    monthly_video_quota?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    role?: true
    email_verified_at?: true
    monthly_video_quota?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password_hash: string
    role: $Enums.AuthRole
    email_verified_at: Date | null
    monthly_video_quota: number
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    email_verified_at?: boolean
    monthly_video_quota?: boolean
    created_at?: boolean
    updated_at?: boolean
    refresh_tokens?: boolean | User$refresh_tokensArgs<ExtArgs>
    password_reset_tokens?: boolean | User$password_reset_tokensArgs<ExtArgs>
    email_verification_tokens?: boolean | User$email_verification_tokensArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    consents?: boolean | User$consentsArgs<ExtArgs>
    usage_ledger?: boolean | User$usage_ledgerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    email_verified_at?: boolean
    monthly_video_quota?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    email_verified_at?: boolean
    monthly_video_quota?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    email_verified_at?: boolean
    monthly_video_quota?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password_hash" | "role" | "email_verified_at" | "monthly_video_quota" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refresh_tokens?: boolean | User$refresh_tokensArgs<ExtArgs>
    password_reset_tokens?: boolean | User$password_reset_tokensArgs<ExtArgs>
    email_verification_tokens?: boolean | User$email_verification_tokensArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    consents?: boolean | User$consentsArgs<ExtArgs>
    usage_ledger?: boolean | User$usage_ledgerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refresh_tokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      password_reset_tokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
      email_verification_tokens: Prisma.$EmailVerificationTokenPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      consents: Prisma.$ConsentPayload<ExtArgs>[]
      usage_ledger: Prisma.$UsageLedgerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password_hash: string
      role: $Enums.AuthRole
      email_verified_at: Date | null
      monthly_video_quota: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refresh_tokens<T extends User$refresh_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refresh_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    password_reset_tokens<T extends User$password_reset_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$password_reset_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    email_verification_tokens<T extends User$email_verification_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$email_verification_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consents<T extends User$consentsArgs<ExtArgs> = {}>(args?: Subset<T, User$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usage_ledger<T extends User$usage_ledgerArgs<ExtArgs> = {}>(args?: Subset<T, User$usage_ledgerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'AuthRole'>
    readonly email_verified_at: FieldRef<"User", 'DateTime'>
    readonly monthly_video_quota: FieldRef<"User", 'Int'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.refresh_tokens
   */
  export type User$refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.password_reset_tokens
   */
  export type User$password_reset_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * User.email_verification_tokens
   */
  export type User$email_verification_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    where?: EmailVerificationTokenWhereInput
    orderBy?: EmailVerificationTokenOrderByWithRelationInput | EmailVerificationTokenOrderByWithRelationInput[]
    cursor?: EmailVerificationTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailVerificationTokenScalarFieldEnum | EmailVerificationTokenScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.consents
   */
  export type User$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * User.usage_ledger
   */
  export type User$usage_ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    where?: UsageLedgerWhereInput
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    cursor?: UsageLedgerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLedgerScalarFieldEnum | UsageLedgerScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    family_id: string | null
    expires_at: Date | null
    revoked_at: Date | null
    user_agent: string | null
    ip: string | null
    created_at: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    family_id: string | null
    expires_at: Date | null
    revoked_at: Date | null
    user_agent: string | null
    ip: string | null
    created_at: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    user_id: number
    token_hash: number
    family_id: number
    expires_at: number
    revoked_at: number
    user_agent: number
    ip: number
    created_at: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    family_id?: true
    expires_at?: true
    revoked_at?: true
    user_agent?: true
    ip?: true
    created_at?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    family_id?: true
    expires_at?: true
    revoked_at?: true
    user_agent?: true
    ip?: true
    created_at?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    family_id?: true
    expires_at?: true
    revoked_at?: true
    user_agent?: true
    ip?: true
    created_at?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    user_id: string
    token_hash: string
    family_id: string
    expires_at: Date
    revoked_at: Date | null
    user_agent: string | null
    ip: string | null
    created_at: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    family_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    family_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    family_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    family_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token_hash" | "family_id" | "expires_at" | "revoked_at" | "user_agent" | "ip" | "created_at", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token_hash: string
      family_id: string
      expires_at: Date
      revoked_at: Date | null
      user_agent: string | null
      ip: string | null
      created_at: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly user_id: FieldRef<"RefreshToken", 'String'>
    readonly token_hash: FieldRef<"RefreshToken", 'String'>
    readonly family_id: FieldRef<"RefreshToken", 'String'>
    readonly expires_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly revoked_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly user_agent: FieldRef<"RefreshToken", 'String'>
    readonly ip: FieldRef<"RefreshToken", 'String'>
    readonly created_at: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model EmailVerificationToken
   */

  export type AggregateEmailVerificationToken = {
    _count: EmailVerificationTokenCountAggregateOutputType | null
    _min: EmailVerificationTokenMinAggregateOutputType | null
    _max: EmailVerificationTokenMaxAggregateOutputType | null
  }

  export type EmailVerificationTokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type EmailVerificationTokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type EmailVerificationTokenCountAggregateOutputType = {
    id: number
    user_id: number
    token_hash: number
    expires_at: number
    used_at: number
    created_at: number
    _all: number
  }


  export type EmailVerificationTokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type EmailVerificationTokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type EmailVerificationTokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
    _all?: true
  }

  export type EmailVerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerificationToken to aggregate.
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokenOrderByWithRelationInput | EmailVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailVerificationTokens
    **/
    _count?: true | EmailVerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailVerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailVerificationTokenMaxAggregateInputType
  }

  export type GetEmailVerificationTokenAggregateType<T extends EmailVerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailVerificationToken[P]>
      : GetScalarType<T[P], AggregateEmailVerificationToken[P]>
  }




  export type EmailVerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationTokenWhereInput
    orderBy?: EmailVerificationTokenOrderByWithAggregationInput | EmailVerificationTokenOrderByWithAggregationInput[]
    by: EmailVerificationTokenScalarFieldEnum[] | EmailVerificationTokenScalarFieldEnum
    having?: EmailVerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailVerificationTokenCountAggregateInputType | true
    _min?: EmailVerificationTokenMinAggregateInputType
    _max?: EmailVerificationTokenMaxAggregateInputType
  }

  export type EmailVerificationTokenGroupByOutputType = {
    id: string
    user_id: string
    token_hash: string
    expires_at: Date
    used_at: Date | null
    created_at: Date
    _count: EmailVerificationTokenCountAggregateOutputType | null
    _min: EmailVerificationTokenMinAggregateOutputType | null
    _max: EmailVerificationTokenMaxAggregateOutputType | null
  }

  type GetEmailVerificationTokenGroupByPayload<T extends EmailVerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailVerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailVerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailVerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], EmailVerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type EmailVerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationToken"]>

  export type EmailVerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationToken"]>

  export type EmailVerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationToken"]>

  export type EmailVerificationTokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
  }

  export type EmailVerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token_hash" | "expires_at" | "used_at" | "created_at", ExtArgs["result"]["emailVerificationToken"]>
  export type EmailVerificationTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailVerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailVerificationToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token_hash: string
      expires_at: Date
      used_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["emailVerificationToken"]>
    composites: {}
  }

  type EmailVerificationTokenGetPayload<S extends boolean | null | undefined | EmailVerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$EmailVerificationTokenPayload, S>

  type EmailVerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailVerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailVerificationTokenCountAggregateInputType | true
    }

  export interface EmailVerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailVerificationToken'], meta: { name: 'EmailVerificationToken' } }
    /**
     * Find zero or one EmailVerificationToken that matches the filter.
     * @param {EmailVerificationTokenFindUniqueArgs} args - Arguments to find a EmailVerificationToken
     * @example
     * // Get one EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailVerificationTokenFindUniqueArgs>(args: SelectSubset<T, EmailVerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailVerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailVerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a EmailVerificationToken
     * @example
     * // Get one EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailVerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenFindFirstArgs} args - Arguments to find a EmailVerificationToken
     * @example
     * // Get one EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailVerificationTokenFindFirstArgs>(args?: SelectSubset<T, EmailVerificationTokenFindFirstArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenFindFirstOrThrowArgs} args - Arguments to find a EmailVerificationToken
     * @example
     * // Get one EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailVerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailVerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationToken.findMany()
     * 
     * // Get first 10 EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailVerificationTokenWithIdOnly = await prisma.emailVerificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailVerificationTokenFindManyArgs>(args?: SelectSubset<T, EmailVerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailVerificationToken.
     * @param {EmailVerificationTokenCreateArgs} args - Arguments to create a EmailVerificationToken.
     * @example
     * // Create one EmailVerificationToken
     * const EmailVerificationToken = await prisma.emailVerificationToken.create({
     *   data: {
     *     // ... data to create a EmailVerificationToken
     *   }
     * })
     * 
     */
    create<T extends EmailVerificationTokenCreateArgs>(args: SelectSubset<T, EmailVerificationTokenCreateArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailVerificationTokens.
     * @param {EmailVerificationTokenCreateManyArgs} args - Arguments to create many EmailVerificationTokens.
     * @example
     * // Create many EmailVerificationTokens
     * const emailVerificationToken = await prisma.emailVerificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailVerificationTokenCreateManyArgs>(args?: SelectSubset<T, EmailVerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailVerificationTokens and returns the data saved in the database.
     * @param {EmailVerificationTokenCreateManyAndReturnArgs} args - Arguments to create many EmailVerificationTokens.
     * @example
     * // Create many EmailVerificationTokens
     * const emailVerificationToken = await prisma.emailVerificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailVerificationTokens and only return the `id`
     * const emailVerificationTokenWithIdOnly = await prisma.emailVerificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailVerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailVerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailVerificationToken.
     * @param {EmailVerificationTokenDeleteArgs} args - Arguments to delete one EmailVerificationToken.
     * @example
     * // Delete one EmailVerificationToken
     * const EmailVerificationToken = await prisma.emailVerificationToken.delete({
     *   where: {
     *     // ... filter to delete one EmailVerificationToken
     *   }
     * })
     * 
     */
    delete<T extends EmailVerificationTokenDeleteArgs>(args: SelectSubset<T, EmailVerificationTokenDeleteArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailVerificationToken.
     * @param {EmailVerificationTokenUpdateArgs} args - Arguments to update one EmailVerificationToken.
     * @example
     * // Update one EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailVerificationTokenUpdateArgs>(args: SelectSubset<T, EmailVerificationTokenUpdateArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailVerificationTokens.
     * @param {EmailVerificationTokenDeleteManyArgs} args - Arguments to filter EmailVerificationTokens to delete.
     * @example
     * // Delete a few EmailVerificationTokens
     * const { count } = await prisma.emailVerificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailVerificationTokenDeleteManyArgs>(args?: SelectSubset<T, EmailVerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailVerificationTokens
     * const emailVerificationToken = await prisma.emailVerificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailVerificationTokenUpdateManyArgs>(args: SelectSubset<T, EmailVerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerificationTokens and returns the data updated in the database.
     * @param {EmailVerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many EmailVerificationTokens.
     * @example
     * // Update many EmailVerificationTokens
     * const emailVerificationToken = await prisma.emailVerificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailVerificationTokens and only return the `id`
     * const emailVerificationTokenWithIdOnly = await prisma.emailVerificationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailVerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailVerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailVerificationToken.
     * @param {EmailVerificationTokenUpsertArgs} args - Arguments to update or create a EmailVerificationToken.
     * @example
     * // Update or create a EmailVerificationToken
     * const emailVerificationToken = await prisma.emailVerificationToken.upsert({
     *   create: {
     *     // ... data to create a EmailVerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailVerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends EmailVerificationTokenUpsertArgs>(args: SelectSubset<T, EmailVerificationTokenUpsertArgs<ExtArgs>>): Prisma__EmailVerificationTokenClient<$Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenCountArgs} args - Arguments to filter EmailVerificationTokens to count.
     * @example
     * // Count the number of EmailVerificationTokens
     * const count = await prisma.emailVerificationToken.count({
     *   where: {
     *     // ... the filter for the EmailVerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends EmailVerificationTokenCountArgs>(
      args?: Subset<T, EmailVerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailVerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailVerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailVerificationTokenAggregateArgs>(args: Subset<T, EmailVerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetEmailVerificationTokenAggregateType<T>>

    /**
     * Group by EmailVerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailVerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailVerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: EmailVerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailVerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailVerificationToken model
   */
  readonly fields: EmailVerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailVerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailVerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailVerificationToken model
   */
  interface EmailVerificationTokenFieldRefs {
    readonly id: FieldRef<"EmailVerificationToken", 'String'>
    readonly user_id: FieldRef<"EmailVerificationToken", 'String'>
    readonly token_hash: FieldRef<"EmailVerificationToken", 'String'>
    readonly expires_at: FieldRef<"EmailVerificationToken", 'DateTime'>
    readonly used_at: FieldRef<"EmailVerificationToken", 'DateTime'>
    readonly created_at: FieldRef<"EmailVerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailVerificationToken findUnique
   */
  export type EmailVerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationToken to fetch.
     */
    where: EmailVerificationTokenWhereUniqueInput
  }

  /**
   * EmailVerificationToken findUniqueOrThrow
   */
  export type EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationToken to fetch.
     */
    where: EmailVerificationTokenWhereUniqueInput
  }

  /**
   * EmailVerificationToken findFirst
   */
  export type EmailVerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationToken to fetch.
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokenOrderByWithRelationInput | EmailVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerificationTokens.
     */
    distinct?: EmailVerificationTokenScalarFieldEnum | EmailVerificationTokenScalarFieldEnum[]
  }

  /**
   * EmailVerificationToken findFirstOrThrow
   */
  export type EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationToken to fetch.
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokenOrderByWithRelationInput | EmailVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerificationTokens.
     */
    distinct?: EmailVerificationTokenScalarFieldEnum | EmailVerificationTokenScalarFieldEnum[]
  }

  /**
   * EmailVerificationToken findMany
   */
  export type EmailVerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokenOrderByWithRelationInput | EmailVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    distinct?: EmailVerificationTokenScalarFieldEnum | EmailVerificationTokenScalarFieldEnum[]
  }

  /**
   * EmailVerificationToken create
   */
  export type EmailVerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailVerificationToken.
     */
    data: XOR<EmailVerificationTokenCreateInput, EmailVerificationTokenUncheckedCreateInput>
  }

  /**
   * EmailVerificationToken createMany
   */
  export type EmailVerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailVerificationTokens.
     */
    data: EmailVerificationTokenCreateManyInput | EmailVerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailVerificationToken createManyAndReturn
   */
  export type EmailVerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many EmailVerificationTokens.
     */
    data: EmailVerificationTokenCreateManyInput | EmailVerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerificationToken update
   */
  export type EmailVerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailVerificationToken.
     */
    data: XOR<EmailVerificationTokenUpdateInput, EmailVerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which EmailVerificationToken to update.
     */
    where: EmailVerificationTokenWhereUniqueInput
  }

  /**
   * EmailVerificationToken updateMany
   */
  export type EmailVerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokenUpdateManyMutationInput, EmailVerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerificationTokens to update
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * Limit how many EmailVerificationTokens to update.
     */
    limit?: number
  }

  /**
   * EmailVerificationToken updateManyAndReturn
   */
  export type EmailVerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokenUpdateManyMutationInput, EmailVerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerificationTokens to update
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * Limit how many EmailVerificationTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerificationToken upsert
   */
  export type EmailVerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailVerificationToken to update in case it exists.
     */
    where: EmailVerificationTokenWhereUniqueInput
    /**
     * In case the EmailVerificationToken found by the `where` argument doesn't exist, create a new EmailVerificationToken with this data.
     */
    create: XOR<EmailVerificationTokenCreateInput, EmailVerificationTokenUncheckedCreateInput>
    /**
     * In case the EmailVerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailVerificationTokenUpdateInput, EmailVerificationTokenUncheckedUpdateInput>
  }

  /**
   * EmailVerificationToken delete
   */
  export type EmailVerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter which EmailVerificationToken to delete.
     */
    where: EmailVerificationTokenWhereUniqueInput
  }

  /**
   * EmailVerificationToken deleteMany
   */
  export type EmailVerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerificationTokens to delete
     */
    where?: EmailVerificationTokenWhereInput
    /**
     * Limit how many EmailVerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * EmailVerificationToken without action
   */
  export type EmailVerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: EmailVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: EmailVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokenInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    user_id: number
    token_hash: number
    expires_at: number
    used_at: number
    created_at: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    expires_at?: true
    used_at?: true
    created_at?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    user_id: string
    token_hash: string
    expires_at: Date
    used_at: Date | null
    created_at: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token_hash" | "expires_at" | "used_at" | "created_at", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token_hash: string
      expires_at: Date
      used_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly user_id: FieldRef<"PasswordResetToken", 'String'>
    readonly token_hash: FieldRef<"PasswordResetToken", 'String'>
    readonly expires_at: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly used_at: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly created_at: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    duration_seconds: number | null
    clips_total: number | null
    clips_done: number | null
  }

  export type ProjectSumAggregateOutputType = {
    duration_seconds: number | null
    clips_total: number | null
    clips_done: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    source_type: $Enums.SourceType | null
    source_url: string | null
    status: $Enums.ProjectStatus | null
    render_step: $Enums.RenderStep | null
    partial: boolean | null
    failure_reason: string | null
    failure_code: string | null
    scrape_error: string | null
    title: string | null
    subtitle: string | null
    location_line: string | null
    closing_line: string | null
    music_enabled: boolean | null
    rights_attested_at: Date | null
    submitted_at: Date | null
    completed_at: Date | null
    render_started_at: Date | null
    quota_charged: boolean | null
    video_gcs_path: string | null
    poster_gcs_path: string | null
    duration_seconds: number | null
    clips_total: number | null
    clips_done: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    source_type: $Enums.SourceType | null
    source_url: string | null
    status: $Enums.ProjectStatus | null
    render_step: $Enums.RenderStep | null
    partial: boolean | null
    failure_reason: string | null
    failure_code: string | null
    scrape_error: string | null
    title: string | null
    subtitle: string | null
    location_line: string | null
    closing_line: string | null
    music_enabled: boolean | null
    rights_attested_at: Date | null
    submitted_at: Date | null
    completed_at: Date | null
    render_started_at: Date | null
    quota_charged: boolean | null
    video_gcs_path: string | null
    poster_gcs_path: string | null
    duration_seconds: number | null
    clips_total: number | null
    clips_done: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    user_id: number
    source_type: number
    source_url: number
    status: number
    render_step: number
    partial: number
    failure_reason: number
    failure_code: number
    scrape_error: number
    title: number
    subtitle: number
    location_line: number
    closing_line: number
    music_enabled: number
    rights_attested_at: number
    submitted_at: number
    completed_at: number
    render_started_at: number
    quota_charged: number
    video_gcs_path: number
    poster_gcs_path: number
    duration_seconds: number
    clips_total: number
    clips_done: number
    skipped_image_ids: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    duration_seconds?: true
    clips_total?: true
    clips_done?: true
  }

  export type ProjectSumAggregateInputType = {
    duration_seconds?: true
    clips_total?: true
    clips_done?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    user_id?: true
    source_type?: true
    source_url?: true
    status?: true
    render_step?: true
    partial?: true
    failure_reason?: true
    failure_code?: true
    scrape_error?: true
    title?: true
    subtitle?: true
    location_line?: true
    closing_line?: true
    music_enabled?: true
    rights_attested_at?: true
    submitted_at?: true
    completed_at?: true
    render_started_at?: true
    quota_charged?: true
    video_gcs_path?: true
    poster_gcs_path?: true
    duration_seconds?: true
    clips_total?: true
    clips_done?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    user_id?: true
    source_type?: true
    source_url?: true
    status?: true
    render_step?: true
    partial?: true
    failure_reason?: true
    failure_code?: true
    scrape_error?: true
    title?: true
    subtitle?: true
    location_line?: true
    closing_line?: true
    music_enabled?: true
    rights_attested_at?: true
    submitted_at?: true
    completed_at?: true
    render_started_at?: true
    quota_charged?: true
    video_gcs_path?: true
    poster_gcs_path?: true
    duration_seconds?: true
    clips_total?: true
    clips_done?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    user_id?: true
    source_type?: true
    source_url?: true
    status?: true
    render_step?: true
    partial?: true
    failure_reason?: true
    failure_code?: true
    scrape_error?: true
    title?: true
    subtitle?: true
    location_line?: true
    closing_line?: true
    music_enabled?: true
    rights_attested_at?: true
    submitted_at?: true
    completed_at?: true
    render_started_at?: true
    quota_charged?: true
    video_gcs_path?: true
    poster_gcs_path?: true
    duration_seconds?: true
    clips_total?: true
    clips_done?: true
    skipped_image_ids?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    user_id: string
    source_type: $Enums.SourceType
    source_url: string | null
    status: $Enums.ProjectStatus
    render_step: $Enums.RenderStep | null
    partial: boolean
    failure_reason: string | null
    failure_code: string | null
    scrape_error: string | null
    title: string
    subtitle: string | null
    location_line: string | null
    closing_line: string | null
    music_enabled: boolean
    rights_attested_at: Date | null
    submitted_at: Date | null
    completed_at: Date | null
    render_started_at: Date | null
    quota_charged: boolean
    video_gcs_path: string | null
    poster_gcs_path: string | null
    duration_seconds: number | null
    clips_total: number
    clips_done: number
    skipped_image_ids: string[]
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source_type?: boolean
    source_url?: boolean
    status?: boolean
    render_step?: boolean
    partial?: boolean
    failure_reason?: boolean
    failure_code?: boolean
    scrape_error?: boolean
    title?: boolean
    subtitle?: boolean
    location_line?: boolean
    closing_line?: boolean
    music_enabled?: boolean
    rights_attested_at?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    render_started_at?: boolean
    quota_charged?: boolean
    video_gcs_path?: boolean
    poster_gcs_path?: boolean
    duration_seconds?: boolean
    clips_total?: boolean
    clips_done?: boolean
    skipped_image_ids?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    images?: boolean | Project$imagesArgs<ExtArgs>
    consents?: boolean | Project$consentsArgs<ExtArgs>
    job_events?: boolean | Project$job_eventsArgs<ExtArgs>
    usage_ledger?: boolean | Project$usage_ledgerArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source_type?: boolean
    source_url?: boolean
    status?: boolean
    render_step?: boolean
    partial?: boolean
    failure_reason?: boolean
    failure_code?: boolean
    scrape_error?: boolean
    title?: boolean
    subtitle?: boolean
    location_line?: boolean
    closing_line?: boolean
    music_enabled?: boolean
    rights_attested_at?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    render_started_at?: boolean
    quota_charged?: boolean
    video_gcs_path?: boolean
    poster_gcs_path?: boolean
    duration_seconds?: boolean
    clips_total?: boolean
    clips_done?: boolean
    skipped_image_ids?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source_type?: boolean
    source_url?: boolean
    status?: boolean
    render_step?: boolean
    partial?: boolean
    failure_reason?: boolean
    failure_code?: boolean
    scrape_error?: boolean
    title?: boolean
    subtitle?: boolean
    location_line?: boolean
    closing_line?: boolean
    music_enabled?: boolean
    rights_attested_at?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    render_started_at?: boolean
    quota_charged?: boolean
    video_gcs_path?: boolean
    poster_gcs_path?: boolean
    duration_seconds?: boolean
    clips_total?: boolean
    clips_done?: boolean
    skipped_image_ids?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    user_id?: boolean
    source_type?: boolean
    source_url?: boolean
    status?: boolean
    render_step?: boolean
    partial?: boolean
    failure_reason?: boolean
    failure_code?: boolean
    scrape_error?: boolean
    title?: boolean
    subtitle?: boolean
    location_line?: boolean
    closing_line?: boolean
    music_enabled?: boolean
    rights_attested_at?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    render_started_at?: boolean
    quota_charged?: boolean
    video_gcs_path?: boolean
    poster_gcs_path?: boolean
    duration_seconds?: boolean
    clips_total?: boolean
    clips_done?: boolean
    skipped_image_ids?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "source_type" | "source_url" | "status" | "render_step" | "partial" | "failure_reason" | "failure_code" | "scrape_error" | "title" | "subtitle" | "location_line" | "closing_line" | "music_enabled" | "rights_attested_at" | "submitted_at" | "completed_at" | "render_started_at" | "quota_charged" | "video_gcs_path" | "poster_gcs_path" | "duration_seconds" | "clips_total" | "clips_done" | "skipped_image_ids" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    images?: boolean | Project$imagesArgs<ExtArgs>
    consents?: boolean | Project$consentsArgs<ExtArgs>
    job_events?: boolean | Project$job_eventsArgs<ExtArgs>
    usage_ledger?: boolean | Project$usage_ledgerArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      images: Prisma.$ImagePayload<ExtArgs>[]
      consents: Prisma.$ConsentPayload<ExtArgs>[]
      job_events: Prisma.$JobEventPayload<ExtArgs>[]
      usage_ledger: Prisma.$UsageLedgerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      source_type: $Enums.SourceType
      source_url: string | null
      status: $Enums.ProjectStatus
      render_step: $Enums.RenderStep | null
      partial: boolean
      failure_reason: string | null
      failure_code: string | null
      scrape_error: string | null
      title: string
      subtitle: string | null
      location_line: string | null
      closing_line: string | null
      music_enabled: boolean
      rights_attested_at: Date | null
      submitted_at: Date | null
      completed_at: Date | null
      render_started_at: Date | null
      quota_charged: boolean
      video_gcs_path: string | null
      poster_gcs_path: string | null
      duration_seconds: number | null
      clips_total: number
      clips_done: number
      skipped_image_ids: string[]
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Project$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consents<T extends Project$consentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    job_events<T extends Project$job_eventsArgs<ExtArgs> = {}>(args?: Subset<T, Project$job_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usage_ledger<T extends Project$usage_ledgerArgs<ExtArgs> = {}>(args?: Subset<T, Project$usage_ledgerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly user_id: FieldRef<"Project", 'String'>
    readonly source_type: FieldRef<"Project", 'SourceType'>
    readonly source_url: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly render_step: FieldRef<"Project", 'RenderStep'>
    readonly partial: FieldRef<"Project", 'Boolean'>
    readonly failure_reason: FieldRef<"Project", 'String'>
    readonly failure_code: FieldRef<"Project", 'String'>
    readonly scrape_error: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly subtitle: FieldRef<"Project", 'String'>
    readonly location_line: FieldRef<"Project", 'String'>
    readonly closing_line: FieldRef<"Project", 'String'>
    readonly music_enabled: FieldRef<"Project", 'Boolean'>
    readonly rights_attested_at: FieldRef<"Project", 'DateTime'>
    readonly submitted_at: FieldRef<"Project", 'DateTime'>
    readonly completed_at: FieldRef<"Project", 'DateTime'>
    readonly render_started_at: FieldRef<"Project", 'DateTime'>
    readonly quota_charged: FieldRef<"Project", 'Boolean'>
    readonly video_gcs_path: FieldRef<"Project", 'String'>
    readonly poster_gcs_path: FieldRef<"Project", 'String'>
    readonly duration_seconds: FieldRef<"Project", 'Float'>
    readonly clips_total: FieldRef<"Project", 'Int'>
    readonly clips_done: FieldRef<"Project", 'Int'>
    readonly skipped_image_ids: FieldRef<"Project", 'String[]'>
    readonly created_at: FieldRef<"Project", 'DateTime'>
    readonly updated_at: FieldRef<"Project", 'DateTime'>
    readonly deleted_at: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.images
   */
  export type Project$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Project.consents
   */
  export type Project$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Project.job_events
   */
  export type Project$job_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    where?: JobEventWhereInput
    orderBy?: JobEventOrderByWithRelationInput | JobEventOrderByWithRelationInput[]
    cursor?: JobEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobEventScalarFieldEnum | JobEventScalarFieldEnum[]
  }

  /**
   * Project.usage_ledger
   */
  export type Project$usage_ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    where?: UsageLedgerWhereInput
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    cursor?: UsageLedgerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLedgerScalarFieldEnum | UsageLedgerScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageAvgAggregateOutputType = {
    position: number | null
    width: number | null
    height: number | null
    bytes: number | null
    wm_attempts: number | null
  }

  export type ImageSumAggregateOutputType = {
    position: number | null
    width: number | null
    height: number | null
    bytes: number | null
    wm_attempts: number | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    project_id: string | null
    position: number | null
    gcs_original_path: string | null
    gcs_processed_path: string | null
    gcs_thumb_path: string | null
    width: number | null
    height: number | null
    bytes: number | null
    content_hash: string | null
    source_url: string | null
    room_type: $Enums.RoomType | null
    use_processed: boolean | null
    wm_status: $Enums.WatermarkStatus | null
    wm_attempts: number | null
    removed: boolean | null
    ready: boolean | null
    higgsfield_media_id: string | null
    clip_job_id: string | null
    clip_status: $Enums.ClipStatus | null
    clip_result_url: string | null
    clip_gcs_path: string | null
    created_at: Date | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    project_id: string | null
    position: number | null
    gcs_original_path: string | null
    gcs_processed_path: string | null
    gcs_thumb_path: string | null
    width: number | null
    height: number | null
    bytes: number | null
    content_hash: string | null
    source_url: string | null
    room_type: $Enums.RoomType | null
    use_processed: boolean | null
    wm_status: $Enums.WatermarkStatus | null
    wm_attempts: number | null
    removed: boolean | null
    ready: boolean | null
    higgsfield_media_id: string | null
    clip_job_id: string | null
    clip_status: $Enums.ClipStatus | null
    clip_result_url: string | null
    clip_gcs_path: string | null
    created_at: Date | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    project_id: number
    position: number
    gcs_original_path: number
    gcs_processed_path: number
    gcs_thumb_path: number
    width: number
    height: number
    bytes: number
    content_hash: number
    source_url: number
    room_type: number
    use_processed: number
    wm_status: number
    wm_attempts: number
    removed: number
    ready: number
    higgsfield_media_id: number
    clip_job_id: number
    clip_status: number
    clip_result_url: number
    clip_gcs_path: number
    created_at: number
    _all: number
  }


  export type ImageAvgAggregateInputType = {
    position?: true
    width?: true
    height?: true
    bytes?: true
    wm_attempts?: true
  }

  export type ImageSumAggregateInputType = {
    position?: true
    width?: true
    height?: true
    bytes?: true
    wm_attempts?: true
  }

  export type ImageMinAggregateInputType = {
    id?: true
    project_id?: true
    position?: true
    gcs_original_path?: true
    gcs_processed_path?: true
    gcs_thumb_path?: true
    width?: true
    height?: true
    bytes?: true
    content_hash?: true
    source_url?: true
    room_type?: true
    use_processed?: true
    wm_status?: true
    wm_attempts?: true
    removed?: true
    ready?: true
    higgsfield_media_id?: true
    clip_job_id?: true
    clip_status?: true
    clip_result_url?: true
    clip_gcs_path?: true
    created_at?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    project_id?: true
    position?: true
    gcs_original_path?: true
    gcs_processed_path?: true
    gcs_thumb_path?: true
    width?: true
    height?: true
    bytes?: true
    content_hash?: true
    source_url?: true
    room_type?: true
    use_processed?: true
    wm_status?: true
    wm_attempts?: true
    removed?: true
    ready?: true
    higgsfield_media_id?: true
    clip_job_id?: true
    clip_status?: true
    clip_result_url?: true
    clip_gcs_path?: true
    created_at?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    project_id?: true
    position?: true
    gcs_original_path?: true
    gcs_processed_path?: true
    gcs_thumb_path?: true
    width?: true
    height?: true
    bytes?: true
    content_hash?: true
    source_url?: true
    room_type?: true
    use_processed?: true
    wm_status?: true
    wm_attempts?: true
    removed?: true
    ready?: true
    higgsfield_media_id?: true
    clip_job_id?: true
    clip_status?: true
    clip_result_url?: true
    clip_gcs_path?: true
    created_at?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _avg?: ImageAvgAggregateInputType
    _sum?: ImageSumAggregateInputType
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    project_id: string
    position: number
    gcs_original_path: string | null
    gcs_processed_path: string | null
    gcs_thumb_path: string | null
    width: number | null
    height: number | null
    bytes: number | null
    content_hash: string | null
    source_url: string | null
    room_type: $Enums.RoomType
    use_processed: boolean
    wm_status: $Enums.WatermarkStatus
    wm_attempts: number
    removed: boolean
    ready: boolean
    higgsfield_media_id: string | null
    clip_job_id: string | null
    clip_status: $Enums.ClipStatus
    clip_result_url: string | null
    clip_gcs_path: string | null
    created_at: Date
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    position?: boolean
    gcs_original_path?: boolean
    gcs_processed_path?: boolean
    gcs_thumb_path?: boolean
    width?: boolean
    height?: boolean
    bytes?: boolean
    content_hash?: boolean
    source_url?: boolean
    room_type?: boolean
    use_processed?: boolean
    wm_status?: boolean
    wm_attempts?: boolean
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: boolean
    clip_job_id?: boolean
    clip_status?: boolean
    clip_result_url?: boolean
    clip_gcs_path?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    position?: boolean
    gcs_original_path?: boolean
    gcs_processed_path?: boolean
    gcs_thumb_path?: boolean
    width?: boolean
    height?: boolean
    bytes?: boolean
    content_hash?: boolean
    source_url?: boolean
    room_type?: boolean
    use_processed?: boolean
    wm_status?: boolean
    wm_attempts?: boolean
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: boolean
    clip_job_id?: boolean
    clip_status?: boolean
    clip_result_url?: boolean
    clip_gcs_path?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    position?: boolean
    gcs_original_path?: boolean
    gcs_processed_path?: boolean
    gcs_thumb_path?: boolean
    width?: boolean
    height?: boolean
    bytes?: boolean
    content_hash?: boolean
    source_url?: boolean
    room_type?: boolean
    use_processed?: boolean
    wm_status?: boolean
    wm_attempts?: boolean
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: boolean
    clip_job_id?: boolean
    clip_status?: boolean
    clip_result_url?: boolean
    clip_gcs_path?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    project_id?: boolean
    position?: boolean
    gcs_original_path?: boolean
    gcs_processed_path?: boolean
    gcs_thumb_path?: boolean
    width?: boolean
    height?: boolean
    bytes?: boolean
    content_hash?: boolean
    source_url?: boolean
    room_type?: boolean
    use_processed?: boolean
    wm_status?: boolean
    wm_attempts?: boolean
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: boolean
    clip_job_id?: boolean
    clip_status?: boolean
    clip_result_url?: boolean
    clip_gcs_path?: boolean
    created_at?: boolean
  }

  export type ImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "position" | "gcs_original_path" | "gcs_processed_path" | "gcs_thumb_path" | "width" | "height" | "bytes" | "content_hash" | "source_url" | "room_type" | "use_processed" | "wm_status" | "wm_attempts" | "removed" | "ready" | "higgsfield_media_id" | "clip_job_id" | "clip_status" | "clip_result_url" | "clip_gcs_path" | "created_at", ExtArgs["result"]["image"]>
  export type ImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      project_id: string
      position: number
      gcs_original_path: string | null
      gcs_processed_path: string | null
      gcs_thumb_path: string | null
      width: number | null
      height: number | null
      bytes: number | null
      content_hash: string | null
      source_url: string | null
      room_type: $Enums.RoomType
      use_processed: boolean
      wm_status: $Enums.WatermarkStatus
      wm_attempts: number
      removed: boolean
      ready: boolean
      higgsfield_media_id: string | null
      clip_job_id: string | null
      clip_status: $Enums.ClipStatus
      clip_result_url: string | null
      clip_gcs_path: string | null
      created_at: Date
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageFindUniqueArgs>(args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageFindFirstArgs>(args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageFindManyArgs>(args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends ImageCreateArgs>(args: SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageCreateManyArgs>(args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends ImageDeleteArgs>(args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUpdateArgs>(args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageDeleteManyArgs>(args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUpdateManyArgs>(args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {ImageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends ImageUpsertArgs>(args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Image model
   */
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly project_id: FieldRef<"Image", 'String'>
    readonly position: FieldRef<"Image", 'Int'>
    readonly gcs_original_path: FieldRef<"Image", 'String'>
    readonly gcs_processed_path: FieldRef<"Image", 'String'>
    readonly gcs_thumb_path: FieldRef<"Image", 'String'>
    readonly width: FieldRef<"Image", 'Int'>
    readonly height: FieldRef<"Image", 'Int'>
    readonly bytes: FieldRef<"Image", 'Int'>
    readonly content_hash: FieldRef<"Image", 'String'>
    readonly source_url: FieldRef<"Image", 'String'>
    readonly room_type: FieldRef<"Image", 'RoomType'>
    readonly use_processed: FieldRef<"Image", 'Boolean'>
    readonly wm_status: FieldRef<"Image", 'WatermarkStatus'>
    readonly wm_attempts: FieldRef<"Image", 'Int'>
    readonly removed: FieldRef<"Image", 'Boolean'>
    readonly ready: FieldRef<"Image", 'Boolean'>
    readonly higgsfield_media_id: FieldRef<"Image", 'String'>
    readonly clip_job_id: FieldRef<"Image", 'String'>
    readonly clip_status: FieldRef<"Image", 'ClipStatus'>
    readonly clip_result_url: FieldRef<"Image", 'String'>
    readonly clip_gcs_path: FieldRef<"Image", 'String'>
    readonly created_at: FieldRef<"Image", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image updateManyAndReturn
   */
  export type ImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to delete.
     */
    limit?: number
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
  }


  /**
   * Model Consent
   */

  export type AggregateConsent = {
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  export type ConsentMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: string | null
    type: $Enums.ConsentType | null
    accepted_at: Date | null
    ip: string | null
  }

  export type ConsentMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: string | null
    type: $Enums.ConsentType | null
    accepted_at: Date | null
    ip: string | null
  }

  export type ConsentCountAggregateOutputType = {
    id: number
    user_id: number
    project_id: number
    type: number
    accepted_at: number
    ip: number
    _all: number
  }


  export type ConsentMinAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    type?: true
    accepted_at?: true
    ip?: true
  }

  export type ConsentMaxAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    type?: true
    accepted_at?: true
    ip?: true
  }

  export type ConsentCountAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    type?: true
    accepted_at?: true
    ip?: true
    _all?: true
  }

  export type ConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consent to aggregate.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consents
    **/
    _count?: true | ConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsentMaxAggregateInputType
  }

  export type GetConsentAggregateType<T extends ConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsent[P]>
      : GetScalarType<T[P], AggregateConsent[P]>
  }




  export type ConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithAggregationInput | ConsentOrderByWithAggregationInput[]
    by: ConsentScalarFieldEnum[] | ConsentScalarFieldEnum
    having?: ConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsentCountAggregateInputType | true
    _min?: ConsentMinAggregateInputType
    _max?: ConsentMaxAggregateInputType
  }

  export type ConsentGroupByOutputType = {
    id: string
    user_id: string
    project_id: string
    type: $Enums.ConsentType
    accepted_at: Date
    ip: string | null
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  type GetConsentGroupByPayload<T extends ConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsentGroupByOutputType[P]>
            : GetScalarType<T[P], ConsentGroupByOutputType[P]>
        }
      >
    >


  export type ConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    type?: boolean
    accepted_at?: boolean
    ip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    type?: boolean
    accepted_at?: boolean
    ip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    type?: boolean
    accepted_at?: boolean
    ip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectScalar = {
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    type?: boolean
    accepted_at?: boolean
    ip?: boolean
  }

  export type ConsentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "project_id" | "type" | "accepted_at" | "ip", ExtArgs["result"]["consent"]>
  export type ConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      project_id: string
      type: $Enums.ConsentType
      accepted_at: Date
      ip: string | null
    }, ExtArgs["result"]["consent"]>
    composites: {}
  }

  type ConsentGetPayload<S extends boolean | null | undefined | ConsentDefaultArgs> = $Result.GetResult<Prisma.$ConsentPayload, S>

  type ConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsentCountAggregateInputType | true
    }

  export interface ConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consent'], meta: { name: 'Consent' } }
    /**
     * Find zero or one Consent that matches the filter.
     * @param {ConsentFindUniqueArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsentFindUniqueArgs>(args: SelectSubset<T, ConsentFindUniqueArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsentFindUniqueOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsentFindFirstArgs>(args?: SelectSubset<T, ConsentFindFirstArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consents
     * const consents = await prisma.consent.findMany()
     * 
     * // Get first 10 Consents
     * const consents = await prisma.consent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consentWithIdOnly = await prisma.consent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsentFindManyArgs>(args?: SelectSubset<T, ConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consent.
     * @param {ConsentCreateArgs} args - Arguments to create a Consent.
     * @example
     * // Create one Consent
     * const Consent = await prisma.consent.create({
     *   data: {
     *     // ... data to create a Consent
     *   }
     * })
     * 
     */
    create<T extends ConsentCreateArgs>(args: SelectSubset<T, ConsentCreateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consents.
     * @param {ConsentCreateManyArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsentCreateManyArgs>(args?: SelectSubset<T, ConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consents and returns the data saved in the database.
     * @param {ConsentCreateManyAndReturnArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consent.
     * @param {ConsentDeleteArgs} args - Arguments to delete one Consent.
     * @example
     * // Delete one Consent
     * const Consent = await prisma.consent.delete({
     *   where: {
     *     // ... filter to delete one Consent
     *   }
     * })
     * 
     */
    delete<T extends ConsentDeleteArgs>(args: SelectSubset<T, ConsentDeleteArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consent.
     * @param {ConsentUpdateArgs} args - Arguments to update one Consent.
     * @example
     * // Update one Consent
     * const consent = await prisma.consent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsentUpdateArgs>(args: SelectSubset<T, ConsentUpdateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consents.
     * @param {ConsentDeleteManyArgs} args - Arguments to filter Consents to delete.
     * @example
     * // Delete a few Consents
     * const { count } = await prisma.consent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsentDeleteManyArgs>(args?: SelectSubset<T, ConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsentUpdateManyArgs>(args: SelectSubset<T, ConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents and returns the data updated in the database.
     * @param {ConsentUpdateManyAndReturnArgs} args - Arguments to update many Consents.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsentUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consent.
     * @param {ConsentUpsertArgs} args - Arguments to update or create a Consent.
     * @example
     * // Update or create a Consent
     * const consent = await prisma.consent.upsert({
     *   create: {
     *     // ... data to create a Consent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consent we want to update
     *   }
     * })
     */
    upsert<T extends ConsentUpsertArgs>(args: SelectSubset<T, ConsentUpsertArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCountArgs} args - Arguments to filter Consents to count.
     * @example
     * // Count the number of Consents
     * const count = await prisma.consent.count({
     *   where: {
     *     // ... the filter for the Consents we want to count
     *   }
     * })
    **/
    count<T extends ConsentCountArgs>(
      args?: Subset<T, ConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsentAggregateArgs>(args: Subset<T, ConsentAggregateArgs>): Prisma.PrismaPromise<GetConsentAggregateType<T>>

    /**
     * Group by Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsentGroupByArgs['orderBy'] }
        : { orderBy?: ConsentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consent model
   */
  readonly fields: ConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consent model
   */
  interface ConsentFieldRefs {
    readonly id: FieldRef<"Consent", 'String'>
    readonly user_id: FieldRef<"Consent", 'String'>
    readonly project_id: FieldRef<"Consent", 'String'>
    readonly type: FieldRef<"Consent", 'ConsentType'>
    readonly accepted_at: FieldRef<"Consent", 'DateTime'>
    readonly ip: FieldRef<"Consent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Consent findUnique
   */
  export type ConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findUniqueOrThrow
   */
  export type ConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findFirst
   */
  export type ConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findFirstOrThrow
   */
  export type ConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findMany
   */
  export type ConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consents to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent create
   */
  export type ConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a Consent.
     */
    data: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
  }

  /**
   * Consent createMany
   */
  export type ConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consent createManyAndReturn
   */
  export type ConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent update
   */
  export type ConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a Consent.
     */
    data: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
    /**
     * Choose, which Consent to update.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent updateMany
   */
  export type ConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
  }

  /**
   * Consent updateManyAndReturn
   */
  export type ConsentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent upsert
   */
  export type ConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the Consent to update in case it exists.
     */
    where: ConsentWhereUniqueInput
    /**
     * In case the Consent found by the `where` argument doesn't exist, create a new Consent with this data.
     */
    create: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
    /**
     * In case the Consent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
  }

  /**
   * Consent delete
   */
  export type ConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter which Consent to delete.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent deleteMany
   */
  export type ConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consents to delete
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to delete.
     */
    limit?: number
  }

  /**
   * Consent without action
   */
  export type ConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
  }


  /**
   * Model JobEvent
   */

  export type AggregateJobEvent = {
    _count: JobEventCountAggregateOutputType | null
    _min: JobEventMinAggregateOutputType | null
    _max: JobEventMaxAggregateOutputType | null
  }

  export type JobEventMinAggregateOutputType = {
    id: string | null
    project_id: string | null
    job_name: string | null
    bullmq_job_id: string | null
    step: string | null
    status: string | null
    message: string | null
    created_at: Date | null
  }

  export type JobEventMaxAggregateOutputType = {
    id: string | null
    project_id: string | null
    job_name: string | null
    bullmq_job_id: string | null
    step: string | null
    status: string | null
    message: string | null
    created_at: Date | null
  }

  export type JobEventCountAggregateOutputType = {
    id: number
    project_id: number
    job_name: number
    bullmq_job_id: number
    step: number
    status: number
    message: number
    created_at: number
    _all: number
  }


  export type JobEventMinAggregateInputType = {
    id?: true
    project_id?: true
    job_name?: true
    bullmq_job_id?: true
    step?: true
    status?: true
    message?: true
    created_at?: true
  }

  export type JobEventMaxAggregateInputType = {
    id?: true
    project_id?: true
    job_name?: true
    bullmq_job_id?: true
    step?: true
    status?: true
    message?: true
    created_at?: true
  }

  export type JobEventCountAggregateInputType = {
    id?: true
    project_id?: true
    job_name?: true
    bullmq_job_id?: true
    step?: true
    status?: true
    message?: true
    created_at?: true
    _all?: true
  }

  export type JobEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobEvent to aggregate.
     */
    where?: JobEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEvents to fetch.
     */
    orderBy?: JobEventOrderByWithRelationInput | JobEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobEvents
    **/
    _count?: true | JobEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobEventMaxAggregateInputType
  }

  export type GetJobEventAggregateType<T extends JobEventAggregateArgs> = {
        [P in keyof T & keyof AggregateJobEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobEvent[P]>
      : GetScalarType<T[P], AggregateJobEvent[P]>
  }




  export type JobEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobEventWhereInput
    orderBy?: JobEventOrderByWithAggregationInput | JobEventOrderByWithAggregationInput[]
    by: JobEventScalarFieldEnum[] | JobEventScalarFieldEnum
    having?: JobEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobEventCountAggregateInputType | true
    _min?: JobEventMinAggregateInputType
    _max?: JobEventMaxAggregateInputType
  }

  export type JobEventGroupByOutputType = {
    id: string
    project_id: string
    job_name: string
    bullmq_job_id: string | null
    step: string | null
    status: string
    message: string | null
    created_at: Date
    _count: JobEventCountAggregateOutputType | null
    _min: JobEventMinAggregateOutputType | null
    _max: JobEventMaxAggregateOutputType | null
  }

  type GetJobEventGroupByPayload<T extends JobEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobEventGroupByOutputType[P]>
            : GetScalarType<T[P], JobEventGroupByOutputType[P]>
        }
      >
    >


  export type JobEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    job_name?: boolean
    bullmq_job_id?: boolean
    step?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEvent"]>

  export type JobEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    job_name?: boolean
    bullmq_job_id?: boolean
    step?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEvent"]>

  export type JobEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    job_name?: boolean
    bullmq_job_id?: boolean
    step?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEvent"]>

  export type JobEventSelectScalar = {
    id?: boolean
    project_id?: boolean
    job_name?: boolean
    bullmq_job_id?: boolean
    step?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
  }

  export type JobEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "job_name" | "bullmq_job_id" | "step" | "status" | "message" | "created_at", ExtArgs["result"]["jobEvent"]>
  export type JobEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type JobEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type JobEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $JobEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobEvent"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      project_id: string
      job_name: string
      bullmq_job_id: string | null
      step: string | null
      status: string
      message: string | null
      created_at: Date
    }, ExtArgs["result"]["jobEvent"]>
    composites: {}
  }

  type JobEventGetPayload<S extends boolean | null | undefined | JobEventDefaultArgs> = $Result.GetResult<Prisma.$JobEventPayload, S>

  type JobEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobEventCountAggregateInputType | true
    }

  export interface JobEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobEvent'], meta: { name: 'JobEvent' } }
    /**
     * Find zero or one JobEvent that matches the filter.
     * @param {JobEventFindUniqueArgs} args - Arguments to find a JobEvent
     * @example
     * // Get one JobEvent
     * const jobEvent = await prisma.jobEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobEventFindUniqueArgs>(args: SelectSubset<T, JobEventFindUniqueArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobEventFindUniqueOrThrowArgs} args - Arguments to find a JobEvent
     * @example
     * // Get one JobEvent
     * const jobEvent = await prisma.jobEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobEventFindUniqueOrThrowArgs>(args: SelectSubset<T, JobEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventFindFirstArgs} args - Arguments to find a JobEvent
     * @example
     * // Get one JobEvent
     * const jobEvent = await prisma.jobEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobEventFindFirstArgs>(args?: SelectSubset<T, JobEventFindFirstArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventFindFirstOrThrowArgs} args - Arguments to find a JobEvent
     * @example
     * // Get one JobEvent
     * const jobEvent = await prisma.jobEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobEventFindFirstOrThrowArgs>(args?: SelectSubset<T, JobEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobEvents
     * const jobEvents = await prisma.jobEvent.findMany()
     * 
     * // Get first 10 JobEvents
     * const jobEvents = await prisma.jobEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobEventWithIdOnly = await prisma.jobEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobEventFindManyArgs>(args?: SelectSubset<T, JobEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobEvent.
     * @param {JobEventCreateArgs} args - Arguments to create a JobEvent.
     * @example
     * // Create one JobEvent
     * const JobEvent = await prisma.jobEvent.create({
     *   data: {
     *     // ... data to create a JobEvent
     *   }
     * })
     * 
     */
    create<T extends JobEventCreateArgs>(args: SelectSubset<T, JobEventCreateArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobEvents.
     * @param {JobEventCreateManyArgs} args - Arguments to create many JobEvents.
     * @example
     * // Create many JobEvents
     * const jobEvent = await prisma.jobEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobEventCreateManyArgs>(args?: SelectSubset<T, JobEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobEvents and returns the data saved in the database.
     * @param {JobEventCreateManyAndReturnArgs} args - Arguments to create many JobEvents.
     * @example
     * // Create many JobEvents
     * const jobEvent = await prisma.jobEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobEvents and only return the `id`
     * const jobEventWithIdOnly = await prisma.jobEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobEventCreateManyAndReturnArgs>(args?: SelectSubset<T, JobEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobEvent.
     * @param {JobEventDeleteArgs} args - Arguments to delete one JobEvent.
     * @example
     * // Delete one JobEvent
     * const JobEvent = await prisma.jobEvent.delete({
     *   where: {
     *     // ... filter to delete one JobEvent
     *   }
     * })
     * 
     */
    delete<T extends JobEventDeleteArgs>(args: SelectSubset<T, JobEventDeleteArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobEvent.
     * @param {JobEventUpdateArgs} args - Arguments to update one JobEvent.
     * @example
     * // Update one JobEvent
     * const jobEvent = await prisma.jobEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobEventUpdateArgs>(args: SelectSubset<T, JobEventUpdateArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobEvents.
     * @param {JobEventDeleteManyArgs} args - Arguments to filter JobEvents to delete.
     * @example
     * // Delete a few JobEvents
     * const { count } = await prisma.jobEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobEventDeleteManyArgs>(args?: SelectSubset<T, JobEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobEvents
     * const jobEvent = await prisma.jobEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobEventUpdateManyArgs>(args: SelectSubset<T, JobEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobEvents and returns the data updated in the database.
     * @param {JobEventUpdateManyAndReturnArgs} args - Arguments to update many JobEvents.
     * @example
     * // Update many JobEvents
     * const jobEvent = await prisma.jobEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobEvents and only return the `id`
     * const jobEventWithIdOnly = await prisma.jobEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobEventUpdateManyAndReturnArgs>(args: SelectSubset<T, JobEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobEvent.
     * @param {JobEventUpsertArgs} args - Arguments to update or create a JobEvent.
     * @example
     * // Update or create a JobEvent
     * const jobEvent = await prisma.jobEvent.upsert({
     *   create: {
     *     // ... data to create a JobEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobEvent we want to update
     *   }
     * })
     */
    upsert<T extends JobEventUpsertArgs>(args: SelectSubset<T, JobEventUpsertArgs<ExtArgs>>): Prisma__JobEventClient<$Result.GetResult<Prisma.$JobEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventCountArgs} args - Arguments to filter JobEvents to count.
     * @example
     * // Count the number of JobEvents
     * const count = await prisma.jobEvent.count({
     *   where: {
     *     // ... the filter for the JobEvents we want to count
     *   }
     * })
    **/
    count<T extends JobEventCountArgs>(
      args?: Subset<T, JobEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobEventAggregateArgs>(args: Subset<T, JobEventAggregateArgs>): Prisma.PrismaPromise<GetJobEventAggregateType<T>>

    /**
     * Group by JobEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobEventGroupByArgs['orderBy'] }
        : { orderBy?: JobEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobEvent model
   */
  readonly fields: JobEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobEvent model
   */
  interface JobEventFieldRefs {
    readonly id: FieldRef<"JobEvent", 'String'>
    readonly project_id: FieldRef<"JobEvent", 'String'>
    readonly job_name: FieldRef<"JobEvent", 'String'>
    readonly bullmq_job_id: FieldRef<"JobEvent", 'String'>
    readonly step: FieldRef<"JobEvent", 'String'>
    readonly status: FieldRef<"JobEvent", 'String'>
    readonly message: FieldRef<"JobEvent", 'String'>
    readonly created_at: FieldRef<"JobEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobEvent findUnique
   */
  export type JobEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter, which JobEvent to fetch.
     */
    where: JobEventWhereUniqueInput
  }

  /**
   * JobEvent findUniqueOrThrow
   */
  export type JobEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter, which JobEvent to fetch.
     */
    where: JobEventWhereUniqueInput
  }

  /**
   * JobEvent findFirst
   */
  export type JobEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter, which JobEvent to fetch.
     */
    where?: JobEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEvents to fetch.
     */
    orderBy?: JobEventOrderByWithRelationInput | JobEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobEvents.
     */
    cursor?: JobEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobEvents.
     */
    distinct?: JobEventScalarFieldEnum | JobEventScalarFieldEnum[]
  }

  /**
   * JobEvent findFirstOrThrow
   */
  export type JobEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter, which JobEvent to fetch.
     */
    where?: JobEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEvents to fetch.
     */
    orderBy?: JobEventOrderByWithRelationInput | JobEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobEvents.
     */
    cursor?: JobEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobEvents.
     */
    distinct?: JobEventScalarFieldEnum | JobEventScalarFieldEnum[]
  }

  /**
   * JobEvent findMany
   */
  export type JobEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter, which JobEvents to fetch.
     */
    where?: JobEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEvents to fetch.
     */
    orderBy?: JobEventOrderByWithRelationInput | JobEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobEvents.
     */
    cursor?: JobEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEvents.
     */
    skip?: number
    distinct?: JobEventScalarFieldEnum | JobEventScalarFieldEnum[]
  }

  /**
   * JobEvent create
   */
  export type JobEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * The data needed to create a JobEvent.
     */
    data: XOR<JobEventCreateInput, JobEventUncheckedCreateInput>
  }

  /**
   * JobEvent createMany
   */
  export type JobEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobEvents.
     */
    data: JobEventCreateManyInput | JobEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobEvent createManyAndReturn
   */
  export type JobEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * The data used to create many JobEvents.
     */
    data: JobEventCreateManyInput | JobEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobEvent update
   */
  export type JobEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * The data needed to update a JobEvent.
     */
    data: XOR<JobEventUpdateInput, JobEventUncheckedUpdateInput>
    /**
     * Choose, which JobEvent to update.
     */
    where: JobEventWhereUniqueInput
  }

  /**
   * JobEvent updateMany
   */
  export type JobEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobEvents.
     */
    data: XOR<JobEventUpdateManyMutationInput, JobEventUncheckedUpdateManyInput>
    /**
     * Filter which JobEvents to update
     */
    where?: JobEventWhereInput
    /**
     * Limit how many JobEvents to update.
     */
    limit?: number
  }

  /**
   * JobEvent updateManyAndReturn
   */
  export type JobEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * The data used to update JobEvents.
     */
    data: XOR<JobEventUpdateManyMutationInput, JobEventUncheckedUpdateManyInput>
    /**
     * Filter which JobEvents to update
     */
    where?: JobEventWhereInput
    /**
     * Limit how many JobEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobEvent upsert
   */
  export type JobEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * The filter to search for the JobEvent to update in case it exists.
     */
    where: JobEventWhereUniqueInput
    /**
     * In case the JobEvent found by the `where` argument doesn't exist, create a new JobEvent with this data.
     */
    create: XOR<JobEventCreateInput, JobEventUncheckedCreateInput>
    /**
     * In case the JobEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobEventUpdateInput, JobEventUncheckedUpdateInput>
  }

  /**
   * JobEvent delete
   */
  export type JobEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
    /**
     * Filter which JobEvent to delete.
     */
    where: JobEventWhereUniqueInput
  }

  /**
   * JobEvent deleteMany
   */
  export type JobEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobEvents to delete
     */
    where?: JobEventWhereInput
    /**
     * Limit how many JobEvents to delete.
     */
    limit?: number
  }

  /**
   * JobEvent without action
   */
  export type JobEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEvent
     */
    select?: JobEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEvent
     */
    omit?: JobEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEventInclude<ExtArgs> | null
  }


  /**
   * Model UsageLedger
   */

  export type AggregateUsageLedger = {
    _count: UsageLedgerCountAggregateOutputType | null
    _avg: UsageLedgerAvgAggregateOutputType | null
    _sum: UsageLedgerSumAggregateOutputType | null
    _min: UsageLedgerMinAggregateOutputType | null
    _max: UsageLedgerMaxAggregateOutputType | null
  }

  export type UsageLedgerAvgAggregateOutputType = {
    quota_units: number | null
    provider_units: number | null
    credits: number | null
    cost_usd: number | null
  }

  export type UsageLedgerSumAggregateOutputType = {
    quota_units: number | null
    provider_units: number | null
    credits: number | null
    cost_usd: number | null
  }

  export type UsageLedgerMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: string | null
    kind: $Enums.LedgerKind | null
    quota_units: number | null
    provider_units: number | null
    credits: number | null
    cost_usd: number | null
    cost_estimated: boolean | null
    note: string | null
    created_at: Date | null
  }

  export type UsageLedgerMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: string | null
    kind: $Enums.LedgerKind | null
    quota_units: number | null
    provider_units: number | null
    credits: number | null
    cost_usd: number | null
    cost_estimated: boolean | null
    note: string | null
    created_at: Date | null
  }

  export type UsageLedgerCountAggregateOutputType = {
    id: number
    user_id: number
    project_id: number
    kind: number
    quota_units: number
    provider_units: number
    credits: number
    cost_usd: number
    cost_estimated: number
    note: number
    created_at: number
    _all: number
  }


  export type UsageLedgerAvgAggregateInputType = {
    quota_units?: true
    provider_units?: true
    credits?: true
    cost_usd?: true
  }

  export type UsageLedgerSumAggregateInputType = {
    quota_units?: true
    provider_units?: true
    credits?: true
    cost_usd?: true
  }

  export type UsageLedgerMinAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    kind?: true
    quota_units?: true
    provider_units?: true
    credits?: true
    cost_usd?: true
    cost_estimated?: true
    note?: true
    created_at?: true
  }

  export type UsageLedgerMaxAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    kind?: true
    quota_units?: true
    provider_units?: true
    credits?: true
    cost_usd?: true
    cost_estimated?: true
    note?: true
    created_at?: true
  }

  export type UsageLedgerCountAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    kind?: true
    quota_units?: true
    provider_units?: true
    credits?: true
    cost_usd?: true
    cost_estimated?: true
    note?: true
    created_at?: true
    _all?: true
  }

  export type UsageLedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLedger to aggregate.
     */
    where?: UsageLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLedgers to fetch.
     */
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageLedgers
    **/
    _count?: true | UsageLedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageLedgerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageLedgerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageLedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageLedgerMaxAggregateInputType
  }

  export type GetUsageLedgerAggregateType<T extends UsageLedgerAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageLedger[P]>
      : GetScalarType<T[P], AggregateUsageLedger[P]>
  }




  export type UsageLedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLedgerWhereInput
    orderBy?: UsageLedgerOrderByWithAggregationInput | UsageLedgerOrderByWithAggregationInput[]
    by: UsageLedgerScalarFieldEnum[] | UsageLedgerScalarFieldEnum
    having?: UsageLedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageLedgerCountAggregateInputType | true
    _avg?: UsageLedgerAvgAggregateInputType
    _sum?: UsageLedgerSumAggregateInputType
    _min?: UsageLedgerMinAggregateInputType
    _max?: UsageLedgerMaxAggregateInputType
  }

  export type UsageLedgerGroupByOutputType = {
    id: string
    user_id: string
    project_id: string | null
    kind: $Enums.LedgerKind
    quota_units: number
    provider_units: number | null
    credits: number | null
    cost_usd: number | null
    cost_estimated: boolean
    note: string | null
    created_at: Date
    _count: UsageLedgerCountAggregateOutputType | null
    _avg: UsageLedgerAvgAggregateOutputType | null
    _sum: UsageLedgerSumAggregateOutputType | null
    _min: UsageLedgerMinAggregateOutputType | null
    _max: UsageLedgerMaxAggregateOutputType | null
  }

  type GetUsageLedgerGroupByPayload<T extends UsageLedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageLedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageLedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageLedgerGroupByOutputType[P]>
            : GetScalarType<T[P], UsageLedgerGroupByOutputType[P]>
        }
      >
    >


  export type UsageLedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    kind?: boolean
    quota_units?: boolean
    provider_units?: boolean
    credits?: boolean
    cost_usd?: boolean
    cost_estimated?: boolean
    note?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }, ExtArgs["result"]["usageLedger"]>

  export type UsageLedgerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    kind?: boolean
    quota_units?: boolean
    provider_units?: boolean
    credits?: boolean
    cost_usd?: boolean
    cost_estimated?: boolean
    note?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }, ExtArgs["result"]["usageLedger"]>

  export type UsageLedgerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    kind?: boolean
    quota_units?: boolean
    provider_units?: boolean
    credits?: boolean
    cost_usd?: boolean
    cost_estimated?: boolean
    note?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }, ExtArgs["result"]["usageLedger"]>

  export type UsageLedgerSelectScalar = {
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    kind?: boolean
    quota_units?: boolean
    provider_units?: boolean
    credits?: boolean
    cost_usd?: boolean
    cost_estimated?: boolean
    note?: boolean
    created_at?: boolean
  }

  export type UsageLedgerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "project_id" | "kind" | "quota_units" | "provider_units" | "credits" | "cost_usd" | "cost_estimated" | "note" | "created_at", ExtArgs["result"]["usageLedger"]>
  export type UsageLedgerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }
  export type UsageLedgerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }
  export type UsageLedgerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | UsageLedger$projectArgs<ExtArgs>
  }

  export type $UsageLedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageLedger"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      project_id: string | null
      kind: $Enums.LedgerKind
      quota_units: number
      provider_units: number | null
      credits: number | null
      cost_usd: number | null
      cost_estimated: boolean
      note: string | null
      created_at: Date
    }, ExtArgs["result"]["usageLedger"]>
    composites: {}
  }

  type UsageLedgerGetPayload<S extends boolean | null | undefined | UsageLedgerDefaultArgs> = $Result.GetResult<Prisma.$UsageLedgerPayload, S>

  type UsageLedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageLedgerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageLedgerCountAggregateInputType | true
    }

  export interface UsageLedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageLedger'], meta: { name: 'UsageLedger' } }
    /**
     * Find zero or one UsageLedger that matches the filter.
     * @param {UsageLedgerFindUniqueArgs} args - Arguments to find a UsageLedger
     * @example
     * // Get one UsageLedger
     * const usageLedger = await prisma.usageLedger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageLedgerFindUniqueArgs>(args: SelectSubset<T, UsageLedgerFindUniqueArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageLedger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageLedgerFindUniqueOrThrowArgs} args - Arguments to find a UsageLedger
     * @example
     * // Get one UsageLedger
     * const usageLedger = await prisma.usageLedger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageLedgerFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageLedgerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLedger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerFindFirstArgs} args - Arguments to find a UsageLedger
     * @example
     * // Get one UsageLedger
     * const usageLedger = await prisma.usageLedger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageLedgerFindFirstArgs>(args?: SelectSubset<T, UsageLedgerFindFirstArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLedger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerFindFirstOrThrowArgs} args - Arguments to find a UsageLedger
     * @example
     * // Get one UsageLedger
     * const usageLedger = await prisma.usageLedger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageLedgerFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageLedgerFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageLedgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageLedgers
     * const usageLedgers = await prisma.usageLedger.findMany()
     * 
     * // Get first 10 UsageLedgers
     * const usageLedgers = await prisma.usageLedger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageLedgerWithIdOnly = await prisma.usageLedger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageLedgerFindManyArgs>(args?: SelectSubset<T, UsageLedgerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageLedger.
     * @param {UsageLedgerCreateArgs} args - Arguments to create a UsageLedger.
     * @example
     * // Create one UsageLedger
     * const UsageLedger = await prisma.usageLedger.create({
     *   data: {
     *     // ... data to create a UsageLedger
     *   }
     * })
     * 
     */
    create<T extends UsageLedgerCreateArgs>(args: SelectSubset<T, UsageLedgerCreateArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageLedgers.
     * @param {UsageLedgerCreateManyArgs} args - Arguments to create many UsageLedgers.
     * @example
     * // Create many UsageLedgers
     * const usageLedger = await prisma.usageLedger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageLedgerCreateManyArgs>(args?: SelectSubset<T, UsageLedgerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageLedgers and returns the data saved in the database.
     * @param {UsageLedgerCreateManyAndReturnArgs} args - Arguments to create many UsageLedgers.
     * @example
     * // Create many UsageLedgers
     * const usageLedger = await prisma.usageLedger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageLedgers and only return the `id`
     * const usageLedgerWithIdOnly = await prisma.usageLedger.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageLedgerCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageLedgerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageLedger.
     * @param {UsageLedgerDeleteArgs} args - Arguments to delete one UsageLedger.
     * @example
     * // Delete one UsageLedger
     * const UsageLedger = await prisma.usageLedger.delete({
     *   where: {
     *     // ... filter to delete one UsageLedger
     *   }
     * })
     * 
     */
    delete<T extends UsageLedgerDeleteArgs>(args: SelectSubset<T, UsageLedgerDeleteArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageLedger.
     * @param {UsageLedgerUpdateArgs} args - Arguments to update one UsageLedger.
     * @example
     * // Update one UsageLedger
     * const usageLedger = await prisma.usageLedger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageLedgerUpdateArgs>(args: SelectSubset<T, UsageLedgerUpdateArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageLedgers.
     * @param {UsageLedgerDeleteManyArgs} args - Arguments to filter UsageLedgers to delete.
     * @example
     * // Delete a few UsageLedgers
     * const { count } = await prisma.usageLedger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageLedgerDeleteManyArgs>(args?: SelectSubset<T, UsageLedgerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageLedgers
     * const usageLedger = await prisma.usageLedger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageLedgerUpdateManyArgs>(args: SelectSubset<T, UsageLedgerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLedgers and returns the data updated in the database.
     * @param {UsageLedgerUpdateManyAndReturnArgs} args - Arguments to update many UsageLedgers.
     * @example
     * // Update many UsageLedgers
     * const usageLedger = await prisma.usageLedger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageLedgers and only return the `id`
     * const usageLedgerWithIdOnly = await prisma.usageLedger.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageLedgerUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageLedgerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageLedger.
     * @param {UsageLedgerUpsertArgs} args - Arguments to update or create a UsageLedger.
     * @example
     * // Update or create a UsageLedger
     * const usageLedger = await prisma.usageLedger.upsert({
     *   create: {
     *     // ... data to create a UsageLedger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageLedger we want to update
     *   }
     * })
     */
    upsert<T extends UsageLedgerUpsertArgs>(args: SelectSubset<T, UsageLedgerUpsertArgs<ExtArgs>>): Prisma__UsageLedgerClient<$Result.GetResult<Prisma.$UsageLedgerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerCountArgs} args - Arguments to filter UsageLedgers to count.
     * @example
     * // Count the number of UsageLedgers
     * const count = await prisma.usageLedger.count({
     *   where: {
     *     // ... the filter for the UsageLedgers we want to count
     *   }
     * })
    **/
    count<T extends UsageLedgerCountArgs>(
      args?: Subset<T, UsageLedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageLedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageLedgerAggregateArgs>(args: Subset<T, UsageLedgerAggregateArgs>): Prisma.PrismaPromise<GetUsageLedgerAggregateType<T>>

    /**
     * Group by UsageLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLedgerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageLedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageLedgerGroupByArgs['orderBy'] }
        : { orderBy?: UsageLedgerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageLedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageLedger model
   */
  readonly fields: UsageLedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageLedger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageLedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends UsageLedger$projectArgs<ExtArgs> = {}>(args?: Subset<T, UsageLedger$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageLedger model
   */
  interface UsageLedgerFieldRefs {
    readonly id: FieldRef<"UsageLedger", 'String'>
    readonly user_id: FieldRef<"UsageLedger", 'String'>
    readonly project_id: FieldRef<"UsageLedger", 'String'>
    readonly kind: FieldRef<"UsageLedger", 'LedgerKind'>
    readonly quota_units: FieldRef<"UsageLedger", 'Int'>
    readonly provider_units: FieldRef<"UsageLedger", 'Float'>
    readonly credits: FieldRef<"UsageLedger", 'Float'>
    readonly cost_usd: FieldRef<"UsageLedger", 'Float'>
    readonly cost_estimated: FieldRef<"UsageLedger", 'Boolean'>
    readonly note: FieldRef<"UsageLedger", 'String'>
    readonly created_at: FieldRef<"UsageLedger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLedger findUnique
   */
  export type UsageLedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter, which UsageLedger to fetch.
     */
    where: UsageLedgerWhereUniqueInput
  }

  /**
   * UsageLedger findUniqueOrThrow
   */
  export type UsageLedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter, which UsageLedger to fetch.
     */
    where: UsageLedgerWhereUniqueInput
  }

  /**
   * UsageLedger findFirst
   */
  export type UsageLedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter, which UsageLedger to fetch.
     */
    where?: UsageLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLedgers to fetch.
     */
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLedgers.
     */
    cursor?: UsageLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLedgers.
     */
    distinct?: UsageLedgerScalarFieldEnum | UsageLedgerScalarFieldEnum[]
  }

  /**
   * UsageLedger findFirstOrThrow
   */
  export type UsageLedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter, which UsageLedger to fetch.
     */
    where?: UsageLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLedgers to fetch.
     */
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLedgers.
     */
    cursor?: UsageLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLedgers.
     */
    distinct?: UsageLedgerScalarFieldEnum | UsageLedgerScalarFieldEnum[]
  }

  /**
   * UsageLedger findMany
   */
  export type UsageLedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter, which UsageLedgers to fetch.
     */
    where?: UsageLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLedgers to fetch.
     */
    orderBy?: UsageLedgerOrderByWithRelationInput | UsageLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageLedgers.
     */
    cursor?: UsageLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLedgers.
     */
    skip?: number
    distinct?: UsageLedgerScalarFieldEnum | UsageLedgerScalarFieldEnum[]
  }

  /**
   * UsageLedger create
   */
  export type UsageLedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageLedger.
     */
    data: XOR<UsageLedgerCreateInput, UsageLedgerUncheckedCreateInput>
  }

  /**
   * UsageLedger createMany
   */
  export type UsageLedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageLedgers.
     */
    data: UsageLedgerCreateManyInput | UsageLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageLedger createManyAndReturn
   */
  export type UsageLedgerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * The data used to create many UsageLedgers.
     */
    data: UsageLedgerCreateManyInput | UsageLedgerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLedger update
   */
  export type UsageLedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageLedger.
     */
    data: XOR<UsageLedgerUpdateInput, UsageLedgerUncheckedUpdateInput>
    /**
     * Choose, which UsageLedger to update.
     */
    where: UsageLedgerWhereUniqueInput
  }

  /**
   * UsageLedger updateMany
   */
  export type UsageLedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageLedgers.
     */
    data: XOR<UsageLedgerUpdateManyMutationInput, UsageLedgerUncheckedUpdateManyInput>
    /**
     * Filter which UsageLedgers to update
     */
    where?: UsageLedgerWhereInput
    /**
     * Limit how many UsageLedgers to update.
     */
    limit?: number
  }

  /**
   * UsageLedger updateManyAndReturn
   */
  export type UsageLedgerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * The data used to update UsageLedgers.
     */
    data: XOR<UsageLedgerUpdateManyMutationInput, UsageLedgerUncheckedUpdateManyInput>
    /**
     * Filter which UsageLedgers to update
     */
    where?: UsageLedgerWhereInput
    /**
     * Limit how many UsageLedgers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLedger upsert
   */
  export type UsageLedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageLedger to update in case it exists.
     */
    where: UsageLedgerWhereUniqueInput
    /**
     * In case the UsageLedger found by the `where` argument doesn't exist, create a new UsageLedger with this data.
     */
    create: XOR<UsageLedgerCreateInput, UsageLedgerUncheckedCreateInput>
    /**
     * In case the UsageLedger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageLedgerUpdateInput, UsageLedgerUncheckedUpdateInput>
  }

  /**
   * UsageLedger delete
   */
  export type UsageLedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
    /**
     * Filter which UsageLedger to delete.
     */
    where: UsageLedgerWhereUniqueInput
  }

  /**
   * UsageLedger deleteMany
   */
  export type UsageLedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLedgers to delete
     */
    where?: UsageLedgerWhereInput
    /**
     * Limit how many UsageLedgers to delete.
     */
    limit?: number
  }

  /**
   * UsageLedger.project
   */
  export type UsageLedger$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * UsageLedger without action
   */
  export type UsageLedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLedger
     */
    select?: UsageLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLedger
     */
    omit?: UsageLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLedgerInclude<ExtArgs> | null
  }


  /**
   * Model AppConfig
   */

  export type AggregateAppConfig = {
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  export type AppConfigAvgAggregateOutputType = {
    value: number | null
  }

  export type AppConfigSumAggregateOutputType = {
    value: number | null
  }

  export type AppConfigMinAggregateOutputType = {
    key: string | null
    value: number | null
    unit: string | null
    description: string | null
    updated_at: Date | null
  }

  export type AppConfigMaxAggregateOutputType = {
    key: string | null
    value: number | null
    unit: string | null
    description: string | null
    updated_at: Date | null
  }

  export type AppConfigCountAggregateOutputType = {
    key: number
    value: number
    unit: number
    description: number
    updated_at: number
    _all: number
  }


  export type AppConfigAvgAggregateInputType = {
    value?: true
  }

  export type AppConfigSumAggregateInputType = {
    value?: true
  }

  export type AppConfigMinAggregateInputType = {
    key?: true
    value?: true
    unit?: true
    description?: true
    updated_at?: true
  }

  export type AppConfigMaxAggregateInputType = {
    key?: true
    value?: true
    unit?: true
    description?: true
    updated_at?: true
  }

  export type AppConfigCountAggregateInputType = {
    key?: true
    value?: true
    unit?: true
    description?: true
    updated_at?: true
    _all?: true
  }

  export type AppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfig to aggregate.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppConfigs
    **/
    _count?: true | AppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigMaxAggregateInputType
  }

  export type GetAppConfigAggregateType<T extends AppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfig[P]>
      : GetScalarType<T[P], AggregateAppConfig[P]>
  }




  export type AppConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppConfigWhereInput
    orderBy?: AppConfigOrderByWithAggregationInput | AppConfigOrderByWithAggregationInput[]
    by: AppConfigScalarFieldEnum[] | AppConfigScalarFieldEnum
    having?: AppConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigCountAggregateInputType | true
    _avg?: AppConfigAvgAggregateInputType
    _sum?: AppConfigSumAggregateInputType
    _min?: AppConfigMinAggregateInputType
    _max?: AppConfigMaxAggregateInputType
  }

  export type AppConfigGroupByOutputType = {
    key: string
    value: number
    unit: string
    description: string | null
    updated_at: Date
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  type GetAppConfigGroupByPayload<T extends AppConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
        }
      >
    >


  export type AppConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    unit?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    unit?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    unit?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectScalar = {
    key?: boolean
    value?: boolean
    unit?: boolean
    description?: boolean
    updated_at?: boolean
  }

  export type AppConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "unit" | "description" | "updated_at", ExtArgs["result"]["appConfig"]>

  export type $AppConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: number
      unit: string
      description: string | null
      updated_at: Date
    }, ExtArgs["result"]["appConfig"]>
    composites: {}
  }

  type AppConfigGetPayload<S extends boolean | null | undefined | AppConfigDefaultArgs> = $Result.GetResult<Prisma.$AppConfigPayload, S>

  type AppConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppConfigCountAggregateInputType | true
    }

  export interface AppConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppConfig'], meta: { name: 'AppConfig' } }
    /**
     * Find zero or one AppConfig that matches the filter.
     * @param {AppConfigFindUniqueArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppConfigFindUniqueArgs>(args: SelectSubset<T, AppConfigFindUniqueArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppConfigFindUniqueOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AppConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppConfigFindFirstArgs>(args?: SelectSubset<T, AppConfigFindFirstArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AppConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigs
     * const appConfigs = await prisma.appConfig.findMany()
     * 
     * // Get first 10 AppConfigs
     * const appConfigs = await prisma.appConfig.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppConfigFindManyArgs>(args?: SelectSubset<T, AppConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppConfig.
     * @param {AppConfigCreateArgs} args - Arguments to create a AppConfig.
     * @example
     * // Create one AppConfig
     * const AppConfig = await prisma.appConfig.create({
     *   data: {
     *     // ... data to create a AppConfig
     *   }
     * })
     * 
     */
    create<T extends AppConfigCreateArgs>(args: SelectSubset<T, AppConfigCreateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppConfigs.
     * @param {AppConfigCreateManyArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppConfigCreateManyArgs>(args?: SelectSubset<T, AppConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppConfigs and returns the data saved in the database.
     * @param {AppConfigCreateManyAndReturnArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppConfigs and only return the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AppConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppConfig.
     * @param {AppConfigDeleteArgs} args - Arguments to delete one AppConfig.
     * @example
     * // Delete one AppConfig
     * const AppConfig = await prisma.appConfig.delete({
     *   where: {
     *     // ... filter to delete one AppConfig
     *   }
     * })
     * 
     */
    delete<T extends AppConfigDeleteArgs>(args: SelectSubset<T, AppConfigDeleteArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppConfig.
     * @param {AppConfigUpdateArgs} args - Arguments to update one AppConfig.
     * @example
     * // Update one AppConfig
     * const appConfig = await prisma.appConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppConfigUpdateArgs>(args: SelectSubset<T, AppConfigUpdateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppConfigs.
     * @param {AppConfigDeleteManyArgs} args - Arguments to filter AppConfigs to delete.
     * @example
     * // Delete a few AppConfigs
     * const { count } = await prisma.appConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppConfigDeleteManyArgs>(args?: SelectSubset<T, AppConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppConfigUpdateManyArgs>(args: SelectSubset<T, AppConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs and returns the data updated in the database.
     * @param {AppConfigUpdateManyAndReturnArgs} args - Arguments to update many AppConfigs.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppConfigs and only return the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AppConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppConfig.
     * @param {AppConfigUpsertArgs} args - Arguments to update or create a AppConfig.
     * @example
     * // Update or create a AppConfig
     * const appConfig = await prisma.appConfig.upsert({
     *   create: {
     *     // ... data to create a AppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfig we want to update
     *   }
     * })
     */
    upsert<T extends AppConfigUpsertArgs>(args: SelectSubset<T, AppConfigUpsertArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigCountArgs} args - Arguments to filter AppConfigs to count.
     * @example
     * // Count the number of AppConfigs
     * const count = await prisma.appConfig.count({
     *   where: {
     *     // ... the filter for the AppConfigs we want to count
     *   }
     * })
    **/
    count<T extends AppConfigCountArgs>(
      args?: Subset<T, AppConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppConfigAggregateArgs>(args: Subset<T, AppConfigAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAggregateType<T>>

    /**
     * Group by AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppConfigGroupByArgs['orderBy'] }
        : { orderBy?: AppConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppConfig model
   */
  readonly fields: AppConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppConfig model
   */
  interface AppConfigFieldRefs {
    readonly key: FieldRef<"AppConfig", 'String'>
    readonly value: FieldRef<"AppConfig", 'Float'>
    readonly unit: FieldRef<"AppConfig", 'String'>
    readonly description: FieldRef<"AppConfig", 'String'>
    readonly updated_at: FieldRef<"AppConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppConfig findUnique
   */
  export type AppConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findUniqueOrThrow
   */
  export type AppConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findFirst
   */
  export type AppConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findFirstOrThrow
   */
  export type AppConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findMany
   */
  export type AppConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfigs to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig create
   */
  export type AppConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AppConfig.
     */
    data: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
  }

  /**
   * AppConfig createMany
   */
  export type AppConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig createManyAndReturn
   */
  export type AppConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig update
   */
  export type AppConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AppConfig.
     */
    data: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
    /**
     * Choose, which AppConfig to update.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig updateMany
   */
  export type AppConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to update.
     */
    limit?: number
  }

  /**
   * AppConfig updateManyAndReturn
   */
  export type AppConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to update.
     */
    limit?: number
  }

  /**
   * AppConfig upsert
   */
  export type AppConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AppConfig to update in case it exists.
     */
    where: AppConfigWhereUniqueInput
    /**
     * In case the AppConfig found by the `where` argument doesn't exist, create a new AppConfig with this data.
     */
    create: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
    /**
     * In case the AppConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
  }

  /**
   * AppConfig delete
   */
  export type AppConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter which AppConfig to delete.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig deleteMany
   */
  export type AppConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfigs to delete
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to delete.
     */
    limit?: number
  }

  /**
   * AppConfig without action
   */
  export type AppConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
  }


  /**
   * Model SystemFlag
   */

  export type AggregateSystemFlag = {
    _count: SystemFlagCountAggregateOutputType | null
    _min: SystemFlagMinAggregateOutputType | null
    _max: SystemFlagMaxAggregateOutputType | null
  }

  export type SystemFlagMinAggregateOutputType = {
    id: string | null
    renders_enabled: boolean | null
    dewatermark_enabled: boolean | null
    scrape_enabled: boolean | null
    updated_at: Date | null
  }

  export type SystemFlagMaxAggregateOutputType = {
    id: string | null
    renders_enabled: boolean | null
    dewatermark_enabled: boolean | null
    scrape_enabled: boolean | null
    updated_at: Date | null
  }

  export type SystemFlagCountAggregateOutputType = {
    id: number
    renders_enabled: number
    dewatermark_enabled: number
    scrape_enabled: number
    updated_at: number
    _all: number
  }


  export type SystemFlagMinAggregateInputType = {
    id?: true
    renders_enabled?: true
    dewatermark_enabled?: true
    scrape_enabled?: true
    updated_at?: true
  }

  export type SystemFlagMaxAggregateInputType = {
    id?: true
    renders_enabled?: true
    dewatermark_enabled?: true
    scrape_enabled?: true
    updated_at?: true
  }

  export type SystemFlagCountAggregateInputType = {
    id?: true
    renders_enabled?: true
    dewatermark_enabled?: true
    scrape_enabled?: true
    updated_at?: true
    _all?: true
  }

  export type SystemFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemFlag to aggregate.
     */
    where?: SystemFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemFlags to fetch.
     */
    orderBy?: SystemFlagOrderByWithRelationInput | SystemFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemFlags
    **/
    _count?: true | SystemFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemFlagMaxAggregateInputType
  }

  export type GetSystemFlagAggregateType<T extends SystemFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemFlag[P]>
      : GetScalarType<T[P], AggregateSystemFlag[P]>
  }




  export type SystemFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemFlagWhereInput
    orderBy?: SystemFlagOrderByWithAggregationInput | SystemFlagOrderByWithAggregationInput[]
    by: SystemFlagScalarFieldEnum[] | SystemFlagScalarFieldEnum
    having?: SystemFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemFlagCountAggregateInputType | true
    _min?: SystemFlagMinAggregateInputType
    _max?: SystemFlagMaxAggregateInputType
  }

  export type SystemFlagGroupByOutputType = {
    id: string
    renders_enabled: boolean
    dewatermark_enabled: boolean
    scrape_enabled: boolean
    updated_at: Date
    _count: SystemFlagCountAggregateOutputType | null
    _min: SystemFlagMinAggregateOutputType | null
    _max: SystemFlagMaxAggregateOutputType | null
  }

  type GetSystemFlagGroupByPayload<T extends SystemFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemFlagGroupByOutputType[P]>
            : GetScalarType<T[P], SystemFlagGroupByOutputType[P]>
        }
      >
    >


  export type SystemFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemFlag"]>

  export type SystemFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemFlag"]>

  export type SystemFlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemFlag"]>

  export type SystemFlagSelectScalar = {
    id?: boolean
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: boolean
  }

  export type SystemFlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "renders_enabled" | "dewatermark_enabled" | "scrape_enabled" | "updated_at", ExtArgs["result"]["systemFlag"]>

  export type $SystemFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemFlag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      renders_enabled: boolean
      dewatermark_enabled: boolean
      scrape_enabled: boolean
      updated_at: Date
    }, ExtArgs["result"]["systemFlag"]>
    composites: {}
  }

  type SystemFlagGetPayload<S extends boolean | null | undefined | SystemFlagDefaultArgs> = $Result.GetResult<Prisma.$SystemFlagPayload, S>

  type SystemFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemFlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemFlagCountAggregateInputType | true
    }

  export interface SystemFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemFlag'], meta: { name: 'SystemFlag' } }
    /**
     * Find zero or one SystemFlag that matches the filter.
     * @param {SystemFlagFindUniqueArgs} args - Arguments to find a SystemFlag
     * @example
     * // Get one SystemFlag
     * const systemFlag = await prisma.systemFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemFlagFindUniqueArgs>(args: SelectSubset<T, SystemFlagFindUniqueArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemFlag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemFlagFindUniqueOrThrowArgs} args - Arguments to find a SystemFlag
     * @example
     * // Get one SystemFlag
     * const systemFlag = await prisma.systemFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagFindFirstArgs} args - Arguments to find a SystemFlag
     * @example
     * // Get one SystemFlag
     * const systemFlag = await prisma.systemFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemFlagFindFirstArgs>(args?: SelectSubset<T, SystemFlagFindFirstArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagFindFirstOrThrowArgs} args - Arguments to find a SystemFlag
     * @example
     * // Get one SystemFlag
     * const systemFlag = await prisma.systemFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemFlags
     * const systemFlags = await prisma.systemFlag.findMany()
     * 
     * // Get first 10 SystemFlags
     * const systemFlags = await prisma.systemFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemFlagWithIdOnly = await prisma.systemFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemFlagFindManyArgs>(args?: SelectSubset<T, SystemFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemFlag.
     * @param {SystemFlagCreateArgs} args - Arguments to create a SystemFlag.
     * @example
     * // Create one SystemFlag
     * const SystemFlag = await prisma.systemFlag.create({
     *   data: {
     *     // ... data to create a SystemFlag
     *   }
     * })
     * 
     */
    create<T extends SystemFlagCreateArgs>(args: SelectSubset<T, SystemFlagCreateArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemFlags.
     * @param {SystemFlagCreateManyArgs} args - Arguments to create many SystemFlags.
     * @example
     * // Create many SystemFlags
     * const systemFlag = await prisma.systemFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemFlagCreateManyArgs>(args?: SelectSubset<T, SystemFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemFlags and returns the data saved in the database.
     * @param {SystemFlagCreateManyAndReturnArgs} args - Arguments to create many SystemFlags.
     * @example
     * // Create many SystemFlags
     * const systemFlag = await prisma.systemFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemFlags and only return the `id`
     * const systemFlagWithIdOnly = await prisma.systemFlag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemFlag.
     * @param {SystemFlagDeleteArgs} args - Arguments to delete one SystemFlag.
     * @example
     * // Delete one SystemFlag
     * const SystemFlag = await prisma.systemFlag.delete({
     *   where: {
     *     // ... filter to delete one SystemFlag
     *   }
     * })
     * 
     */
    delete<T extends SystemFlagDeleteArgs>(args: SelectSubset<T, SystemFlagDeleteArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemFlag.
     * @param {SystemFlagUpdateArgs} args - Arguments to update one SystemFlag.
     * @example
     * // Update one SystemFlag
     * const systemFlag = await prisma.systemFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemFlagUpdateArgs>(args: SelectSubset<T, SystemFlagUpdateArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemFlags.
     * @param {SystemFlagDeleteManyArgs} args - Arguments to filter SystemFlags to delete.
     * @example
     * // Delete a few SystemFlags
     * const { count } = await prisma.systemFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemFlagDeleteManyArgs>(args?: SelectSubset<T, SystemFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemFlags
     * const systemFlag = await prisma.systemFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemFlagUpdateManyArgs>(args: SelectSubset<T, SystemFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemFlags and returns the data updated in the database.
     * @param {SystemFlagUpdateManyAndReturnArgs} args - Arguments to update many SystemFlags.
     * @example
     * // Update many SystemFlags
     * const systemFlag = await prisma.systemFlag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemFlags and only return the `id`
     * const systemFlagWithIdOnly = await prisma.systemFlag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemFlagUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemFlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemFlag.
     * @param {SystemFlagUpsertArgs} args - Arguments to update or create a SystemFlag.
     * @example
     * // Update or create a SystemFlag
     * const systemFlag = await prisma.systemFlag.upsert({
     *   create: {
     *     // ... data to create a SystemFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemFlag we want to update
     *   }
     * })
     */
    upsert<T extends SystemFlagUpsertArgs>(args: SelectSubset<T, SystemFlagUpsertArgs<ExtArgs>>): Prisma__SystemFlagClient<$Result.GetResult<Prisma.$SystemFlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagCountArgs} args - Arguments to filter SystemFlags to count.
     * @example
     * // Count the number of SystemFlags
     * const count = await prisma.systemFlag.count({
     *   where: {
     *     // ... the filter for the SystemFlags we want to count
     *   }
     * })
    **/
    count<T extends SystemFlagCountArgs>(
      args?: Subset<T, SystemFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemFlagAggregateArgs>(args: Subset<T, SystemFlagAggregateArgs>): Prisma.PrismaPromise<GetSystemFlagAggregateType<T>>

    /**
     * Group by SystemFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemFlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemFlagGroupByArgs['orderBy'] }
        : { orderBy?: SystemFlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemFlag model
   */
  readonly fields: SystemFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemFlag model
   */
  interface SystemFlagFieldRefs {
    readonly id: FieldRef<"SystemFlag", 'String'>
    readonly renders_enabled: FieldRef<"SystemFlag", 'Boolean'>
    readonly dewatermark_enabled: FieldRef<"SystemFlag", 'Boolean'>
    readonly scrape_enabled: FieldRef<"SystemFlag", 'Boolean'>
    readonly updated_at: FieldRef<"SystemFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemFlag findUnique
   */
  export type SystemFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter, which SystemFlag to fetch.
     */
    where: SystemFlagWhereUniqueInput
  }

  /**
   * SystemFlag findUniqueOrThrow
   */
  export type SystemFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter, which SystemFlag to fetch.
     */
    where: SystemFlagWhereUniqueInput
  }

  /**
   * SystemFlag findFirst
   */
  export type SystemFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter, which SystemFlag to fetch.
     */
    where?: SystemFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemFlags to fetch.
     */
    orderBy?: SystemFlagOrderByWithRelationInput | SystemFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemFlags.
     */
    cursor?: SystemFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemFlags.
     */
    distinct?: SystemFlagScalarFieldEnum | SystemFlagScalarFieldEnum[]
  }

  /**
   * SystemFlag findFirstOrThrow
   */
  export type SystemFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter, which SystemFlag to fetch.
     */
    where?: SystemFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemFlags to fetch.
     */
    orderBy?: SystemFlagOrderByWithRelationInput | SystemFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemFlags.
     */
    cursor?: SystemFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemFlags.
     */
    distinct?: SystemFlagScalarFieldEnum | SystemFlagScalarFieldEnum[]
  }

  /**
   * SystemFlag findMany
   */
  export type SystemFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter, which SystemFlags to fetch.
     */
    where?: SystemFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemFlags to fetch.
     */
    orderBy?: SystemFlagOrderByWithRelationInput | SystemFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemFlags.
     */
    cursor?: SystemFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemFlags.
     */
    skip?: number
    distinct?: SystemFlagScalarFieldEnum | SystemFlagScalarFieldEnum[]
  }

  /**
   * SystemFlag create
   */
  export type SystemFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemFlag.
     */
    data: XOR<SystemFlagCreateInput, SystemFlagUncheckedCreateInput>
  }

  /**
   * SystemFlag createMany
   */
  export type SystemFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemFlags.
     */
    data: SystemFlagCreateManyInput | SystemFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemFlag createManyAndReturn
   */
  export type SystemFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * The data used to create many SystemFlags.
     */
    data: SystemFlagCreateManyInput | SystemFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemFlag update
   */
  export type SystemFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemFlag.
     */
    data: XOR<SystemFlagUpdateInput, SystemFlagUncheckedUpdateInput>
    /**
     * Choose, which SystemFlag to update.
     */
    where: SystemFlagWhereUniqueInput
  }

  /**
   * SystemFlag updateMany
   */
  export type SystemFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemFlags.
     */
    data: XOR<SystemFlagUpdateManyMutationInput, SystemFlagUncheckedUpdateManyInput>
    /**
     * Filter which SystemFlags to update
     */
    where?: SystemFlagWhereInput
    /**
     * Limit how many SystemFlags to update.
     */
    limit?: number
  }

  /**
   * SystemFlag updateManyAndReturn
   */
  export type SystemFlagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * The data used to update SystemFlags.
     */
    data: XOR<SystemFlagUpdateManyMutationInput, SystemFlagUncheckedUpdateManyInput>
    /**
     * Filter which SystemFlags to update
     */
    where?: SystemFlagWhereInput
    /**
     * Limit how many SystemFlags to update.
     */
    limit?: number
  }

  /**
   * SystemFlag upsert
   */
  export type SystemFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemFlag to update in case it exists.
     */
    where: SystemFlagWhereUniqueInput
    /**
     * In case the SystemFlag found by the `where` argument doesn't exist, create a new SystemFlag with this data.
     */
    create: XOR<SystemFlagCreateInput, SystemFlagUncheckedCreateInput>
    /**
     * In case the SystemFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemFlagUpdateInput, SystemFlagUncheckedUpdateInput>
  }

  /**
   * SystemFlag delete
   */
  export type SystemFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
    /**
     * Filter which SystemFlag to delete.
     */
    where: SystemFlagWhereUniqueInput
  }

  /**
   * SystemFlag deleteMany
   */
  export type SystemFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemFlags to delete
     */
    where?: SystemFlagWhereInput
    /**
     * Limit how many SystemFlags to delete.
     */
    limit?: number
  }

  /**
   * SystemFlag without action
   */
  export type SystemFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemFlag
     */
    select?: SystemFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemFlag
     */
    omit?: SystemFlagOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    email_verified_at: 'email_verified_at',
    monthly_video_quota: 'monthly_video_quota',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token_hash: 'token_hash',
    family_id: 'family_id',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at',
    user_agent: 'user_agent',
    ip: 'ip',
    created_at: 'created_at'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const EmailVerificationTokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token_hash: 'token_hash',
    expires_at: 'expires_at',
    used_at: 'used_at',
    created_at: 'created_at'
  };

  export type EmailVerificationTokenScalarFieldEnum = (typeof EmailVerificationTokenScalarFieldEnum)[keyof typeof EmailVerificationTokenScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token_hash: 'token_hash',
    expires_at: 'expires_at',
    used_at: 'used_at',
    created_at: 'created_at'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    source_type: 'source_type',
    source_url: 'source_url',
    status: 'status',
    render_step: 'render_step',
    partial: 'partial',
    failure_reason: 'failure_reason',
    failure_code: 'failure_code',
    scrape_error: 'scrape_error',
    title: 'title',
    subtitle: 'subtitle',
    location_line: 'location_line',
    closing_line: 'closing_line',
    music_enabled: 'music_enabled',
    rights_attested_at: 'rights_attested_at',
    submitted_at: 'submitted_at',
    completed_at: 'completed_at',
    render_started_at: 'render_started_at',
    quota_charged: 'quota_charged',
    video_gcs_path: 'video_gcs_path',
    poster_gcs_path: 'poster_gcs_path',
    duration_seconds: 'duration_seconds',
    clips_total: 'clips_total',
    clips_done: 'clips_done',
    skipped_image_ids: 'skipped_image_ids',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    position: 'position',
    gcs_original_path: 'gcs_original_path',
    gcs_processed_path: 'gcs_processed_path',
    gcs_thumb_path: 'gcs_thumb_path',
    width: 'width',
    height: 'height',
    bytes: 'bytes',
    content_hash: 'content_hash',
    source_url: 'source_url',
    room_type: 'room_type',
    use_processed: 'use_processed',
    wm_status: 'wm_status',
    wm_attempts: 'wm_attempts',
    removed: 'removed',
    ready: 'ready',
    higgsfield_media_id: 'higgsfield_media_id',
    clip_job_id: 'clip_job_id',
    clip_status: 'clip_status',
    clip_result_url: 'clip_result_url',
    clip_gcs_path: 'clip_gcs_path',
    created_at: 'created_at'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const ConsentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    project_id: 'project_id',
    type: 'type',
    accepted_at: 'accepted_at',
    ip: 'ip'
  };

  export type ConsentScalarFieldEnum = (typeof ConsentScalarFieldEnum)[keyof typeof ConsentScalarFieldEnum]


  export const JobEventScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    job_name: 'job_name',
    bullmq_job_id: 'bullmq_job_id',
    step: 'step',
    status: 'status',
    message: 'message',
    created_at: 'created_at'
  };

  export type JobEventScalarFieldEnum = (typeof JobEventScalarFieldEnum)[keyof typeof JobEventScalarFieldEnum]


  export const UsageLedgerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    project_id: 'project_id',
    kind: 'kind',
    quota_units: 'quota_units',
    provider_units: 'provider_units',
    credits: 'credits',
    cost_usd: 'cost_usd',
    cost_estimated: 'cost_estimated',
    note: 'note',
    created_at: 'created_at'
  };

  export type UsageLedgerScalarFieldEnum = (typeof UsageLedgerScalarFieldEnum)[keyof typeof UsageLedgerScalarFieldEnum]


  export const AppConfigScalarFieldEnum: {
    key: 'key',
    value: 'value',
    unit: 'unit',
    description: 'description',
    updated_at: 'updated_at'
  };

  export type AppConfigScalarFieldEnum = (typeof AppConfigScalarFieldEnum)[keyof typeof AppConfigScalarFieldEnum]


  export const SystemFlagScalarFieldEnum: {
    id: 'id',
    renders_enabled: 'renders_enabled',
    dewatermark_enabled: 'dewatermark_enabled',
    scrape_enabled: 'scrape_enabled',
    updated_at: 'updated_at'
  };

  export type SystemFlagScalarFieldEnum = (typeof SystemFlagScalarFieldEnum)[keyof typeof SystemFlagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthRole'
   */
  export type EnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole'>
    


  /**
   * Reference to a field of type 'AuthRole[]'
   */
  export type ListEnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'RenderStep'
   */
  export type EnumRenderStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RenderStep'>
    


  /**
   * Reference to a field of type 'RenderStep[]'
   */
  export type ListEnumRenderStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RenderStep[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RoomType'
   */
  export type EnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType'>
    


  /**
   * Reference to a field of type 'RoomType[]'
   */
  export type ListEnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType[]'>
    


  /**
   * Reference to a field of type 'WatermarkStatus'
   */
  export type EnumWatermarkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WatermarkStatus'>
    


  /**
   * Reference to a field of type 'WatermarkStatus[]'
   */
  export type ListEnumWatermarkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WatermarkStatus[]'>
    


  /**
   * Reference to a field of type 'ClipStatus'
   */
  export type EnumClipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClipStatus'>
    


  /**
   * Reference to a field of type 'ClipStatus[]'
   */
  export type ListEnumClipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClipStatus[]'>
    


  /**
   * Reference to a field of type 'ConsentType'
   */
  export type EnumConsentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentType'>
    


  /**
   * Reference to a field of type 'ConsentType[]'
   */
  export type ListEnumConsentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentType[]'>
    


  /**
   * Reference to a field of type 'LedgerKind'
   */
  export type EnumLedgerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerKind'>
    


  /**
   * Reference to a field of type 'LedgerKind[]'
   */
  export type ListEnumLedgerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerKind[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    email_verified_at?: DateTimeNullableFilter<"User"> | Date | string | null
    monthly_video_quota?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    refresh_tokens?: RefreshTokenListRelationFilter
    password_reset_tokens?: PasswordResetTokenListRelationFilter
    email_verification_tokens?: EmailVerificationTokenListRelationFilter
    projects?: ProjectListRelationFilter
    consents?: ConsentListRelationFilter
    usage_ledger?: UsageLedgerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    monthly_video_quota?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    refresh_tokens?: RefreshTokenOrderByRelationAggregateInput
    password_reset_tokens?: PasswordResetTokenOrderByRelationAggregateInput
    email_verification_tokens?: EmailVerificationTokenOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    consents?: ConsentOrderByRelationAggregateInput
    usage_ledger?: UsageLedgerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    email_verified_at?: DateTimeNullableFilter<"User"> | Date | string | null
    monthly_video_quota?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    refresh_tokens?: RefreshTokenListRelationFilter
    password_reset_tokens?: PasswordResetTokenListRelationFilter
    email_verification_tokens?: EmailVerificationTokenListRelationFilter
    projects?: ProjectListRelationFilter
    consents?: ConsentListRelationFilter
    usage_ledger?: UsageLedgerListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    monthly_video_quota?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumAuthRoleWithAggregatesFilter<"User"> | $Enums.AuthRole
    email_verified_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    monthly_video_quota?: IntWithAggregatesFilter<"User"> | number
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    token_hash?: StringFilter<"RefreshToken"> | string
    family_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    family_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token_hash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    user_id?: StringFilter<"RefreshToken"> | string
    family_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token_hash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    family_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    user_id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token_hash?: StringWithAggregatesFilter<"RefreshToken"> | string
    family_id?: StringWithAggregatesFilter<"RefreshToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    user_agent?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    ip?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type EmailVerificationTokenWhereInput = {
    AND?: EmailVerificationTokenWhereInput | EmailVerificationTokenWhereInput[]
    OR?: EmailVerificationTokenWhereInput[]
    NOT?: EmailVerificationTokenWhereInput | EmailVerificationTokenWhereInput[]
    id?: StringFilter<"EmailVerificationToken"> | string
    user_id?: StringFilter<"EmailVerificationToken"> | string
    token_hash?: StringFilter<"EmailVerificationToken"> | string
    expires_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
    used_at?: DateTimeNullableFilter<"EmailVerificationToken"> | Date | string | null
    created_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailVerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailVerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token_hash?: string
    AND?: EmailVerificationTokenWhereInput | EmailVerificationTokenWhereInput[]
    OR?: EmailVerificationTokenWhereInput[]
    NOT?: EmailVerificationTokenWhereInput | EmailVerificationTokenWhereInput[]
    user_id?: StringFilter<"EmailVerificationToken"> | string
    expires_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
    used_at?: DateTimeNullableFilter<"EmailVerificationToken"> | Date | string | null
    created_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token_hash">

  export type EmailVerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: EmailVerificationTokenCountOrderByAggregateInput
    _max?: EmailVerificationTokenMaxOrderByAggregateInput
    _min?: EmailVerificationTokenMinOrderByAggregateInput
  }

  export type EmailVerificationTokenScalarWhereWithAggregatesInput = {
    AND?: EmailVerificationTokenScalarWhereWithAggregatesInput | EmailVerificationTokenScalarWhereWithAggregatesInput[]
    OR?: EmailVerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: EmailVerificationTokenScalarWhereWithAggregatesInput | EmailVerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailVerificationToken"> | string
    user_id?: StringWithAggregatesFilter<"EmailVerificationToken"> | string
    token_hash?: StringWithAggregatesFilter<"EmailVerificationToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"EmailVerificationToken"> | Date | string
    used_at?: DateTimeNullableWithAggregatesFilter<"EmailVerificationToken"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"EmailVerificationToken"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    user_id?: StringFilter<"PasswordResetToken"> | string
    token_hash?: StringFilter<"PasswordResetToken"> | string
    expires_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    created_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token_hash?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    user_id?: StringFilter<"PasswordResetToken"> | string
    expires_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    created_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token_hash">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    user_id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token_hash?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    used_at?: DateTimeNullableWithAggregatesFilter<"PasswordResetToken"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    user_id?: StringFilter<"Project"> | string
    source_type?: EnumSourceTypeFilter<"Project"> | $Enums.SourceType
    source_url?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    render_step?: EnumRenderStepNullableFilter<"Project"> | $Enums.RenderStep | null
    partial?: BoolFilter<"Project"> | boolean
    failure_reason?: StringNullableFilter<"Project"> | string | null
    failure_code?: StringNullableFilter<"Project"> | string | null
    scrape_error?: StringNullableFilter<"Project"> | string | null
    title?: StringFilter<"Project"> | string
    subtitle?: StringNullableFilter<"Project"> | string | null
    location_line?: StringNullableFilter<"Project"> | string | null
    closing_line?: StringNullableFilter<"Project"> | string | null
    music_enabled?: BoolFilter<"Project"> | boolean
    rights_attested_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    submitted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    render_started_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    quota_charged?: BoolFilter<"Project"> | boolean
    video_gcs_path?: StringNullableFilter<"Project"> | string | null
    poster_gcs_path?: StringNullableFilter<"Project"> | string | null
    duration_seconds?: FloatNullableFilter<"Project"> | number | null
    clips_total?: IntFilter<"Project"> | number
    clips_done?: IntFilter<"Project"> | number
    skipped_image_ids?: StringNullableListFilter<"Project">
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    images?: ImageListRelationFilter
    consents?: ConsentListRelationFilter
    job_events?: JobEventListRelationFilter
    usage_ledger?: UsageLedgerListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    source_type?: SortOrder
    source_url?: SortOrderInput | SortOrder
    status?: SortOrder
    render_step?: SortOrderInput | SortOrder
    partial?: SortOrder
    failure_reason?: SortOrderInput | SortOrder
    failure_code?: SortOrderInput | SortOrder
    scrape_error?: SortOrderInput | SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    location_line?: SortOrderInput | SortOrder
    closing_line?: SortOrderInput | SortOrder
    music_enabled?: SortOrder
    rights_attested_at?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    render_started_at?: SortOrderInput | SortOrder
    quota_charged?: SortOrder
    video_gcs_path?: SortOrderInput | SortOrder
    poster_gcs_path?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
    skipped_image_ids?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    images?: ImageOrderByRelationAggregateInput
    consents?: ConsentOrderByRelationAggregateInput
    job_events?: JobEventOrderByRelationAggregateInput
    usage_ledger?: UsageLedgerOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    user_id?: StringFilter<"Project"> | string
    source_type?: EnumSourceTypeFilter<"Project"> | $Enums.SourceType
    source_url?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    render_step?: EnumRenderStepNullableFilter<"Project"> | $Enums.RenderStep | null
    partial?: BoolFilter<"Project"> | boolean
    failure_reason?: StringNullableFilter<"Project"> | string | null
    failure_code?: StringNullableFilter<"Project"> | string | null
    scrape_error?: StringNullableFilter<"Project"> | string | null
    title?: StringFilter<"Project"> | string
    subtitle?: StringNullableFilter<"Project"> | string | null
    location_line?: StringNullableFilter<"Project"> | string | null
    closing_line?: StringNullableFilter<"Project"> | string | null
    music_enabled?: BoolFilter<"Project"> | boolean
    rights_attested_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    submitted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    render_started_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    quota_charged?: BoolFilter<"Project"> | boolean
    video_gcs_path?: StringNullableFilter<"Project"> | string | null
    poster_gcs_path?: StringNullableFilter<"Project"> | string | null
    duration_seconds?: FloatNullableFilter<"Project"> | number | null
    clips_total?: IntFilter<"Project"> | number
    clips_done?: IntFilter<"Project"> | number
    skipped_image_ids?: StringNullableListFilter<"Project">
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    images?: ImageListRelationFilter
    consents?: ConsentListRelationFilter
    job_events?: JobEventListRelationFilter
    usage_ledger?: UsageLedgerListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    source_type?: SortOrder
    source_url?: SortOrderInput | SortOrder
    status?: SortOrder
    render_step?: SortOrderInput | SortOrder
    partial?: SortOrder
    failure_reason?: SortOrderInput | SortOrder
    failure_code?: SortOrderInput | SortOrder
    scrape_error?: SortOrderInput | SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    location_line?: SortOrderInput | SortOrder
    closing_line?: SortOrderInput | SortOrder
    music_enabled?: SortOrder
    rights_attested_at?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    render_started_at?: SortOrderInput | SortOrder
    quota_charged?: SortOrder
    video_gcs_path?: SortOrderInput | SortOrder
    poster_gcs_path?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
    skipped_image_ids?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    user_id?: StringWithAggregatesFilter<"Project"> | string
    source_type?: EnumSourceTypeWithAggregatesFilter<"Project"> | $Enums.SourceType
    source_url?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    render_step?: EnumRenderStepNullableWithAggregatesFilter<"Project"> | $Enums.RenderStep | null
    partial?: BoolWithAggregatesFilter<"Project"> | boolean
    failure_reason?: StringNullableWithAggregatesFilter<"Project"> | string | null
    failure_code?: StringNullableWithAggregatesFilter<"Project"> | string | null
    scrape_error?: StringNullableWithAggregatesFilter<"Project"> | string | null
    title?: StringWithAggregatesFilter<"Project"> | string
    subtitle?: StringNullableWithAggregatesFilter<"Project"> | string | null
    location_line?: StringNullableWithAggregatesFilter<"Project"> | string | null
    closing_line?: StringNullableWithAggregatesFilter<"Project"> | string | null
    music_enabled?: BoolWithAggregatesFilter<"Project"> | boolean
    rights_attested_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    submitted_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    render_started_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    quota_charged?: BoolWithAggregatesFilter<"Project"> | boolean
    video_gcs_path?: StringNullableWithAggregatesFilter<"Project"> | string | null
    poster_gcs_path?: StringNullableWithAggregatesFilter<"Project"> | string | null
    duration_seconds?: FloatNullableWithAggregatesFilter<"Project"> | number | null
    clips_total?: IntWithAggregatesFilter<"Project"> | number
    clips_done?: IntWithAggregatesFilter<"Project"> | number
    skipped_image_ids?: StringNullableListFilter<"Project">
    created_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
  }

  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: StringFilter<"Image"> | string
    project_id?: StringFilter<"Image"> | string
    position?: IntFilter<"Image"> | number
    gcs_original_path?: StringNullableFilter<"Image"> | string | null
    gcs_processed_path?: StringNullableFilter<"Image"> | string | null
    gcs_thumb_path?: StringNullableFilter<"Image"> | string | null
    width?: IntNullableFilter<"Image"> | number | null
    height?: IntNullableFilter<"Image"> | number | null
    bytes?: IntNullableFilter<"Image"> | number | null
    content_hash?: StringNullableFilter<"Image"> | string | null
    source_url?: StringNullableFilter<"Image"> | string | null
    room_type?: EnumRoomTypeFilter<"Image"> | $Enums.RoomType
    use_processed?: BoolFilter<"Image"> | boolean
    wm_status?: EnumWatermarkStatusFilter<"Image"> | $Enums.WatermarkStatus
    wm_attempts?: IntFilter<"Image"> | number
    removed?: BoolFilter<"Image"> | boolean
    ready?: BoolFilter<"Image"> | boolean
    higgsfield_media_id?: StringNullableFilter<"Image"> | string | null
    clip_job_id?: StringNullableFilter<"Image"> | string | null
    clip_status?: EnumClipStatusFilter<"Image"> | $Enums.ClipStatus
    clip_result_url?: StringNullableFilter<"Image"> | string | null
    clip_gcs_path?: StringNullableFilter<"Image"> | string | null
    created_at?: DateTimeFilter<"Image"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    position?: SortOrder
    gcs_original_path?: SortOrderInput | SortOrder
    gcs_processed_path?: SortOrderInput | SortOrder
    gcs_thumb_path?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    bytes?: SortOrderInput | SortOrder
    content_hash?: SortOrderInput | SortOrder
    source_url?: SortOrderInput | SortOrder
    room_type?: SortOrder
    use_processed?: SortOrder
    wm_status?: SortOrder
    wm_attempts?: SortOrder
    removed?: SortOrder
    ready?: SortOrder
    higgsfield_media_id?: SortOrderInput | SortOrder
    clip_job_id?: SortOrderInput | SortOrder
    clip_status?: SortOrder
    clip_result_url?: SortOrderInput | SortOrder
    clip_gcs_path?: SortOrderInput | SortOrder
    created_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    project_id?: StringFilter<"Image"> | string
    position?: IntFilter<"Image"> | number
    gcs_original_path?: StringNullableFilter<"Image"> | string | null
    gcs_processed_path?: StringNullableFilter<"Image"> | string | null
    gcs_thumb_path?: StringNullableFilter<"Image"> | string | null
    width?: IntNullableFilter<"Image"> | number | null
    height?: IntNullableFilter<"Image"> | number | null
    bytes?: IntNullableFilter<"Image"> | number | null
    content_hash?: StringNullableFilter<"Image"> | string | null
    source_url?: StringNullableFilter<"Image"> | string | null
    room_type?: EnumRoomTypeFilter<"Image"> | $Enums.RoomType
    use_processed?: BoolFilter<"Image"> | boolean
    wm_status?: EnumWatermarkStatusFilter<"Image"> | $Enums.WatermarkStatus
    wm_attempts?: IntFilter<"Image"> | number
    removed?: BoolFilter<"Image"> | boolean
    ready?: BoolFilter<"Image"> | boolean
    higgsfield_media_id?: StringNullableFilter<"Image"> | string | null
    clip_job_id?: StringNullableFilter<"Image"> | string | null
    clip_status?: EnumClipStatusFilter<"Image"> | $Enums.ClipStatus
    clip_result_url?: StringNullableFilter<"Image"> | string | null
    clip_gcs_path?: StringNullableFilter<"Image"> | string | null
    created_at?: DateTimeFilter<"Image"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    position?: SortOrder
    gcs_original_path?: SortOrderInput | SortOrder
    gcs_processed_path?: SortOrderInput | SortOrder
    gcs_thumb_path?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    bytes?: SortOrderInput | SortOrder
    content_hash?: SortOrderInput | SortOrder
    source_url?: SortOrderInput | SortOrder
    room_type?: SortOrder
    use_processed?: SortOrder
    wm_status?: SortOrder
    wm_attempts?: SortOrder
    removed?: SortOrder
    ready?: SortOrder
    higgsfield_media_id?: SortOrderInput | SortOrder
    clip_job_id?: SortOrderInput | SortOrder
    clip_status?: SortOrder
    clip_result_url?: SortOrderInput | SortOrder
    clip_gcs_path?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _avg?: ImageAvgOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
    _sum?: ImageSumOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Image"> | string
    project_id?: StringWithAggregatesFilter<"Image"> | string
    position?: IntWithAggregatesFilter<"Image"> | number
    gcs_original_path?: StringNullableWithAggregatesFilter<"Image"> | string | null
    gcs_processed_path?: StringNullableWithAggregatesFilter<"Image"> | string | null
    gcs_thumb_path?: StringNullableWithAggregatesFilter<"Image"> | string | null
    width?: IntNullableWithAggregatesFilter<"Image"> | number | null
    height?: IntNullableWithAggregatesFilter<"Image"> | number | null
    bytes?: IntNullableWithAggregatesFilter<"Image"> | number | null
    content_hash?: StringNullableWithAggregatesFilter<"Image"> | string | null
    source_url?: StringNullableWithAggregatesFilter<"Image"> | string | null
    room_type?: EnumRoomTypeWithAggregatesFilter<"Image"> | $Enums.RoomType
    use_processed?: BoolWithAggregatesFilter<"Image"> | boolean
    wm_status?: EnumWatermarkStatusWithAggregatesFilter<"Image"> | $Enums.WatermarkStatus
    wm_attempts?: IntWithAggregatesFilter<"Image"> | number
    removed?: BoolWithAggregatesFilter<"Image"> | boolean
    ready?: BoolWithAggregatesFilter<"Image"> | boolean
    higgsfield_media_id?: StringNullableWithAggregatesFilter<"Image"> | string | null
    clip_job_id?: StringNullableWithAggregatesFilter<"Image"> | string | null
    clip_status?: EnumClipStatusWithAggregatesFilter<"Image"> | $Enums.ClipStatus
    clip_result_url?: StringNullableWithAggregatesFilter<"Image"> | string | null
    clip_gcs_path?: StringNullableWithAggregatesFilter<"Image"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Image"> | Date | string
  }

  export type ConsentWhereInput = {
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    id?: StringFilter<"Consent"> | string
    user_id?: StringFilter<"Consent"> | string
    project_id?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    accepted_at?: DateTimeFilter<"Consent"> | Date | string
    ip?: StringNullableFilter<"Consent"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ConsentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    type?: SortOrder
    accepted_at?: SortOrder
    ip?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type ConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    user_id?: StringFilter<"Consent"> | string
    project_id?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    accepted_at?: DateTimeFilter<"Consent"> | Date | string
    ip?: StringNullableFilter<"Consent"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ConsentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    type?: SortOrder
    accepted_at?: SortOrder
    ip?: SortOrderInput | SortOrder
    _count?: ConsentCountOrderByAggregateInput
    _max?: ConsentMaxOrderByAggregateInput
    _min?: ConsentMinOrderByAggregateInput
  }

  export type ConsentScalarWhereWithAggregatesInput = {
    AND?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    OR?: ConsentScalarWhereWithAggregatesInput[]
    NOT?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consent"> | string
    user_id?: StringWithAggregatesFilter<"Consent"> | string
    project_id?: StringWithAggregatesFilter<"Consent"> | string
    type?: EnumConsentTypeWithAggregatesFilter<"Consent"> | $Enums.ConsentType
    accepted_at?: DateTimeWithAggregatesFilter<"Consent"> | Date | string
    ip?: StringNullableWithAggregatesFilter<"Consent"> | string | null
  }

  export type JobEventWhereInput = {
    AND?: JobEventWhereInput | JobEventWhereInput[]
    OR?: JobEventWhereInput[]
    NOT?: JobEventWhereInput | JobEventWhereInput[]
    id?: StringFilter<"JobEvent"> | string
    project_id?: StringFilter<"JobEvent"> | string
    job_name?: StringFilter<"JobEvent"> | string
    bullmq_job_id?: StringNullableFilter<"JobEvent"> | string | null
    step?: StringNullableFilter<"JobEvent"> | string | null
    status?: StringFilter<"JobEvent"> | string
    message?: StringNullableFilter<"JobEvent"> | string | null
    created_at?: DateTimeFilter<"JobEvent"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type JobEventOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    job_name?: SortOrder
    bullmq_job_id?: SortOrderInput | SortOrder
    step?: SortOrderInput | SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type JobEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobEventWhereInput | JobEventWhereInput[]
    OR?: JobEventWhereInput[]
    NOT?: JobEventWhereInput | JobEventWhereInput[]
    project_id?: StringFilter<"JobEvent"> | string
    job_name?: StringFilter<"JobEvent"> | string
    bullmq_job_id?: StringNullableFilter<"JobEvent"> | string | null
    step?: StringNullableFilter<"JobEvent"> | string | null
    status?: StringFilter<"JobEvent"> | string
    message?: StringNullableFilter<"JobEvent"> | string | null
    created_at?: DateTimeFilter<"JobEvent"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type JobEventOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    job_name?: SortOrder
    bullmq_job_id?: SortOrderInput | SortOrder
    step?: SortOrderInput | SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: JobEventCountOrderByAggregateInput
    _max?: JobEventMaxOrderByAggregateInput
    _min?: JobEventMinOrderByAggregateInput
  }

  export type JobEventScalarWhereWithAggregatesInput = {
    AND?: JobEventScalarWhereWithAggregatesInput | JobEventScalarWhereWithAggregatesInput[]
    OR?: JobEventScalarWhereWithAggregatesInput[]
    NOT?: JobEventScalarWhereWithAggregatesInput | JobEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobEvent"> | string
    project_id?: StringWithAggregatesFilter<"JobEvent"> | string
    job_name?: StringWithAggregatesFilter<"JobEvent"> | string
    bullmq_job_id?: StringNullableWithAggregatesFilter<"JobEvent"> | string | null
    step?: StringNullableWithAggregatesFilter<"JobEvent"> | string | null
    status?: StringWithAggregatesFilter<"JobEvent"> | string
    message?: StringNullableWithAggregatesFilter<"JobEvent"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"JobEvent"> | Date | string
  }

  export type UsageLedgerWhereInput = {
    AND?: UsageLedgerWhereInput | UsageLedgerWhereInput[]
    OR?: UsageLedgerWhereInput[]
    NOT?: UsageLedgerWhereInput | UsageLedgerWhereInput[]
    id?: StringFilter<"UsageLedger"> | string
    user_id?: StringFilter<"UsageLedger"> | string
    project_id?: StringNullableFilter<"UsageLedger"> | string | null
    kind?: EnumLedgerKindFilter<"UsageLedger"> | $Enums.LedgerKind
    quota_units?: IntFilter<"UsageLedger"> | number
    provider_units?: FloatNullableFilter<"UsageLedger"> | number | null
    credits?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_usd?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_estimated?: BoolFilter<"UsageLedger"> | boolean
    note?: StringNullableFilter<"UsageLedger"> | string | null
    created_at?: DateTimeFilter<"UsageLedger"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type UsageLedgerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    kind?: SortOrder
    quota_units?: SortOrder
    provider_units?: SortOrderInput | SortOrder
    credits?: SortOrderInput | SortOrder
    cost_usd?: SortOrderInput | SortOrder
    cost_estimated?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type UsageLedgerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsageLedgerWhereInput | UsageLedgerWhereInput[]
    OR?: UsageLedgerWhereInput[]
    NOT?: UsageLedgerWhereInput | UsageLedgerWhereInput[]
    user_id?: StringFilter<"UsageLedger"> | string
    project_id?: StringNullableFilter<"UsageLedger"> | string | null
    kind?: EnumLedgerKindFilter<"UsageLedger"> | $Enums.LedgerKind
    quota_units?: IntFilter<"UsageLedger"> | number
    provider_units?: FloatNullableFilter<"UsageLedger"> | number | null
    credits?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_usd?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_estimated?: BoolFilter<"UsageLedger"> | boolean
    note?: StringNullableFilter<"UsageLedger"> | string | null
    created_at?: DateTimeFilter<"UsageLedger"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id">

  export type UsageLedgerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    kind?: SortOrder
    quota_units?: SortOrder
    provider_units?: SortOrderInput | SortOrder
    credits?: SortOrderInput | SortOrder
    cost_usd?: SortOrderInput | SortOrder
    cost_estimated?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: UsageLedgerCountOrderByAggregateInput
    _avg?: UsageLedgerAvgOrderByAggregateInput
    _max?: UsageLedgerMaxOrderByAggregateInput
    _min?: UsageLedgerMinOrderByAggregateInput
    _sum?: UsageLedgerSumOrderByAggregateInput
  }

  export type UsageLedgerScalarWhereWithAggregatesInput = {
    AND?: UsageLedgerScalarWhereWithAggregatesInput | UsageLedgerScalarWhereWithAggregatesInput[]
    OR?: UsageLedgerScalarWhereWithAggregatesInput[]
    NOT?: UsageLedgerScalarWhereWithAggregatesInput | UsageLedgerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageLedger"> | string
    user_id?: StringWithAggregatesFilter<"UsageLedger"> | string
    project_id?: StringNullableWithAggregatesFilter<"UsageLedger"> | string | null
    kind?: EnumLedgerKindWithAggregatesFilter<"UsageLedger"> | $Enums.LedgerKind
    quota_units?: IntWithAggregatesFilter<"UsageLedger"> | number
    provider_units?: FloatNullableWithAggregatesFilter<"UsageLedger"> | number | null
    credits?: FloatNullableWithAggregatesFilter<"UsageLedger"> | number | null
    cost_usd?: FloatNullableWithAggregatesFilter<"UsageLedger"> | number | null
    cost_estimated?: BoolWithAggregatesFilter<"UsageLedger"> | boolean
    note?: StringNullableWithAggregatesFilter<"UsageLedger"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"UsageLedger"> | Date | string
  }

  export type AppConfigWhereInput = {
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    key?: StringFilter<"AppConfig"> | string
    value?: FloatFilter<"AppConfig"> | number
    unit?: StringFilter<"AppConfig"> | string
    description?: StringNullableFilter<"AppConfig"> | string | null
    updated_at?: DateTimeFilter<"AppConfig"> | Date | string
  }

  export type AppConfigOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    unit?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
  }

  export type AppConfigWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    value?: FloatFilter<"AppConfig"> | number
    unit?: StringFilter<"AppConfig"> | string
    description?: StringNullableFilter<"AppConfig"> | string | null
    updated_at?: DateTimeFilter<"AppConfig"> | Date | string
  }, "key">

  export type AppConfigOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    unit?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: AppConfigCountOrderByAggregateInput
    _avg?: AppConfigAvgOrderByAggregateInput
    _max?: AppConfigMaxOrderByAggregateInput
    _min?: AppConfigMinOrderByAggregateInput
    _sum?: AppConfigSumOrderByAggregateInput
  }

  export type AppConfigScalarWhereWithAggregatesInput = {
    AND?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    OR?: AppConfigScalarWhereWithAggregatesInput[]
    NOT?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppConfig"> | string
    value?: FloatWithAggregatesFilter<"AppConfig"> | number
    unit?: StringWithAggregatesFilter<"AppConfig"> | string
    description?: StringNullableWithAggregatesFilter<"AppConfig"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"AppConfig"> | Date | string
  }

  export type SystemFlagWhereInput = {
    AND?: SystemFlagWhereInput | SystemFlagWhereInput[]
    OR?: SystemFlagWhereInput[]
    NOT?: SystemFlagWhereInput | SystemFlagWhereInput[]
    id?: StringFilter<"SystemFlag"> | string
    renders_enabled?: BoolFilter<"SystemFlag"> | boolean
    dewatermark_enabled?: BoolFilter<"SystemFlag"> | boolean
    scrape_enabled?: BoolFilter<"SystemFlag"> | boolean
    updated_at?: DateTimeFilter<"SystemFlag"> | Date | string
  }

  export type SystemFlagOrderByWithRelationInput = {
    id?: SortOrder
    renders_enabled?: SortOrder
    dewatermark_enabled?: SortOrder
    scrape_enabled?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemFlagWhereInput | SystemFlagWhereInput[]
    OR?: SystemFlagWhereInput[]
    NOT?: SystemFlagWhereInput | SystemFlagWhereInput[]
    renders_enabled?: BoolFilter<"SystemFlag"> | boolean
    dewatermark_enabled?: BoolFilter<"SystemFlag"> | boolean
    scrape_enabled?: BoolFilter<"SystemFlag"> | boolean
    updated_at?: DateTimeFilter<"SystemFlag"> | Date | string
  }, "id">

  export type SystemFlagOrderByWithAggregationInput = {
    id?: SortOrder
    renders_enabled?: SortOrder
    dewatermark_enabled?: SortOrder
    scrape_enabled?: SortOrder
    updated_at?: SortOrder
    _count?: SystemFlagCountOrderByAggregateInput
    _max?: SystemFlagMaxOrderByAggregateInput
    _min?: SystemFlagMinOrderByAggregateInput
  }

  export type SystemFlagScalarWhereWithAggregatesInput = {
    AND?: SystemFlagScalarWhereWithAggregatesInput | SystemFlagScalarWhereWithAggregatesInput[]
    OR?: SystemFlagScalarWhereWithAggregatesInput[]
    NOT?: SystemFlagScalarWhereWithAggregatesInput | SystemFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemFlag"> | string
    renders_enabled?: BoolWithAggregatesFilter<"SystemFlag"> | boolean
    dewatermark_enabled?: BoolWithAggregatesFilter<"SystemFlag"> | boolean
    scrape_enabled?: BoolWithAggregatesFilter<"SystemFlag"> | boolean
    updated_at?: DateTimeWithAggregatesFilter<"SystemFlag"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutRefresh_tokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefresh_tokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    user_id: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenCreateInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutEmail_verification_tokensInput
  }

  export type EmailVerificationTokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type EmailVerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmail_verification_tokensNestedInput
  }

  export type EmailVerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenCreateManyInput = {
    id?: string
    user_id: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type EmailVerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutPassword_reset_tokensInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPassword_reset_tokensNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    user_id: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProjectsInput
    images?: ImageCreateNestedManyWithoutProjectInput
    consents?: ConsentCreateNestedManyWithoutProjectInput
    job_events?: JobEventCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageUncheckedCreateNestedManyWithoutProjectInput
    consents?: ConsentUncheckedCreateNestedManyWithoutProjectInput
    job_events?: JobEventUncheckedCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    images?: ImageUpdateManyWithoutProjectNestedInput
    consents?: ConsentUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUncheckedUpdateManyWithoutProjectNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUncheckedUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImageCreateInput = {
    id?: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
    project: ProjectCreateNestedOneWithoutImagesInput
  }

  export type ImageUncheckedCreateInput = {
    id?: string
    project_id: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyInput = {
    id?: string
    project_id: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateInput = {
    id?: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
    user: UserCreateNestedOneWithoutConsentsInput
    project: ProjectCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateInput = {
    id?: string
    user_id: string
    project_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type ConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutConsentsNestedInput
    project?: ProjectUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentCreateManyInput = {
    id?: string
    user_id: string
    project_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type ConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobEventCreateInput = {
    id?: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
    project: ProjectCreateNestedOneWithoutJob_eventsInput
  }

  export type JobEventUncheckedCreateInput = {
    id?: string
    project_id: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
  }

  export type JobEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutJob_eventsNestedInput
  }

  export type JobEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEventCreateManyInput = {
    id?: string
    project_id: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
  }

  export type JobEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerCreateInput = {
    id?: string
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutUsage_ledgerInput
    project?: ProjectCreateNestedOneWithoutUsage_ledgerInput
  }

  export type UsageLedgerUncheckedCreateInput = {
    id?: string
    user_id: string
    project_id?: string | null
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type UsageLedgerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUsage_ledgerNestedInput
    project?: ProjectUpdateOneWithoutUsage_ledgerNestedInput
  }

  export type UsageLedgerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerCreateManyInput = {
    id?: string
    user_id: string
    project_id?: string | null
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type UsageLedgerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateInput = {
    key: string
    value: number
    unit: string
    description?: string | null
    updated_at?: Date | string
  }

  export type AppConfigUncheckedCreateInput = {
    key: string
    value: number
    unit: string
    description?: string | null
    updated_at?: Date | string
  }

  export type AppConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateManyInput = {
    key: string
    value: number
    unit: string
    description?: string | null
    updated_at?: Date | string
  }

  export type AppConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemFlagCreateInput = {
    id?: string
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: Date | string
  }

  export type SystemFlagUncheckedCreateInput = {
    id?: string
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: Date | string
  }

  export type SystemFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    renders_enabled?: BoolFieldUpdateOperationsInput | boolean
    dewatermark_enabled?: BoolFieldUpdateOperationsInput | boolean
    scrape_enabled?: BoolFieldUpdateOperationsInput | boolean
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    renders_enabled?: BoolFieldUpdateOperationsInput | boolean
    dewatermark_enabled?: BoolFieldUpdateOperationsInput | boolean
    scrape_enabled?: BoolFieldUpdateOperationsInput | boolean
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemFlagCreateManyInput = {
    id?: string
    renders_enabled?: boolean
    dewatermark_enabled?: boolean
    scrape_enabled?: boolean
    updated_at?: Date | string
  }

  export type SystemFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    renders_enabled?: BoolFieldUpdateOperationsInput | boolean
    dewatermark_enabled?: BoolFieldUpdateOperationsInput | boolean
    scrape_enabled?: BoolFieldUpdateOperationsInput | boolean
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    renders_enabled?: BoolFieldUpdateOperationsInput | boolean
    dewatermark_enabled?: BoolFieldUpdateOperationsInput | boolean
    scrape_enabled?: BoolFieldUpdateOperationsInput | boolean
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type EmailVerificationTokenListRelationFilter = {
    every?: EmailVerificationTokenWhereInput
    some?: EmailVerificationTokenWhereInput
    none?: EmailVerificationTokenWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ConsentListRelationFilter = {
    every?: ConsentWhereInput
    some?: ConsentWhereInput
    none?: ConsentWhereInput
  }

  export type UsageLedgerListRelationFilter = {
    every?: UsageLedgerWhereInput
    some?: UsageLedgerWhereInput
    none?: UsageLedgerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailVerificationTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLedgerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email_verified_at?: SortOrder
    monthly_video_quota?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    monthly_video_quota?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email_verified_at?: SortOrder
    monthly_video_quota?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email_verified_at?: SortOrder
    monthly_video_quota?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    monthly_video_quota?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    family_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    family_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    family_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EmailVerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type EmailVerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type EmailVerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type EnumRenderStepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RenderStep | EnumRenderStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRenderStepNullableFilter<$PrismaModel> | $Enums.RenderStep | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ImageListRelationFilter = {
    every?: ImageWhereInput
    some?: ImageWhereInput
    none?: ImageWhereInput
  }

  export type JobEventListRelationFilter = {
    every?: JobEventWhereInput
    some?: JobEventWhereInput
    none?: JobEventWhereInput
  }

  export type ImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source_type?: SortOrder
    source_url?: SortOrder
    status?: SortOrder
    render_step?: SortOrder
    partial?: SortOrder
    failure_reason?: SortOrder
    failure_code?: SortOrder
    scrape_error?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    location_line?: SortOrder
    closing_line?: SortOrder
    music_enabled?: SortOrder
    rights_attested_at?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    render_started_at?: SortOrder
    quota_charged?: SortOrder
    video_gcs_path?: SortOrder
    poster_gcs_path?: SortOrder
    duration_seconds?: SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
    skipped_image_ids?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    duration_seconds?: SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source_type?: SortOrder
    source_url?: SortOrder
    status?: SortOrder
    render_step?: SortOrder
    partial?: SortOrder
    failure_reason?: SortOrder
    failure_code?: SortOrder
    scrape_error?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    location_line?: SortOrder
    closing_line?: SortOrder
    music_enabled?: SortOrder
    rights_attested_at?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    render_started_at?: SortOrder
    quota_charged?: SortOrder
    video_gcs_path?: SortOrder
    poster_gcs_path?: SortOrder
    duration_seconds?: SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source_type?: SortOrder
    source_url?: SortOrder
    status?: SortOrder
    render_step?: SortOrder
    partial?: SortOrder
    failure_reason?: SortOrder
    failure_code?: SortOrder
    scrape_error?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    location_line?: SortOrder
    closing_line?: SortOrder
    music_enabled?: SortOrder
    rights_attested_at?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    render_started_at?: SortOrder
    quota_charged?: SortOrder
    video_gcs_path?: SortOrder
    poster_gcs_path?: SortOrder
    duration_seconds?: SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    duration_seconds?: SortOrder
    clips_total?: SortOrder
    clips_done?: SortOrder
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type EnumRenderStepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RenderStep | EnumRenderStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRenderStepNullableWithAggregatesFilter<$PrismaModel> | $Enums.RenderStep | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRenderStepNullableFilter<$PrismaModel>
    _max?: NestedEnumRenderStepNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type EnumWatermarkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WatermarkStatus | EnumWatermarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatermarkStatusFilter<$PrismaModel> | $Enums.WatermarkStatus
  }

  export type EnumClipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClipStatus | EnumClipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClipStatusFilter<$PrismaModel> | $Enums.ClipStatus
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    position?: SortOrder
    gcs_original_path?: SortOrder
    gcs_processed_path?: SortOrder
    gcs_thumb_path?: SortOrder
    width?: SortOrder
    height?: SortOrder
    bytes?: SortOrder
    content_hash?: SortOrder
    source_url?: SortOrder
    room_type?: SortOrder
    use_processed?: SortOrder
    wm_status?: SortOrder
    wm_attempts?: SortOrder
    removed?: SortOrder
    ready?: SortOrder
    higgsfield_media_id?: SortOrder
    clip_job_id?: SortOrder
    clip_status?: SortOrder
    clip_result_url?: SortOrder
    clip_gcs_path?: SortOrder
    created_at?: SortOrder
  }

  export type ImageAvgOrderByAggregateInput = {
    position?: SortOrder
    width?: SortOrder
    height?: SortOrder
    bytes?: SortOrder
    wm_attempts?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    position?: SortOrder
    gcs_original_path?: SortOrder
    gcs_processed_path?: SortOrder
    gcs_thumb_path?: SortOrder
    width?: SortOrder
    height?: SortOrder
    bytes?: SortOrder
    content_hash?: SortOrder
    source_url?: SortOrder
    room_type?: SortOrder
    use_processed?: SortOrder
    wm_status?: SortOrder
    wm_attempts?: SortOrder
    removed?: SortOrder
    ready?: SortOrder
    higgsfield_media_id?: SortOrder
    clip_job_id?: SortOrder
    clip_status?: SortOrder
    clip_result_url?: SortOrder
    clip_gcs_path?: SortOrder
    created_at?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    position?: SortOrder
    gcs_original_path?: SortOrder
    gcs_processed_path?: SortOrder
    gcs_thumb_path?: SortOrder
    width?: SortOrder
    height?: SortOrder
    bytes?: SortOrder
    content_hash?: SortOrder
    source_url?: SortOrder
    room_type?: SortOrder
    use_processed?: SortOrder
    wm_status?: SortOrder
    wm_attempts?: SortOrder
    removed?: SortOrder
    ready?: SortOrder
    higgsfield_media_id?: SortOrder
    clip_job_id?: SortOrder
    clip_status?: SortOrder
    clip_result_url?: SortOrder
    clip_gcs_path?: SortOrder
    created_at?: SortOrder
  }

  export type ImageSumOrderByAggregateInput = {
    position?: SortOrder
    width?: SortOrder
    height?: SortOrder
    bytes?: SortOrder
    wm_attempts?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type EnumWatermarkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WatermarkStatus | EnumWatermarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatermarkStatusWithAggregatesFilter<$PrismaModel> | $Enums.WatermarkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWatermarkStatusFilter<$PrismaModel>
    _max?: NestedEnumWatermarkStatusFilter<$PrismaModel>
  }

  export type EnumClipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClipStatus | EnumClipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClipStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClipStatusFilter<$PrismaModel>
    _max?: NestedEnumClipStatusFilter<$PrismaModel>
  }

  export type EnumConsentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeFilter<$PrismaModel> | $Enums.ConsentType
  }

  export type ConsentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    type?: SortOrder
    accepted_at?: SortOrder
    ip?: SortOrder
  }

  export type ConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    type?: SortOrder
    accepted_at?: SortOrder
    ip?: SortOrder
  }

  export type ConsentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    type?: SortOrder
    accepted_at?: SortOrder
    ip?: SortOrder
  }

  export type EnumConsentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentTypeFilter<$PrismaModel>
    _max?: NestedEnumConsentTypeFilter<$PrismaModel>
  }

  export type JobEventCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    job_name?: SortOrder
    bullmq_job_id?: SortOrder
    step?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type JobEventMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    job_name?: SortOrder
    bullmq_job_id?: SortOrder
    step?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type JobEventMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    job_name?: SortOrder
    bullmq_job_id?: SortOrder
    step?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type EnumLedgerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerKind | EnumLedgerKindFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerKindFilter<$PrismaModel> | $Enums.LedgerKind
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type UsageLedgerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    kind?: SortOrder
    quota_units?: SortOrder
    provider_units?: SortOrder
    credits?: SortOrder
    cost_usd?: SortOrder
    cost_estimated?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type UsageLedgerAvgOrderByAggregateInput = {
    quota_units?: SortOrder
    provider_units?: SortOrder
    credits?: SortOrder
    cost_usd?: SortOrder
  }

  export type UsageLedgerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    kind?: SortOrder
    quota_units?: SortOrder
    provider_units?: SortOrder
    credits?: SortOrder
    cost_usd?: SortOrder
    cost_estimated?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type UsageLedgerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    kind?: SortOrder
    quota_units?: SortOrder
    provider_units?: SortOrder
    credits?: SortOrder
    cost_usd?: SortOrder
    cost_estimated?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type UsageLedgerSumOrderByAggregateInput = {
    quota_units?: SortOrder
    provider_units?: SortOrder
    credits?: SortOrder
    cost_usd?: SortOrder
  }

  export type EnumLedgerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerKind | EnumLedgerKindFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerKindWithAggregatesFilter<$PrismaModel> | $Enums.LedgerKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLedgerKindFilter<$PrismaModel>
    _max?: NestedEnumLedgerKindFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AppConfigCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type AppConfigAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type AppConfigMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type AppConfigMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type AppConfigSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SystemFlagCountOrderByAggregateInput = {
    id?: SortOrder
    renders_enabled?: SortOrder
    dewatermark_enabled?: SortOrder
    scrape_enabled?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    renders_enabled?: SortOrder
    dewatermark_enabled?: SortOrder
    scrape_enabled?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemFlagMinOrderByAggregateInput = {
    id?: SortOrder
    renders_enabled?: SortOrder
    dewatermark_enabled?: SortOrder
    scrape_enabled?: SortOrder
    updated_at?: SortOrder
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type EmailVerificationTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput> | EmailVerificationTokenCreateWithoutUserInput[] | EmailVerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokenCreateOrConnectWithoutUserInput | EmailVerificationTokenCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationTokenCreateManyUserInputEnvelope
    connect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ConsentCreateNestedManyWithoutUserInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type UsageLedgerCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput> | UsageLedgerCreateWithoutUserInput[] | UsageLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutUserInput | UsageLedgerCreateOrConnectWithoutUserInput[]
    createMany?: UsageLedgerCreateManyUserInputEnvelope
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput> | EmailVerificationTokenCreateWithoutUserInput[] | EmailVerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokenCreateOrConnectWithoutUserInput | EmailVerificationTokenCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationTokenCreateManyUserInputEnvelope
    connect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type UsageLedgerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput> | UsageLedgerCreateWithoutUserInput[] | UsageLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutUserInput | UsageLedgerCreateOrConnectWithoutUserInput[]
    createMany?: UsageLedgerCreateManyUserInputEnvelope
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAuthRoleFieldUpdateOperationsInput = {
    set?: $Enums.AuthRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type EmailVerificationTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput> | EmailVerificationTokenCreateWithoutUserInput[] | EmailVerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokenCreateOrConnectWithoutUserInput | EmailVerificationTokenCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationTokenUpsertWithWhereUniqueWithoutUserInput | EmailVerificationTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationTokenCreateManyUserInputEnvelope
    set?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    disconnect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    delete?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    connect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    update?: EmailVerificationTokenUpdateWithWhereUniqueWithoutUserInput | EmailVerificationTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationTokenUpdateManyWithWhereWithoutUserInput | EmailVerificationTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationTokenScalarWhereInput | EmailVerificationTokenScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ConsentUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutUserInput | ConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutUserInput | ConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutUserInput | ConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type UsageLedgerUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput> | UsageLedgerCreateWithoutUserInput[] | UsageLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutUserInput | UsageLedgerCreateOrConnectWithoutUserInput[]
    upsert?: UsageLedgerUpsertWithWhereUniqueWithoutUserInput | UsageLedgerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLedgerCreateManyUserInputEnvelope
    set?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    disconnect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    delete?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    update?: UsageLedgerUpdateWithWhereUniqueWithoutUserInput | UsageLedgerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLedgerUpdateManyWithWhereWithoutUserInput | UsageLedgerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput> | EmailVerificationTokenCreateWithoutUserInput[] | EmailVerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokenCreateOrConnectWithoutUserInput | EmailVerificationTokenCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationTokenUpsertWithWhereUniqueWithoutUserInput | EmailVerificationTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationTokenCreateManyUserInputEnvelope
    set?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    disconnect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    delete?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    connect?: EmailVerificationTokenWhereUniqueInput | EmailVerificationTokenWhereUniqueInput[]
    update?: EmailVerificationTokenUpdateWithWhereUniqueWithoutUserInput | EmailVerificationTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationTokenUpdateManyWithWhereWithoutUserInput | EmailVerificationTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationTokenScalarWhereInput | EmailVerificationTokenScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutUserInput | ConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutUserInput | ConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutUserInput | ConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type UsageLedgerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput> | UsageLedgerCreateWithoutUserInput[] | UsageLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutUserInput | UsageLedgerCreateOrConnectWithoutUserInput[]
    upsert?: UsageLedgerUpsertWithWhereUniqueWithoutUserInput | UsageLedgerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLedgerCreateManyUserInputEnvelope
    set?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    disconnect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    delete?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    update?: UsageLedgerUpdateWithWhereUniqueWithoutUserInput | UsageLedgerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLedgerUpdateManyWithWhereWithoutUserInput | UsageLedgerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefresh_tokensInput = {
    create?: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefresh_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutRefresh_tokensNestedInput = {
    create?: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefresh_tokensInput
    upsert?: UserUpsertWithoutRefresh_tokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefresh_tokensInput, UserUpdateWithoutRefresh_tokensInput>, UserUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type UserCreateNestedOneWithoutEmail_verification_tokensInput = {
    create?: XOR<UserCreateWithoutEmail_verification_tokensInput, UserUncheckedCreateWithoutEmail_verification_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmail_verification_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmail_verification_tokensNestedInput = {
    create?: XOR<UserCreateWithoutEmail_verification_tokensInput, UserUncheckedCreateWithoutEmail_verification_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmail_verification_tokensInput
    upsert?: UserUpsertWithoutEmail_verification_tokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmail_verification_tokensInput, UserUpdateWithoutEmail_verification_tokensInput>, UserUncheckedUpdateWithoutEmail_verification_tokensInput>
  }

  export type UserCreateNestedOneWithoutPassword_reset_tokensInput = {
    create?: XOR<UserCreateWithoutPassword_reset_tokensInput, UserUncheckedCreateWithoutPassword_reset_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassword_reset_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPassword_reset_tokensNestedInput = {
    create?: XOR<UserCreateWithoutPassword_reset_tokensInput, UserUncheckedCreateWithoutPassword_reset_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassword_reset_tokensInput
    upsert?: UserUpsertWithoutPassword_reset_tokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPassword_reset_tokensInput, UserUpdateWithoutPassword_reset_tokensInput>, UserUncheckedUpdateWithoutPassword_reset_tokensInput>
  }

  export type ProjectCreateskipped_image_idsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ImageCreateNestedManyWithoutProjectInput = {
    create?: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput> | ImageCreateWithoutProjectInput[] | ImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutProjectInput | ImageCreateOrConnectWithoutProjectInput[]
    createMany?: ImageCreateManyProjectInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type ConsentCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput> | ConsentCreateWithoutProjectInput[] | ConsentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutProjectInput | ConsentCreateOrConnectWithoutProjectInput[]
    createMany?: ConsentCreateManyProjectInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type JobEventCreateNestedManyWithoutProjectInput = {
    create?: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput> | JobEventCreateWithoutProjectInput[] | JobEventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobEventCreateOrConnectWithoutProjectInput | JobEventCreateOrConnectWithoutProjectInput[]
    createMany?: JobEventCreateManyProjectInputEnvelope
    connect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
  }

  export type UsageLedgerCreateNestedManyWithoutProjectInput = {
    create?: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput> | UsageLedgerCreateWithoutProjectInput[] | UsageLedgerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutProjectInput | UsageLedgerCreateOrConnectWithoutProjectInput[]
    createMany?: UsageLedgerCreateManyProjectInputEnvelope
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
  }

  export type ImageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput> | ImageCreateWithoutProjectInput[] | ImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutProjectInput | ImageCreateOrConnectWithoutProjectInput[]
    createMany?: ImageCreateManyProjectInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput> | ConsentCreateWithoutProjectInput[] | ConsentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutProjectInput | ConsentCreateOrConnectWithoutProjectInput[]
    createMany?: ConsentCreateManyProjectInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type JobEventUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput> | JobEventCreateWithoutProjectInput[] | JobEventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobEventCreateOrConnectWithoutProjectInput | JobEventCreateOrConnectWithoutProjectInput[]
    createMany?: JobEventCreateManyProjectInputEnvelope
    connect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
  }

  export type UsageLedgerUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput> | UsageLedgerCreateWithoutProjectInput[] | UsageLedgerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutProjectInput | UsageLedgerCreateOrConnectWithoutProjectInput[]
    createMany?: UsageLedgerCreateManyProjectInputEnvelope
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableEnumRenderStepFieldUpdateOperationsInput = {
    set?: $Enums.RenderStep | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateskipped_image_idsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ImageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput> | ImageCreateWithoutProjectInput[] | ImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutProjectInput | ImageCreateOrConnectWithoutProjectInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutProjectInput | ImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ImageCreateManyProjectInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutProjectInput | ImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutProjectInput | ImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type ConsentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput> | ConsentCreateWithoutProjectInput[] | ConsentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutProjectInput | ConsentCreateOrConnectWithoutProjectInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutProjectInput | ConsentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConsentCreateManyProjectInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutProjectInput | ConsentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutProjectInput | ConsentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type JobEventUpdateManyWithoutProjectNestedInput = {
    create?: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput> | JobEventCreateWithoutProjectInput[] | JobEventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobEventCreateOrConnectWithoutProjectInput | JobEventCreateOrConnectWithoutProjectInput[]
    upsert?: JobEventUpsertWithWhereUniqueWithoutProjectInput | JobEventUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: JobEventCreateManyProjectInputEnvelope
    set?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    disconnect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    delete?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    connect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    update?: JobEventUpdateWithWhereUniqueWithoutProjectInput | JobEventUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: JobEventUpdateManyWithWhereWithoutProjectInput | JobEventUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: JobEventScalarWhereInput | JobEventScalarWhereInput[]
  }

  export type UsageLedgerUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput> | UsageLedgerCreateWithoutProjectInput[] | UsageLedgerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutProjectInput | UsageLedgerCreateOrConnectWithoutProjectInput[]
    upsert?: UsageLedgerUpsertWithWhereUniqueWithoutProjectInput | UsageLedgerUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UsageLedgerCreateManyProjectInputEnvelope
    set?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    disconnect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    delete?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    update?: UsageLedgerUpdateWithWhereUniqueWithoutProjectInput | UsageLedgerUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UsageLedgerUpdateManyWithWhereWithoutProjectInput | UsageLedgerUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
  }

  export type ImageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput> | ImageCreateWithoutProjectInput[] | ImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutProjectInput | ImageCreateOrConnectWithoutProjectInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutProjectInput | ImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ImageCreateManyProjectInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutProjectInput | ImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutProjectInput | ImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput> | ConsentCreateWithoutProjectInput[] | ConsentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutProjectInput | ConsentCreateOrConnectWithoutProjectInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutProjectInput | ConsentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ConsentCreateManyProjectInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutProjectInput | ConsentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutProjectInput | ConsentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type JobEventUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput> | JobEventCreateWithoutProjectInput[] | JobEventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobEventCreateOrConnectWithoutProjectInput | JobEventCreateOrConnectWithoutProjectInput[]
    upsert?: JobEventUpsertWithWhereUniqueWithoutProjectInput | JobEventUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: JobEventCreateManyProjectInputEnvelope
    set?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    disconnect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    delete?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    connect?: JobEventWhereUniqueInput | JobEventWhereUniqueInput[]
    update?: JobEventUpdateWithWhereUniqueWithoutProjectInput | JobEventUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: JobEventUpdateManyWithWhereWithoutProjectInput | JobEventUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: JobEventScalarWhereInput | JobEventScalarWhereInput[]
  }

  export type UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput> | UsageLedgerCreateWithoutProjectInput[] | UsageLedgerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLedgerCreateOrConnectWithoutProjectInput | UsageLedgerCreateOrConnectWithoutProjectInput[]
    upsert?: UsageLedgerUpsertWithWhereUniqueWithoutProjectInput | UsageLedgerUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UsageLedgerCreateManyProjectInputEnvelope
    set?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    disconnect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    delete?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    connect?: UsageLedgerWhereUniqueInput | UsageLedgerWhereUniqueInput[]
    update?: UsageLedgerUpdateWithWhereUniqueWithoutProjectInput | UsageLedgerUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UsageLedgerUpdateManyWithWhereWithoutProjectInput | UsageLedgerUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutImagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoomTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoomType
  }

  export type EnumWatermarkStatusFieldUpdateOperationsInput = {
    set?: $Enums.WatermarkStatus
  }

  export type EnumClipStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClipStatus
  }

  export type ProjectUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutImagesInput
    upsert?: ProjectUpsertWithoutImagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutImagesInput, ProjectUpdateWithoutImagesInput>, ProjectUncheckedUpdateWithoutImagesInput>
  }

  export type UserCreateNestedOneWithoutConsentsInput = {
    create?: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutConsentsInput = {
    create?: XOR<ProjectCreateWithoutConsentsInput, ProjectUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConsentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumConsentTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConsentType
  }

  export type UserUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsInput
    upsert?: UserUpsertWithoutConsentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsentsInput, UserUpdateWithoutConsentsInput>, UserUncheckedUpdateWithoutConsentsInput>
  }

  export type ProjectUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<ProjectCreateWithoutConsentsInput, ProjectUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConsentsInput
    upsert?: ProjectUpsertWithoutConsentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutConsentsInput, ProjectUpdateWithoutConsentsInput>, ProjectUncheckedUpdateWithoutConsentsInput>
  }

  export type ProjectCreateNestedOneWithoutJob_eventsInput = {
    create?: XOR<ProjectCreateWithoutJob_eventsInput, ProjectUncheckedCreateWithoutJob_eventsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutJob_eventsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutJob_eventsNestedInput = {
    create?: XOR<ProjectCreateWithoutJob_eventsInput, ProjectUncheckedCreateWithoutJob_eventsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutJob_eventsInput
    upsert?: ProjectUpsertWithoutJob_eventsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutJob_eventsInput, ProjectUpdateWithoutJob_eventsInput>, ProjectUncheckedUpdateWithoutJob_eventsInput>
  }

  export type UserCreateNestedOneWithoutUsage_ledgerInput = {
    create?: XOR<UserCreateWithoutUsage_ledgerInput, UserUncheckedCreateWithoutUsage_ledgerInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsage_ledgerInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutUsage_ledgerInput = {
    create?: XOR<ProjectCreateWithoutUsage_ledgerInput, ProjectUncheckedCreateWithoutUsage_ledgerInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutUsage_ledgerInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumLedgerKindFieldUpdateOperationsInput = {
    set?: $Enums.LedgerKind
  }

  export type UserUpdateOneRequiredWithoutUsage_ledgerNestedInput = {
    create?: XOR<UserCreateWithoutUsage_ledgerInput, UserUncheckedCreateWithoutUsage_ledgerInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsage_ledgerInput
    upsert?: UserUpsertWithoutUsage_ledgerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsage_ledgerInput, UserUpdateWithoutUsage_ledgerInput>, UserUncheckedUpdateWithoutUsage_ledgerInput>
  }

  export type ProjectUpdateOneWithoutUsage_ledgerNestedInput = {
    create?: XOR<ProjectCreateWithoutUsage_ledgerInput, ProjectUncheckedCreateWithoutUsage_ledgerInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutUsage_ledgerInput
    upsert?: ProjectUpsertWithoutUsage_ledgerInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutUsage_ledgerInput, ProjectUpdateWithoutUsage_ledgerInput>, ProjectUncheckedUpdateWithoutUsage_ledgerInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedEnumRenderStepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RenderStep | EnumRenderStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRenderStepNullableFilter<$PrismaModel> | $Enums.RenderStep | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedEnumRenderStepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RenderStep | EnumRenderStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RenderStep[] | ListEnumRenderStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRenderStepNullableWithAggregatesFilter<$PrismaModel> | $Enums.RenderStep | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRenderStepNullableFilter<$PrismaModel>
    _max?: NestedEnumRenderStepNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type NestedEnumWatermarkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WatermarkStatus | EnumWatermarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatermarkStatusFilter<$PrismaModel> | $Enums.WatermarkStatus
  }

  export type NestedEnumClipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClipStatus | EnumClipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClipStatusFilter<$PrismaModel> | $Enums.ClipStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type NestedEnumWatermarkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WatermarkStatus | EnumWatermarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatermarkStatus[] | ListEnumWatermarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatermarkStatusWithAggregatesFilter<$PrismaModel> | $Enums.WatermarkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWatermarkStatusFilter<$PrismaModel>
    _max?: NestedEnumWatermarkStatusFilter<$PrismaModel>
  }

  export type NestedEnumClipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClipStatus | EnumClipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClipStatus[] | ListEnumClipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClipStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClipStatusFilter<$PrismaModel>
    _max?: NestedEnumClipStatusFilter<$PrismaModel>
  }

  export type NestedEnumConsentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeFilter<$PrismaModel> | $Enums.ConsentType
  }

  export type NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentTypeFilter<$PrismaModel>
    _max?: NestedEnumConsentTypeFilter<$PrismaModel>
  }

  export type NestedEnumLedgerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerKind | EnumLedgerKindFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerKindFilter<$PrismaModel> | $Enums.LedgerKind
  }

  export type NestedEnumLedgerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerKind | EnumLedgerKindFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerKind[] | ListEnumLedgerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerKindWithAggregatesFilter<$PrismaModel> | $Enums.LedgerKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLedgerKindFilter<$PrismaModel>
    _max?: NestedEnumLedgerKindFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenCreateManyUserInputEnvelope = {
    data: PasswordResetTokenCreateManyUserInput | PasswordResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailVerificationTokenCreateWithoutUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type EmailVerificationTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type EmailVerificationTokenCreateOrConnectWithoutUserInput = {
    where: EmailVerificationTokenWhereUniqueInput
    create: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationTokenCreateManyUserInputEnvelope = {
    data: EmailVerificationTokenCreateManyUserInput | EmailVerificationTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageCreateNestedManyWithoutProjectInput
    consents?: ConsentCreateNestedManyWithoutProjectInput
    job_events?: JobEventCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageUncheckedCreateNestedManyWithoutProjectInput
    consents?: ConsentUncheckedCreateNestedManyWithoutProjectInput
    job_events?: JobEventUncheckedCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConsentCreateWithoutUserInput = {
    id?: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
    project: ProjectCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateWithoutUserInput = {
    id?: string
    project_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type ConsentCreateOrConnectWithoutUserInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput>
  }

  export type ConsentCreateManyUserInputEnvelope = {
    data: ConsentCreateManyUserInput | ConsentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsageLedgerCreateWithoutUserInput = {
    id?: string
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
    project?: ProjectCreateNestedOneWithoutUsage_ledgerInput
  }

  export type UsageLedgerUncheckedCreateWithoutUserInput = {
    id?: string
    project_id?: string | null
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type UsageLedgerCreateOrConnectWithoutUserInput = {
    where: UsageLedgerWhereUniqueInput
    create: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput>
  }

  export type UsageLedgerCreateManyUserInputEnvelope = {
    data: UsageLedgerCreateManyUserInput | UsageLedgerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    token_hash?: StringFilter<"RefreshToken"> | string
    family_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    user_id?: StringFilter<"PasswordResetToken"> | string
    token_hash?: StringFilter<"PasswordResetToken"> | string
    expires_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    created_at?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type EmailVerificationTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationTokenWhereUniqueInput
    update: XOR<EmailVerificationTokenUpdateWithoutUserInput, EmailVerificationTokenUncheckedUpdateWithoutUserInput>
    create: XOR<EmailVerificationTokenCreateWithoutUserInput, EmailVerificationTokenUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationTokenWhereUniqueInput
    data: XOR<EmailVerificationTokenUpdateWithoutUserInput, EmailVerificationTokenUncheckedUpdateWithoutUserInput>
  }

  export type EmailVerificationTokenUpdateManyWithWhereWithoutUserInput = {
    where: EmailVerificationTokenScalarWhereInput
    data: XOR<EmailVerificationTokenUpdateManyMutationInput, EmailVerificationTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailVerificationTokenScalarWhereInput = {
    AND?: EmailVerificationTokenScalarWhereInput | EmailVerificationTokenScalarWhereInput[]
    OR?: EmailVerificationTokenScalarWhereInput[]
    NOT?: EmailVerificationTokenScalarWhereInput | EmailVerificationTokenScalarWhereInput[]
    id?: StringFilter<"EmailVerificationToken"> | string
    user_id?: StringFilter<"EmailVerificationToken"> | string
    token_hash?: StringFilter<"EmailVerificationToken"> | string
    expires_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
    used_at?: DateTimeNullableFilter<"EmailVerificationToken"> | Date | string | null
    created_at?: DateTimeFilter<"EmailVerificationToken"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    user_id?: StringFilter<"Project"> | string
    source_type?: EnumSourceTypeFilter<"Project"> | $Enums.SourceType
    source_url?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    render_step?: EnumRenderStepNullableFilter<"Project"> | $Enums.RenderStep | null
    partial?: BoolFilter<"Project"> | boolean
    failure_reason?: StringNullableFilter<"Project"> | string | null
    failure_code?: StringNullableFilter<"Project"> | string | null
    scrape_error?: StringNullableFilter<"Project"> | string | null
    title?: StringFilter<"Project"> | string
    subtitle?: StringNullableFilter<"Project"> | string | null
    location_line?: StringNullableFilter<"Project"> | string | null
    closing_line?: StringNullableFilter<"Project"> | string | null
    music_enabled?: BoolFilter<"Project"> | boolean
    rights_attested_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    submitted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    render_started_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    quota_charged?: BoolFilter<"Project"> | boolean
    video_gcs_path?: StringNullableFilter<"Project"> | string | null
    poster_gcs_path?: StringNullableFilter<"Project"> | string | null
    duration_seconds?: FloatNullableFilter<"Project"> | number | null
    clips_total?: IntFilter<"Project"> | number
    clips_done?: IntFilter<"Project"> | number
    skipped_image_ids?: StringNullableListFilter<"Project">
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Project"> | Date | string | null
  }

  export type ConsentUpsertWithWhereUniqueWithoutUserInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutUserInput, ConsentUncheckedUpdateWithoutUserInput>
    create: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutUserInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutUserInput, ConsentUncheckedUpdateWithoutUserInput>
  }

  export type ConsentUpdateManyWithWhereWithoutUserInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutUserInput>
  }

  export type ConsentScalarWhereInput = {
    AND?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    OR?: ConsentScalarWhereInput[]
    NOT?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    id?: StringFilter<"Consent"> | string
    user_id?: StringFilter<"Consent"> | string
    project_id?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    accepted_at?: DateTimeFilter<"Consent"> | Date | string
    ip?: StringNullableFilter<"Consent"> | string | null
  }

  export type UsageLedgerUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageLedgerWhereUniqueInput
    update: XOR<UsageLedgerUpdateWithoutUserInput, UsageLedgerUncheckedUpdateWithoutUserInput>
    create: XOR<UsageLedgerCreateWithoutUserInput, UsageLedgerUncheckedCreateWithoutUserInput>
  }

  export type UsageLedgerUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageLedgerWhereUniqueInput
    data: XOR<UsageLedgerUpdateWithoutUserInput, UsageLedgerUncheckedUpdateWithoutUserInput>
  }

  export type UsageLedgerUpdateManyWithWhereWithoutUserInput = {
    where: UsageLedgerScalarWhereInput
    data: XOR<UsageLedgerUpdateManyMutationInput, UsageLedgerUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageLedgerScalarWhereInput = {
    AND?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
    OR?: UsageLedgerScalarWhereInput[]
    NOT?: UsageLedgerScalarWhereInput | UsageLedgerScalarWhereInput[]
    id?: StringFilter<"UsageLedger"> | string
    user_id?: StringFilter<"UsageLedger"> | string
    project_id?: StringNullableFilter<"UsageLedger"> | string | null
    kind?: EnumLedgerKindFilter<"UsageLedger"> | $Enums.LedgerKind
    quota_units?: IntFilter<"UsageLedger"> | number
    provider_units?: FloatNullableFilter<"UsageLedger"> | number | null
    credits?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_usd?: FloatNullableFilter<"UsageLedger"> | number | null
    cost_estimated?: BoolFilter<"UsageLedger"> | boolean
    note?: StringNullableFilter<"UsageLedger"> | string | null
    created_at?: DateTimeFilter<"UsageLedger"> | Date | string
  }

  export type UserCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefresh_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
  }

  export type UserUpsertWithoutRefresh_tokensInput = {
    update: XOR<UserUpdateWithoutRefresh_tokensInput, UserUncheckedUpdateWithoutRefresh_tokensInput>
    create: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefresh_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefresh_tokensInput, UserUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type UserUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEmail_verification_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmail_verification_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmail_verification_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmail_verification_tokensInput, UserUncheckedCreateWithoutEmail_verification_tokensInput>
  }

  export type UserUpsertWithoutEmail_verification_tokensInput = {
    update: XOR<UserUpdateWithoutEmail_verification_tokensInput, UserUncheckedUpdateWithoutEmail_verification_tokensInput>
    create: XOR<UserCreateWithoutEmail_verification_tokensInput, UserUncheckedCreateWithoutEmail_verification_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmail_verification_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmail_verification_tokensInput, UserUncheckedUpdateWithoutEmail_verification_tokensInput>
  }

  export type UserUpdateWithoutEmail_verification_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmail_verification_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPassword_reset_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPassword_reset_tokensInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPassword_reset_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPassword_reset_tokensInput, UserUncheckedCreateWithoutPassword_reset_tokensInput>
  }

  export type UserUpsertWithoutPassword_reset_tokensInput = {
    update: XOR<UserUpdateWithoutPassword_reset_tokensInput, UserUncheckedUpdateWithoutPassword_reset_tokensInput>
    create: XOR<UserCreateWithoutPassword_reset_tokensInput, UserUncheckedCreateWithoutPassword_reset_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPassword_reset_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPassword_reset_tokensInput, UserUncheckedUpdateWithoutPassword_reset_tokensInput>
  }

  export type UserUpdateWithoutPassword_reset_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPassword_reset_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ImageCreateWithoutProjectInput = {
    id?: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
  }

  export type ImageUncheckedCreateWithoutProjectInput = {
    id?: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
  }

  export type ImageCreateOrConnectWithoutProjectInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput>
  }

  export type ImageCreateManyProjectInputEnvelope = {
    data: ImageCreateManyProjectInput | ImageCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ConsentCreateWithoutProjectInput = {
    id?: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
    user: UserCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateWithoutProjectInput = {
    id?: string
    user_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type ConsentCreateOrConnectWithoutProjectInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput>
  }

  export type ConsentCreateManyProjectInputEnvelope = {
    data: ConsentCreateManyProjectInput | ConsentCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type JobEventCreateWithoutProjectInput = {
    id?: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
  }

  export type JobEventUncheckedCreateWithoutProjectInput = {
    id?: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
  }

  export type JobEventCreateOrConnectWithoutProjectInput = {
    where: JobEventWhereUniqueInput
    create: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput>
  }

  export type JobEventCreateManyProjectInputEnvelope = {
    data: JobEventCreateManyProjectInput | JobEventCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UsageLedgerCreateWithoutProjectInput = {
    id?: string
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutUsage_ledgerInput
  }

  export type UsageLedgerUncheckedCreateWithoutProjectInput = {
    id?: string
    user_id: string
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type UsageLedgerCreateOrConnectWithoutProjectInput = {
    where: UsageLedgerWhereUniqueInput
    create: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput>
  }

  export type UsageLedgerCreateManyProjectInputEnvelope = {
    data: UsageLedgerCreateManyProjectInput | UsageLedgerCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ImageUpsertWithWhereUniqueWithoutProjectInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutProjectInput, ImageUncheckedUpdateWithoutProjectInput>
    create: XOR<ImageCreateWithoutProjectInput, ImageUncheckedCreateWithoutProjectInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutProjectInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutProjectInput, ImageUncheckedUpdateWithoutProjectInput>
  }

  export type ImageUpdateManyWithWhereWithoutProjectInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutProjectInput>
  }

  export type ImageScalarWhereInput = {
    AND?: ImageScalarWhereInput | ImageScalarWhereInput[]
    OR?: ImageScalarWhereInput[]
    NOT?: ImageScalarWhereInput | ImageScalarWhereInput[]
    id?: StringFilter<"Image"> | string
    project_id?: StringFilter<"Image"> | string
    position?: IntFilter<"Image"> | number
    gcs_original_path?: StringNullableFilter<"Image"> | string | null
    gcs_processed_path?: StringNullableFilter<"Image"> | string | null
    gcs_thumb_path?: StringNullableFilter<"Image"> | string | null
    width?: IntNullableFilter<"Image"> | number | null
    height?: IntNullableFilter<"Image"> | number | null
    bytes?: IntNullableFilter<"Image"> | number | null
    content_hash?: StringNullableFilter<"Image"> | string | null
    source_url?: StringNullableFilter<"Image"> | string | null
    room_type?: EnumRoomTypeFilter<"Image"> | $Enums.RoomType
    use_processed?: BoolFilter<"Image"> | boolean
    wm_status?: EnumWatermarkStatusFilter<"Image"> | $Enums.WatermarkStatus
    wm_attempts?: IntFilter<"Image"> | number
    removed?: BoolFilter<"Image"> | boolean
    ready?: BoolFilter<"Image"> | boolean
    higgsfield_media_id?: StringNullableFilter<"Image"> | string | null
    clip_job_id?: StringNullableFilter<"Image"> | string | null
    clip_status?: EnumClipStatusFilter<"Image"> | $Enums.ClipStatus
    clip_result_url?: StringNullableFilter<"Image"> | string | null
    clip_gcs_path?: StringNullableFilter<"Image"> | string | null
    created_at?: DateTimeFilter<"Image"> | Date | string
  }

  export type ConsentUpsertWithWhereUniqueWithoutProjectInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutProjectInput, ConsentUncheckedUpdateWithoutProjectInput>
    create: XOR<ConsentCreateWithoutProjectInput, ConsentUncheckedCreateWithoutProjectInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutProjectInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutProjectInput, ConsentUncheckedUpdateWithoutProjectInput>
  }

  export type ConsentUpdateManyWithWhereWithoutProjectInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutProjectInput>
  }

  export type JobEventUpsertWithWhereUniqueWithoutProjectInput = {
    where: JobEventWhereUniqueInput
    update: XOR<JobEventUpdateWithoutProjectInput, JobEventUncheckedUpdateWithoutProjectInput>
    create: XOR<JobEventCreateWithoutProjectInput, JobEventUncheckedCreateWithoutProjectInput>
  }

  export type JobEventUpdateWithWhereUniqueWithoutProjectInput = {
    where: JobEventWhereUniqueInput
    data: XOR<JobEventUpdateWithoutProjectInput, JobEventUncheckedUpdateWithoutProjectInput>
  }

  export type JobEventUpdateManyWithWhereWithoutProjectInput = {
    where: JobEventScalarWhereInput
    data: XOR<JobEventUpdateManyMutationInput, JobEventUncheckedUpdateManyWithoutProjectInput>
  }

  export type JobEventScalarWhereInput = {
    AND?: JobEventScalarWhereInput | JobEventScalarWhereInput[]
    OR?: JobEventScalarWhereInput[]
    NOT?: JobEventScalarWhereInput | JobEventScalarWhereInput[]
    id?: StringFilter<"JobEvent"> | string
    project_id?: StringFilter<"JobEvent"> | string
    job_name?: StringFilter<"JobEvent"> | string
    bullmq_job_id?: StringNullableFilter<"JobEvent"> | string | null
    step?: StringNullableFilter<"JobEvent"> | string | null
    status?: StringFilter<"JobEvent"> | string
    message?: StringNullableFilter<"JobEvent"> | string | null
    created_at?: DateTimeFilter<"JobEvent"> | Date | string
  }

  export type UsageLedgerUpsertWithWhereUniqueWithoutProjectInput = {
    where: UsageLedgerWhereUniqueInput
    update: XOR<UsageLedgerUpdateWithoutProjectInput, UsageLedgerUncheckedUpdateWithoutProjectInput>
    create: XOR<UsageLedgerCreateWithoutProjectInput, UsageLedgerUncheckedCreateWithoutProjectInput>
  }

  export type UsageLedgerUpdateWithWhereUniqueWithoutProjectInput = {
    where: UsageLedgerWhereUniqueInput
    data: XOR<UsageLedgerUpdateWithoutProjectInput, UsageLedgerUncheckedUpdateWithoutProjectInput>
  }

  export type UsageLedgerUpdateManyWithWhereWithoutProjectInput = {
    where: UsageLedgerScalarWhereInput
    data: XOR<UsageLedgerUpdateManyMutationInput, UsageLedgerUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutImagesInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProjectsInput
    consents?: ConsentCreateNestedManyWithoutProjectInput
    job_events?: JobEventCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutImagesInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    consents?: ConsentUncheckedCreateNestedManyWithoutProjectInput
    job_events?: JobEventUncheckedCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutImagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
  }

  export type ProjectUpsertWithoutImagesInput = {
    update: XOR<ProjectUpdateWithoutImagesInput, ProjectUncheckedUpdateWithoutImagesInput>
    create: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutImagesInput, ProjectUncheckedUpdateWithoutImagesInput>
  }

  export type ProjectUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    consents?: ConsentUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consents?: ConsentUncheckedUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUncheckedUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutConsentsInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConsentsInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConsentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
  }

  export type ProjectCreateWithoutConsentsInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProjectsInput
    images?: ImageCreateNestedManyWithoutProjectInput
    job_events?: JobEventCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutConsentsInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageUncheckedCreateNestedManyWithoutProjectInput
    job_events?: JobEventUncheckedCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutConsentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutConsentsInput, ProjectUncheckedCreateWithoutConsentsInput>
  }

  export type UserUpsertWithoutConsentsInput = {
    update: XOR<UserUpdateWithoutConsentsInput, UserUncheckedUpdateWithoutConsentsInput>
    create: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsentsInput, UserUncheckedUpdateWithoutConsentsInput>
  }

  export type UserUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutConsentsInput = {
    update: XOR<ProjectUpdateWithoutConsentsInput, ProjectUncheckedUpdateWithoutConsentsInput>
    create: XOR<ProjectCreateWithoutConsentsInput, ProjectUncheckedCreateWithoutConsentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutConsentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutConsentsInput, ProjectUncheckedUpdateWithoutConsentsInput>
  }

  export type ProjectUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    images?: ImageUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUncheckedUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUncheckedUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutJob_eventsInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProjectsInput
    images?: ImageCreateNestedManyWithoutProjectInput
    consents?: ConsentCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutJob_eventsInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageUncheckedCreateNestedManyWithoutProjectInput
    consents?: ConsentUncheckedCreateNestedManyWithoutProjectInput
    usage_ledger?: UsageLedgerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutJob_eventsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutJob_eventsInput, ProjectUncheckedCreateWithoutJob_eventsInput>
  }

  export type ProjectUpsertWithoutJob_eventsInput = {
    update: XOR<ProjectUpdateWithoutJob_eventsInput, ProjectUncheckedUpdateWithoutJob_eventsInput>
    create: XOR<ProjectCreateWithoutJob_eventsInput, ProjectUncheckedCreateWithoutJob_eventsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutJob_eventsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutJob_eventsInput, ProjectUncheckedUpdateWithoutJob_eventsInput>
  }

  export type ProjectUpdateWithoutJob_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    images?: ImageUpdateManyWithoutProjectNestedInput
    consents?: ConsentUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutJob_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUncheckedUpdateManyWithoutProjectNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutUsage_ledgerInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUsage_ledgerInput = {
    id?: string
    email: string
    password_hash: string
    role?: $Enums.AuthRole
    email_verified_at?: Date | string | null
    monthly_video_quota?: number
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    password_reset_tokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    email_verification_tokens?: EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUsage_ledgerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsage_ledgerInput, UserUncheckedCreateWithoutUsage_ledgerInput>
  }

  export type ProjectCreateWithoutUsage_ledgerInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProjectsInput
    images?: ImageCreateNestedManyWithoutProjectInput
    consents?: ConsentCreateNestedManyWithoutProjectInput
    job_events?: JobEventCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUsage_ledgerInput = {
    id?: string
    user_id: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    images?: ImageUncheckedCreateNestedManyWithoutProjectInput
    consents?: ConsentUncheckedCreateNestedManyWithoutProjectInput
    job_events?: JobEventUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUsage_ledgerInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUsage_ledgerInput, ProjectUncheckedCreateWithoutUsage_ledgerInput>
  }

  export type UserUpsertWithoutUsage_ledgerInput = {
    update: XOR<UserUpdateWithoutUsage_ledgerInput, UserUncheckedUpdateWithoutUsage_ledgerInput>
    create: XOR<UserCreateWithoutUsage_ledgerInput, UserUncheckedCreateWithoutUsage_ledgerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsage_ledgerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsage_ledgerInput, UserUncheckedUpdateWithoutUsage_ledgerInput>
  }

  export type UserUpdateWithoutUsage_ledgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUsage_ledgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthly_video_quota?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    password_reset_tokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    email_verification_tokens?: EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutUsage_ledgerInput = {
    update: XOR<ProjectUpdateWithoutUsage_ledgerInput, ProjectUncheckedUpdateWithoutUsage_ledgerInput>
    create: XOR<ProjectCreateWithoutUsage_ledgerInput, ProjectUncheckedCreateWithoutUsage_ledgerInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutUsage_ledgerInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutUsage_ledgerInput, ProjectUncheckedUpdateWithoutUsage_ledgerInput>
  }

  export type ProjectUpdateWithoutUsage_ledgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    images?: ImageUpdateManyWithoutProjectNestedInput
    consents?: ConsentUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUsage_ledgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUncheckedUpdateManyWithoutProjectNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token_hash: string
    family_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
  }

  export type PasswordResetTokenCreateManyUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type EmailVerificationTokenCreateManyUserInput = {
    id?: string
    token_hash: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    source_type: $Enums.SourceType
    source_url?: string | null
    status?: $Enums.ProjectStatus
    render_step?: $Enums.RenderStep | null
    partial?: boolean
    failure_reason?: string | null
    failure_code?: string | null
    scrape_error?: string | null
    title?: string
    subtitle?: string | null
    location_line?: string | null
    closing_line?: string | null
    music_enabled?: boolean
    rights_attested_at?: Date | string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    render_started_at?: Date | string | null
    quota_charged?: boolean
    video_gcs_path?: string | null
    poster_gcs_path?: string | null
    duration_seconds?: number | null
    clips_total?: number
    clips_done?: number
    skipped_image_ids?: ProjectCreateskipped_image_idsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ConsentCreateManyUserInput = {
    id?: string
    project_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type UsageLedgerCreateManyUserInput = {
    id?: string
    project_id?: string | null
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    family_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUpdateManyWithoutProjectNestedInput
    consents?: ConsentUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ImageUncheckedUpdateManyWithoutProjectNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutProjectNestedInput
    job_events?: JobEventUncheckedUpdateManyWithoutProjectNestedInput
    usage_ledger?: UsageLedgerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    render_step?: NullableEnumRenderStepFieldUpdateOperationsInput | $Enums.RenderStep | null
    partial?: BoolFieldUpdateOperationsInput | boolean
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    failure_code?: NullableStringFieldUpdateOperationsInput | string | null
    scrape_error?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    location_line?: NullableStringFieldUpdateOperationsInput | string | null
    closing_line?: NullableStringFieldUpdateOperationsInput | string | null
    music_enabled?: BoolFieldUpdateOperationsInput | boolean
    rights_attested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    render_started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quota_charged?: BoolFieldUpdateOperationsInput | boolean
    video_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    poster_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableFloatFieldUpdateOperationsInput | number | null
    clips_total?: IntFieldUpdateOperationsInput | number
    clips_done?: IntFieldUpdateOperationsInput | number
    skipped_image_ids?: ProjectUpdateskipped_image_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsageLedgerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutUsage_ledgerNestedInput
  }

  export type UsageLedgerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyProjectInput = {
    id?: string
    position: number
    gcs_original_path?: string | null
    gcs_processed_path?: string | null
    gcs_thumb_path?: string | null
    width?: number | null
    height?: number | null
    bytes?: number | null
    content_hash?: string | null
    source_url?: string | null
    room_type?: $Enums.RoomType
    use_processed?: boolean
    wm_status?: $Enums.WatermarkStatus
    wm_attempts?: number
    removed?: boolean
    ready?: boolean
    higgsfield_media_id?: string | null
    clip_job_id?: string | null
    clip_status?: $Enums.ClipStatus
    clip_result_url?: string | null
    clip_gcs_path?: string | null
    created_at?: Date | string
  }

  export type ConsentCreateManyProjectInput = {
    id?: string
    user_id: string
    type: $Enums.ConsentType
    accepted_at?: Date | string
    ip?: string | null
  }

  export type JobEventCreateManyProjectInput = {
    id?: string
    job_name: string
    bullmq_job_id?: string | null
    step?: string | null
    status: string
    message?: string | null
    created_at?: Date | string
  }

  export type UsageLedgerCreateManyProjectInput = {
    id?: string
    user_id: string
    kind: $Enums.LedgerKind
    quota_units?: number
    provider_units?: number | null
    credits?: number | null
    cost_usd?: number | null
    cost_estimated?: boolean
    note?: string | null
    created_at?: Date | string
  }

  export type ImageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    gcs_original_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_processed_path?: NullableStringFieldUpdateOperationsInput | string | null
    gcs_thumb_path?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bytes?: NullableIntFieldUpdateOperationsInput | number | null
    content_hash?: NullableStringFieldUpdateOperationsInput | string | null
    source_url?: NullableStringFieldUpdateOperationsInput | string | null
    room_type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    use_processed?: BoolFieldUpdateOperationsInput | boolean
    wm_status?: EnumWatermarkStatusFieldUpdateOperationsInput | $Enums.WatermarkStatus
    wm_attempts?: IntFieldUpdateOperationsInput | number
    removed?: BoolFieldUpdateOperationsInput | boolean
    ready?: BoolFieldUpdateOperationsInput | boolean
    higgsfield_media_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    clip_status?: EnumClipStatusFieldUpdateOperationsInput | $Enums.ClipStatus
    clip_result_url?: NullableStringFieldUpdateOperationsInput | string | null
    clip_gcs_path?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobEventUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEventUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEventUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_name?: StringFieldUpdateOperationsInput | string
    bullmq_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    step?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUsage_ledgerNestedInput
  }

  export type UsageLedgerUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLedgerUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    kind?: EnumLedgerKindFieldUpdateOperationsInput | $Enums.LedgerKind
    quota_units?: IntFieldUpdateOperationsInput | number
    provider_units?: NullableFloatFieldUpdateOperationsInput | number | null
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_usd?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_estimated?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}