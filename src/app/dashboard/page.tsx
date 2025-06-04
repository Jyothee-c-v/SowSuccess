
"use client";

import { useState } from 'react';
import { MultiStepForm } from "@/components/dashboard/multi-step-form";
import { CourseSelection } from "@/components/dashboard/course-selection";
import type { DashboardPhase, UserProfile, ProgramDetails } from '@/lib/types';
import { PROGRAMS } from '@/lib/constants';

export default function DashboardPage() {
  const [currentPhase, setCurrentPhase] = useState<DashboardPhase>("courseSelection");
  const [initialFormData, setInitialFormData] = useState<Partial<UserProfile>>({});

  const handleCourseSelectionProceed = (data: { programId: string; price: number; referralCode?: string }) => {
    const selectedProgramDetails = PROGRAMS.find(p => p.id === data.programId) as ProgramDetails | undefined;

    setInitialFormData({
      selectedProgram: selectedProgramDetails?.id,
      agreedPrice: data.price,
      referralCode: data.referralCode,
    });
    setCurrentPhase("multiStepForm");
  };

  return (
    <div>
      {currentPhase === "courseSelection" && (
        <CourseSelection onProceed={handleCourseSelectionProceed} />
      )}
      {currentPhase === "multiStepForm" && (
        <MultiStepForm initialData={initialFormData} />
      )}
    </div>
  );
}
