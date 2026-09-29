import z from "zod";

export function validateWithZodSchema<T extends z.ZodSchema>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(","),
    );
  }

  return result.data;
}
