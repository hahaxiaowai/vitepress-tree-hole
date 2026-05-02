import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname } from "node:path";
import fg from "fast-glob";

function toDist(file) {
  return file.replace(/^theme\//, "dist/theme/");
}

// Always rebuild from a clean slate so removed source files do not linger in dist.
await rm("dist", { recursive: true, force: true });

for (const file of fg.sync("theme/**")) {
  if (/(?:\.ts|tsconfig\.json)$/.test(file)) {
    continue;
  }
  const destination = toDist(file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(file, destination);
}
