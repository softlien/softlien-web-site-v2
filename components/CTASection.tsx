import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  headline?: string;
  description?: string;
  ctaText?: string;
}

export function CTASection({
  headline = "Join Us on Our Journey",
  description = "Let's work together to create something amazing",
  ctaText = "Get In Touch",
}: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{headline}</h2>
          <p className="text-xl text-gray-200 mb-8">{description}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#e8272c] rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {ctaText}
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
