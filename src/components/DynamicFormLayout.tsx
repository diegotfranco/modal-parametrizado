import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import type { ComponentDefinition } from "../helpers/registry";

export type DynamicFormLayoutProps = {
	components: ComponentDefinition[];
	title: string;
	subtitles: string[];
	hasPrevStep: boolean;
	prevStep: () => void;
	hasNextStep: boolean;
	nextStep: (value?: number) => void;
	closeModal: () => void;
};

export function DynamicFormLayout({
	components,
	title,
	subtitles,
	hasPrevStep,
	prevStep,
	hasNextStep,
	nextStep,
	closeModal,
}: DynamicFormLayoutProps) {
  // console.log('renderizando DynamicFormLayout...');
	const { handleSubmit, getValues } = useFormContext();

	const onNext = useCallback(() => {
		let stepNumber;

		if (components.length === 1) {
			const fieldName = components[0]?.props?.name;
			stepNumber = getValues(fieldName);
		}

		console.log(stepNumber);
		nextStep(stepNumber);
	}, [components, getValues, nextStep]);

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="space-y-1">
				<h2 className="text-2xl font-semibold">{title}</h2>
				{subtitles.map((s, idx) => (
					<p key={idx} className="text-xl font-medium">
						{s}
					</p>
				))}
			</div>

			{/* Body */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{components.map((spec, idx) => (
					<FieldRenderer key={idx} {...spec} />
				))}
			</div>

			{/* Footer */}
			<div className="mt-4 flex justify-between items-center gap-2">
				<div className="flex gap-2">
					{hasPrevStep ? (
						<button
							type="button"
							onClick={() => prevStep && prevStep()}
							className="px-4 py-2 bg-gray-300 rounded"
						>
							Back
						</button>
					) : (
						<button
							type="button"
							onClick={closeModal}
							className="px-4 py-2 bg-gray-300 rounded"
						>
							Cancel
						</button>
					)}
				</div>
				<div className="flex gap-2">
					{hasNextStep ? (
						<button
							type="button"
							onClick={handleSubmit(onNext)}
							className="px-4 py-2 bg-blue-500 text-white rounded"
						>
							Next
						</button>
					) : (
						<button
							type="submit"
							className="px-4 py-2 bg-green-600 text-white rounded"
						>
							Complete
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
