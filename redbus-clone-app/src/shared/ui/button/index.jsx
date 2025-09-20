const Button = ({ text, onClick, type = "button", disabled = false,  icon: Icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
