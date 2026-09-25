// next/image with images.unoptimized doesn't auto-prefix basePath, so static
// asset URLs (gallery photos, etc.) must prepend this manually.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
