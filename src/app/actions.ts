
"use server";

import { z } from "zod";
import { LoginSchema, RegisterSchema, UserInfoSchema, ServerActionPaymentSchema, type UserInfoFormData, type ProgramDetailsData } from "@/lib/types";
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, setDoc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import bcrypt from 'bcryptjs';
import { PROGRAMS } from "@/lib/constants"; // Import PROGRAMS

export async function registerUser(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { firstName, lastName, mobile, password } = validatedFields.data;

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("mobile", "==", mobile));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { error: "Mobile number already registered." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await setDoc(doc(db, "users", mobile), {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile: mobile,
      hashedPassword: hashedPassword,
      createdAt: new Date(),
    });

    return { success: "Registration successful! Please login." };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Could not register user. Please try again later." };
  }
}

export async function loginUser(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { mobile, password } = validatedFields.data;

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("mobile", "==", mobile));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { error: "Mobile number not registered." };
    }

    const userData = querySnapshot.docs[0].data();
    const hashedPassword = userData.hashedPassword;

    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      return { success: "Login successful!", mobileForStorage: mobile };
    } else {
      return { error: "Invalid mobile number or password." };
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "Could not login. Please try again later." };
  }
}

export async function saveUserInfo(
  mobile: string, 
  userInfoData: UserInfoFormData, 
  programDetailsData?: ProgramDetailsData
) {
  const validatedInfoFields = UserInfoSchema.safeParse(userInfoData);
  if (!validatedInfoFields.success) {
    return { error: "Invalid user information.", errors: validatedInfoFields.error.flatten().fieldErrors };
  }

  if (!mobile || mobile === "N/A") {
    return { error: "User mobile number is missing or invalid." };
  }

  try {
    const userDocRef = doc(db, "users", mobile); 
    const dataToSave: Record<string, any> = {
        userInfo: validatedInfoFields.data,
    };

    if (programDetailsData && typeof programDetailsData === 'object') {
        if (programDetailsData.selectedProgram) {
            dataToSave.selectedProgram = programDetailsData.selectedProgram;
        }
        if (programDetailsData.agreedPrice !== undefined) {
            dataToSave.agreedPrice = programDetailsData.agreedPrice;
        }
    } else {
        console.warn("programDetailsData was not provided or not an object in saveUserInfo for mobile:", mobile);
    }
    
    await setDoc(userDocRef, dataToSave, { merge: true }); 

    if (programDetailsData && programDetailsData.referralCode && programDetailsData.referralCode.trim() !== "") {
      const usedReferralCode = programDetailsData.referralCode.trim();
      const usersCollectionRef = collection(db, "users");
      const qReferrer = query(usersCollectionRef, where("generatedReferralCode", "==", usedReferralCode));
      
      try {
        const referrerSnapshot = await getDocs(qReferrer);
        if (!referrerSnapshot.empty) {
          const referrerDoc = referrerSnapshot.docs[0];
          const referrerId = referrerDoc.id; 
          const referredUserDocRef = doc(db, "users", referrerId, "referredUsers", mobile); 
          
          const nameToSave = validatedInfoFields.data.name;
          console.log(`[saveUserInfo DEBUG] Attempting to save referred user. Referrer ID: ${referrerId}, New User Mobile: ${mobile}, New User Name: '${nameToSave}'`);

          await setDoc(referredUserDocRef, {
            name: nameToSave, 
            mobile: mobile, 
            referredAt: new Date()
          });
          console.log(`User ${mobile} (name: ${nameToSave}) successfully recorded as referred by ${referrerId} (code: ${usedReferralCode})`);
        } else {
          if (usedReferralCode !== "SOWSUCCESS25") {
            console.warn(`Referral code ${usedReferralCode} entered by ${mobile} was not found or no user owns it.`);
          } else {
            console.log(`Global referral code ${usedReferralCode} used by ${mobile}. No specific user referrer.`);
          }
        }
      } catch (referralError) {
        console.error("Error trying to record referral for user:", referralError);
      }
    }

    return { success: "User information and program choice saved successfully." };
  } catch (error) {
    console.error("Error saving user info and/or processing referral:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while saving data.";
    return { error: `Could not save user information. Details: ${errorMessage}` };
  }
}

export async function submitPayment(mobile: string, prevState: any, formData: FormData) {
  if (!mobile || mobile === "N/A") {
    return { error: "User mobile number is missing for payment submission." };
  }

  const utrNumber = formData.get('utrNumber') as string;
  const paymentScreenshotFile = formData.get('paymentScreenshot') as File | null;
  const selectedProgramId = formData.get('selectedProgramId') as "self-development" | "organic-farming" | "supermind-kids" | null;
  const agreedPriceString = formData.get('agreedPrice') as string | null;
  const referralCodeUsedFromForm = formData.get('referralCodeUsed') as string | undefined; 

  if (!selectedProgramId) {
    return { error: "Selected program ID is missing." };
  }
  if (!agreedPriceString || isNaN(parseFloat(agreedPriceString))) {
      return { error: "Agreed price is missing or invalid." };
  }
  const agreedPrice = parseFloat(agreedPriceString);

  const paymentDataToValidate = {
    utrNumber,
    paymentScreenshot: paymentScreenshotFile, 
    selectedProgramId,
    agreedPrice: agreedPriceString, 
    referralCodeUsed: referralCodeUsedFromForm || undefined, 
  };
  
  let fileLikeForValidation: any = undefined;
  if (paymentScreenshotFile && paymentScreenshotFile.name && paymentScreenshotFile.size && paymentScreenshotFile.type) {
    fileLikeForValidation = {
        name: paymentScreenshotFile.name,
        size: paymentScreenshotFile.size,
        type: paymentScreenshotFile.type,
    };
  }
  const paymentDataWithFileLike = { ...paymentDataToValidate, paymentScreenshot: fileLikeForValidation };

  const validatedFields = ServerActionPaymentSchema.safeParse(paymentDataWithFileLike);

  if (!validatedFields.success) {
    return {
      error: "Invalid payment details. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors
    };
  }
  
  try {
    const userDocRef = doc(db, "users", mobile);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
        return { error: "User profile not found. Please complete the information step." };
    }
    const userData = userDocSnap.data();
    const userInfoSnapshot = userData?.userInfo; 

    const paymentScreenshotName = paymentScreenshotFile?.name || 'N/A';

    const programDetails = PROGRAMS.find(p => p.id === validatedFields.data.selectedProgramId);
    if (!programDetails) {
        return { error: "Selected program details not found."};
    }

    const enrollmentData: Record<string, any> = {
        programId: validatedFields.data.selectedProgramId,
        programName: programDetails.name,
        agreedPrice: parseFloat(validatedFields.data.agreedPrice),
        userInfoSnapshot: userInfoSnapshot || {}, 
        utrNumber: validatedFields.data.utrNumber,
        paymentScreenshotName: paymentScreenshotName, 
        paymentConfirmedAt: new Date(),
        enrollmentCreatedAt: new Date(),
    };

    if (validatedFields.data.referralCodeUsed && validatedFields.data.referralCodeUsed.trim() !== "") {
        enrollmentData.referralCodeUsed = validatedFields.data.referralCodeUsed.trim();
    }

    const enrollmentsColRef = collection(userDocRef, "enrollments");
    await addDoc(enrollmentsColRef, enrollmentData);

    let mainUserUpdateData: Record<string, any> = {
        paymentConfirmed: true, 
        lastPaymentAt: new Date(),
    };
    let currentGeneratedReferralCode = userData.generatedReferralCode; 

    if (!userData.generatedReferralCode) {
        currentGeneratedReferralCode = `SOW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        mainUserUpdateData.generatedReferralCode = currentGeneratedReferralCode; 
    }
    
    await updateDoc(userDocRef, mainUserUpdateData); 

    return {
      success: "Payment confirmed and enrollment saved.",
      data: {
        utrNumber: validatedFields.data.utrNumber,
        generatedReferralCode: currentGeneratedReferralCode 
      }
    };
  } catch (error) {
    console.error("Error submitting payment and saving to Firestore:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during payment submission.";
    return { error: `Could not save payment details. Details: ${errorMessage}` };
  }
}

export async function validateReferralCodeForDiscount(code: string): Promise<{ isValid: boolean; isDiscountApplicable: boolean }> {
  if (!code || code.trim() === "") {
    return { isValid: false, isDiscountApplicable: false };
  }
  const trimmedCode = code.trim().toUpperCase();

  if (trimmedCode === "SOWSUCCESS25") {
    return { isValid: true, isDiscountApplicable: true };
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("generatedReferralCode", "==", trimmedCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { isValid: true, isDiscountApplicable: true };
    } else {
      return { isValid: false, isDiscountApplicable: false };
    }
  } catch (error) {
    console.error("Error validating referral code in validateReferralCodeForDiscount:", error);
    return { isValid: false, isDiscountApplicable: false }; 
  }
}

export type ReferredUser = {
  id: string;
  name: string;
  mobile: string;
  referredAt: string; // ISO date string
};

export async function getReferredUsers(referrerMobile: string): Promise<{ success?: boolean; users?: ReferredUser[]; error?: string }> {
  if (!referrerMobile || referrerMobile === "N/A") {
    return { error: "Invalid referrer mobile number." };
  }

  try {
    const referredUsersColRef = collection(db, "users", referrerMobile, "referredUsers");
    const querySnapshot = await getDocs(referredUsersColRef);

    const users: ReferredUser[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const referredAtTimestamp = data.referredAt as Timestamp;
      users.push({
        id: docSnap.id,
        name: data.name || "N/A",
        mobile: data.mobile || "N/A",
        referredAt: referredAtTimestamp ? referredAtTimestamp.toDate().toISOString() : new Date(0).toISOString(),
      });
    });

    return { success: true, users };
  } catch (error) {
    console.error(`Error fetching referred users for ${referrerMobile}:`, error);
    return { error: "Could not fetch referred users. Please try again later." };
  }
}
