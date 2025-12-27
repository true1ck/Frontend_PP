'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NetworkSphere() {
  const sphereRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);

  // Create network nodes on sphere surface
  const { nodePositions, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodeCount = 50; // Optimized for better performance

    // Generate nodes on sphere surface using Fibonacci sphere algorithm
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      nodes.push(new THREE.Vector3(x * 4, y * 4, z * 4));
    }

    // Optimized connection algorithm: limit connections per node to reduce complexity
    const linePositions: number[] = [];
    const maxDistance = 1.8; // Increased to match larger sphere
    const maxConnectionsPerNode = 4; // Limit connections to prevent O(n²) explosion

    for (let i = 0; i < nodes.length; i++) {
      const nearbyNodes: { distance: number; index: number }[] = [];
      
      // Find all nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < maxDistance) {
          nearbyNodes.push({ distance, index: j });
        }
      }
      
      // Sort by distance and take only the closest ones
      nearbyNodes.sort((a, b) => a.distance - b.distance);
      const connectionsToAdd = Math.min(maxConnectionsPerNode, nearbyNodes.length);
      
      for (let k = 0; k < connectionsToAdd; k++) {
        const j = nearbyNodes[k].index;
        linePositions.push(
          nodes[i].x, nodes[i].y, nodes[i].z,
          nodes[j].x, nodes[j].y, nodes[j].z
        );
      }
    }

    const nodePositions = new Float32Array(nodes.flatMap(v => [v.x, v.y, v.z]));

    return {
      nodePositions,
      connections: new Float32Array(linePositions)
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Pulse effect for nodes
    if (nodesRef.current) {
      const material = nodesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.8 + Math.sin(time * 2) * 0.2;
    }

    // Glow effect for lines
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group ref={sphereRef}>
      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>

      {/* Network Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#22d3ee"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Glowing Core Sphere - Reduced resolution for better performance */}
      <mesh>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshStandardMaterial
          color="#1e40af"
          transparent
          opacity={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Overlay - Reduced resolution for better performance */}
      <mesh>
        <sphereGeometry args={[3.85, 24, 24]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Lights */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#3b82f6" />
      <ambientLight intensity={0.3} />
    </group>
  );
}

const TechSphere = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <NetworkSphere />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
};

export default TechSphere;
