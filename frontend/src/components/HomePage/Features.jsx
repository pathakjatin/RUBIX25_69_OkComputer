import React from "react";
import { HoverEffect } from "../../components/HomePage/card-hover-effect"; // Ensure this component is properly converted to JSX
import { TextHoverEffect } from "./text-hover-effect";
export function Features() {
  return (
    <>
    <div className="h-[20rem] flex items-center justify-center">
      <TextHoverEffect text="Features" />
    </div>
    <div className="max-w-7xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
    </>
  );
}

export const projects = [
  {
    title: "Team Formation",
    description:
      "Find the perfect teammates based on your skills and interests.",
    link: "/",
  },
  {
    title: "Collaboration Tools",
    description:
      "Seamlessly work together with integrated chat and Zoom features.",
    link: "/",
  },
  {
    title: "Live Evaluation",
    description:
      "Get real-time feedback from judges and mentors during the hackathon.",
    link: "/",
  }
];
