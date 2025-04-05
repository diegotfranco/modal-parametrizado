import { registry, componentSchemas, ComponentType } from './registry';
import { z } from 'zod';
import { useFormContext } from 'react-hook-form';

export type FieldRendererProps = {
  type: ComponentType;
  props: Record<string, any>;
};

export function FieldRenderer({ type, props }: FieldRendererProps) {
  const Component = registry[type];
  const schema = componentSchemas[type];
  const parsed = schema.safeParse(props);

  if (!parsed.success) {
    console.error(`Invalid props for component ${type}`, parsed.error);
    return null;
  }

  const form = useFormContext();
  return <Component {...parsed.data} {...form} />;
}