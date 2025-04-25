import { useNavigate } from "react-router-dom";

export default function ItemListPage() {
  const navigate = useNavigate();
  return (
    <div>
      아이템 리스트 페이지
      <button onClick={() => navigate("./create")}>등록 페이지 이동</button>
    </div>
  );
}
