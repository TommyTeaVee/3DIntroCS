import React, { useState, useRef, useEffect } from 'react';
import { FaMicrochip, FaMemory, FaHdd, FaTv, FaKeyboard, FaMouse } from 'react-icons/fa';
import usePulseStore from '../../stores/usePulseStore';

const deviceIcons = {
  cpu: <FaMicrochip />,
  ram: <FaMemory />,
  hard_drive: <FaHdd />,
  monitor: <FaTv />,
  keyboard: <FaKeyboard />,
  mouse: <FaMouse />,
};

export default function DeviceMenu() {
  const refs = usePulseStore((state) => state.getAllRefs());
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const popoverRefs = useRef({});

  // Close popover if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openPopoverId &&
        popoverRefs.current[openPopoverId] &&
        !popoverRefs.current[openPopoverId].contains(event.target)
      ) {
        setOpenPopoverId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openPopoverId]);

  const togglePopover = (id) => {
    setOpenPopoverId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="absolute top-0 right-0 h-full w-64 bg-gray-900 bg-opacity-90 border-l border-gray-700 overflow-y-auto p-4 space-y-3 z-20">
      <h2 className="text-white text-lg font-semibold mb-4">Device Components</h2>

      {Array.from(refs.keys()).map((id) => (
        <div key={id} className="relative">
          <button
            onClick={() => togglePopover(id)}
            className="w-full flex items-center gap-3 px-3 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded transition focus:outline-none"
            aria-expanded={openPopoverId === id}
            aria-controls={`popover-${id}`}
            aria-haspopup="true"
          >
            <span className="text-xl">{deviceIcons[id] || <FaMicrochip />}</span>
            <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
          </button>

          {/* Popover */}
          {openPopoverId === id && (
            <div
              ref={(el) => (popoverRefs.current[id] = el)}
              id={`popover-${id}`}
              role="dialog"
              aria-modal="true"
              className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 w-60 bg-black text-white p-4 rounded shadow-lg z-30"
            >
              <h3 className="text-lg font-semibold mb-2">{id.charAt(0).toUpperCase() + id.slice(1)} Info</h3>
              <p className="mb-3">
                This is an interactive popover for <strong>{id}</strong>. You can add detailed info, controls, or stats here.
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                onClick={() => alert(`More info for ${id}`)}
              >
                More Info
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
