"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

interface SpiritualSparklesProps {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  particleSize?: number;
}

export default function SpiritualSparkles({ 
  className = "w-full h-full opacity-100",
  particleColor = "hsl(55, 75%, 100%)",
  particleDensity = 200, // Lower density for subtle effect
  particleSize = 0.5, // Default size for particles
  speed = 0.25, // Slower, more gentle movement
}: SpiritualSparklesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <SparklesCore
        background="transparent"
        minSize={0.3}
        maxSize={1}
        particleDensity={particleDensity}
        className="w-full h-full"
        particleColor={particleColor}
        speed={speed}
      />
    </div>
  );
} 