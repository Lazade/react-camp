import React from "react";
import "./button.scss";

interface MyProps {
  text: string;
}

export const Button: React.FC<MyProps> = (props: MyProps) => {
  return (
    <button className="bttn-stretch bttn-md bttn-primary">{props.text}</button>
  );
};
