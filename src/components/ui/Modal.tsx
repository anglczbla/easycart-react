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
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-primary/20 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-300">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>

        <p className="text-sm font-medium text-muted leading-relaxed mb-8 px-2">
          {content}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-secondary hover:bg-primary-light transition-elegant shadow-sm"
          >
            Yes, confirm
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200 transition-elegant"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
