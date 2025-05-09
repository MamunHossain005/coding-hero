import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import SummaryViewer from "../summaries/summary-viewer";

const DEMO_SUMMARY = `# AI in Daily Life: Transforming the Way We Live and Work  
Generated Summary  
Generated on: 4/29/2025  

# Explore AI: The Invisible Revolution 🤖  
🎯 Discover how Artificial Intelligence seamlessly integrates into everyday life, enhancing convenience and efficiency.  
📌 Uncover applications in smart homes, healthcare, transportation, and more.  

# Document Details  
• 📄 Type: Technology Overview  
• 🤼 For: Tech Enthusiasts and General Public  

# Key Highlights  
• 🚀 AI-powered virtual assistants like Siri and Alexa simplify daily tasks.  
• ⭐ Predictive algorithms in healthcare enable early disease detection.  
• 💫 Autonomous vehicles are revolutionizing transportation safety and efficiency.  

# Why It Matters  
• 💡 AI improves quality of life by automating routines, personalizing experiences, and solving complex problems. This guide highlights its transformative role across sectors, fostering awareness and adoption.  

# Main Points  
• � AI enhances daily life through smart devices, personalized recommendations, and automation.  
• 💪 Ethical considerations and data privacy are critical as AI becomes ubiquitous.  
• 🔥 Key applications: Virtual assistants, healthcare diagnostics, smart homes, and self-driving cars.  

# Pro Tips  
• ⭐ Stay updated on AI advancements to leverage new tools effectively.  
• 💎 Prioritize data security when using AI-driven services.  
• 🌟 Experiment with AI apps to discover time-saving features.  

# Key Terms to Know  
• 📚 Machine Learning: AI systems that learn and improve from experience.  
• 🔍 Neural Networks: Algorithms modeled after the human brain, used for complex tasks.  

# Bottom Line  
• 💫 AI is a game-changer, making everyday life smarter, faster, and more connected.  

Original File: AI_in_Daily_Life.pdf  
Generated by Sommaire`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4"
          >
            <Pizza className="w-6 h-6 text-rose-500" />
          </MotionDiv>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Sommaire transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              into an easy-to-read summary!
            </MotionH3>
          </div>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          {/* Summary viewer */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6 w-full max-w-4xl mx-auto">
              <SummaryViewer summary={DEMO_SUMMARY} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
