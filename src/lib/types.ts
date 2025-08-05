
import { z } from 'zod';


export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(1, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(1, "Last name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number is too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(1, "Password is required"),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const ReferralCodeSchema = z.object({
  referralCode: z.string().optional(),
});
export type ReferralCodeFormData = z.infer<typeof ReferralCodeSchema>;

export const ProgramSelectionSchema = z.object({
  program: z.enum(["self-development", "organic-farming", "supermind-kids"], {
    errorMap: () => ({ message: "Please select a program." }),
  }),
});
export type ProgramSelectionFormData = z.infer<typeof ProgramSelectionSchema>;

export const UserInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  aadharNumber: z.string().regex(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    errorMap: () => ({ message: "Please select marital status." }),
  }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select gender." }),
  }),
  bankAccountName: z.string().min(2, "Bank account name is required"),
  bankAccountNumber: z.string().min(5, "Bank account number is required"),
  bankAccountType: z.enum(["savings", "current"], {
    errorMap: () => ({ message: "Please select account type." }),
  }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
});
export type UserInfoFormData = z.infer<typeof UserInfoSchema>;

// Schema for data expected by the server action from FormData
const FileLikeSchema = z.object({
  name: z.string().min(1, { message: "Screenshot file name cannot be empty." }),
  size: z.number().gt(0, { message: "Screenshot file cannot be empty." }),
  type: z.string().regex(/^image\//, { message: "Uploaded file must be an image (e.g., PNG, JPG)." }),
}).passthrough(); // Use passthrough for File objects

export const ServerActionPaymentSchema = z.object({
  utrNumber: z.string().min(5, "UTR number is required"),
  paymentScreenshot: FileLikeSchema, // Server expects a File-like object
  selectedProgramId: z.enum(["self-development", "organic-farming", "supermind-kids"], {
    errorMap: () => ({ message: "A program must be selected." }),
  }),
  agreedPrice: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >=0, {
    message: "Agreed price must be a valid number."
  }),
  referralCodeUsed: z.string().optional(), // This is from form, can be empty or undefined
});
export type ServerActionPaymentData = z.infer<typeof ServerActionPaymentSchema>;


// Schema for the client-side React Hook Form
export const ClientPaymentFormSchema = z.object({
  utrNumber: z.string().min(5, "UTR number is required"),
  paymentScreenshot: z
    .custom<FileList>((val) => val instanceof FileList, "Please upload a screenshot.")
    .refine((files) => files && files.length === 1, "Please upload one screenshot file.")
    .refine((files) => files && files[0].size > 0, "Screenshot file cannot be empty.")
    .refine((files) => files && files[0].type.startsWith("image/"), "Uploaded file must be an image (e.g., PNG, JPG)."),
  // Hidden fields, but part of RHF schema for validation before constructing FormData
  selectedProgramId: z.enum(["self-development", "organic-farming", "supermind-kids"]),
  agreedPrice: z.number().min(0, "Price cannot be negative."),
  referralCodeUsed: z.string().optional(),
});
export type ClientPaymentFormData = z.infer<typeof ClientPaymentFormSchema>;


export const ProgramDetailsSchema = z.object({
  selectedProgram: z.enum(["self-development", "organic-farming", "supermind-kids"]).optional(),
  agreedPrice: z.number().optional(),
  referralCode: z.string().optional(),
});
export type ProgramDetailsData = z.infer<typeof ProgramDetailsSchema>;

export const EnrollmentDataSchema = z.object({
  programId: z.string(),
  programName: z.string(),
  agreedPrice: z.number(),
  referralCodeUsed: z.string().optional(), // Optional field
  userInfoSnapshot: UserInfoSchema.optional(), // UserInfo at the time of enrollment
  utrNumber: z.string(),
  paymentScreenshotName: z.string(),
  paymentConfirmedAt: z.date(),
  enrollmentCreatedAt: z.date(),
});
export type EnrollmentData = z.infer<typeof EnrollmentDataSchema>;

// UserProfile represents the main, persistent user data.
// Transient data from forms (like UTR or screenshot files) are handled by server actions directly.
export interface UserProfile {
  mobile: string;
  userInfo?: UserInfoFormData;
  paymentConfirmed?: boolean; // General flag indicating if any payment was ever made
  generatedReferralCode?: string; // User's main referral code

  // These are part of the current flow/session, typically passed as props or managed by specific form steps,
  // not necessarily part of the core UserProfile object that's broadly used.
  // If they are needed in MultiStepForm's state, they should be distinctly managed.
  selectedProgram?: "self-development" | "organic-farming" | "supermind-kids";
  agreedPrice?: number;
  referralCode?: string; // Referral code used for a specific program selection in the current flow
}

export type MultiFormStepId = "info" | "payment" | "complete";
export type DashboardPhase = "courseSelection" | "multiStepForm";

export type ProgramDetails = {
  id: "self-development" | "organic-farming" | "supermind-kids";
  name: string;
  price: number;
};



