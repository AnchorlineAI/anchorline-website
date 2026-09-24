import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const localPath = (relative) => fileURLToPath(new URL(relative, import.meta.url));
await mkdir(new URL("../public/brand/", import.meta.url), { recursive: true });
await sharp(localPath("../Anchorline_Logo.PNG"))
  .resize(96, 96, { fit: "contain" })
  .webp({ quality: 88 })
  .toFile(localPath("../public/brand/mark.webp"));
await sharp(localPath("../public/brand/social.svg"))
  .png()
  .toFile(localPath("../public/brand/social.png"));
await sharp(localPath("../kris-mcfadden.jpg"))
  .rotate()
  .resize(600, 601, { fit: "cover", withoutEnlargement: true })
  .webp({ quality: 90, effort: 5 })
  .toFile(localPath("../public/kris-mcfadden.webp"));
