interface CategoriesButtonProps {
  title: string;
  value: 'outer' | 'top' | 'bottom' | 'shoes' | 'acc' | 'all';
  activeTab: 'outer' | 'top' | 'bottom' | 'shoes' | 'acc' | 'all';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'outer' | 'top' | 'bottom' | 'shoes' | 'acc' | 'all'>
  >;
}
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
