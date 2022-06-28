import React, {ReactNode} from "react";

interface props {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Link: React.FC<props> = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}>
        {children}
      </a>
    </>
  );
};
export default Link;
