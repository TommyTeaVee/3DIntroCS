import React, { useState } from 'react';

export default function Tooltip({ children, content }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}    // accessibility: focus shows tooltip
      onBlur={() => setVisible(false)}
      tabIndex={0}                       // make div focusable for keyboard users
    >
      {children}
      {visible && (
        <div className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max max-w-xs px-3 py-2 bg-gray-900 text-white text-sm rounded shadow-lg whitespace-normal">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 origin-center" />
        </div>
      )}
    </div>
  );
}
