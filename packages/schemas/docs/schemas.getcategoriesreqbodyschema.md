<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@expense-tracker/schemas](./schemas.md) &gt; [getCategoriesReqBodySchema](./schemas.getcategoriesreqbodyschema.md)

## getCategoriesReqBodySchema variable

**Signature:**

```typescript
getCategoriesReqBodySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    limit: z.ZodOptional<z.ZodNumber>;
    start: z.ZodOptional<z.ZodNumber>;
    orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
        createdAt: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        id?: "asc" | "desc" | undefined;
        createdAt?: "asc" | "desc" | undefined;
    }, {
        id?: "asc" | "desc" | undefined;
        createdAt?: "asc" | "desc" | undefined;
    }>, "many">>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    limit?: number | undefined;
    start?: number | undefined;
    orderBy?: {
        id?: "asc" | "desc" | undefined;
        createdAt?: "asc" | "desc" | undefined;
    }[] | undefined;
    id?: number | undefined;
    name?: string | undefined;
    createdAt?: Date | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
    orderBy?: {
        id?: "asc" | "desc" | undefined;
        createdAt?: "asc" | "desc" | undefined;
    }[] | undefined;
    id?: number | undefined;
    name?: string | undefined;
    createdAt?: string | undefined;
}>
```
