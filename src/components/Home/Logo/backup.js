import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap-trial'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import LogoS from '../../../assets/images/logo-s.png'
import './index.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { DirectionalLightHelper, MeshBasicMaterial } from 'three'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { useControls } from 'leva'


const Cube = ({ position, size, color }) => {

    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.x += delta
        ref.current.rotation.y += delta * 2.0
        ref.current.position.z += Math.sin(state.clock.elapsedTime) * 2

    })

    return (
        <mesh position={position} ref={ref}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} />

        </mesh>
    );

}


const Sphere = ({ position, size, color }) => {

    const ref = useRef()
    const [isHovered, setIsHovered] = useState(false)

    const [isClicked, setIsClicked] = useState(false)

    useFrame((state, delta) => {
        // ref.current.rotation.x += delta
        const speed = isHovered ? 1 : 0.2
        ref.current.rotation.y += delta * speed
        //ref.current.position.z += Math.sin(state.clock.elapsedTime) * 2

    })

    return (
        <mesh position={position} ref={ref} onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))} onPointerLeave={() => setIsHovered(false)} onClick={() => setIsClicked(!isClicked)} scale={isClicked ? 1.5 : 1}>
            <sphereGeometry args={size} />
            <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} wireframe />
        </mesh>
    )

}


const Torus = ({ position, size, color }) => {


    return (
        <mesh position={position}>
            <torusGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    )

}


const TorusKnot = ({ position, size }) => {
    const ref = useRef()

    const { color, radius } = useControls({
        color: "lightblue",
        radius: {
            value: 5,
            min: 1,
            max: 10,
            step: 0.5
        }
    })
    // useFrame((state, delta) => {
    //     ref.current.rotation.x += delta
    //     ref.current.rotation.y += delta * 2.0
    //     //ref.current.position.z += Math.sin(state.clock.elapsedTime) * 2

    // })

    return (
        <mesh position={position} ref={ref} >
            <torusKnotGeometry args={[radius, ...size]} />
            {/* <meshStandardMaterial color={color} /> */}
            <MeshWobbleMaterial factor={5} speed={2} color={color} />
        </mesh>
    )

}


const Scene = () => {
    const directionalLightRef = useRef()
    const { lightColor, lightIntensity } = useControls({
        lightColor: "white",
        lightIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.1
        }
    })
    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white")
    return (
        <><directionalLight position={[0, 1, 2]} intensity={lightIntensity} ref={directionalLightRef} color={lightColor} />
            <ambientLight intensity={0.1} />
            <TorusKnot position={[0, 0, 0]} size={[0.1, 1000, 50]} color={"hotpink"} />
            <OrbitControls enableZoom={false} /></>
    )
}




const Logo = () => {
    const bgRef = useRef()
    const outlineLogoRef = useRef()
    const solidLogoRef = useRef()

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin)

        gsap
            .timeline()
            .to(bgRef.current, {
                duration: 1,
                opacity: 1,
            })
            .from(outlineLogoRef.current, {
                drawSVG: 0,
                duration: 20,
            })

        gsap.fromTo(
            solidLogoRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                delay: 4,
                duration: 4,
            }
        )
    }, [])

    return (
        <div className="logo-container" ref={bgRef}>
            <Canvas>

                <Scene />
            </Canvas>






        </div>
    )
}

export default Logo



// <directionalLight position={[0, 0, 2]} intensity={0.5} />
//                 <ambientLight intensity={0.1} />
//                 {/* <group position={[0, -1, 0]}>
//                     <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
//                     <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
//                     <Cube position={[-1, 2, 0]} color={"blue"} size={[1, 1, 1]} />
//                     <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
//                 </group> */}

//                 {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"orange"} /> */}
//                 {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"orange"} /> */}
//                 {/* <Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"} /> */}
//                 {/* <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"hotpink"} /> */}

//                 <TorusKnot position={[0, 0, 0]} size={[1, 0.1, 1000, 50]} color={"hotpink"} />
//                 <OrbitControls enableZoom={false} />