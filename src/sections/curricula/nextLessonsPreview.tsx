'use client';

import * as React from 'react';
import LessonsSection, {
  IStudentCard,
} from '../nextlessons/lessonsSection';

import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import LessonsSectionMain from '../nextlessons/lessonsSectionMain';

/* =========================
   Types
========================= */

interface SessionItem {
  sessionId: string;
  sessionDate: string;
  startTime: string;
  subjectName: string;
  teacherName: string;
  teacherLogo: string;
  status?: number;
}

/* =========================
   Helpers
========================= */

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatTime(time: string) {
  const [hour, minute] = time.split(':');

  const date = new Date();
  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/* =========================
   Component
========================= */

export default function NextLessonsPreview() {
  const [cards, setCards] = React.useState<IStudentCard[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res: any = await getData(
          endpoints.studentEducationSession.get
        );
        const sessions: SessionItem[] =
          res?.data?.items ||
          res?.items ||
          res?.result?.items ||
          [];

        const mapped: IStudentCard[] = sessions.map((session) => ({
          id: session.sessionId,
          status:
            session.status != null ? String(session.status) : '',
          img: session.teacherLogo,
          name: session.teacherName,
          studentClass: '',
          language: session.subjectName,
          country: '',
          date: formatDate(session.sessionDate),
          time: formatTime(session.startTime),
          href: '/nextlessons',
        }));

        setCards(mapped.slice(0, 4)); 
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return null;

  return<div style={{marginTop:-150}}> <LessonsSectionMain cards={cards} /> </div>;
}