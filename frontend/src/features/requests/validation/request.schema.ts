import { z } from "zod";


export const requestSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان درخواست باید حداقل ۳ کاراکتر باشد.")
    .max(120, "عنوان درخواست نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد."),

  description: z
    .string()
    .min(5, "توضیحات باید حداقل ۵ کاراکتر باشد.")
    .max(2000, "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد."),

  requester: z
    .string()
    .min(2, "نام درخواست‌دهنده باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام درخواست‌دهنده نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  priority: z.enum(["low", "medium", "high"]),
});

export const requestUpdateSchema = z.object({
  title: z.string().min(3).max(120).nullable().optional(),

  description: z.string().min(5).max(2000).nullable().optional(),

  requester: z.string().min(2).max(100).nullable().optional(),

  priority: z.enum(["low", "medium", "high"]).nullable().optional(),

  status: z.enum(["new", "in_progress", "completed"]).nullable().optional(),

  expected_version: z.number().int().nullable().optional(),
});

export type RequestUpdateValues = z.infer<typeof requestUpdateSchema>;
