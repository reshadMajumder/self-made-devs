"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CalendarClock } from "lucide-react";

// Initial state with no time calculation to avoid hydration mismatch
const initialTimeLeft = {
  diff: 1,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(targetTime: number) {
  const now = Date.now();
  const diff = Math.max(0, targetTime - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { diff, days, hours, minutes, seconds };
}

export default function IntroCard() {
  // Target: 6 November 2025 23:59:59 UTC
  const target = new Date(2025, 10, 6, 23, 59, 59).getTime();
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const expired = timeLeft.diff <= 0;

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0  backdrop-blur-sm bg-black/30 rounded-2xl" />

          {/* Content with transparency */}
          <Card className="relative border-2 border-white/10 bg-transparent">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 ">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Season-1 Batch-1 Enrollment Closing Soon
                  </h3>
                  <p className="text-white/70 max-w-xl">
                    Limited seats available. Secure your spot in our next cohort
                    starting November 10th.{" "}
                    <span className="font-bold text-purple-600">
                      What's Stoping you to invest on yourself?
                    </span>
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                      <span className="text-white/70 text-sm">
                        For SEC Members
                      </span>
                      <p className="text-white font-bold text-xl">৳ 0</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                      <span className="text-white/70 text-sm">
                        For non-SEC Members
                      </span>
                      <p className="text-white font-bold text-xl">৳ 300</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4    ">
                  <div className="scale-120">
                    {isClient && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-500/20 text-yellow-200 text-sm backdrop-blur-sm">
                        <CalendarClock className="w-4 h-4" />
                        <span className="font-semibold">
                          {!expired
                            ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
                            : "Enrollment Closed"}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/register"
                    className={`
                      px-6 py-3 rounded-lg font-semibold text-base backdrop-blur-md
                      ${
                        expired
                          ? "bg-gray-600/80 text-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
                      }
                    `}
                  >
                    {expired ? "Enrollment Closed" : "Enroll Now"}
                  </Link>

                  {/* <Link
                    href="/program"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    View Program Details →
                  </Link> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
