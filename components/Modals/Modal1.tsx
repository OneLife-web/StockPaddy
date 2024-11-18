const Modal1 = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) => {
  return (
    <div
      onClick={closeModal}
      className="h-screen bg-black/65 z-50 fixed top-0 bottom-0 left-0 right-0 myFlex max-md:px-[3%]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-lg md:max-w-[400px]"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal1;
