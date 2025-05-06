"use client";

import {
  generatedPdfText,
  generatePdfSummary,
  storedPdfSummaryAction,
} from "@/actions/upload-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import LoadingSkeleton from "./loading-skeleton";
import { url } from "inspector";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { format } from "path";

//schema with zod
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    }),
});

export default function UploadFormInput() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      //handle the response from uploadthing
      toast.success("Upload successfully!", {
        description: "Your file has been uploaded successfully.",
      });
    },
    onUploadError: (error) => {
      //handle the error from uploadthing
      toast.error("Error occurred while uploading! Please try again later.", {
        description: error.message,
      });
    },
    onUploadBegin: (file: string) => {
      //handle the upload start
      toast.info("Upload started!", {
        description: `Your file ${file} is being uploaded.`,
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      // Show upload loading toast and store its ID
      const uploadToastId = toast.loading("📄 Uploading PDF", {
        description: "We are uploading your PDF!",
      });

      //upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.dismiss(uploadToastId);
        toast.error("❌ Something went wrong", {
          description: "Please use a different file.",
        });
        setIsLoading(false);
        return;
      }

      toast.dismiss(uploadToastId);
      const processingToastId = toast.loading("📄 Processing PDF", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      //parse the pdf using lang-chain

        let storedResult: any;

        const formattedFileName = formatFileNameAsTitle(file.name);
        //call ai service
        const result = await generatedPdfText([
          {
            serverData: {
              file: {
                url: resp[0].ufsUrl,
              },
            },
          },
        ]);

        //call a service
        if (!result.data) {
          toast.dismiss(processingToastId);;
          toast.error("❌ Something went wrong", {
            description: "Please use a different file.",
          });
          setIsLoading(false);
          return;
        }

        const summaryGeneratedToast = toast.loading("Generating summary...", {
          description: "Hang tight! Your summary is being generated.",
        });

        const summaryResult = await generatePdfSummary([
          {
            serverData: {
              pdfText: result?.data?.pdfText ?? '',
              fileName: formattedFileName,
            },
          },
        ]);

        const { data = null, message = null } = summaryResult || {};

        if (data?.summary) {
          toast.dismiss(summaryGeneratedToast);
          const savingToastId = toast.loading("Saving summary...", {
            description: "Hang tight! Your summary is being saved.",  
          });
          //save the summary to the database
          storedResult = await storedPdfSummaryAction({
            fileUrl: resp[0].ufsUrl,
            summary: data.summary,
            title: data.title,
            fileName: formattedFileName,
          });

          if(!storedResult) {
            toast.dismiss(savingToastId);
            toast.error("❌ Something went wrong", {
              description: "Please use a different file.",
            });
            setIsLoading(false);
            return;
          }

          toast.dismiss(savingToastId);
          toast.success("✨ Summary Generated!", {
            description:
              "Your PDF has been successfully summarized and saved! ✨",
          });

          formRef.current?.reset(); // Reset the form after successful upload
          //redirect to [id] summary page
          router.push(`/summaries/${storedResult.data.id}`);
        } else {
          toast.dismiss(processingToastId);
        }      
    } catch (error) {
      toast.dismiss();
      if (error) {
        toast.error("An error occurred");
      }
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset(); // Reset the form in case of error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex justify-center items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Upload your PDF"
          )}
        </Button>
      </div>
      <LoadingSkeleton />
    </form>
  );
}
