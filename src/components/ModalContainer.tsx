import { useModalStore } from './useModalStore';
import { useForm, FormProvider } from 'react-hook-form';
import { DynamicFormLayout } from './DynamicFormLayout';

export default function ModalContainer() {
  const { isOpen, components, closeModal } = useModalStore();
  const methods = useForm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full space-y-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => console.log('Form data:', data))}>
            <DynamicFormLayout components={components} />
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
