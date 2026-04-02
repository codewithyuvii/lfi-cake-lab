"use client";

import { useState } from "react";
import { CakeSlice, Ghost } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const cakes = [
    { id: 1, name: "Black Forest", file: "cake1.jpg", img: "/cake1.jpg" },
    { id: 2, name: "Red Velvet", file: "cake2.jpg", img: "/cake2.jpg" },
    { id: 3, name: "Heart Cake", file: "cake3.jpg", img: "/cake3.jpg" },
  ];

  return (
    <div className="min-h-screen bg-pink-50 p-8 font-sans text-neutral-900">
      <header className="max-w-4xl mx-auto mb-12 flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-md mb-4 text-pink-500">
          <CakeSlice className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-pink-600 mb-2">Sweet Sweets Bakery</h1>
        <p className="text-lg text-neutral-600">Discover your favorite cakes.</p>
        <div className="mt-4 flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full border border-pink-200">
          <Ghost className="w-4 h-4 text-pink-500" />
          <span className="text-sm font-medium text-pink-800">Lab Note: This is a tiny LFI (Local File Inclusion) lab.</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cakes.map((cake) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={cake.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center text-center"
          >
            <div className="w-40 h-40 bg-pink-50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-pink-200 overflow-hidden relative">
              {/* Instead of direct image, we link to our vulnerable image viewer page */}
              <a href={`/view?file=${cake.file}`} className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                <span className="opacity-0 group-hover:opacity-100 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold transition-all z-10 shadow-md">View Image</span>
                <img
                  src={cake.img}
                  alt={cake.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <h2 className="text-xl font-bold text-neutral-800 mb-2">{cake.name}</h2>
            <a
              href={`/view?file=${cake.file}`}
              className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition-colors w-full"
            >
              View Image
            </a>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
