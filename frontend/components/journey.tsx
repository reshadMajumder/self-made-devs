"use client";

import { CheckCircle2, Lock, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const frontQuests = [
  {
    level: 1,
    month: "Month 1",
    title: "Fresher",
    subtitle: "The Beginning",
    description: "Master the fundamentals and unlock your developer potential.",
    skills: [
      "HTML & CSS",
      "CLI + Git & GitHub",
      "TailwindCSS",
      "Portfolio Project",
    ],
    xp: "1000 XP",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
  },
  {
    level: 2,
    month: "Month 2",
    title: "Sophomore",
    subtitle: "The Ascension",
    description: "Build interactive UIs and level up your frontend skills.",
    skills: ["JavaScript(ES6+)", "API Integration", "DOM Manipulation"],
    xp: "2500 XP",
    color: "from-purple-500 to-pink-500",
    icon: "⚡",
  },
  {
    level: 3,
    month: "Month 3",
    title: "Junior",
    subtitle: "The Transformation",
    description: "Build faster UI by implementing a framework.",
    skills: ["React", "State Managements", "React Hooks", "REST APIs"],
    xp: "5000 XP",
    color: "from-orange-500 to-red-500",
    icon: "🔥",
  },
  {
    level: 4,
    month: "Month 4",
    title: "Senior",
    subtitle: "The Victory",
    description:
      "Deploy your masterpiece and join the ranks of production developers.",
    skills: ["Deployment", "Testing", "CI/CD", "Explore Libraries"],
    xp: "10000 XP",
    color: "from-yellow-500 to-amber-500",
    icon: "👑",
  },
];

const backQuests = [
  {
    level: 5,
    month: "Month 1",
    title: "Fresher",
    subtitle: "The Beginning",
    description: "Master the fundamentals and unlock your developer potential.",
    skills: [
      "HTML & CSS",
      "CLI + Git & GitHub",
      "TailwindCSS",
      "Portfolio Project",
    ],
    xp: "1000 XP",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
  },
  {
    level: 6,
    month: "Month 2",
    title: "Sophomore",
    subtitle: "The Ascension",
    description: "Build interactive UIs and level up your frontend skills.",
    skills: ["JavaScript(ES6+)", "API Integration", "DOM Manipulation"],
    xp: "2500 XP",
    color: "from-purple-500 to-pink-500",
    icon: "⚡",
  },
  {
    level: 7,
    month: "Month 3",
    title: "Junior",
    subtitle: "The Transformation",
    description:
      "Conquer backend development and become a full-stack developer.",
    skills: ["React", "State Managements", "React Hooks", "REST APIs"],
    xp: "5000 XP",
    color: "from-orange-500 to-red-500",
    icon: "🔥",
  },
  {
    level: 8,
    month: "Month 4",
    title: "Senior",
    subtitle: "The Victory",
    description:
      "Deploy your masterpiece and join the ranks of production developers.",
    skills: ["Deployment", "Testing", "CI/CD", "Explore Libraries"],
    xp: "10000 XP",
    color: "from-yellow-500 to-amber-500",
    icon: "👑",
  },
];

export function Journey() {
  const [unlockedQuests, setUnlockedQuests] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  /*
  // Lock/unlock animation logic temporarily disabled.
  // Original IntersectionObserver-based unlocking is commented out so all
  // quests appear unlocked while debugging mobile layout.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [...frontQuests, ...backQuests].forEach((_, index) => {
              setTimeout(() => {
                setUnlockedQuests((prev) => [...prev, index]);
              }, index * 400);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  */

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 px-4 relative overflow-x-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Parallel Quest System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Epic Journey
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Complete each quest to unlock the next level. Your transformation
            awaits.
          </p>
        </div>

        {/* Quest Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-4 place-items-center lg:place-items-stretch">
          <Track
            title="Frontend Development Track - [Rookie]"
            quests={frontQuests}
            unlockedQuests={unlockedQuests}
            offset={0}
            lockMessage="Complete Previous Quest to Unlock"
          />
          <Track
            title="Backend Development Track - [Veteran]"
            quests={backQuests}
            unlockedQuests={unlockedQuests}
            offset={frontQuests.length}
            lockMessage="Under Construction"
          />
        </div>

        {/* Achievement */}
        <div className="text-center mt-12 sm:mt-16 space-y-4 px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur-sm">
            <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
            <span className="text-sm sm:text-base font-semibold text-yellow-400 text-center sm:text-left">
              Complete All Quests to Become a Self Made Dev
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Track({
  title,
  quests,
  unlockedQuests,
  offset,
  lockMessage,
}: {
  title: string;
  quests: any[];
  unlockedQuests: number[];
  offset: number;
  lockMessage: string;
}) {
  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-md mx-auto lg:max-w-none">
      <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">
        {title}
      </h3>
      {quests.map((quest, index) => {
        /*
   // Lock/unlock checks are commented out so all quests are shown as unlocked.
   const isUnlocked = unlockedQuests.includes(index + offset);
   const isLocked = !isUnlocked;
  */
        // Lock backend track cards individually (frontend unlocked, backend locked)
        const trackLocked = title.toLowerCase().includes("backend");
        const isUnlocked = !trackLocked;
        const isLocked = trackLocked;

        return (
          <div
            key={index}
            className={`relative transition-all duration-700 ${
              isUnlocked
                ? "opacity-100 translate-x-0"
                : "opacity-70 translate-x-4"
            }`}
          >
            {/* Connection line */}
            {index < quests.length - 1 && (
              <div className="absolute left-1/2 top-full w-1 h-6 sm:h-8 -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
            )}

            <div
              className={`relative group rounded-3xl border-2 overflow-hidden transition-all duration-500 ${
                isLocked
                  ? "border-white/10 bg-black/40"
                  : "border-white/20 bg-gradient-to-br from-black/60 to-black/40 hover:border-white/40 hover:scale-[1.02]"
              }`}
            >
              {/* Lock overlay for locked tracks (backend) */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-20 p-4 sm:p-6 rounded-3xl pointer-events-auto">
                  <div className="text-center space-y-2 max-w-xs sm:max-w-sm px-2">
                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white/60 mx-auto" />
                    <p className="text-xs sm:text-sm text-white/60 font-semibold break-words">
                      {lockMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Card content (blurred individually when locked) */}
              <div
                className={`relative p-5 sm:p-8 ${
                  isLocked ? "filter blur-[2px] pointer-events-none" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Icon & Level */}
                  <div className="flex-shrink-0  sm:self-auto">
                    <div
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${
                        quest.color
                      } flex items-center justify-center shadow-2xl ${
                        isUnlocked ? "animate-bounce-slow" : ""
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl">{quest.icon}</span>
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {quest.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quest Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="text-xs sm:text-sm font-semibold text-white/60">
                          {quest.month}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-yellow-400">
                          {quest.xp}
                        </span>
                        {isUnlocked && (
                          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {quest.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${quest.color} bg-clip-text text-transparent`}
                      >
                        {quest.subtitle}
                      </p>
                    </div>

                    <p className="text-white/70 text-sm sm:text-base">
                      {quest.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
                      {quest.skills.map((skill: string, skillIndex: number) => (
                        <div
                          key={skillIndex}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 ${
                            isUnlocked
                              ? "hover:bg-white/10 hover:border-white/20"
                              : ""
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 ${
                              isUnlocked ? "text-green-400" : "text-white/20"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm ${
                              isUnlocked ? "text-white" : "text-white/40"
                            }`}
                          >
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {isUnlocked && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="px-2 py-1 sm:px-3 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
                      <span className="text-xs font-semibold text-green-400">
                        Unlocked
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
