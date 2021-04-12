import { PropsWithChildren } from "react";

export function GridMain(props: PropsWithChildren<{}>) {
  const { children } = props;

  return <div className={"DataTable-main"}>{children}</div>;
}

export default GridMain;
