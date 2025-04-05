import { FieldRenderer } from './FieldRenderer';
import { ModalComponentSpec } from './useModalStore';

export function DynamicFormLayout({ components }: { components: ModalComponentSpec[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {components.map((spec, idx) => (
        <FieldRenderer key={idx} {...spec} />
      ))}
    </div>
  );
}
