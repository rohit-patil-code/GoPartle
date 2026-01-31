"use client";

import React from "react";
import { useEventForm } from "@/context/EventFormContext";
import { Calendar, MapPin, Type, FileText } from "lucide-react";

export default function Step1() {
    const { formData, updateFormData, setStep } = useEventForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.eventName && formData.eventType && formData.eventDate && formData.location) {
            setStep(2);
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <form onSubmit={handleNext} className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Step 1: Basic Event Details</h2>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Type className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-all"
                            placeholder="e.g. Summer Tech Fest"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-all"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Conference">Conference</option>
                            <option value="Concert">Concert</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Festival">Festival</option>
                            <option value="Meetup">Meetup</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="datetime-local"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-all"
                                placeholder="e.g. New York City"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2.5 px-8 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                    Next Step &rarr;
                </button>
            </div>
        </form>
    );
}
