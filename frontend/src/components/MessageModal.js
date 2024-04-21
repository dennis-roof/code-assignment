import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function MessageModal({ messageModalOpen, closeMessageModal, newMessage, setNewMessage, addMessage, error }) {
  const handleMessageInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <>
      <Transition appear show={messageModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeMessageModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-sm font-medium truncate"
                  >
                    New message
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-10 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      value={newMessage}
                      onChange={handleMessageInputChange}
                    ></textarea>
                    <p className="text-red-900 text-sm font-medium truncate">
                      {error}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => addMessage(newMessage)}
                    >
                      Add message
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}