<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@expense-tracker/schemas](./schemas.md) &gt; [updateTransactionReqBodySchema](./schemas.updatetransactionreqbodyschema.md)

## updateTransactionReqBodySchema variable

**Signature:**

```typescript
updateTransactionReqBodySchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodEffects<z.ZodNullable<z.ZodString>, string | null, string | null>>;
    transactionDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    accountId: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
    description?: string | null | undefined;
    transactionDate?: Date | undefined;
    accountId?: number | undefined;
    categoryId?: number | undefined;
}, {
    amount?: number | undefined;
    description?: string | null | undefined;
    transactionDate?: string | undefined;
    accountId?: number | undefined;
    categoryId?: number | undefined;
}>
```
