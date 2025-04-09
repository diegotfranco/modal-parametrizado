import { useFormContext, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

type TextInputFieldProps = {
	title: string;
	name: string;
	type?: string;
	placeholder?: string;
	mask?: string;
	currency?: boolean;
};

export default function TextInputField({
	title,
	name,
	type = "text",
	placeholder = "",
	mask,
	currency = false,
}: TextInputFieldProps) {
  // console.log('renderizando TextInputField...');
	const { control } = useFormContext();

	return (
		<div className="space-y-1">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{title}
			</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					if (currency) {
						return (
							<IMaskInput
								{...field}
								mask={Number}
								unmask="typed"
								radix=","
								thousandsSeparator="."
								mapToRadix={["."]}
								scale={2}
								normalizeZeros={true}
								padFractionalZeros={true}
								placeholder={placeholder}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								onAccept={(value) => field.onChange(value)}
							/>
						);
					}

					if (mask) {
						return (
							<IMaskInput
								{...field}
								mask={mask}
								unmask="unmasked"
								placeholder={placeholder}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								onAccept={(value) => field.onChange(value)}
							/>
						);
					}

					return (
						<input
							{...field}
							id={name}
							type={type}
							placeholder={placeholder}
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					);
				}}
			/>
		</div>
	);
}
