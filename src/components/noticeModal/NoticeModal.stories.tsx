import NoticeModal from "@/components/noticeModal/NoticeModal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NoticeModal> = {
  title: "components/common/NoticeModal",
  component: NoticeModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NoticeModal>;

export const NoticeModalTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=561-858&t=WnZ6GwM7S2cFIM0R-4",
    },
  },
};
