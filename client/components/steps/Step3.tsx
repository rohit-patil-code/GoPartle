"use client";

import React, { useEffect, useState } from "react";
import { useEventForm } from "@/context/EventFormContext";

export default function Step3() {
    const { formData, updateFormData, setStep } = useEventForm();
    const [localDetails, setLocalDetails] = useState<any>(formData.details || {});

    useEffect(() => {
        setLocalDetails(formData.details || {});
    }, [formData.details]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalDetails((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        updateFormData({ details: localDetails });
        setStep(4);
    };

    const renderFormFields = () => {
        switch (formData.hiringFor) {
            case "planner":
                return (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget ($)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    value={localDetails.budget || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="50000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Guest Count</label>
                                <input
                                    type="number"
                                    name="guestCount"
                                    value={localDetails.guestCount || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="150"
                                    required
                                />
                            </div>
                        </div>
                    </>
                );
            case "performer":
                return (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Genre</label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={localDetails.genre || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Jazz, Rock, Keynote Speaker"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Duration</label>
                                <input
                                    type="text"
                                    name="performanceDuration"
                                    value={localDetails.performanceDuration || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g. 2 hours, 45 minutes"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sound Check Time</label>
                                <input
                                    type="datetime-local"
                                    name="soundCheckTime"
                                    value={localDetails.soundCheckTime || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </>
                );
            case "crew":
                return (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <select
                                    name="department"
                                    value={localDetails.department || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="lighting">Lighting</option>
                                    <option value="sound">Sound</option>
                                    <option value="stage">Stage Management</option>
                                    <option value="logistics">Logistics</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience Required</label>
                                <input
                                    type="number"
                                    name="experienceYears"
                                    value={localDetails.experienceYears || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="3"
                                    required
                                />
                            </div>
                        </div>
                    </>
                );
            default:
                return <p>Please select a role in the previous step.</p>;
        }
    };

    return (
        <form onSubmit={handleNext} className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Step 3: {formData.hiringFor ? formData.hiringFor.charAt(0).toUpperCase() + formData.hiringFor.slice(1) : ""} Details
            </h2>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                {renderFormFields()}
            </div>

            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-600 font-medium hover:text-gray-900 transition-colors px-4 py-2"
                >
                    &larr; Back
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2.5 px-8 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                    Review & Submit &rarr;
                </button>
            </div>
        </form>
    );
}
