import CustomButton from "@/components/common/CustomButton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomButton> = {
  title: "components/common/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const CustomButtonTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=465-202&t=MnPdSfKrSa6KuTGV-4",
    },
  },
};
