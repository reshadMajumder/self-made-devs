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
    description:
      "Conquer backend development and become a full-stack developer.",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Unlock all quests one by one with delay
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">
              Quest System
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Epic Journey
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-balance">
            Complete each quest to unlock the next level. Your transformation
            awaits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Frontend Track */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Frontend Development Track
            </h3>
            {frontQuests.map((quest, index) => {
              const isUnlocked = unlockedQuests.includes(index);
              const isLocked = !isUnlocked;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 backdrop-blur ${
                    isUnlocked
                      ? "opacity-100 translate-x-0"
                      : "opacity-70 translate-x-10"
                  }`}
                >
                  {/* Connection line to next quest */}
                  {index < frontQuests.length - 1 && (
                    <div className="absolute left-1/2 top-full w-1 h-8 -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                  )}

                  <div
                    className={`relative group rounded-3xl border-2 overflow-hidden transition-all duration-500 ${
                      isLocked
                        ? "border-white/10 bg-black/40"
                        : "border-white/20 bg-gradient-to-br from-black/60 to-black/40 hover:border-white/40 hover:scale-[1.02]"
                    }`}
                  >
                    {/* Animated gradient overlay */}
                    {isUnlocked && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                    )}

                    {/* Lock overlay for locked frontQuests */}
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                        <div className="text-center space-y-2">
                          <Lock className="w-12 h-12 text-white/40 mx-auto" />
                          <p className="text-white/60 font-semibold">
                            Complete Previous Quest to Unlock
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="relative p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Quest Icon & Level */}
                        <div className="flex-shrink-0">
                          <div
                            className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${
                              quest.color
                            } flex items-center justify-center shadow-2xl ${
                              isUnlocked ? "animate-bounce-slow" : ""
                            }`}
                          >
                            <span className="text-4xl">{quest.icon}</span>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {quest.level}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quest Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-white/60">
                                {quest.month}
                              </span>
                              <span className="text-sm font-semibold text-yellow-400">
                                {quest.xp}
                              </span>
                              {isUnlocked && (
                                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                              )}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                              {quest.title}
                            </h3>
                            <p
                              className={`text-sm font-semibold bg-gradient-to-r ${quest.color} bg-clip-text text-transparent`}
                            >
                              {quest.subtitle}
                            </p>
                          </div>

                          <p className="text-white/70 text-lg">
                            {quest.description}
                          </p>

                          {/* Skills Grid */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {quest.skills.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 ${
                                  isUnlocked
                                    ? "hover:bg-white/10 hover:border-white/20"
                                    : ""
                                }`}
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isUnlocked
                                      ? "text-green-400"
                                      : "text-white/20"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
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

                      {/* Progress indicator */}
                      {isUnlocked && (
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
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

          {/* Backend Track */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Backend Development Track
            </h3>
            {backQuests.map((quest, index) => {
              const isUnlocked = unlockedQuests.includes(
                index + frontQuests.length
              );
              const isLocked = !isUnlocked;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    isUnlocked
                      ? "opacity-100 translate-x-0"
                      : "opacity-70 translate-x-10"
                  }`}
                >
                  {/* Connection line to next quest */}
                  {index < backQuests.length - 1 && (
                    <div className="absolute left-1/2 top-full w-1 h-8 -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                  )}

                  <div
                    className={`relative group rounded-3xl border-2 overflow-hidden transition-all duration-500 ${
                      isLocked
                        ? "border-white/10 bg-black/40"
                        : "border-white/20 bg-gradient-to-br from-black/60 to-black/40 hover:border-white/40 hover:scale-[1.02]"
                    }`}
                  >
                    {/* Animated gradient overlay */}
                    {isUnlocked && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                    )}

                    {/* Lock overlay for locked quests */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-10">
                      <div className="text-center space-y-2">
                        <Lock className="w-12 h-12 text-white/60 mx-auto" />
                        <p className="text-white/80 font-semibold">
                          Complete Frontend Track First
                        </p>
                      </div>
                    </div>

                    <div className="relative p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Quest Icon & Level */}
                        <div className="flex-shrink-0">
                          <div
                            className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${
                              quest.color
                            } flex items-center justify-center shadow-2xl ${
                              isUnlocked ? "animate-bounce-slow" : ""
                            }`}
                          >
                            <span className="text-4xl">{quest.icon}</span>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {quest.level}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quest Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-white/60">
                                {quest.month}
                              </span>
                              <span className="text-sm font-semibold text-yellow-400">
                                {quest.xp}
                              </span>
                              {isUnlocked && (
                                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                              )}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                              {quest.title}
                            </h3>
                            <p
                              className={`text-sm font-semibold bg-gradient-to-r ${quest.color} bg-clip-text text-transparent`}
                            >
                              {quest.subtitle}
                            </p>
                          </div>

                          <p className="text-white/70 text-lg">
                            {quest.description}
                          </p>

                          {/* Skills Grid */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {quest.skills.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 ${
                                  isUnlocked
                                    ? "hover:bg-white/10 hover:border-white/20"
                                    : ""
                                }`}
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isUnlocked
                                      ? "text-green-400"
                                      : "text-white/20"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
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

                      {/* Progress indicator */}
                      {isUnlocked && (
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
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
        </div>

        {/* Achievement Section */}
        <div className="text-center mt-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur-sm">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-400">
              Complete All Quests to Become a Self Made Dev
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
