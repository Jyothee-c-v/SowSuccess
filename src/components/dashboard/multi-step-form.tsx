
"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  UserInfoSchema,
  ClientPaymentFormSchema,
  type UserInfoFormData,
  type UserProfile, type MultiFormStepId,
  type ClientPaymentFormData,
  type ProgramDetailsData
} from "@/lib/types";

import { PROGRAMS, STANDARD_PAYMENT_AMOUNT } from "@/lib/constants";
import { saveUserInfo, submitPayment } from "@/app/actions";
import { Loader2, CheckCircle, FileText, UserCircle, Banknote, UploadCloud, BadgePercent, ShieldCheck, UsersRound, Landmark, CalendarDays, CreditCard, Hash, Building } from "lucide-react";

const FORM_STEPS = [
  { id: "info", title: "Your Information" },
  { id: "payment", title: "Confirm Payment" },
  { id: "complete", title: "Registration Complete" },
] as const;


const getStepIndex = (step: MultiFormStepId) => FORM_STEPS.findIndex(s => s.id === step);

function Stepper({ currentStep }: { currentStep: MultiFormStepId }) {
  const currentIndex = getStepIndex(currentStep);
  return (
    <div className="mb-8 flex justify-between items-center">
      {FORM_STEPS.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
            ${index < currentIndex ? 'bg-primary border-primary text-primary-foreground' : ''}
            ${index === currentIndex ? 'bg-accent border-accent text-accent-foreground animate-pulse' : ''}
            ${index > currentIndex ? 'bg-muted border-border text-muted-foreground' : ''}
          `}>
            {index < currentIndex ? <CheckCircle className="w-5 h-5" /> : index + 1}
          </div>
          <p className={`mt-2 text-xs text-center font-medium
            ${index <= currentIndex ? 'text-foreground' : 'text-muted-foreground'}
          `}>{step.title}</p>
        </div>
      ))}
    </div>
  );
}

interface InfoStepProps {
  userMobile: string;
  initialUserInfo?: UserInfoFormData;
  initialProgramDetails?: ProgramDetailsData; // For selected program, price, referral
  onNext: (data: UserInfoFormData) => void;
  onBack: () => void;
}

function InfoStep({ userMobile, initialUserInfo, initialProgramDetails, onNext, onBack }: InfoStepProps) {
  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: initialUserInfo || {
      name: "",
      aadharNumber: "",
      maritalStatus: undefined,
      gender: undefined,
      bankAccountName: "",
      bankAccountNumber: "",
      bankAccountType: undefined,
      ifscCode: ""
    }
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = (values: UserInfoFormData) => {
    startTransition(async () => {
      if (!userMobile || userMobile === "N/A") {
        toast({ title: "Error", description: "User session not found. Please log in again.", variant: "destructive" });
        return;
      }
      
      // Pass programDetailsData explicitly. It can be undefined if not selected yet.
      const result = await saveUserInfo(userMobile, values, initialProgramDetails);

      if (result?.success) {
        toast({ title: "Information Saved", description: result.success });
        onNext(values);
      } else {
        let errorDescription = result?.error || "Could not save information.";
        if (result?.errors) {
          const fieldErrors = Object.values(result.errors).flat().join(', ');
          if (fieldErrors) errorDescription += ` Details: ${fieldErrors}`;
        }
        toast({ title: "Update Failed", description: errorDescription, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><UserCircle className="w-5 h-5 text-primary" />Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="Your full name" disabled={isPending} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="aadharNumber" render={({ field }) => (<FormItem><FormLabel className="flex items-center gap-1"><FileText className="w-4 h-4" />Aadhar Number</FormLabel><FormControl><Input {...field} placeholder="XXXXXXXXXXXX" type="tel" disabled={isPending} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>Marital Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="married">Married</SelectItem><SelectItem value="divorced">Divorced</SelectItem><SelectItem value="widowed">Widowed</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel className="flex items-center gap-1"><UsersRound className="w-4 h-4" />Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
        </div>

        <h3 className="text-lg font-semibold pt-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary" />Bank Account Details (for referral income)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField control={form.control} name="bankAccountName" render={({ field }) => (<FormItem><FormLabel>Bank Account Name</FormLabel><FormControl><Input {...field} placeholder="As per bank records" disabled={isPending} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (<FormItem><FormLabel>Bank Account Number</FormLabel><FormControl><Input {...field} placeholder="Your account number" type="tel" disabled={isPending} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="bankAccountType" render={({ field }) => (<FormItem><FormLabel>Bank Account Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}><FormControl><SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="savings">Savings</SelectItem><SelectItem value="current">Current</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="ifscCode" render={({ field }) => (<FormItem><FormLabel>IFSC Code</FormLabel><FormControl><Input {...field} placeholder="E.g., SBIN0001234" disabled={isPending} /></FormControl><FormMessage /></FormItem>)} />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} disabled={isPending}>Back (To Course Selection)</Button>
          <Button type="submit" disabled={isPending}>{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue"}</Button>
        </div>
      </form>
    </Form>
  );
}

interface PaymentStepProps {
  userMobile: string;
  selectedProgramId: "self-development" | "organic-farming" | "supermind-kids";
  agreedPrice: number;
  referralCodeUsed?: string;
  onNext: (data: { generatedReferralCode: string; }) => void; // Only pass back essential, serializable data
  onBack: () => void;
}

function PaymentStep({ userMobile, selectedProgramId, agreedPrice, referralCodeUsed, onNext, onBack }: PaymentStepProps) {
  const form = useForm<ClientPaymentFormData>({
    resolver: zodResolver(ClientPaymentFormSchema),
    defaultValues: {
      utrNumber: "",
      paymentScreenshot: undefined,
      selectedProgramId: selectedProgramId,
      agreedPrice: agreedPrice,
      referralCodeUsed: referralCodeUsed || "",
    }
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = (values: ClientPaymentFormData) => {
    startTransition(async () => {
      if (!userMobile || userMobile === "N/A") {
        toast({ title: "Error", description: "User session not found for payment. Please log in again.", variant: "destructive" });
        return;
      }
      const formData = new FormData();
      formData.append('utrNumber', values.utrNumber);
      const screenshotFile = values.paymentScreenshot[0];
      formData.append('paymentScreenshot', screenshotFile as File);
      
      formData.append('selectedProgramId', selectedProgramId);
      formData.append('agreedPrice', String(agreedPrice));
      if (referralCodeUsed) {
        formData.append('referralCodeUsed', referralCodeUsed);
      }

      try {
        const result = await submitPayment(userMobile, null, formData);

        if (result?.success && result.data?.generatedReferralCode) {
          toast({ title: "Payment Confirmed", description: result.success });
          onNext({ // Only pass back serializable, relevant data for state update
            generatedReferralCode: result.data.generatedReferralCode
          });
        } else {
          let errorDescription = result?.error || "An unknown error occurred.";
          if (result?.errors) {
            const fieldErrors = Object.values(result.errors as Record<string, string[]>).flat().join(', ');
             if(fieldErrors) errorDescription += ` Details: ${fieldErrors}`;
          }
          toast({ title: "Payment Failed", description: errorDescription, variant: "destructive" });
        }
      } catch (error) {
        console.error("Error submitting payment:", error);
        toast({ title: "Payment System Error", description: "An unexpected error occurred while submitting payment.", variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register("selectedProgramId")} value={selectedProgramId} />
        <input type="hidden" {...form.register("agreedPrice")} value={agreedPrice} />
        {referralCodeUsed && <input type="hidden" {...form.register("referralCodeUsed")} value={referralCodeUsed} />}
        
        <div className="p-4 border rounded-md bg-primary/10">
          <p className="text-lg font-semibold text-foreground flex items-center gap-2"><Banknote className="w-5 h-5 text-primary" />Payment Amount: <span className="text-accent">₹{agreedPrice}/-</span></p>
          <p className="text-sm text-muted-foreground">Please make the payment to the details below and upload the confirmation screenshot.</p>
        </div>

        <Card className="p-4 bg-card border-accent">
          <CardHeader className="p-2 pt-0">
            <CardTitle className="text-lg flex items-center gap-2"><Landmark className="w-5 h-5 text-primary"/>Bank Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm p-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground"/>
              <span className="font-medium text-foreground">Account Number:</span>
              <span className="text-foreground">921010006022717</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground"/>
              <span className="font-medium text-foreground">IFSC Code:</span>
              <span className="text-foreground">UTIB0004405</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-muted-foreground"/>
              <span className="font-medium text-foreground">Account Type:</span>
              <span className="text-foreground">Savings Account</span>
            </div>
          </CardContent>
        </Card>

        <FormField control={form.control} name="utrNumber" render={({ field }) => (
          <FormItem><FormLabel className="flex items-center gap-1"><Hash className="w-4 h-4 text-primary"/>UTR Number / Transaction ID</FormLabel><FormControl><Input {...field} placeholder="Enter UTR or Transaction ID" disabled={isPending} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="paymentScreenshot" render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><UploadCloud className="w-5 h-5 text-primary" />Upload Payment Screenshot (Accepted: JPG, PNG, GIF)</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={(e) => {
                onChange(e.target.files);
                if (e.target.files && e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                } else {
                  setPreview(null);
                }
              }} {...rest} disabled={isPending} />
            </FormControl>
            <FormMessage />
            {preview && <img src={preview} alt="Payment screenshot preview" className="mt-2 max-h-40 rounded-md border" />}
          </FormItem>
        )} />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack} disabled={isPending}>Back</Button>
          <Button type="submit" disabled={isPending}>{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Payment"}</Button>
        </div>
      </form>
    </Form>
  );
}

function CompletionStep({ userProfile }: { userProfile: UserProfile }) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setShowDialog(true);
  }, []);

  return (
    <div className="text-center space-y-6 py-8">
      <CheckCircle className="w-20 h-20 text-primary mx-auto animate-pulse" />
      <h2 className="text-3xl font-bold text-foreground">Registration Complete!</h2>
      <p className="text-lg text-muted-foreground">Thank you for joining SowSuccess.</p>

      {userProfile.generatedReferralCode && (
        <Card className="bg-primary/10 border-primary/30 p-6 max-w-md mx-auto">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xl flex items-center justify-center gap-2"><BadgePercent className="w-6 h-6 text-accent" />Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-mono font-bold text-accent bg-background/50 p-3 rounded-md tracking-wider">{userProfile.generatedReferralCode}</p>
            <p className="mt-2 text-sm text-muted-foreground">Use this code to refer more people and earn!</p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary" />Training Schedule</AlertDialogTitle>
            <AlertDialogDescription>
              The training date and time will be scheduled and sent to your registered mobile number ({userProfile.mobile}) for you to attend.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>Okay, Got It!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button asChild className="mt-8">
        <a href="/dashboard">Go to Dashboard Home</a>
      </Button>
    </div>
  );
}


export function MultiStepForm({ initialData }: { initialData: Partial<UserProfile> }) {
  const [currentStep, setCurrentStep] = useState<MultiFormStepId>("info");
  
  // UserProfile state will hold the core user profile + current flow details
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const storedMobile = typeof window !== 'undefined' ? localStorage.getItem('registeredMobile') || "N/A" : "N/A";
    // Initialize with mobile, and merge initialData which contains program selection details
    return {
      mobile: storedMobile,
      userInfo: initialData.userInfo || undefined,
      selectedProgram: initialData.selectedProgram,
      agreedPrice: initialData.agreedPrice,
      referralCode: initialData.referralCode,
      paymentConfirmed: initialData.paymentConfirmed || false,
      generatedReferralCode: initialData.generatedReferralCode || undefined,
    };
  });

  useEffect(() => {
    // Ensure mobile is set if available in localStorage, especially on initial mount or if userProfile.mobile is N/A
    if (typeof window !== 'undefined' && (userProfile.mobile === "N/A" || !userProfile.mobile)) {
      const storedMobile = localStorage.getItem('registeredMobile');
      if (storedMobile && storedMobile !== "N/A") {
        setUserProfile(prev => ({ ...prev, mobile: storedMobile }));
      }
    }
    // Sync program selection details from initialData if they change (e.g., user goes back and re-selects course)
    // This should not overwrite userInfo, paymentConfirmed, or generatedReferralCode from previous steps.
    setUserProfile(prev => ({
        ...prev, // Retains mobile, userInfo, paymentConfirmed, generatedReferralCode
        selectedProgram: initialData.selectedProgram,
        agreedPrice: initialData.agreedPrice,
        referralCode: initialData.referralCode,
    }));
  }, [initialData.selectedProgram, initialData.agreedPrice, initialData.referralCode, userProfile.mobile]); // Added userProfile.mobile to deps for initial mobile check


  const handleNextStep = (data: Partial<Omit<UserProfile, 'mobile' | 'selectedProgram' | 'agreedPrice' | 'referralCode'>>) => {
    // Data from InfoStep is UserInfoFormData -> { userInfo: data }
    // Data from PaymentStep is { generatedReferralCode } -> { paymentConfirmed: true, generatedReferralCode: data.generatedReferralCode }
    setUserProfile(prev => ({ ...prev, ...data }));
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1].id);
    }
  };

  const handleBackStep = () => {
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(FORM_STEPS[currentIndex - 1].id);
    } else {
      // If on the first step ("info"), clicking back should reload to reset to CourseSelection phase
      if (typeof window !== 'undefined') {
        window.location.reload(); 
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "info":
        return <InfoStep
          userMobile={userProfile.mobile}
          initialUserInfo={userProfile.userInfo}
          initialProgramDetails={{ // Pass current flow's program details
            selectedProgram: userProfile.selectedProgram,
            agreedPrice: userProfile.agreedPrice,
            referralCode: userProfile.referralCode,
          }}
          onNext={(infoData) => handleNextStep({ userInfo: infoData })}
          onBack={handleBackStep}
        />;
      case "payment":
        if (!userProfile.selectedProgram || userProfile.agreedPrice === undefined) {
            return <p>Program selection is incomplete. Please go back and select a program.</p>;
        }
        return <PaymentStep
          userMobile={userProfile.mobile}
          selectedProgramId={userProfile.selectedProgram}
          agreedPrice={userProfile.agreedPrice}
          referralCodeUsed={userProfile.referralCode}
          onNext={(paymentOutcome) => handleNextStep({ // paymentOutcome is { generatedReferralCode }
            paymentConfirmed: true, 
            generatedReferralCode: paymentOutcome.generatedReferralCode
          })}
          onBack={handleBackStep}
        />;
      case "complete":
        return <CompletionStep userProfile={userProfile} />; // Pass the whole userProfile for display
      default:
        return <p>Loading step...</p>;
    }
  };

  const currentStepDetails = FORM_STEPS.find(s => s.id === currentStep);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-muted">
      <CardHeader>
        <Stepper currentStep={currentStep} />
        <CardTitle className="text-2xl text-center">{currentStepDetails?.title}</CardTitle>
        {currentStep === "info" && <CardDescription className="text-center">Please provide your details for registration and referral income.</CardDescription>}
        {currentStep === "payment" && <CardDescription className="text-center">Confirm your payment to complete the registration. Amount: ₹{userProfile.agreedPrice || STANDARD_PAYMENT_AMOUNT}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
    </Card>
  );
}

