"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/app/proposal/types";

export function ProposalForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    details: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError("File size should be less than 10MB");
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/png",
        "image/jpeg",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PDF, Word, Excel, and Image files are allowed");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.service || !formData.details) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("company", formData.company);
      submitData.append("phone", formData.phone);
      submitData.append("service", formData.service);
      submitData.append("budget", formData.budget);
      submitData.append("details", formData.details);
      if (file) {
        submitData.append("file", file);
      }

      const res = await fetch("/api/proposal", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit proposal");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-3xl shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Proposal Submitted!
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for your interest in working with us. Our team will review your proposal and get back to you within 24-48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-[#e8272c] text-white rounded-full font-semibold hover:bg-[#d01f24] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@company.com"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="Your Company"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+94 70 123 4567"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all appearance-none"
              value={formData.service}
              onChange={handleChange}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Budget Range
            </label>
            <select
              name="budget"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all appearance-none"
              value={formData.budget}
              onChange={handleChange}
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Project Details <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            required
            rows={5}
            placeholder="Tell us about your project, goals, and requirements..."
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e8272c] focus:border-transparent transition-all resize-none"
            value={formData.details}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Attach Proposal Document (Optional)
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
              file
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#e8272c]"
            }`}
          >
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
            {file ? (
              <div className="flex items-center gap-4">
                <FileText size={32} className="text-green-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="p-2 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">
                    PDF, DOC, XLS, PNG, JPG (Max 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-[#e8272c] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#d01f24] transition-all transform hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
              Submitting Proposal...
            </>
          ) : (
            <>
              Submit Proposal
              <Send size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
