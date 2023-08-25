import React from "react";

interface Props {
  closeModal: () => void;
  logoutUser: () => void;
}

const LogoutModal = (props: Props) => {
  const { closeModal, logoutUser } = props;

  return (
    <div className="top-50 fixed left-0 right-0 z-50  h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
      <div className="relative mt-56 flex max-h-full w-full  justify-center">
        <div className="dark:bg-gray-800 relative rounded-lg border  border-body-color bg-white shadow-2xl">
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 absolute top-3 right-2.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={closeModal}
          >
            <svg
              className="h-3 w-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="text-gray-400 dark:text-gray-200 mx-auto mb-4 h-12 w-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="dark:text-gray-400 mb-5 text-lg font-normal text-dark">
              Are you sure you want to Logout?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800 mr-2 inline-flex items-center rounded-lg bg-[#fd00138c] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              onClick={logoutUser}
            >
              Yes, I am sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="rounded-lg  bg-primary  px-5 py-2.5 text-sm font-medium text-white "
              onClick={closeModal}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
