import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dir, "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8"));

const rewriteExports = (exports: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(exports)) {
    if (typeof value === "string") {
      result[key] = value.replace("./dist/", "./");
    } else if (typeof value === "object") {
      result[key] = rewriteExports(value);
    }
  }
  return result;
};

const rewriteDependencies = (deps: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [name, version] of Object.entries(deps)) {
    if (version === "workspace:*") {
      const wsPath = join(root, "..", name.replace("@shizen-ui/", ""), "package.json");
      try {
        const wsPkg = JSON.parse(readFileSync(wsPath, "utf-8"));
        result[name] = `^${wsPkg.version}`;
      } catch {
        result[name] = version;
      }
    } else {
      result[name] = version;
    }
  }
  return result;
};

const resolvedDependencies = rewriteDependencies(pkg.dependencies);

const updatedPkg = { ...pkg, dependencies: resolvedDependencies };
writeFileSync(join(root, "package.json"), JSON.stringify(updatedPkg, null, 2) + "\n");

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  type: pkg.type,
  exports: rewriteExports(pkg.exports),
  peerDependencies: pkg.peerDependencies,
  dependencies: resolvedDependencies
};

writeFileSync(join(root, "dist", "package.json"), JSON.stringify(distPkg, null, 2));

console.log("✓ dist/package.json generated successfully");
