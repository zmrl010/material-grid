import { Story, Meta } from "@storybook/react";

import GridComponent, { GridProps } from "../GridComponent";
import { demoData, demoColumns } from "./demo-data";

export default {
  title: "Grid / Grid Component",
  component: GridComponent,
  args: {
    columns: demoColumns,
    data: demoData,
  },
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as Meta;

const Template: Story<GridProps> = (args) => (
  <div style={{ width: "100%", height: "200px" }}>
    <GridComponent {...args} />
  </div>
);

export const Base = Template.bind({});

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: "Button",
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
