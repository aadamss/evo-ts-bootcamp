// 1. First<T> - Type of first Array / Tuple value
type First<T extends any[]> = T[0];
type First1 = First<string[]>;
type First2 = First<[]>;
type First3 = First<[symbol, boolean]>;
type First4 = First<number>;

// 2. PartialRecord<K, T> - Record but with all optional properties
type PartialRecord<K extends string | symbol | number, T> = Partial<
  Record<K, T>
>;
const partialRecord: PartialRecord<"prop1" | "prop2", number> = {
  prop1: 47,
  prop2: 74,
  prop3: 74
};

// 3. DeepPartial<T> - make all properties optional recursively
type DeepPartial<T> = { [Key in keyof T]?: DeepPartial<T[Key]> };

interface RequiredObj {
  a: string;
  b: {
    c: {
      d: {
        e: number;
      };
    };
  };
  arr: { x: boolean }[];
}

const partialObj = {} as DeepPartial<RequiredObj>;

partialObj.a = "111";
partialObj.a = undefined;
partialObj.b?.c.d.e;

const e = partialObj.b?.c?.d?.e;
partialObj.b = {};
partialObj.b.c = {};
partialObj.b.c.d = {};

// 4. UnpromisifyFunction<T> - return the same value without Promise
type UnpromisifyFunction<T extends (...args: any) => any> = T extends (
  ...args: infer Args
) => Promise<infer U>
  ? (...args: Args) => U
  : never;
type AsyncFun1 = (initial: number, disabled: boolean) => Promise<string>;
type AsyncFun2 = () => Promise<{ value: number; prefix: string }>;
type AsyncFun3 = () => Promise<boolean>;

type UnpromisifiedFun1 = UnpromisifyFunction<AsyncFun1>;
type UnpromisifiedFun2 = UnpromisifyFunction<AsyncFun2>;
type UnpromisifiedFun3 = UnpromisifyFunction<AsyncFun3>;

// 5. PromisifyFunction<T> - return the same value wrapped in Promise
type PromisifyFunction<T extends (...args: any) => any> = (
  ...t: Parameters<T>
) => Promise<ReturnType<T>>;
type Fun1 = (initial: number, disabled: boolean) => string;
type Fun2 = () => { value: number; prefix: string };
type Fun3 = () => Promise<boolean>;

type PromisifiedFun1 = PromisifyFunction<Fun1>;
type PromisifiedFun2 = PromisifyFunction<Fun2>;
type PromisifiedFun3 = PromisifyFunction<Fun3>;

// 6. DeepReadonly<T> - make all properties readonly recursively
type DeepReadonly<T> = { readonly [Key in keyof T]: DeepReadonly<T[Key]> };
interface MutableObj {
  a: string;
  b: {
    c: {
      d: {
        e: number;
      };
    };
  };
  arr: { x: boolean }[];
}

const immutableObj = {} as DeepReadonly<MutableObj>;

immutableObj.a = "111";
immutableObj.b.c.d.e = 7;
immutableObj.arr = [{ x: true }];
immutableObj.arr[0] = { x: true };
immutableObj.arr[0].x = false;

// 7. DeepRequired<T> - make all properties required recursively
type DeepRequired<T> = { [Key in keyof T]-?: DeepRequired<T[Key]> };

interface OptionalObj {
  a: string;
  b?: {
    c?: {
      d?: {
        e?: number;
      };
    };
  };
  arr: { x?: boolean }[];
}

const optionalObj = {} as DeepRequired<OptionalObj>;

optionalObj.b = {};
optionalObj.b.c = {};
optionalObj.b.c.d = {};
optionalObj.arr.push({});

// 8. OnlyRealPrimitive<T> - returns any primitive except null or undefined
type OnlyRealPrimitive<T> = T extends object
  ? never
  : Exclude<T, null | undefined>;

type OnlyPrimitive1 = OnlyRealPrimitive<MutableObj | string | null>;
type OnlyPrimitive2 = OnlyRealPrimitive<"" | number | undefined>;
type OnlyPrimitive3 = OnlyRealPrimitive<Date | RegExp | undefined>;

// 9. OnlyMethodNames<T> - returns all field names which are methods
type OnlyMethodNames<T> = {
  [K in keyof T]-?: T[K] extends Function | undefined ? K : never;
}[keyof T];

interface Obj1 {
  a: string;
  b?: number;
  c: boolean;
  d: object;
  e: { value: bigint };

  z(): string;
  y?(): number;
  x: () => boolean;
  w?: () => boolean;
}

type Methods = OnlyMethodNames<Obj1>;

// 10. DeleteMethods<T> - same object interface without methods
type DeleteMethods<T, K extends keyof T = OnlyMethodNames<T>> = Omit<T, K>;

interface Obj2 {
  a: string;
  b?: number;
  c: boolean;
  d: object;
  e: { value: bigint };

  z(): string;
  y?(): number;
  x: () => boolean;
  w?: () => boolean;
}

type ObjWithoutMethods = DeleteMethods<Obj2>;
