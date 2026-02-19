"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uDistortion;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Distort UV based on mouse position and factor
    float dist = distance(uv, uMouse);
    float force = 1.0 - smoothstep(0.0, 0.4, dist);
    vec2 distortion = normalize(uv - uMouse) * force * uDistortion;
    
    vec4 color = texture2D(uTexture, uv + distortion);
    gl_FragColor = color;
  }
`

function LiquidMesh({ imagePath, isHovered }: { imagePath: string; isHovered: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5))

    const texture = useMemo(() => {
        const loader = new THREE.TextureLoader()
        return loader.load(imagePath)
    }, [imagePath])

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uDistortion: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    }), [texture])

    useFrame((state, delta) => {
        if (!meshRef.current) return
        const material = meshRef.current.material as THREE.ShaderMaterial

        material.uniforms.uDistortion.value = THREE.MathUtils.lerp(
            material.uniforms.uDistortion.value,
            isHovered ? 0.05 : 0.0,
            0.1
        )

        // Smoothly follow mouse
        const targetX = (state.mouse.x + 1) / 2
        const targetY = (state.mouse.y + 1) / 2
        material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, targetX, 0.1)
        material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, targetY, 0.1)
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[16, 9, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    )
}

export function LiquidImage({ imagePath }: { imagePath: string }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="w-full h-full cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <LiquidMesh imagePath={imagePath} isHovered={isHovered} />
            </Canvas>
        </div>
    )
}
