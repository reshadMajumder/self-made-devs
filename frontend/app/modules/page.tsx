import Link from "next/link";

export default function ModulesPage() {
  const modules = [
    {
      date: "2026-01-19",
      topic: "Intro to JavaScript",
      resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      task: "Complete JS fundamentals exercises",
      quiz: "/exam?module=intro-to-javascript",
    },
    {
      date: "2026-01-26",
      topic: "React Basics",
      resource: "https://react.dev/learn",
      task: "Build a small todo app",
      quiz: "/exam?module=react-basics",
    },
    {
      date: "2026-02-02",
      topic: "Next.js App Router",
      resource: "https://nextjs.org/docs/app",
      task: "Create a multi-page Next app",
      quiz: "/exam?module=nextjs-app-router",
    },
  ];

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl font-bold mb-2">Weekly Modules</h1>
          <p className="text-lg text-slate-400">
            A schedule of upcoming module topics, resources, and tasks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-100">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Task</th>
                {/* <th className="px-4 py-3">Quiz</th> */}
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.date} className="border-b border-slate-700">
                  <td className="px-4 py-3 align-top text-slate-200">
                    {m.date}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {m.topic}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <a
                      href={m.resource}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline mr-4"
                    >
                      Docs
                    </a>

                    <a
                      href={m.resource}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Lecture
                    </a>
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {m.task}
                  </td>
                  {/* <td className="px-4 py-3 align-top">
                    <Link
                      href={m.quiz}
                      className="text-indigo-400 hover:underline"
                      aria-disabled
                    >
                      Quiz
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
