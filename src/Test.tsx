import { useItemListApi } from "./hooks/api/usePopUpListApi";

export default function Test() {
  const { data } = useItemListApi();

  return (
    <div>
      {data &&
        Object.entries(data).map(([k, v]) => (
          <div>
            {k}
            <div>
              {v.map(item => (
                <div>{item.location}</div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
