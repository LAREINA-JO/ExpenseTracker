<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@expense-tracker/schemas](./schemas.md) &gt; [SerializedType](./schemas.serializedtype.md)

## SerializedType type

**Signature:**

```typescript
export type SerializedType<T> = T extends DefaultSerializedType ? T : T extends Date ? string : T extends Record<string, any> ? {
    [key in keyof T]: SerializedType<T[key]>;
} : never;
```
**References:** [SerializedType](./schemas.serializedtype.md)

