import "./styles.scss";

const Loader = ({ variant }) => {
  return (
    <div className={`lds-roller ${variant}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
