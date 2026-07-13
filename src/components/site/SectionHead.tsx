import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  description,
  align = "center",
  inline = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inline?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(align === "center" && "mx-auto text-center", !inline && "max-w-2xl", className)}
    >
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
