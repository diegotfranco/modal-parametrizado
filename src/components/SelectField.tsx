import { useFormContext } from 'react-hook-form';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = {
  name: string;
  title: string;
  data: SelectOption[];
};

export default function SelectField({ name, title, data }: SelectFieldProps) {
  // console.log('renderizando SelectField...');
  const { register, setValue, watch } = useFormContext();
  const selectedValue = watch(name);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(name, value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium">
        {title}
      </label>
      <select
        id={name}
        {...register(name)}
        value={selectedValue || ''}
        onChange={handleChange}
        className="border rounded px-3 py-2"
      >
        <option value="" disabled>
          Select an option
        </option>
        {data.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
