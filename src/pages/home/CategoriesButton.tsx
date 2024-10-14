import { CategoriesButtonProps } from "@/_typesBundle";

export const CategoriesButton = ({
  title,
  value,
  activeTab,
  setActiveTab,
}: CategoriesButtonProps) => {

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`m-3 py-1 px-2 hover:bg-gray-100 ${activeTab === value ? 'text-[#b66cf7] font-bold' : 'text-gray-500'}`}
    >
      {title}
    </button>
  );
};
