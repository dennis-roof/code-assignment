import Message from './Message';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { config } from '../config';

const getMessages = (setMessages) => {
  return () => {
    fetch(config.apiDomain + '/messages')
      .then((response) => response.json())
      .then((response) => {
        if (response.data === undefined) {
          return
        }

        const messages = response.data.map(message => {
          if (message.datetime === undefined || ! dayjs(message.datetime).isValid()) {
            return message;
          }

          message.datetime = dayjs(message.datetime);
          return message;
        });

        setMessages(messages);
      });
  };
};

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(getMessages(setMessages), []);
  
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200 my-4 mx-8">
        {messages.map(({ ...activityItem }, index) => (
          <Message key={index} {...activityItem} />
        ))}
      </ul>
    </div>
  );
}
