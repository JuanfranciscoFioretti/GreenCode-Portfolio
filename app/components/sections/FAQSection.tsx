'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQS } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';

interface FAQSectionProps {
  devMode: boolean;
}

export default function FAQSection({ devMode }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-20 bg-[var(--gradient-bg)]">
<motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>      
        {/* <h2 className="text-4xl gradient-text text-center mb-10">Frequently Asked Questions</h2> */}
      <div className="max-w-3xl mx-auto px-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 glassmorphism rounded-lg hover:bg-[var(--glass-border)]"
            >
              <h3 className="text-xl font-semibold">{faq.question}</h3>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-4">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
        {devMode && (
          <DevModeTooltip
            content="FAQ section uses Framer Motion for smooth accordion animations."
            isVisible={devMode}
          />
        )}
      </div>
    </section>
  );
}