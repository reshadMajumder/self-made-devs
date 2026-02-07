import { lightFormat } from "date-fns";
import Link from "next/link";

export default function ModulesPage() {
  const modules = [
    {
      week: 2,
      date: "07/02/2026",
      deadline: "13/02/2026",
      topic: "JavaScript",
      resource: [
        "https://www.w3schools.com/js/default.asp",
        "https://www.youtube.com/playlist?list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW",
      ],
      tasks: ["Learn Javascript Basics"],
      quiz: "/exam?module=intro-to-javascript",
    },
    {
      week: 2,
      date: "30/01/2026",
      deadline: "06/02/2026",
      topic: "HTML + SRS",
      resource: [
        "https://www.w3schools.com/html/default.asp",
        "https://youtu.be/HcOc7P5BMi4?si=Q-zypcF3tRArJFJO",
        "https://youtu.be/HD13eq_Pmp8?si=rpP7SvYOUBWSOgfM",
      ],
      tasks: [
        "Make the SRS Doc with Proper Diagram",
        "Learn and practice major HTML Tags",
      ],
      quiz: "/exam?module=intro-to-javascript",
    },
    {
      week: 1,
      date: "19/01/2026",
      deadline: "23/01/2026",
      topic: "SDLC",
      resource: [
        "https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document",
      ],
      tasks: [
        "Generate a Project Idea",
        "Gather project requirements",
        "Create a Proper SRS doc",
        "Briefly Describe your project impact",
        "Submit the SRS doc in the Discord",
      ],
      quiz: "/exam?module=intro-to-javascript",
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
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Resource</th>
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
                    {m.deadline}
                  </td>

                  <td className="px-4 py-3 align-top text-slate-200">
                    {m.topic}
                  </td>

                  <td className="px-4 py-3 align-top text-slate-200 w-84">
                    {m.tasks.map((task) => (
                      <li className="" key={task}>
                        {task}
                      </li>
                    ))}
                  </td>

                  <td className="px-4 py-3 align-top">
                    {m.resource.map((r) => (
                      <a
                        key={r}
                        target="_blank"
                        className="block text-blue-800 underline"
                        href={r}
                      >
                        Link
                      </a>
                    ))}
                    {/* <a
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
                    </a> */}
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
