export type WithChildren = {
  children: JSX.Element;
};

type ObjectKey = string | number | symbol;

export type MakeRequired<
  Obj extends Record<ObjectKey, unknown>,
  Keys extends ObjectKey,
> = Obj & {
  [key in Keys]: Exclude<Obj[key], undefined>;
};

export type MakeAllRequired<Obj extends Record<string, unknown>> = MakeRequired<
  Obj,
  keyof Obj
>;
