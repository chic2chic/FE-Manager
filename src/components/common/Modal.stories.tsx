import Modal from "@/components/common/Modal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "components/common/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const ModalTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=561-1152&t=bDG6BOD8kRrsyWow-4",
    },
  },
};
