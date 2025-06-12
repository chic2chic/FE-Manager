import Button from "../@common/Button";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const ItemActionButtons = ({ onEdit, onDelete }: Props) => {
  return (
    <div className="flex justify-center gap-4 mt-2">
      <Button size="md" variant="dark" onClick={onEdit}>
        수정
      </Button>
      <Button size="md" variant="secondary" onClick={onDelete}>
        삭제
      </Button>
    </div>
  );
};

export default ItemActionButtons;
