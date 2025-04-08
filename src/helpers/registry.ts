import { z } from 'zod';
import SelectField from '../components/SelectField';
import TextInputField from '../components/TextInputField';
import FileUploadField from '../components/FileUploadField';

export const componentSchemas = {
  SelectField: z.object({
    title: z.string(),
    name: z.string(),
    data: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
  TextInputField: z.object({
    title: z.string(),
    name: z.string(),
    type: z.string().optional(),
    placeholder: z.string().optional(),
    mask: z.string().optional(),
    currency: z.boolean().optional(),
  }),
  FileUploadField: z.object({ accept: z.string(), title: z.string(), name: z.string() }),
};

export type ComponentType = keyof typeof componentSchemas;

type ComponentPropsMap = {
  [K in ComponentType]: {
    type: K;
    props: z.infer<(typeof componentSchemas)[K]>;
  };
};

export type ComponentDefinition = ComponentPropsMap[ComponentType];

export const registry: Record<ComponentType, React.ComponentType<any>> = {
  SelectField,
  TextInputField,
  FileUploadField,
};