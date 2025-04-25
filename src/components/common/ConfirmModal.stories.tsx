import { Meta, StoryObj } from "@storybook/react";
import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "components/common/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const ConfirmModalTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=561-1152&t=bDG6BOD8kRrsyWow-4",
    },
  },
};
