import NavBar from "@/components/common/NavBar";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof NavBar> = {
  title: "components/common/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  //   argTypes: {
  //     onClick: { action: "clicked" },
  //   },
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const NavBarTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=465-202&t=MnPdSfKrSa6KuTGV-4",
    },
  },
};
