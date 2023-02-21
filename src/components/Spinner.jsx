const Spinner = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparent bg-opacity-50 flex justify-center items-center z-40">
      <div className="w-16 h-16 border-8 border-x-yellow-500 border-y-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
