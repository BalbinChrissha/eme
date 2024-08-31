import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import { useState, useEffect } from 'react'
import { faAngular, faCss3, faGitAlt, faHtml5, faJsSquare, faLaravel, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'

const About = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className='container about-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        Dedicated and self-driven BSIT student at Pangasinan State
                        University Urdaneta City Campus, with a strong commitment to
                        achieving goals and delivering high-quality work.
                    </p>
                    <p>
                        Proficient in database management, software development, and skilled in
                        programming languages including Python, PHP, and Dart. Known for
                        collaborative teamwork, as reflected in group accomplishments.
                    </p>
                    <p>
                        Eager to apply school learnings, acquire new skills, and demonstrate
                        them in a future IT role. Passionate about information technology,
                        bringing fresh perspectives and a lifelong commitment to learning.
                    </p>

                </div>


                <div className='stage-cube-cont'>

                    <div className='cubespinner'>
                        <div className='face1'>

                            <FontAwesomeIcon icon={faLaravel} color='#DD0031' />
                        </div>
                        <div className='face2'>
                            <FontAwesomeIcon icon={faHtml5} color='#F06529' />
                        </div>
                        <div className='face3'>
                            <FontAwesomeIcon icon={faCss3} color='#28A4D9' />
                        </div>
                        <div className='face4'>
                            <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
                        </div>
                        <div className='face5'>
                            <FontAwesomeIcon icon={faJsSquare} color='#EFD81D' />
                        </div>
                        <div className='face6'>
                            <FontAwesomeIcon icon={faGitAlt} color='#EC4D28' />
                        </div>
                    </div>

                </div>

            </div>

            <Loader type='ball-beat' />
        </>
    )
}

export default About