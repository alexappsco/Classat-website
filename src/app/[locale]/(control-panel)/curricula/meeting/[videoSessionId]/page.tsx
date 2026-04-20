import MeetingView from 'src/sections/video_sdk/MeetingView';

type Props = {
  params: Promise<{
    videoSessionId: string;
    locale: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { videoSessionId } = await params;

  return <MeetingView videoSessionId={videoSessionId} />;
}