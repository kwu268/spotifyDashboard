import React from "react";

interface InsightCommentProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  colour: string;
}

export function InsightComment({
  icon,
  title,
  content,
  colour,
}: InsightCommentProps) {
  return (
    <div
      className="w-full h-full border-2 rounded-2xl p-4 flex flex-col gap-3"
      style={{ borderColor: colour }}
    >
      <div className="flex items-center gap-2">
        <div style={{ color: colour }}>{icon}</div>
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>
      <p className="text-white/80 text-sm">{content}</p>
    </div>
  );
}
