import { cn } from "@/lib/utils";

// OpenAI-style statement: each word fills from grey to full ink as it scrolls
// through the screen (CSS only, ".fill-word" in globals.css). The text stays one
// normal paragraph for screen readers. Words are marked .motion-ok because the
// effect only moves when the visitor scrolls.
export function FillText({ text, id, className, as: Tag = "p" }: { text: string; id?: string; className?: string; as?: "p" | "h2" }) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={cn("text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] leading-[1.15] font-semibold tracking-[-0.035em]", className)}>
      {words.map((w, i) => (
        <span key={i} className="fill-word motion-ok">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
