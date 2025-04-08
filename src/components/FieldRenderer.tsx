import {
	registry,
	componentSchemas,
	type ComponentType,
} from "../helpers/registry";
import { useFormContext } from "react-hook-form";

export type FieldRendererProps = {
	type: ComponentType;
	props: Record<string, any>;
};

export function FieldRenderer({ type, props }: FieldRendererProps) {
	const form = useFormContext();

	const Component = registry[type];
	if (!Component) {
		console.error(`Component type "${type}" not found in registry.`);
		return (
			<div className="p-2 bg-red-100 text-red-700 rounded">
				Erro: tipo de componente desconhecido: <strong>{type}</strong>
			</div>
		);
	}

	const schema = componentSchemas[type];
	const parsed = schema.safeParse(props);
	if (!parsed.success) {
		console.error(`Invalid props for component "${type}"`, parsed.error);
		return (
			<div className="p-2 bg-yellow-100 text-yellow-800 rounded">
				Erro de validação no componente <strong>{type}</strong>
			</div>
		);
	}

	try {
		return <Component {...parsed.data} {...form} />;
	} catch (err) {
		console.error(`Error rendering component "${type}"`, err);
		return (
			<div className="p-2 bg-red-100 text-red-700 rounded">
				Erro ao renderizar o componente <strong>{type}</strong>
			</div>
		);
	}
}
