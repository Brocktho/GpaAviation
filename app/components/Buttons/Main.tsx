const MainButton = ({
  color,
  text,
  func,
}: {
  color: string;
  text: string;
  func: Function;
}) => {
  return (
    <button
      className={`rounded-full border bg-transparent px-4 py-2 hover:bg-${color} text-${color} border-${color} hover:border-transparent hover:text-slate-50`}
      onClick={(e) => {
        func(e);
      }}
    >
      {text}
    </button>
  );
};

export default MainButton;
