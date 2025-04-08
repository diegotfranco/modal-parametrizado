import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LuFileDown } from "react-icons/lu";

type FileUploadFieldProps = {
	title: string;
	name: string;
	accept?: string;
};

export default function FileUploadField({
	title,
	name,
	accept = ".pdf",
}: FileUploadFieldProps) {
	const { register, setValue, watch } = useFormContext();
	const file = watch(name);
	const [fileName, setFileName] = useState<string>("Nenhum arquivo anexado");

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setValue(name, selectedFile);
			setFileName(selectedFile.name);
		}
	}

	return (
		<div className="space-y-1">
			<label className="block text-sm font-medium text-gray-700">{title}</label>
			<div className="flex items-center gap-2">
				<input
					type="text"
					readOnly
					value={file?.name || fileName}
					className="flex-1 px-3 py-2 border rounded bg-gray-100 text-sm text-gray-500"
				/>
				<label className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
					<LuFileDown className="mr-2 w-4 h-4" />
					Enviar arquivo
					<input
						type="file"
						accept={accept}
						{...register(name)}
						onChange={handleFileChange}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					/>
				</label>
			</div>
		</div>
	);
}
