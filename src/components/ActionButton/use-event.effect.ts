import { useEffect } from 'react';

/**
 * window.addEventListener(type, listener, options);
 *
 * @param {string} type - A case-sensitive string representing the event type to listen for. https://developer.mozilla.org/en-US/docs/Web/Events
 * @param {*} listener - callback to call when an event of the specified type occurs.
 * @param {*} options - {capture, once, passive}
 */
export const useEvent = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(type, listener, options);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(type, listener);
    };
  });
};
