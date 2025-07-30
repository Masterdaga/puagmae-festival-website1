"use client";
import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    quote: "The Puagmae Festival was an incredible experience! The cultural performances and community spirit were truly inspiring. I can't wait to return next year.",
    name: "Sarah Johnson",
    title: "Cultural Enthusiast",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "As a musician, I was blown away by the traditional Ethiopian music and the fusion performances. The festival perfectly blends tradition with modern creativity.",
    name: "Michael Chen",
    title: "Musician & Composer",
    image: "/testimonials/michael.jpg"
  },
  {
    quote: "The workshops and interactive sessions gave me a deep appreciation for Ethiopian culture. The organizers did an amazing job creating an inclusive environment.",
    name: "Aisha Patel",
    title: "Art Educator",
    image: "/testimonials/aisha.jpg"
  },
  {
    quote: "This festival exceeded all my expectations! The food, music, art, and people made it an unforgettable experience. Highly recommend to everyone!",
    name: "David Rodriguez",
    title: "Travel Blogger",
    image: "/testimonials/david.jpg"
  },
  {
    quote: "The sense of community at Puagmae Festival is unmatched. I made lifelong friends and learned so much about Ethiopian traditions and values.",
    name: "Emma Thompson",
    title: "Community Organizer",
    image: "/testimonials/emma.jpg"
  }
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    const previous = () => {
        setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    };

    const next = () => {
        setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="text-white py-20 pb-28 px-4 transition-colors duration-500 relative" id="testimonials">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/pattern.jpg" 
                    alt="Pattern Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-center text-goldenrod mb-12">
                    Hear from Our Guests
                </h1>
                <div className="relative flex items-center justify-center">
                    {testimonials.map((testimonial, index) => (
                        index === current && (
                            <div 
                                key={index} 
                                className="text-center transition-opacity duration-500 ease-in-out transform scale-100 hover:scale-105"
                            >
                                <FaQuoteLeft className="text-2xl md:text-3xl text-goldenrod mb-4 mx-auto" />
                                <p className="text-lg md:text-2xl text-vampire-black dark:text-ghost-white italic max-w-3xl mx-auto leading-relaxed px-4">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="rounded-full h-20 w-20 md:h-24 md:w-24 border-4 border-goldenrod shadow-lg"
                                    />
                                    <div className="text-center md:text-left">
                                        <h4 className="text-xl md:text-2xl text-vampire-black dark:text-ghost-white font-semibold">
                                            {testimonial.name}
                                        </h4>
                                        <h5 className="text-md md:text-lg text-vampire-black dark:text-ghost-white/70">{testimonial.title}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-4 md:left-8">
                        <div 
                            className="bg-goldenrod p-3 md:p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-600 transition-colors duration-300" 
                            onClick={previous}
                        >
                            <FaChevronLeft className="text-black text-xl md:text-2xl" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-4 md:right-8">
                        <div 
                            className="bg-goldenrod p-3 md:p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-600 transition-colors duration-300" 
                            onClick={next}
                        >
                            <FaChevronRight className="text-black text-xl md:text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 md:mt-12">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`cursor-pointer h-3 w-3 md:h-4 md:w-4 mx-1 md:mx-2 rounded-full ${
                                index === current ? "bg-goldenrod" : "bg-eerie-black dark:bg-ghost-white/30"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials; 