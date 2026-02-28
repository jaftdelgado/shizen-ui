import fs from "node:fs";
import path from "node:path";

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name (e.g., bun add-component my-button)");
  process.exit(1);
}

// Helper to convert kebab-case to PascalCase
const toPascalCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const pascalName = toPascalCase(componentName);
const rootDir = path.resolve(process.cwd(), "../../"); // De packages/svelte/scripts a la raíz

// Paths configuration
const paths = {
  svelteComponents: path.join(rootDir, "packages/svelte/src/components"),
  svelteIndex: path.join(rootDir, "packages/svelte/src/index.ts"),
  stylesComponents: path.join(rootDir, "packages/styles/src/components"),
  stylesIndexCss: path.join(rootDir, "packages/styles/src/components/index.css"),
  stylesVariants: path.join(rootDir, "packages/styles/src/variants"),
  stylesVariantsIndex: path.join(rootDir, "packages/styles/src/variants/index.ts")
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function updateIndexFile(filePath: string, lineToAdd: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  if (!lines.some((line) => line.includes(lineToAdd))) {
    lines.push(lineToAdd);
    lines.sort();
    fs.writeFileSync(filePath, lines.join("\n") + "\n");
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

// 1. Create Svelte Component
const svelteCompDir = path.join(paths.svelteComponents, componentName);
ensureDir(svelteCompDir);

const svelteTemplate = `<script lang="ts">
  import { ${componentName}Styles, type ${pascalName}Variants } from "@shizen-ui/styles";
  
  let { children, class: className, ...props }: ${pascalName}Variants & { 
    children?: any, 
    class?: string,
    [key: string]: any 
  } = $props();
</script>

<div class={${componentName}Styles({ ...props, class: className })}>
  {@render children?.()}
</div>
`;

fs.writeFileSync(path.join(svelteCompDir, `${pascalName}.svelte`), svelteTemplate);
fs.writeFileSync(
  path.join(svelteCompDir, "index.ts"),
  `export { default as ${pascalName} } from "./${pascalName}.svelte";\n`
);
console.log(`Created Svelte component: ${componentName}`);

// 2. Update Svelte Entry Point
updateIndexFile(paths.svelteIndex, `export * from "./components/${componentName}/index.js";`);

// 3. Create CSS File
ensureDir(paths.stylesComponents);
fs.writeFileSync(
  path.join(paths.stylesComponents, `${componentName}.css`),
  `.${componentName} {\n  display: block;\n}\n`
);
console.log(`Created CSS: ${componentName}.css`);

// 4. Update Styles Index CSS
updateIndexFile(paths.stylesIndexCss, `@import "./${componentName}.css";`);

// 5. Create Variants
const variantsDir = path.join(paths.stylesVariants, componentName);
ensureDir(variantsDir);

const stylesTemplate = `import { tv, type VariantProps } from "tailwind-variants";

export const ${componentName}Styles = tv({
  base: "${componentName}",
  variants: {
    invalid: {
      true: "${componentName}--invalid"
    },
    disabled: {
      true: "${componentName}--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ${pascalName}Variants = VariantProps<typeof ${componentName}Styles>;
`;

fs.writeFileSync(path.join(variantsDir, `${componentName}.styles.ts`), stylesTemplate);
fs.writeFileSync(
  path.join(variantsDir, "index.ts"),
  `export * from "./${componentName}.styles";\n`
);
console.log(`Created variants: ${componentName}`);

// 6. Update Variants Index Entry Point
updateIndexFile(paths.stylesVariantsIndex, `export * from "./${componentName}";`);

console.log(`Component ${componentName} generated successfully.`);
