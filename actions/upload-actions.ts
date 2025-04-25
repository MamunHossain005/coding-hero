"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface IPdfSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary = null;

    try {
      summary = await generateSummaryFromOpenAi(pdfText);
      console.log({ summary });
    } catch (error: any) {
      console.error(error);
      //call gemini
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log(summary);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quote exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "File upload failed",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummaryFn({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: IPdfSummary) {
  //sql inserting pdf summary
  try {
    const sql = await getDBConnection();

    //test connection first
    await sql`SELECT 1`;

    const [savedSummary] = await sql`Insert INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    ) RETURNING id, summary_text`;

    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storedPdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: IPdfSummary) {
  // user is logged in and has a userId

  //savePdfSummary
  //savePdfSummary()
  let savePdfSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savePdfSummary = await savePdfSummaryFn({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savePdfSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  //Revalidate our cache
  revalidatePath(`/summaries/${savePdfSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savePdfSummary.id,
    },
  };
}
