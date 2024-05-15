import { CategoryList } from "../../components/CategoryList.jsx";

export function CategoryPage() {
  return (
    <div className={" py-10 "}>
      <h1 className={"text-3xl font-bold mb-8"}>All categories</h1>
      <CategoryList />
    </div>
  );
}
