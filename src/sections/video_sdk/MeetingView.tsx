'use client';

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), {
  ssr: false,
});

interface MeetingViewProps {
  videoSessionId: string;
}

export default function MeetingView({ videoSessionId }: MeetingViewProps) {
  return <App videoSessionId={videoSessionId} />;
}
