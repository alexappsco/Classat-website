
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

  return date.toLocaleDateString("en-GB", {
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

/* =========================
   Page
========================= */

async function page() {
  const res: any = await getData(
    endpoints.studentEducationSession.get
  );


  const sessions: SessionItem[] =
    res?.data?.items ||
    res?.items ||
    res?.result?.items ||
    [];

  console.log("SESSIONS:", sessions);

  const cards: IStudentCard[] = sessions.map((session) => ({
    id: session.sessionId,
    img: session.teacherLogo,
    name: session.teacherName,
    studentClass: "",
    language: session.subjectName,
    country: "",
    date: formatDate(session.sessionDate),
    time: formatTime(session.startTime),
    href: "#",
  }));


  return <LessonsSection cards={cards} />;
}

export default page;
