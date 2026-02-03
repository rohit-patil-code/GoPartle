"use server";

export async function loginWithGoogle() {
    // TODO: Implement Google login
    throw new Error("Google login not implemented yet");
}

export async function sendOtp(email: string) {
    try {
        // TODO: Implement OTP sending
        // This should call your backend API
        return { success: true };
    } catch (error) {
        return { error: "Failed to send OTP. Please try again." };
    }
}

export async function verifyOtp(email: string, otp: string) {
    try {
        // TODO: Implement OTP verification
        // This should call your backend API
        return { redirect: "/" };
    } catch (error) {
        return { error: "Invalid OTP. Please try again." };
    }
}
