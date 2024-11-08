import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const newChannelSchema = z.object({
  name: z.string().min(3, {
    message: "Channel name must have at least 3 characters.",
  }),
  description: z.string().min(5, {
    message: "Channel description must have at least 5 characters.",
  }),
  avatarImage: z
    .any()
    .refine((files) => files?.[0] && true, "Avatar image is required.")
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});
