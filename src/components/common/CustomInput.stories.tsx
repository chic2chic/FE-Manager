import CustomInput from "@/components/common/CustomInput";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomInput> = {
  title: "components/common/CustomInput",
  component: CustomInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomInput>;

export const CustomInputTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=465-202&t=MnPdSfKrSa6KuTGV-4",
    },
  },
};
