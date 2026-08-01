'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { faqs } from '@/lib/content';

/**
 * Built on native <details>/<summary>: keyboard and screen-reader behaviour
 * comes for free, the answers are in the DOM for crawlers even when closed,
 * and it still works if JS fails to load.
 */
const FAQ = () => (
    <Section id="faq" width="narrow">
        <SectionHeading
            eyebrow="Questions"
            title="Straight answers"
            description="The things founders ask us before signing. If yours isn't here, message us on WhatsApp — you'll get a real answer, not a brochure."
        />

        <div className="mt-12 divide-y divide-[rgb(var(--border))] border-y border-[rgb(var(--border))]">
            {faqs.map((faq, index) => (
                <motion.details
                    key={faq.question}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold text-body transition-colors group-hover:text-brand sm:text-[1.0625rem]">
                            {faq.question}
                        </h3>
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border-strong))] text-subtle transition-all duration-300 ease-out-expo group-hover:border-[var(--brand)] group-hover:text-brand group-open:rotate-45">
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                    </summary>
                    <p className="max-w-prose pb-6 pr-10 text-sm leading-relaxed text-muted">
                        {faq.answer}
                    </p>
                </motion.details>
            ))}
        </div>
    </Section>
);

export default FAQ;
