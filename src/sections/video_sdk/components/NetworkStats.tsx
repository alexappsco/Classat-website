import UploadIcon from "../icons/NetworkStats/UploadIcon";
import DownloadIcon from "../icons/NetworkStats/DownloadIcon";
import RefreshIcon from "../icons/NetworkStats/RefreshIcon";
import RefreshCheck from "../icons/NetworkStats/RefreshCheck";
import { getNetworkStats } from "@videosdk.live/react-sdk";
import WifiOff from "../icons/NetworkStats/WifiOff";
import { useEffect, useState } from "react";
import useIsMobile from "src/hooks/useIsMobile";
import { Box, Button, Chip, CircularProgress } from "@mui/material";

type ErrorState = "no-error-loading" | "no-error" | "no-wifi" | "timeout";

const NetworkStats: React.FC = () => {
  const [error, setError] = useState<ErrorState>("no-error-loading");
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    getNetworkStatistics();
  }, []);

  const getNetworkStatistics = async () => {
    setError("no-error-loading");
    try {
      const options = { timeoutDuration: 45000 };
      const networkStats = await getNetworkStats(options);
      if (networkStats) {
        setError("no-error");
        setDownloadSpeed(networkStats["downloadSpeed"]);
        setUploadSpeed(networkStats["uploadSpeed"]);
      }
    } catch (ex) {
      if (ex === "Not able to get NetworkStats due to no Network") {
        setError("no-wifi");
      }
      if (ex === "Not able to get NetworkStats due to timeout") {
        setError("timeout");
      }
      console.log("Error in networkStats: ", ex);
    }
  };

  const handleOnClick = () => {
    getNetworkStatistics();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid #3F4346",
        borderRadius: "6px",
        bgcolor: "rgba(0,0,0,0.8)",
        height: 36,
        alignItems: "center",
      }}
    >
      {error === "no-error-loading" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2, color: "#B4B4B4", fontSize: "0.75rem" }}>
          Checking network speeds
          <CircularProgress size={16} sx={{ color: "#B4B4B4" }} />
        </Box>
      )}

      {error === "no-error" && (
        <>
          <Chip
            icon={<DownloadIcon />}
            label={`${downloadSpeed} MBPS`}
            sx={{
              bgcolor: "transparent",
              color: "#B4B4B4",
              fontSize: "0.75rem",
              width: isMobile ? "auto" : 128,
              "& .MuiChip-label": { px: 1 },
            }}
          />
          <Chip
            icon={<UploadIcon />}
            label={`${uploadSpeed} MBPS`}
            sx={{
              bgcolor: "transparent",
              color: "#B4B4B4",
              fontSize: "0.75rem",
              width: isMobile ? "auto" : 128,
              "& .MuiChip-label": { px: 1 },
            }}
          />
          <Button onClick={handleOnClick} sx={{ minWidth: 36, p: 0 }}>
            <RefreshIcon />
          </Button>
        </>
      )}

      {error === "no-wifi" && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, color: "#FF5D5D", fontSize: "0.75rem" }}>
            <WifiOff />
            You're offline! Check your connection
          </Box>
          <Button onClick={handleOnClick} sx={{ minWidth: 36, p: 1 }}>
            <RefreshIcon />
          </Button>
        </>
      )}

      {error === "timeout" && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, color: "#FF5D5D", fontSize: "0.75rem" }}>
            Something went wrong! Couldn't load data
          </Box>
          <Button onClick={handleOnClick} sx={{ minWidth: 36, p: 1 }}>
            <RefreshIcon />
          </Button>
        </>
      )}
    </Box>
  );
};

export default NetworkStats;