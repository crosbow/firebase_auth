const Input = ({ className, ...rest }) => {
  return (
    <input
      className={`${className} border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...rest}
    />
  );
};
export default Input;
