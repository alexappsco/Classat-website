import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import { formatAMPM, json_verify, nameTructed } from "src/utils/helper";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useMeetingAppContext } from "../../MeetingAppContextDef";

interface ChatMessageProps {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

/** Pub/Sub may deliver `timestamp` as string (e.g. ISO or ms) or number */
function toTimestampMs(ts: string | number): number {
  if (typeof ts === "number" && !Number.isNaN(ts)) return ts;
  if (typeof ts === "string") {
    const asNum = Number(ts);
    if (!Number.isNaN(asNum) && ts.trim() !== "") return asNum;
    const parsed = Date.parse(ts);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Date.now();
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  senderId,
  senderName,
  text,
  timestamp,
}) => {
  const mMeeting = useMeeting();
  const localParticipantId = mMeeting?.localParticipant?.id;
  const isLocalSender = localParticipantId === senderId;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isLocalSender ? "flex-end" : "flex-start",
        mt: 2,
        maxWidth: "100%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 0.5,
          px: 1.5,
          borderRadius: 2,
          bgcolor: "#2a2d3a",
          maxWidth: "80%",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
          {isLocalSender ? "You" : nameTructed(senderName, 15)}
        </Typography>
        <Typography variant="body2" sx={{ color: "white", wordBreak: "break-word" }}>
          {text}
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "right", mt: 0.5 }}>
          {formatAMPM(new Date(timestamp))}
        </Typography>
      </Paper>
    </Box>
  );
};

const ChatInput: React.FC<{ inputHeight: number }> = ({ inputHeight }) => {
  const [message, setMessage] = useState("");
  const { publish } = usePubSub("CHAT");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    const messageText = message.trim();
    if (messageText.length > 0) {
      try {
        publish(messageText, { persist: true });
        setTimeout(() => setMessage(""), 100);
        inputRef.current?.focus();
      } catch (e) {
        console.log("Error in pubsub", e);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        px: 1.5, // Slightly more compact padding
        py: 1.5,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        bgcolor: "#2a2d3a",
        zIndex: 1 // Ensure it's on top
      }}
    >
      <TextField
        autoFocus
        inputRef={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Write your message..."
        variant="outlined"
        fullWidth
        size="medium" // Slightly larger for easier clicking
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: "12px", // More rounded corners
            "& input": {
              color: "white",
              py: 1,
              fontSize: "0.9rem",
              "&::placeholder": {
                color: "rgba(255,255,255,0.5)",
                opacity: 1
              }
            },
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.1)",
              borderWidth: "1px"
            },
            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.2)"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4CAF50"
            }
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={sendMessage}
                disabled={message.trim().length === 0}
                edge="end"
                sx={{ ml: 1 }}
              >
                <SendIcon sx={{ color: message.trim().length === 0 ? "rgba(255,255,255,0.2)" : "#4CAF50" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

const ChatMessages: React.FC<{ listHeight: number }> = ({ listHeight }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { chatMessages } = useMeetingAppContext();

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!chatMessages || chatMessages.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Typography sx={{ color: "gray" }}>No messages</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={listRef}
      sx={{
        overflowY: "auto",   // ✅ ده اللي بيعمل scroll
        flex: 1,             // ✅ ياخد المساحة المتبقية
        p: 2,
        height: "100%",
        pt: 2      // مهم
      }}
    >
      {/* <Box sx={{ : 2 }} /> */}
      {
        chatMessages.map((msg, i) => (
          <ChatMessageComponent
            key={`chat_item_${i}`}
            senderId={msg.senderId}
            senderName={msg.senderName}
            text={msg.message}
            timestamp={toTimestampMs(msg.timestamp)}
          />
        ))
      }
    </Box >
  );
};

export function ChatPanel({ panelHeight }: { panelHeight: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: panelHeight,
        overflow: "hidden", // مهم
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <ChatMessages listHeight={0} />
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <ChatInput inputHeight={72} />
      </Box>
    </Box>
  );
}