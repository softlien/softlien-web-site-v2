"use client";

import { motion } from "motion/react";
import { FileText, Search, Phone, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Form",
    subtitle: "Fill out our proposal form",
    icon: FileText,
  },
  {
    number: "02",
    title: "Quick Review",
    subtitle: "We review within 24 hours",
    icon: Search,
  },
  {
    number: "03",
    title: "Free Consultation",
    subtitle: "Schedule a call to discuss",
    icon: Phone,
  },
  {
    number: "04",
    title: "Start Project",
    subtitle: "Begin your journey with us",
    icon: Rocket,
  },
];

export function ProcessSteps() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple four-step process to get your project started
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#8b0000] to-[#e8272c] rounded-2xl flex items-center justify-center text-white mb-6">
                    <step.icon size={28} />
                  </div>
                  <div className="text-5xl font-bold text-gray-200 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.subtitle}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 bg-[#e8272c] rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
