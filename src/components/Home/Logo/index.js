import { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap-trial'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import LogoS from '../../../assets/images/logo-s.png'
import './index.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import HeroPage from './HeroPage'
import * as THREE from 'three'
import Model from './Models/laptop'






const Logo = () => {
    const bgRef = useRef()
    const outlineLogoRef = useRef()
    const solidLogoRef = useRef()


    const adjustLaptopForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];

        } else {
            screenScale = [1, 1, 1];

        }

        return [screenScale, screenPosition];
    }

    const [isLaptopScale, isLaptopPosition] = adjustLaptopForScreenSize();

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

    const initialCameraPosition = [0, 20, 0];

    // Define initial target position
    const initialTargetPosition = [1, 1, 1];

    return (
        <div className="logo-container" ref={bgRef}>

            <Canvas>

                <directionalLight position={[3, 4, 2]} intensity={5} />
                <ambientLight intensity={0.5} />
                <hemisphereLight groundColor="white" intensity={1} />
                <Model position={isLaptopPosition} scale={isLaptopScale} />
                <OrbitControls
                    maxPolarAngle={Math.PI / 2.5}
                />
            </Canvas>


            {/* <Canvas>
                <directionalLight position={[3, 4, 2]} intensity={5} />
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor="white" groundColor="white" intensity={1} />
                <OrbitControls
                    autoRotate={false} // Disable auto rotation
                    enablePan={false} // Disable panning
                    enableZoom={true} // Enable zooming
                    enableRotate={true} // Enable rotation
                    target={initialTargetPosition} // Set initial target position
                    maxPolarAngle={Math.PI / 4} // Limit vertical rotation
                    minPolarAngle={Math.PI / 2} // Lock camera's tilt angle to top view
                    maxAzimuthAngle={Infinity} // Allow unlimited horizontal rotation
                    minAzimuthAngle={-Infinity} // Allow unlimited horizontal rotation
                    rotateSpeed={0.5} // Adjust rotation speed
                    zoomSpeed={0.5} // Adjust zoom speed
                    panSpeed={0.5} // Adjust panning speed
                />
                <Model />
            </Canvas> */}



        </div>
    )
}

export default Logo

