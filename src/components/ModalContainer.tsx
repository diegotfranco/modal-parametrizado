import { useModalStore } from "../store/useModalStore";
import { useForm, FormProvider } from "react-hook-form";
import { DynamicFormLayout } from "./DynamicFormLayout";

export default function ModalContainer() {
  // console.log('renderizando ModalContainer...');
	const { isOpen, history, currentStep, prevStep, nextStep, closeModal } =
		useModalStore();

	const methods = useForm();

	if (!isOpen) return null;

	const step = currentStep();
	if (!step) return null;

	const { title, subtitles, components, steps } = step;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-xl max-w-2xl w-full space-y-4">
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit((data) => {
							console.log("Form data:", data);
							closeModal();
						})}
					>
						<DynamicFormLayout
							components={components}
							title={title}
							subtitles={subtitles}
							hasPrevStep={history.length > 1}
							prevStep={prevStep}
							hasNextStep={steps?.length > 0}
							nextStep={nextStep}
							closeModal={closeModal}
						/>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
