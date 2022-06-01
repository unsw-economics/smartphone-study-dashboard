interface Props {
  children: string;
  isActive: boolean;
  onClick(): void;
}

function SideBarButton({ children, isActive, onClick }: Props) {
  return (
    <button
      className={`w-full  hover:bg-neutral-300 flex justify-between rounded-lg p-3 my-1 ${
        isActive ? "font-semibold bg-neutral-300" : "font-normal bg-neutral-200"
      }`}
      onClick={onClick}
    >
      <div>{children}</div>
      <div>&gt;</div>
    </button>
  );
}

export default SideBarButton;
