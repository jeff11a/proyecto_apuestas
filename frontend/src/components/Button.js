const Button = (props) => {
  const { txt, onClick, className, value } = props;
  return (
    <button onClick={onClick} className={className} value={value}>
      {txt}
    </button>
  );
};

export default Button;
