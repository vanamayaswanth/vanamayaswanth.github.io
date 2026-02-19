"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function NeuralNexus() {
    const meshRef = useRef<THREE.Mesh>(null)
    const sphereRef = useRef<THREE.Mesh>(null)
    const { mouse } = useThree()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.1
            meshRef.current.rotation.y = time * 0.15
            // Subtle mouse reaction
            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.5, 0.05)
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.5, 0.05)
        }
    })

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={meshRef} args={[1.5, 100, 100]} scale={2}>
                    <MeshDistortMaterial
                        color="#050505"
                        speed={3}
                        distort={0.4}
                        radius={1}
                        emissive="#F4793A"
                        emissiveIntensity={0.05}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            {/* Background Particles representing "Data" */}
            <Particles count={500} />
        </group>
    )
}

function Particles({ count }: { count: number }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15
            p[i * 3 + 1] = (Math.random() - 0.5) * 15
            p[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return p
    }, [count])

    const pointsRef = useRef<THREE.Points>(null)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05
        }
    })

    return (
        <Points ref={pointsRef} positions={points} stride={3}>
            <PointMaterial
                transparent
                color="#F4793A"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    )
}

export function WebGLBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#F4793A" />
                <NeuralNexus />
            </Canvas>
            {/* Subtle overlay to soften the 3D */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
        </div>
    )
}
