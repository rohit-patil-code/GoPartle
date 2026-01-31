"use client";

import React, { useState } from "react";
import { useEventForm } from "@/context/EventFormContext";
import { Check, Loader2 } from "lucide-react";

export default function Step4() {
    const { formData, setStep, submitForm } = useEventForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await submitForm();
        } catch (error) {
            // Error handled in context
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Step 4: Review & Submit</h2>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Event Details</h3>
                    <div className="mt-2 text-gray-900 space-y-1">
                        <p><span className="font-semibold text-zinc-700">Name:</span> {formData.eventName}</p>
                        <p><span className="font-semibold text-zinc-700">Type:</span> {formData.eventType}</p>
                        <p><span className="font-semibold text-zinc-700">Date:</span> {new Date(formData.eventDate).toLocaleString()}</p>
                        <p><span className="font-semibold text-zinc-700">Location:</span> {formData.location}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role Details</h3>
                    <div className="mt-2 text-gray-900 space-y-1">
                        <p><span className="font-semibold text-zinc-700">Hiring:</span> {formData.hiringFor.toUpperCase()}</p>
                        {Object.entries(formData.details).map(([key, value]) => (
                            <p key={key}><span className="font-semibold text-zinc-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value as React.ReactNode}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={() => setStep(3)}
                    className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-4 py-2"
                    disabled={isSubmitting}
                >
                    &larr; Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center py-2.5 px-8 border border-transparent shadow text-sm font-medium rounded-lg text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Confirm & Create Event
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
