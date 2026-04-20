
import LessonsSection, {
  IStudentCard,
} from "src/sections/nextlessons/lessonsSection";

import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";

/* =========================
   Types
========================= */

interface SessionItem {
  sessionId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: number;
  source: number;
  subjectName: string;
  teacherName: string;
  teacherLogo: string;
}

/* =========================
   Helpers
========================= */

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const [hour, minute] = time.split(":");

  const date = new Date();
  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

interface Props {
  searchParams: Promise<Record<'page' | 'status', string | undefined>>;
}

/* =========================
   Page
 ========================= */

async function page({ searchParams }: Props) {
  const { page: currentPageStr, status } = await searchParams;

  const pageNum = Number(currentPageStr) || 1;
  const pageSize = 12;
  const skipCount = (pageNum - 1) * pageSize;

  const urlParams = new URLSearchParams({
    SkipCount: String(skipCount),
    MaxResultCount: String(pageSize),
  });

  if (status && status !== "All") {
    urlParams.append("Status", status);
  }

  const endpoint = `${endpoints.studentEducationSession.get}?${urlParams.toString()}`;
  const res: any = await getData(endpoint);

  const sessions: SessionItem[] =
    res?.data?.items ||
    res?.items ||
    res?.result?.items ||
    [];

  const totalCount = res?.data?.totalCount || res?.totalCount || 0;

  const cards: IStudentCard[] = sessions.map((session) => ({
    id: session.sessionId,
    status: String(session.status),
    img: session.teacherLogo,
    name: session.teacherName,
    studentClass: "",
    language: session.subjectName,
    country: "",
    date: formatDate(session.sessionDate),
    time: formatTime(session.startTime),
  }));


  return (
    <LessonsSection 
      cards={cards} 
      totalCount={totalCount} 
      currentPage={pageNum} 
      pageSize={pageSize}
      currentStatus={status || "All"}
    />
  );
}

export default page;
