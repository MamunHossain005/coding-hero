import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadSummaryButton({
  title,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: string;
}) {
  const handleSummaryButton = () => {}
  return(
    <Button
      size={"sm"}
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-roe33333333333333333333333333333333333333333333333333se-50"
      onClick={}
    >
      <Download className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
}
