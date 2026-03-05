import { getContext, setContext } from "svelte";

/**
 * Contexto compartido para componentes de campo de formulario.
 *
 * Proporciona estado común entre un componente de campo padre
 * (TextField, Checkbox, Radio, Select, etc.) y sus componentes hijos
 * (Label, Description, ErrorMessage, etc.).
 *
 * @example
 * ```svelte
 * // En TextField.svelte
 * import { setFieldStateContext } from "@shizen-ui/contexts";
 *
 * setFieldStateContext({
 *   get invalid() { return invalid; },
 *   get disabled() { return disabled; },
 *   get required() { return required; },
 *   get id() { return id; }
 * });
 * ```
 *
 * @example
 * ```svelte
 * // En Label.svelte
 * import { useFieldStateContext } from "@shizen-ui/contexts";
 *
 * const field = useFieldStateContext();
 * // field.invalid, field.disabled, field.required, field.id
 * ```
 */
export interface FieldStateContextValue {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly keepDescription?: boolean;
  readonly id: string;
}

export const FIELD_STATE_CONTEXT_KEY = Symbol("field-state");

/**
 * Establece el contexto de estado de campo.
 * Debe ser llamado por componentes de campo padre (TextField, Checkbox, etc.).
 *
 * @param value - Objeto con getters reactivos para propagar cambios a componentes hijos
 */
export function setFieldStateContext(value: FieldStateContextValue) {
  setContext(FIELD_STATE_CONTEXT_KEY, value);
}

/**
 * Consume el contexto de estado de campo.
 * Usado por componentes hijos (Label, Description, ErrorMessage, etc.).
 *
 * @returns Objeto con propiedades del campo y flag `exists` para detectar presencia de contexto
 */
export function useFieldStateContext() {
  const context = getContext<FieldStateContextValue | undefined>(FIELD_STATE_CONTEXT_KEY);

  if (!context) {
    return {
      invalid: false,
      disabled: false,
      required: false,
      id: "",
      exists: false
    } as const;
  }

  return {
    get invalid() {
      return context.invalid;
    },
    get disabled() {
      return context.disabled;
    },
    get required() {
      return context.required;
    },
    get id() {
      return context.id;
    },
    get exists() {
      return true;
    }
  };
}
