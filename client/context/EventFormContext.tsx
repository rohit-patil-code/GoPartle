"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventFormData {
    eventName: string;
    eventType: string;
    eventDate: string;
    location: string;
    hiringFor: string;
    details: any;
}

interface EventFormContextType {
    currentStep: number;
    setStep: (step: number) => void;
    formData: EventFormData;
    updateFormData: (data: Partial<EventFormData>) => void;
    submitForm: () => Promise<void>;
}

const defaultFormData: EventFormData = {
    eventName: "",
    eventType: "",
    eventDate: "",
    location: "",
    hiringFor: "",
    details: {},
};

const EventFormContext = createContext<EventFormContextType | undefined>(undefined);

export const EventFormProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setStep] = useState(1);
    const [formData, setFormData] = useState<EventFormData>(defaultFormData);

    const updateFormData = (newData: Partial<EventFormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const submitForm = async () => {
        try {
            const response = await fetch("https://api.go.rohitcodes.tech", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            const data = await response.json();
            alert("Event created successfully!");
            // Reset form or redirect could go here
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to create event.");
            throw error;
        }
    };

    return (
        <EventFormContext.Provider
            value={{ currentStep, setStep, formData, updateFormData, submitForm }}
        >
            {children}
        </EventFormContext.Provider>
    );
};

export const useEventForm = () => {
    const context = useContext(EventFormContext);
    if (!context) {
        throw new Error("useEventForm must be used within an EventFormProvider");
    }
    return context;
};
