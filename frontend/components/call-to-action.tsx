import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative py-24 px-4 backdrop-blur-md bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 border-t border-white/10">
      <div className="container mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
          Ready to Become a Self Made Dev?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto text-balance">
          Join hundreds of students who are building their first
          production-ready projects and launching their tech careers.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/register">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div> */}
        <p className="text-white/80 text-sm">
          Limited spots available. Applications close soon.
        </p>

        <div className="flex flex-col items-center gap-5 mx-auto justify-center">
          <p className="font-bold">Powered by </p>
          <a href="https://www.facebook.com/secdiu" target="blank">
            <img
              src="https://i.ibb.co.com/8nhv5mwn/dept-logo-2.png"
              alt="dept-logo-2"
              className="bg-white rounded-xl  w-50 h-auto"
            />
          </a>
        </div>
        <div>
          <p>
            Developed with{" "}
            <span className="text-red-500 text-xl">&#10084; </span>by Reshad &
            Rafid
          </p>
        </div>
      </div>
    </section>
  );
}
