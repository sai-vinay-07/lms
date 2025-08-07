import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-1">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-2 text-center max-w-xl mx-auto mb-8">
        Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
      </p>

      <div className="grid grid-cols-1  mx-50 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-[0_3px_24px_0px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col"
          >
            {/* Top section - grey bg with name/avatar */}
            <div className="flex items-center gap-4 px-6 py-5 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover border border-gray-300"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="flex flex-col">
                <h3 className="text-[17px] font-semibold text-gray-900 leading-tight">
                  {testimonial.name}
                </h3>
                <span className="text-sm text-gray-600">{testimonial.role}</span>
              </div>
            </div>

            {/* Feedback */}
            <div className="px-6 pt-4 pb-2 flex flex-col justify-between flex-1">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.round(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                    className="h-4 w-4 mr-[2px]"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-[15px] text-left leading-relaxed">
                {testimonial.feedback}
              </p>
            </div>

            {/* Read more */}
            <div className="px-5 text-left py-4 pb-6">
              <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
