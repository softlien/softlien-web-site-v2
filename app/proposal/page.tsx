"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ProposalForm } from "@/components/ProposalForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { Tilt } from "@/components/Tilt";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+94 70 434 77347", "+94 71 570 5123"],
    href: true,
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@softlien.com"],
    href: true,
  },
  {
    icon: MapPin,
    title: "Office",
    details: ["Matara, Sri Lanka"],
    href: false,
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Fri: 9AM - 6PM", "Sat: 10AM - 2PM"],
    href: false,
  },
];

export default function ProposalPage() {
  return (
    <div className="bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Start Your Project Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Partner with us to build exceptional software solutions that drive your business forward
            </p>
          </motion.div>
        </div>
      </section>

      <ProcessSteps />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProposalForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Tilt className="relative">
                <div className="absolute -inset-4 bg-[#e8272c] rounded-3xl blur-2xl opacity-20" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Hero/hero.jpg"
                    alt="Team collaboration"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8b0000]/30 to-transparent" />
                </div>
              </Tilt>

              <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#e8272c] rounded-full flex items-center justify-center text-white">
                    <AlertCircle size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Having Issues?
                  </h4>
                </div>
                <p className="text-gray-600 mb-4">
                  If you encounter any problems while submitting your proposal or have questions, our team is here to help.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#e8272c] font-semibold hover:underline"
                >
                  Contact Us
                  <Send size={16} />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b0000] to-[#e8272c] rounded-xl flex items-center justify-center text-white mb-4">
                  <info.icon size={24} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {info.title}
                </h4>
                {info.details.map((detail, idx) => {
                  const href =
                    info.title === "Phone"
                      ? `tel:${detail.replace(/\s+/g, "")}`
                      : info.title === "Email"
                        ? `mailto:${detail}`
                        : "";

                  return href ? (
                    <a
                      key={idx}
                      href={href}
                      className="block text-gray-600 hover:text-[#e8272c] transition-colors text-sm"
                    >
                      {detail}
                    </a>
                  ) : (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Ready to Start Your Project?"
        description="Let's discuss how we can help transform your ideas into reality"
        ctaText="Contact Us Today"
      />
    </div>
  );
}
