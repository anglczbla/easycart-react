interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
}

const Modal = ({
  open,
  handleClose,
  title,
  content,
  onConfirm,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all">
        <h3 className="text-xl font-bold leading-6 text-red-500 mb-4">
          {title}
        </h3>

        <div className="mt-2">
          <p className="text-base font-semibold text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-100 transition-colors duration-200"
          >
            Agree
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 transition-colors duration-200"
          >
            Disagree
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
