import React, { useState } from 'react';

interface Slot {
  id: string;
  startTime: Date;
  endTime: Date;
  // Additional properties as needed
}

interface SlotSelectorProps {
  slots: Slot[];
}

export default function SlotSelector({ slots }: SlotSelectorProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(undefined);

  const handleSlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSlotId = event.target.value;
    const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
    setSelectedSlot(selectedSlot);
  };

  function formatTime(date: Date, format: string = "hh:mm a"): string {
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
    <div className='flex flex-row gap-4'>
    <div className='rounded-2xl shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817] w-full'>
      <h2>Select a Slot:</h2>
      <ul className='flex flex-col gap-1'>
        {slots.map((slot) => (
          <li key={slot.id}>
            <label>
              <input
              className='mx-1'
                type="radio"
                name="slot"
                value={slot.id}
                checked={selectedSlot === slot}
                onChange={handleSlotChange}
              />
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </label>
          </li>
        ))}
      </ul>
    </div>
    {selectedSlot && (
        <div className='rounded-2xl flex-col shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817] w-full'>
          <p>Selected Slot:</p>
          <p>
            Start Time: <b>{formatTime(selectedSlot.startTime)}</b>
          </p>
          <p>End Time: <b>{formatTime(selectedSlot.endTime)}</b></p>
        </div>
      )}
      </div>
  );
}
