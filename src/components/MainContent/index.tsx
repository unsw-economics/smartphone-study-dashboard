interface Props {
  children: React.ReactNode;
}

function MainContent({ children }: Props) {
  return (
    <div className="outline-1 border-solid border-2 rounded-xl border-gray-300 w-3/4 p-4 ml-4 flex justify-center h-full">
      {children}
    </div>
  );
}

export default MainContent;
