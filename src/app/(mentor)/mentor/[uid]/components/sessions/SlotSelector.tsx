import React, { useState } from 'react';
import { Slot } from '@/types/slots'; // Assuming Slot type is defined here

interface SlotSelectorProps {
  slots: Slot[];
}

export default function SlotSelector({ slots }: SlotSelectorProps) {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | undefined>(undefined);

  const handleSlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSlotIndex = parseInt(event.target.value);
    setSelectedSlotIndex(selectedSlotIndex);
  };

  function formatTime(timestamp: number, format: string = "hh:mm a"): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    if (format) {
      options.timeZone = format.includes("a") ? "UTC" : undefined; // Adjust for AM/PM
    }

    return date.toLocaleTimeString("en-US", options);
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="rounded-2xl shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817] w-full">
        <h2>Select a Slot:</h2>
        <ul className="flex flex-col gap-1">
          {slots.map((slot, index) => (
            <li key={index}>
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  name="slot"
                  value={index.toString()}
                  checked={selectedSlotIndex === index}
                  onChange={handleSlotChange}
                />
                {formatTime(slot.startTime.seconds)} - {formatTime(slot.endTime.seconds)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {selectedSlotIndex !== undefined && (
        <div className="rounded-2xl flex-col shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817] w-full">
          <p>Selected Slot:</p>
          <p>
            Start Time: <b>{formatTime(slots[selectedSlotIndex].startTime.seconds)}</b>
          </p>
          <p>End Time: <b>{formatTime(slots[selectedSlotIndex].endTime.seconds)}</b></p>
        </div>
      )}
    </div>
  );
}
