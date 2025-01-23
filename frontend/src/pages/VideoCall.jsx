// src/components/VideoCall.js
import React, { useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall = () => {
  const [roomName, setRoomName] = useState("");
  const [startCall, setStartCall] = useState(false);

  const handleStartCall = () => {
    setStartCall(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Video Call with Your Team</h1>

      {!startCall ? (
        <div className="bg-white p-6 rounded shadow-md w-80 text-center">
          <h2 className="text-xl font-bold mb-4">Start a Video Call</h2>
          <input
            className="w-full px-3 py-2 mb-4 border rounded"
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleStartCall}
            disabled={!roomName}
          >
            Start Call
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full h-screen">
          <JitsiMeeting
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: true,
            }}
            interfaceConfigOverwrite={{
              filmStripOnly: false,
              SHOW_JITSI_WATERMARK: false,
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoCall;
