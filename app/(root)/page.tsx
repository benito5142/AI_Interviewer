import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

// Dummy cards for development
const dummyInterviews = [
  {
    id: "dummy-1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "Next.js", "TypeScript"],
    createdAt: Date.now(),
  },
  {
    id: "dummy-2",
    role: "Backend Developer",
    type: "Behavioral",
    techstack: ["Node.js", "Express", "MongoDB"],
    createdAt: Date.now() - 86400000,
  },
  {
    id: "dummy-3",
    role: "Fullstack Developer",
    type: "Mixed",
    techstack: ["React", "Node.js", "PostgreSQL"],
    createdAt: Date.now() - 172800000,
  },
];

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section flex flex-wrap gap-6">
          {(hasPastInterviews ? userInterviews : dummyInterviews).map(
            (interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            )
          )}
        </div>
      </section>

      {/* Take Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section flex flex-wrap gap-6">
          {(hasUpcomingInterviews ? allInterview : dummyInterviews).map(
            (interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            )
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
