import { parseEmojiPoint, parsePoint } from "@/utils/summary-helper";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) || {
    text: point.replace(/^[•\s]+/, "").trim(),
  };

  return (
    <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="relative flex items-start gap-3">
        {emoji && (
          <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        )}
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
    </MotionDiv>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point.replace(/^[•\s]+/, "").trim()}
      </p>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv
      key={points.join("")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }
        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </MotionDiv>
  );
}
