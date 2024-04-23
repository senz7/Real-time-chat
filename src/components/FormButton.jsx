export const FormButton = (props) => {
  const { onClick, className, children, disabled } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      children={children}
    />
  );
};
