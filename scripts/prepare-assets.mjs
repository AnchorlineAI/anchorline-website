import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir(new URL("../public/brand/", import.meta.url), { recursive: true });
await sharp(new URL("../Anchorline_Logo.PNG", import.meta.url).pathname)
  .resize(96, 96, { fit: "contain" })
  .webp({ quality: 88 })
  .toFile(new URL("../public/brand/mark.webp", import.meta.url).pathname);
await sharp(new URL("../public/brand/social.svg", import.meta.url).pathname)
  .png()
  .toFile(new URL("../public/brand/social.png", import.meta.url).pathname);
