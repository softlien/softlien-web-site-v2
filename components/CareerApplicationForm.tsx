"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react";
import { getFirebaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface CareerApplicationFormProps {
  initialPosition?: string;
  positions: string[];
}

export function CareerApplicationForm({
  initialPosition = "",
  positions,
}: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: initialPosition,
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should be less than 5MB");
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PDF and Word documents are allowed");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const uploadFile = async (selectedFile: File): Promise<string> => {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, `cvs/${Date.now()}_${selectedFile.name}`);
    const snapshot = await uploadBytes(storageRef, selectedFile);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your CV");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload CV to Firebase Storage
      const cvUrl = await uploadFile(file);

      // 2. Submit to API
      const res = await fetch("/api/career/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, cvUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
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
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for applying to Softlien. Our HR team will review your CV and get back to you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-[#e8272c] text-white rounded-full font-bold hover:bg-[#d01f24] transition-all"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e8272c] transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e8272c] transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+94 77 123 4567"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e8272c] transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Position</label>
            <select
              required
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e8272c] transition-all appearance-none"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            >
              <option value="">Select a position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Upload CV (PDF, DOCX - Max 5MB)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
              file ? "border-green-200 bg-green-50/30" : "border-gray-200 bg-gray-50/30 hover:bg-gray-50"
            }`}
          >
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {file ? (
              <div className="flex items-center gap-3">
                <FileText size={32} className="text-green-600" />
                <div className="text-left">
                  <p className="font-bold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="p-1 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Cover Note / Message</label>
          <textarea
            rows={4}
            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e8272c] transition-all resize-none"
            placeholder="Tell us why you're a good fit..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl text-sm"
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
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <Send size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
