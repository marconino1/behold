import { LESSONS } from "@/content/behold_lesson_content.js";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = LESSONS[lessonId as keyof typeof LESSONS] as
    | { title?: string }
    | undefined;
  return {
    title: lesson?.title ? `Behold — ${lesson.title}` : "Behold — Lesson",
  };
}

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
