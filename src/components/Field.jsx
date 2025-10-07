import React from "react";

const getChildId = (children) => {
  const child = React.Children.only(children);

  return child.props.id;
};

const Field = ({ label, htmlFor, error, children }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="flex flex-col w-full ">
      {label && (
        <label htmlFor={id} className="mb-1 text-lg font-medium ">
          {label}
        </label>
      )}
      {children}

      {error && (
        <div className="mt-1 text-xs text-red-400"> {error.message} </div>
      )}
    </div>
  );
};
export default Field;
