
"use client";

import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { PROGRAMS, STANDARD_PAYMENT_AMOUNT } from '@/lib/constants';
import type { ProgramDetails } from '@/lib/types';
import { Leaf, Tag, CheckCircle, AlertCircle, IndianRupee, Loader2 } from 'lucide-react';
import { validateReferralCodeForDiscount } from '@/app/actions';

interface CourseSelectionProps {
  onProceed: (data: { programId: string; price: number; referralCode?: string }) => void;
}

export function CourseSelection({ onProceed }: CourseSelectionProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [enteredReferralCode, setEnteredReferralCode] = useState<string>('');
  const [isReferralApplied, setIsReferralApplied] = useState<boolean>(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const { toast } = useToast();
  const [isApplyingCode, startApplyingCodeTransition] = useTransition();

  const selectedProgram = PROGRAMS.find(p => p.id === selectedProgramId);

  useEffect(() => {
    if (selectedProgram) {
      if (isReferralApplied) {
        setFinalPrice(STANDARD_PAYMENT_AMOUNT);
      } else {
        setFinalPrice(selectedProgram.price);
      }
    } else {
      setFinalPrice(null);
    }
  }, [selectedProgram, isReferralApplied]);

  const handleApplyReferralCode = () => {
    if (!selectedProgramId) {
      toast({
        title: "Select Program",
        description: "Please select a program before applying a referral code.",
        variant: "destructive",
      });
      return;
    }

    const trimmedCode = enteredReferralCode.trim();

    if (trimmedCode === '') {
       setIsReferralApplied(false); 
       // useEffect will set finalPrice to selectedProgram.price
        toast({
          title: "Referral Code Removed",
          description: "Referral code field is empty. Standard price applies.",
          variant: "default",
      });
      return;
    }
    
    startApplyingCodeTransition(async () => {
      const result = await validateReferralCodeForDiscount(trimmedCode);
      if (result.isValid && result.isDiscountApplicable) {
        setIsReferralApplied(true);
        toast({
          title: "Referral Code Applied",
          description: `Code "${trimmedCode.toUpperCase()}" applied successfully. Your course fee is now ₹${STANDARD_PAYMENT_AMOUNT}.`,
          className: "bg-green-100 border-green-300 text-green-700",
        });
      } else {
        setIsReferralApplied(false);
        toast({
          title: "Invalid Referral Code",
          description: "The referral code you entered is not valid or not applicable for a discount.",
          variant: "destructive",
        });
      }
    });
  };
  
  const handleProceed = () => {
    if (!selectedProgramId || finalPrice === null) {
      toast({
        title: "Selection Incomplete",
        description: "Please select a program to proceed.",
        variant: "destructive",
      });
      return;
    }
    onProceed({
      programId: selectedProgramId,
      price: finalPrice,
      // Pass the actual entered code if applied, ensuring it's the one that was validated
      referralCode: isReferralApplied ? enteredReferralCode.trim().toUpperCase() : undefined, 
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-muted">
      <CardHeader className="text-center">
        <Leaf className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Choose Your Program</CardTitle>
        <CardDescription>Select a training program and apply a referral code if you have one.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <Label className="text-lg font-semibold mb-3 block">Select a Program:</Label>
          <RadioGroup value={selectedProgramId ?? ""} onValueChange={(id) => {
            setSelectedProgramId(id);
            // Price recalculation is handled by useEffect based on isReferralApplied and new program
          }}>
            {PROGRAMS.map((program: ProgramDetails) => (
              <Card key={program.id} className={`mb-3 p-4 rounded-lg transition-all cursor-pointer hover:shadow-md bg-card ${selectedProgramId === program.id ? 'border-primary ring-2 ring-primary bg-primary/10' : 'border-border'}`}>
                <Label htmlFor={program.id} className="flex items-center w-full cursor-pointer">
                  <RadioGroupItem value={program.id} id={program.id} className="mr-3" />
                  <div className="flex-grow">
                    <span className="font-semibold text-lg text-foreground">{program.name}</span>
                    <p className="text-sm text-muted-foreground">Original Price: ₹{program.price}/-</p>
                  </div>
                </Label>
              </Card>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralCode" className="text-lg font-semibold flex items-center">
            <Tag className="w-5 h-5 mr-2 text-primary" />
            Referral Code (Optional)
          </Label>
          <div className="flex gap-2">
            <Input
              id="referralCode"
              placeholder="Enter referral code"
              value={enteredReferralCode}
              onChange={(e) => setEnteredReferralCode(e.target.value.toUpperCase())}
              className="flex-grow"
              disabled={!selectedProgramId || isApplyingCode}
            />
            <Button 
              onClick={handleApplyReferralCode} 
              variant="outline" 
              disabled={!selectedProgramId || isApplyingCode}
            >
              {isApplyingCode ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Apply Code"}
            </Button>
          </div>
            {isReferralApplied && selectedProgramId && (
                <p className="text-sm text-green-600 flex items-center mt-2">
                    <CheckCircle className="w-4 h-4 mr-1"/> Valid referral code applied. Discount reflected below.
                </p>
            )}
             {!isReferralApplied && enteredReferralCode.trim() !== "" && !isApplyingCode && (
              // This message could appear briefly if a code was invalid.
              // Consider if it's needed or if toast is enough.
              <p className="text-sm text-destructive flex items-center mt-2">
                <AlertCircle className="w-4 h-4 mr-1"/> Code not applied or invalid.
              </p>
            )}
        </div>

        {selectedProgramId && finalPrice !== null && (
          <Card className="p-6 bg-background/80 border-dashed border-accent">
            <CardTitle className="text-xl mb-3">Price Summary</CardTitle>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Selected Program:</span>
                <span className="font-semibold">{selectedProgram?.name}</span>
              </p>
              <p className="flex justify-between">
                <span>Original Price:</span>
                <span className="font-semibold">₹{selectedProgram?.price}</span>
              </p>
              {isReferralApplied && selectedProgram?.price && finalPrice === STANDARD_PAYMENT_AMOUNT && (
                <p className="flex justify-between text-green-600">
                  <span>Referral Discount:</span>
                  <span className="font-semibold">- ₹{selectedProgram.price - STANDARD_PAYMENT_AMOUNT}</span>
                </p>
              )}
              <hr className="my-2 border-border" />
              <p className="flex justify-between text-2xl font-bold text-accent items-center">
                <span>Final Price:</span>
                <span><IndianRupee className="inline-block w-6 h-6 mb-1" />{finalPrice}</span>
              </p>
            </div>
          </Card>
        )}

        <Button 
          onClick={handleProceed} 
          className="w-full text-lg py-6 mt-6" 
          size="lg" 
          disabled={!selectedProgramId || finalPrice === null || isApplyingCode}
        >
          Proceed to Fill Details
        </Button>
      </CardContent>
    </Card>
  );
}
