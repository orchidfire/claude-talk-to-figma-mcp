import { z } from "zod";

/**
 * Shared Zod schema for text configuration objects.
 * Used for both single and bounded text creation tools.
 */
export const SingleTextSchema = z.object({
  x: z.number()
    .min(-10000)
    .max(10000)
    .describe("X coordinate for the text element. Must be between -10,000 and 10,000."),
  y: z.number()
    .min(-10000)
    .max(10000)
    .describe("Y coordinate for the text element. Must be between -10,000 and 10,000."),
  text: z.string()
    .min(1)
    .max(10000)
    .describe("The text content. Must be a non-empty string up to 10,000 characters."),
  width: z.number()
    .min(1)
    .max(2000)
    .optional()
    .describe("Optional. Width of the text box. If provided, creates a bounded text box. Must be between 1 and 2000."),
  height: z.number()
    .min(1)
    .max(2000)
    .optional()
    .describe("Optional. Height of the text box. If provided, creates a bounded text box. Must be between 1 and 2000."),
  fontSize: z.number()
    .min(1)
    .max(200)
    .optional()
    .describe("Optional. Font size. Must be between 1 and 200."),
  fontWeight: z.number()
    .min(100)
    .max(1000)
    .optional()
    .describe("Optional. Font weight. Must be between 100 and 1000."),
  fontColor: z.any().optional().describe("Optional. Font color."),
  name: z.string()
    .min(1)
    .max(100)
    .optional()
    .describe("Optional. Name for the text node. If provided, must be a non-empty string up to 100 characters."),
  parentId: z.string()
    .regex(/^\d+:\d+$/)
    .optional()
    .describe("Optional. Figma node ID of the parent. If provided, must be a string in the format '123:456'."),
});

export const BatchTextsSchema = z.array(SingleTextSchema);

export const TextSchema = z.union([
  SingleTextSchema,
  BatchTextsSchema
]);

export type BaseTextConfig = z.infer<typeof SingleTextSchema>;
export type BatchTextsConfig = z.infer<typeof BatchTextsSchema>;
