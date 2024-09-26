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
      className={`m-3 ${activeTab === value ? 'px-4 py-1 bg-[#b66cf7] text-white rounded-lg' : 'text-gray-500'}`}
    >
      {title}
    </button>
  );
};
