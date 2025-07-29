'use client';

import TestimonialCard from './TestimonialCard';

interface TestimonialsSectionProps {
  visibleSections: Set<string>;
}

export default function TestimonialsSection({
  visibleSections,
}: TestimonialsSectionProps) {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Owner',
      company: 'Brew & Bean, San Francisco',
      testimonial:
        'Enzi Coffee POS has completely revolutionized our operations. The AI analytics helped us increase our daily sales by 40% within the first month!',
      colorScheme: 'amber' as const,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Manager',
      company: 'Café Latino, Miami',
      testimonial:
        'The lightning-fast interface and intuitive design make serving customers a breeze. Our staff training time was cut in half!',
      colorScheme: 'emerald' as const,
    },
    {
      name: 'Emma Thompson',
      role: 'Founder',
      company: 'Artisan Coffee, Portland',
      testimonial:
        'The brand customization features are incredible. Our receipts now perfectly match our aesthetic and customers love them!',
      colorScheme: 'purple' as const,
    },
  ];

  return (
    <div
      id="testimonials"
      data-section
      className={`relative z-10 py-20 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join hundreds of coffee shop owners who have transformed their
            business with Enzi Coffee POS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
              colorScheme={testimonial.colorScheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
