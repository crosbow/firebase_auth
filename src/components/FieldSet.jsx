const FieldSet = ({ label, children }) => {
  return (
    <fieldset className="w-xl mx-auto p-5 my-10 border shadow">
      <legend className="mb-5 text-3xl px-3 font-bold">{label}</legend>
      {children}
    </fieldset>
  );
};
export default FieldSet;
