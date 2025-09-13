"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import React from "react";

// Custom shader material for cursor distortion effect
const StringMaterial = shaderMaterial(
  {
    time: 0,
    cursorPos: new THREE.Vector2(0, 0),
    stringPos: new THREE.Vector3(0, 0, 0),
    waveSpeed: 1.0,
    waveAmplitude: 0.1,
    waveFrequency: 0.1,
    distortionRadius: 5.0,
    distortionStrength: 0.8,
    opacity: 0.3,
  },
  // Vertex shader - ALL animation on GPU
  `
    uniform float time;
    uniform vec2 cursorPos;
    uniform vec3 stringPos;
    uniform float waveSpeed;
    uniform float waveAmplitude;
    uniform float waveFrequency;
    uniform float distortionRadius;
    uniform float distortionStrength;
    
    void main() {
      vec3 pos = position;
      
      // GPU-based wavy animation with multiple wave layers
      float waveTime = time * waveSpeed;
      float waveOffset = pos.y * waveFrequency;
      
      // Primary wave
      float wave1 = sin(waveTime + waveOffset) * waveAmplitude;
      
      // Secondary wave with different frequency for natural variation
      float wave2 = sin(waveTime * 0.7 + waveOffset * 2.3) * waveAmplitude * 0.6;
      
      // Tertiary wave for more organic movement
      float wave3 = sin(waveTime * 1.3 + waveOffset * 0.8) * waveAmplitude * 0.3;
      
      // Combine waves for more pronounced, natural bumps
      pos.x += wave1 + wave2 + wave3;
      
      // Transform to world space for cursor interaction
      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      
      // Calculate distance from cursor in world space
      float dist = distance(worldPos.xy, cursorPos);
      
      // Smooth cursor distortion
      if (dist < distortionRadius) {
        float normalizedDist = dist / distortionRadius;
        float influence = 1.0 - normalizedDist;
        influence = smoothstep(0.0, 1.0, influence);
        influence = smoothstep(0.0, 1.0, influence);
        influence = pow(influence, 1.8);
        influence *= sin(influence * 3.14159 * 0.5);
        
        // Push outward from cursor
        vec2 direction = normalize(worldPos.xy - cursorPos + vec2(0.001));
        vec2 offset = direction * influence * distortionStrength;
        pos.xy += offset;
      }
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float opacity;
    
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
    }
  `
);

extend({ StringMaterial });

// Type for our custom shader material with additional uniforms
type CustomStringMaterial = THREE.ShaderMaterial & {
  time: number;
  cursorPos: THREE.Vector2;
  stringPos: THREE.Vector3;
  waveSpeed: number;
  waveAmplitude: number;
  waveFrequency: number;
  distortionRadius: number;
  distortionStrength: number;
  opacity: number;
};

// Extend Three.js intrinsic elements
declare module '@react-three/fiber' {
  interface ThreeElements {
    stringMaterial: {
      ref?: React.Ref<CustomStringMaterial>;
      transparent?: boolean;
      distortionRadius?: number;
      distortionStrength?: number;
      [key: string]: unknown;
    };
  }
}

interface WavyStringProps {
  position: [number, number, number];
  speed: number;
  amplitude: number;
  frequency: number;
  cursorPos: THREE.Vector2;
}

interface WavyStringRef {
  materialRef: React.RefObject<CustomStringMaterial | null>;
  position: [number, number, number];
  speed: number;
  amplitude: number;
  frequency: number;
}

const WavyString = React.forwardRef<WavyStringRef, WavyStringProps>(({ position, speed, amplitude, frequency }, ref) => {
  const materialRef = useRef<CustomStringMaterial | null>(null);

  // Expose material ref and properties to parent
  React.useImperativeHandle(ref, () => ({
    materialRef,
    position,
    speed,
    amplitude,
    frequency
  }));

  // Create line geometry with optimized resolution
  const geometry = useMemo(() => {
    const stringHeight = 16;
    const segments = 50; // Further reduced for smooth performance
    const points = [];

    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * stringHeight - stringHeight / 2;
      points.push(new THREE.Vector3(0, y, 0));
    }

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, []);

  return (
    <group position={position}>
      <line>
        <primitive object={geometry} />
        <stringMaterial
          ref={materialRef}
          transparent
          distortionRadius={5.0}
          distortionStrength={0.8}
        />
      </line>
    </group>
  );
});

WavyString.displayName = 'WavyString';

