import { ReactNode } from "react";

export function GridMainContainer(props: { children: ReactNode }) {
  return <div className="Grid-main">{props.children}</div>;
}

export default GridMainContainer;
