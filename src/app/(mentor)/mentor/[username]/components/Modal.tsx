import React from 'react';
import Balancer from 'react-wrap-balancer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
      >
        <div
          className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          aria-hidden="true"
          onClick={onClose}
        />

        <span
          className={`hidden sm:inline-block sm:align-middle sm:h-screen`}
          aria-hidden="true"
          >&#8203;</span>

        <div
          className="relative inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full" /* Increased max width to 3xl for wider modal */
        >
          <div className="bg-white px-6 pt-8 pb-6 sm:p-8">
            <div className="sm:flex justify-center sm:items-center">
              <div className="mt-3 bg-white p-2 text-center w-[100%]">
                <Balancer>
                  <h3
                    className="text-2xl leading-8 font-medium text-gray-900" /* Increased font size and leading */
                    id="modal-title"
                  >
                    Select a slot suitable to you
                  </h3>
                </Balancer>
                <div className="mt-4">
                    {children}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
