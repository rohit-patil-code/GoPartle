"use client";

import React from "react";
import { useEventForm } from "@/context/EventFormContext";
import { User, Music, Users, CheckCircle2 } from "lucide-react";

export default function Step2() {
    const { formData, updateFormData, setStep } = useEventForm();

    const handleSelect = (role: string) => {
        updateFormData({ hiringFor: role, details: {} }); // Reset details when role changes
    };

    const handleNext = () => {
        if (formData.hiringFor) {
            setStep(3);
        } else {
            alert("Please select a role");
        }
    };

    const roles = [
        {
            id: "planner",
            label: "Event Planner",
            icon: User,
            description: "Organize logistics, budget, and guest lists.",
        },
        {
            id: "performer",
            label: "Performer",
            icon: Music,
            description: "Entertainment, bands, speakers, and artists.",
        },
        {
            id: "crew",
            label: "Crew Member",
            icon: Users,
            description: "Technical, stagehand, lighting, and sound.",
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Step 2: Who are you hiring?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roles.map((role) => {
                    const isSelected = formData.hiringFor === role.id;
                    const Icon = role.icon;
                    return (
                        <div
                            key={role.id}
                            onClick={() => handleSelect(role.id)}
                            className={`cursor-pointer relative p-6 rounded-xl border transition-all duration-200 ease-in-out ${isSelected
                                    ? `border-zinc-900 bg-zinc-50 shadow-md ring-1 ring-zinc-900`
                                    : `border-gray-200 bg-white hover:border-zinc-300 hover:shadow-sm`
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-3 right-3 text-zinc-900">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                            )}
                            <div className={`p-3 rounded-full w-fit mb-4 ${isSelected ? "bg-zinc-200 text-zinc-900" : "bg-gray-100 text-gray-500"}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{role.label}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{role.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={() => setStep(1)}
                    className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-4 py-2"
                >
                    &larr; Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={!formData.hiringFor}
                    className={`inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white transition-all transform ${formData.hiringFor
                            ? "bg-zinc-900 hover:bg-zinc-800 hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Next Step &rarr;
                </button>
            </div>
        </div>
    );
}
