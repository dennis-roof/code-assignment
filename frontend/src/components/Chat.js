import Message from './Message';
import MessageModal from './MessageModal';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { config } from '../config';

const getMessagesFromResponse = (response) => {
  if (response.data === undefined) {
    return {message: '', error: response};
  }

  const messages = response.data.map(message => {
    if (message.datetime === undefined || ! dayjs(message.datetime).isValid()) {
      return message;
    }

    message.datetime = dayjs(message.datetime);
    return message;
  });

  return {messages: messages, error: ''};
};

const getMessages = (setMessages, setError) => {
  return () => {
    fetch(config.apiDomain + '/messages')
      .then(response => response.text())
      .then((textBody) => {
        try {
          const jsonBody = JSON.parse(textBody);
          const messagesResult = getMessagesFromResponse(jsonBody);

          if (messagesResult.error.length > 0) {
            setError(messagesResult.error);
            return;
          }
  
          setMessages(messagesResult.messages);
        } catch(err) {
          setError(textBody);
        }
      });
  };
};

const addMessage = (setMessages, setError, setNewMessage, closeMessageModal) => {
  return (message) => {
    fetch(config.apiDomain + '/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: message})
      })
      .then(response => response.text())
      .then((textBody) => {
        try {
          const jsonBody = JSON.parse(textBody);
          const messagesResult = getMessagesFromResponse(jsonBody);

          if (messagesResult.error.length > 0) {
            setError(messagesResult.error);
            return;
          }

          setMessages(messagesResult.messages);
          setNewMessage('');
          closeMessageModal();

        } catch(err) {
          setError(textBody);
        }
      });
  };
};

export default function Chat({ messageModalOpen, closeMessageModal }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(getMessages(setMessages, setError), []);
  
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200 my-4 mx-8">
        {messages.map(({ ...activityItem }, index) => (
          <Message key={index} {...activityItem} />
        ))}
      </ul>

      <MessageModal
        messageModalOpen={messageModalOpen}
        closeMessageModal={closeMessageModal}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        addMessage={addMessage(setMessages, setError, setNewMessage, closeMessageModal)}
        error={error}
      />
    </div>
  );
}
