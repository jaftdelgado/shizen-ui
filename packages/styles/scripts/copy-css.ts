import { cp, mkdir } from "fs/promises";
import { join } from "path";

const src = join(import.meta.dir, "../src");
const dest = join(import.meta.dir, "../dist");

await mkdir(join(dest, "components"), { recursive: true });
await mkdir(join(dest, "theme"), { recursive: true });

await cp(join(src, "index.css"), join(dest, "index.css"));

for (const folder of ["components", "theme"]) {
  await cp(join(src, folder), join(dest, folder), {
    recursive: true,
    filter: (source) => source.endsWith(".css") || !source.includes(".")
  });
}

console.log("CSS copied to dist/");
