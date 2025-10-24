"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { X, Plus, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const interestOptions = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Data Science",
  "DevOps",
  "UI/UX Design",
  "Backend Development",
  "Frontend Development",
  "Full Stack",
  "Blockchain",
];

const skillOptions = [
  "HTML/CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Git",
  "SQL",
  "MongoDB",
  "Docker",
  "AWS",
  "None (Beginner)",
];

export function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    phone: "",
    currentSemester: "",
    currentYear: "",
    githubUrl: "",
    linkedinUrl: "",
    whyJoin: "",
    projectIdea: "",
    secMembership: false,
    transactionId: "",
    method: "",
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomInterest = () => {
    if (
      customInterest.trim() &&
      !selectedInterests.includes(customInterest.trim())
    ) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      setIsLoading(false);
      return;
    }

    if (selectedSkills.length === 0) {
      setError("Please select at least one skill level");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        full_name: formData.fullName || undefined,
        email: formData.email || undefined,
        student_id: formData.studentId || undefined,
        phone: formData.phone || null,
        current_semester: formData.currentSemester || null,
        current_year: formData.currentYear || null,
        interests: selectedInterests.length ? selectedInterests.join(", ") : "",
        skills: selectedSkills.length ? selectedSkills.join(", ") : "",
        github_url: formData.githubUrl || null,
        linkedin_url: formData.linkedinUrl || null,
        why_join: formData.whyJoin || undefined,
        project_idea: formData.projectIdea || null,
        sec_membership: typeof formData.secMembership === 'string' ? formData.secMembership : null,
        transaction_id: formData.transactionId || null,
        method: formData.method || null,
      };

      const response = await fetch("/api/registration/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Handle specific error cases
        if (data && typeof data === 'object') {
          // Check for field-specific errors (like email already exists)git 
          const fieldErrors = Object.keys(data).filter(key => Array.isArray(data[key]));
          if (fieldErrors.length > 0) {
            // Get the first field error message
            const firstField = fieldErrors[0];
            const errorMessage = data[firstField][0] || `${firstField} validation error`;
            throw new Error(errorMessage);
          }
          
          // Handle general error messages
          if (data.error || data.message) {
            throw new Error(data.error || data.message);
          }
        }
        
        // Fallback error message
        throw new Error("Failed to submit registration");
      }

      router.push("/register/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-slate-800/60 bg-slate-900/60 backdrop-blur-md shadow-xl">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl text-white">Application Form</CardTitle>
        <CardDescription className="text-base text-slate-300">
          Complete all required fields to apply for the Self Made Devs program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">
                Personal Information
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-slate-200 font-medium"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Akash Kundu"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">
                  Email Address (University mail){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="251-35-100@diu.edu.bd"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="studentId"
                  className="text-slate-200 font-medium"
                >
                  Student ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="studentId"
                  name="studentId"
                  placeholder="251-35-100"
                  required
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200 font-medium">
                  Phone Number(whatsapp)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+8801627*****"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="currentSemester"
                  className="text-slate-200 font-medium"
                >
                  Current Semester <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.currentSemester}
                  onValueChange={(value) =>
                    handleSelectChange("currentSemester", value)
                  }
                  required
                >
                  <SelectTrigger className="h-11 bg-slate-800/60 border-slate-700 text-slate-200 focus:border-blue-500">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Semester</SelectItem>
                    <SelectItem value="2">2nd Semester</SelectItem>
                    <SelectItem value="3">3rd Semester</SelectItem>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                    <SelectItem value="7">7th Semester</SelectItem>
                    <SelectItem value="8">8th Semester</SelectItem>
                    <SelectItem value="9">9th Semester</SelectItem>
                    <SelectItem value="10">10th Semester</SelectItem>
                    <SelectItem value="11">11th Semester</SelectItem>
                    <SelectItem value="12">12th Semester</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="currentYear"
                  className="text-slate-200 font-medium"
                >
                  Batch
                </Label>
                <Input
                  id="currentYear"
                  name="currentYear"
                  type="number"
                  placeholder="39"
                  value={formData.currentYear}
                  onChange={(e) => {
                    // Only allow integer values
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">
                Areas of Interest <span className="text-red-500">*</span>
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Select all that apply or add your own
            </p>

            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={
                    selectedInterests.includes(interest) ? "default" : "outline"
                  }
                  className="cursor-pointer bg-slate-800/40 text-slate-200 hover:bg-blue-600/40 hover:text-white transition-colors px-4 py-2 text-sm border-slate-700"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom interest"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomInterest();
                  }
                }}
                className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addCustomInterest}
                className="h-11 w-11 bg-slate-800/60 border border-slate-700 text-slate-200 hover:bg-blue-600/40"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {selectedInterests.length > 0 && (
              <div className="space-y-3 p-4 bg-slate-800/60 rounded-lg">
                <p className="text-sm font-semibold text-slate-200">
                  Selected Interests:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="gap-1 px-3 py-1 bg-slate-900 text-slate-100"
                    >
                      {interest}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white">
                Current Skills <span className="text-red-500">*</span>
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Select your current skill level (select "None" if you're a
              complete beginner)
            </p>

            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant={
                    selectedSkills.includes(skill) ? "default" : "outline"
                  }
                  className="cursor-pointer bg-slate-800/40 text-slate-200 hover:bg-blue-600/40 hover:text-white transition-colors px-4 py-2 text-sm border-slate-700"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomSkill();
                  }
                }}
                className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addCustomSkill}
                className="h-11 w-11 bg-slate-800/60 border border-slate-700 text-slate-200 hover:bg-blue-600/40"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {selectedSkills.length > 0 && (
              <div className="space-y-3 p-4 bg-slate-800/60 rounded-lg">
                <p className="text-sm font-semibold text-slate-200">
                  Selected Skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="gap-1 px-3 py-1 bg-slate-900 text-slate-100"
                    >
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-white">Social Profiles</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="githubUrl"
                  className="text-slate-200 font-medium"
                >
                  GitHub Profile
                </Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="linkedinUrl"
                  className="text-slate-200 font-medium"
                >
                  Facebook Profile
                </Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://facebook.com/username"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-xl font-bold text-white">Membership Information</h3>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="secMembership"
                checked={formData.secMembership}
                onChange={(e) => 
                  setFormData({
                    ...formData,
                    secMembership: e.target.checked,
                    // Clear transaction fields if SEC membership is checked
                    transactionId: e.target.checked ? "" : formData.transactionId,
                    method: e.target.checked ? "" : formData.method,
                  })
                }
                className="h-4 w-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="secMembership" className="text-slate-200 font-medium">
                I am a SEC member
              </Label>
            </div>

            {formData.secMembership ? (
              <div className="space-y-2">
                <Label htmlFor="secMembershipId" className="text-slate-200 font-medium">
                  SEC Membership ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="secMembershipId"
                  name="secMembership"
                  placeholder="Enter your SEC membership ID"
                  required={formData.secMembership}
                  value={typeof formData.secMembership === 'string' ? formData.secMembership : ''}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      secMembership: e.target.value,
                    })
                  }
                  className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <div className="mb-4 p-4 bg-slate-800/80 rounded-lg border border-blue-500">
                  <p className="text-slate-200 font-medium mb-2">Send money to:</p>
                  <ul className="list-disc pl-5 text-slate-300 space-y-1">
                    <li><span className="font-semibold text-blue-400">01611988305</span> - bKash</li>
                    <li><span className="font-semibold text-blue-400">01303090993</span> - Nagad</li>
                  </ul>
                </div>
                  <Label htmlFor="transactionId" className="text-slate-200 font-medium">
                    Transaction ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="transactionId"
                    name="transactionId"
                    placeholder="Enter transaction ID"
                    required={!formData.secMembership}
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    className="h-11 bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method" className="text-slate-200 font-medium">
                    Payment Method <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.method}
                    onValueChange={(value) => handleSelectChange("method", value)}
                    required={!formData.secMembership}
                  >
                    <SelectTrigger className="h-11 bg-slate-800/60 border-slate-700 text-slate-200 focus:border-blue-500">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">bKash</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Motivation */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-xl font-bold text-white">Tell Us More</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyJoin" className="text-slate-200 font-medium">
                Why do you want to join Self Made Devs?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="whyJoin"
                name="whyJoin"
                placeholder="Share your motivation, goals, and what you hope to achieve..."
                required
                rows={5}
                value={formData.whyJoin}
                onChange={handleInputChange}
                className="bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="projectIdea"
                className="text-slate-200 font-medium"
              >
                Do you have any project ideas in mind?
              </Label>
              <Textarea
                id="projectIdea"
                name="projectIdea"
                placeholder="Share any project ideas you'd like to build during the program..."
                rows={5}
                value={formData.projectIdea}
                onChange={handleInputChange}
                className="bg-slate-800/60 border-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-950/40 border-2 border-red-900/60 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm text-red-300 font-medium">{error}</p>
                  {error.includes("email") && (
                    <p className="text-xs text-red-400 mt-1">
                      Please use a different email address or contact support if you believe this is an error..
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
