import InputA from './components/InputA';
import SelectB from './components/SelectB';
import FileUploadE from './components/FileUploadE';
import { z } from 'zod';

export const componentSchemas = {
  InputA: z.object({ label: z.string(), name: z.string() }),
  SelectB: z.object({ options: z.array(z.string()), name: z.string() }),
  FileUploadE: z.object({ accept: z.string(), name: z.string() }),
};

export type ComponentType = keyof typeof componentSchemas;

export const registry: Record<ComponentType, React.ComponentType<any>> = {
  InputA,
  SelectB,
  FileUploadE,
};