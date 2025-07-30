"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

interface PrimarySparklesProps {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  particleSize?: number;
}

export default function PrimarySparkles({ 
  className = "w-full h-full opacity-100",
  particleColor = "hsl(35, 90%, 90%)",
  particleDensity = 80, // Lower density for subtle effect
  particleSize = 0.5, // Default size for particles
  speed = 0.1, // Slower, more gentle movement
}: PrimarySparklesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <SparklesCore
        background="transparent"
        minSize={0.1}
        maxSize={1}
        particleDensity={particleDensity}
        className="w-full h-full"
        particleColor={particleColor}
        speed={speed}
      />
    </div>
  );
} 