function StringField() {
  const { viewport } = useThree();
  const [cursorPos, setCursorPos] = useState(new THREE.Vector2(0, 0));
  const smoothCursorPos = useRef(new THREE.Vector2(0, 0));

  // GSAP quickTo for smooth cursor interpolation
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  // Mouse movement tracking
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseMoveThreshold = 0.001; // Only update if mouse moved more than this

  // Refs for all string components
  const stringRefs = useRef<React.RefObject<WavyStringRef | null>[]>([]);

  // Cache Vector3 objects to avoid creating new ones every frame
  const cachedVector3s = useRef<THREE.Vector3[]>([]);
  
  const strings = useMemo(() => {
    const stringArray = [];
    const cols = 35; // Further reduced for smooth performance
    const spacing = 0.8; // Increased spacing to maintain coverage
    const totalWidth = (cols - 1) * spacing;
    const startX = -totalWidth / 2;

    // Initialize refs array and cached Vector3s
    stringRefs.current = [];
    cachedVector3s.current = [];

    for (let i = 0; i < cols; i++) {
      stringRefs.current.push(React.createRef<WavyStringRef | null>());
      cachedVector3s.current.push(new THREE.Vector3()); // Pre-create Vector3 for each string
      stringArray.push({
        id: i,
        position: [
          startX + i * spacing,
          0,
          0
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 1.0, // More speed variation
        amplitude: 0.1 + Math.random() * 0.2, // Reduced amplitudes for subtler movement
        frequency: 0.15 + Math.random() * 0.25 // Higher frequency for smaller vertical sections
      });
    }
    return stringArray;
  }, []);

  // Initialize GSAP quickTo functions
  useMemo(() => {
    xTo.current = gsap.quickTo(smoothCursorPos.current, "x", {
      duration: 1,
      ease: "power2.out"
    });
    yTo.current = gsap.quickTo(smoothCursorPos.current, "y", {
      duration: 1,
      ease: "power2.out"
    });
    return { x: xTo.current, y: yTo.current };
  }, []);

  // Centralized frame updates for all strings and cursor
  useFrame((state) => {
    const mouse = state.pointer;

    // Only update cursor if mouse actually moved
    const mouseMovedX = Math.abs(mouse.x - lastMousePos.current.x) > mouseMoveThreshold;
    const mouseMovedY = Math.abs(mouse.y - lastMousePos.current.y) > mouseMoveThreshold;

    if (mouseMovedX || mouseMovedY) {
      lastMousePos.current = { x: mouse.x, y: mouse.y };

      // Convert normalized device coordinates (-1 to 1) to world space
      const targetX = mouse.x * (viewport.width / 2);
      const targetY = mouse.y * (viewport.height / 2);

      // Smooth interpolation to target position
      if (xTo.current && yTo.current) {
        xTo.current(targetX);
        yTo.current(targetY);
      }

      // Update cursor position for shaders
      setCursorPos(smoothCursorPos.current.clone());
    }

    // Batch update all string materials in single loop
    const currentTime = state.clock.elapsedTime;
    const currentCursorPos = smoothCursorPos.current;

    stringRefs.current.forEach((stringRef, index) => {
      const stringComponent = stringRef.current;
      if (stringComponent?.materialRef?.current) {
        const material = stringComponent.materialRef.current;
        material.time = currentTime;
        material.cursorPos = currentCursorPos;

        // Reuse cached Vector3 instead of creating new one
        const cachedVector = cachedVector3s.current[index];
        if (cachedVector) {
          cachedVector.set(
            stringComponent.position[0],
            stringComponent.position[1],
            stringComponent.position[2]
          );
          material.stringPos = cachedVector;
        }

        material.waveSpeed = stringComponent.speed;
        material.waveAmplitude = stringComponent.amplitude;
        material.waveFrequency = stringComponent.frequency;
      }
    });
  });

  return (
    <>
      {strings.map((string, index) => (
        <WavyString
          key={string.id}
          ref={stringRefs.current[index]}
          position={string.position}
          speed={string.speed}
          amplitude={string.amplitude}
          frequency={string.frequency}
          cursorPos={cursorPos}
        />
      ))}
    </>
  );
}

export default function Experience() {
  return (
    <div className="h-full w-full max-h-full max-w-full isolate bg-amber-50 absolute inset-0 z-0 ">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 85 }}
        className="!isolate"
        onPointerMove={(e) => {
          // Ensure pointer events work across entire canvas
          e.stopPropagation();
        }}
      >
        {/* <Stats /> */}
        <ambientLight intensity={0.2} />
        <StringField />
      </Canvas>
    </div>
  );
}
