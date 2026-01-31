"use client";

import { EventFormProvider, useEventForm } from "@/context/EventFormContext";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";

const StepsContainer = () => {
  const { currentStep } = useEventForm();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Event</h1>
          <span className="px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-semibold tracking-wide border border-zinc-200">
            STEP {currentStep} / 4
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-zinc-900 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mt-3 text-xs font-medium tracking-wide text-gray-400 px-1">
          <span className={currentStep >= 1 ? "text-zinc-900" : ""}>BASICS</span>
          <span className={currentStep >= 2 ? "text-zinc-900" : ""}>ROLE</span>
          <span className={currentStep >= 3 ? "text-zinc-900" : ""}>DETAILS</span>
          <span className={currentStep >= 4 ? "text-zinc-900" : ""}>REVIEW</span>
        </div>
      </div>

      <div className="min-h-[400px]">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      <EventFormProvider>
        <StepsContainer />
      </EventFormProvider>
    </div>
  );
}
