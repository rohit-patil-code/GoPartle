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
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Step {currentStep} of 4
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        {/* Step Labels (Optional Visual Enhancement) */}
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-400 px-1">
          <span className={currentStep >= 1 ? "text-blue-600" : ""}>Basics</span>
          <span className={currentStep >= 2 ? "text-blue-600" : ""}>Role</span>
          <span className={currentStep >= 3 ? "text-blue-600" : ""}>Details</span>
          <span className={currentStep >= 4 ? "text-blue-600" : ""}>Review</span>
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <EventFormProvider>
        <StepsContainer />
      </EventFormProvider>
    </div>
  );
}
