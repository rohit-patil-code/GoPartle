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
            color: "bg-blue-50 text-blue-600 border-blue-200",
            hover: "hover:border-blue-500 hover:shadow-blue-100",
        },
        {
            id: "performer",
            label: "Performer",
            icon: Music,
            description: "Entertainment, bands, speakers, and artists.",
            color: "bg-purple-50 text-purple-600 border-purple-200",
            hover: "hover:border-purple-500 hover:shadow-purple-100",
        },
        {
            id: "crew",
            label: "Crew Member",
            icon: Users,
            description: "Technical, stagehand, lighting, and sound.",
            color: "bg-orange-50 text-orange-600 border-orange-200",
            hover: "hover:border-orange-500 hover:shadow-orange-100",
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Step 2: Who are you hiring?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roles.map((role) => {
                    const isSelected = formData.hiringFor === role.id;
                    const Icon = role.icon;
                    return (
                        <div
                            key={role.id}
                            onClick={() => handleSelect(role.id)}
                            className={`cursor-pointer relative p-6 rounded-xl border-2 transition-all duration-200 ease-in-out ${isSelected
                                    ? `border-blue-500 bg-blue-50 shadow-md transform scale-105`
                                    : `border-gray-200 bg-white hover:bg-gray-50 ${role.hover}`
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 text-blue-500">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                            )}
                            <div className={`p-3 rounded-full w-fit mb-4 ${role.color.split(" ")[0]}`}>
                                <Icon className={`h-8 w-8 ${role.color.split(" ")[1]}`} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{role.label}</h3>
                            <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={() => setStep(1)}
                    className="text-gray-600 font-medium hover:text-gray-900 transition-colors px-4 py-2"
                >
                    &larr; Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={!formData.hiringFor}
                    className={`inline-flex justify-center py-2.5 px-8 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white transition-all transform ${formData.hiringFor
                            ? "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Next Step &rarr;
                </button>
            </div>
        </div>
    );
}
