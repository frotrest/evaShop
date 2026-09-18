import '../index.css';

const Container = ({ children, className }) => {
  return <div className={className ? `container ${className}` : `container`}>{children}</div>;
};
export default Container;
