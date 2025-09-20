const InputBox = ({
  id,
  name,
  type = "text",
  label,
  required = false,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  Icon,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-3"
            } pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${error ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputBox;
