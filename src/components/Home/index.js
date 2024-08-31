import LogoTitle from '../../assets/images/C_logo.png'
import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import Logo from './Logo';
import Loader from 'react-loaders';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    const nameArray = ['h', 'r', 'i', 's', 's', 'h', 'a']
    const jobArray = [
        'w',
        'e',
        'b',
        ' ',
        'd',
        'e',
        'v',
        'e',
        'l',
        'o',
        'p',
        'e',
        'r',
        '.',
    ]

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                        <br />
                        <span className={`${letterClass} _13`}>I</span>
                        <span className={`${letterClass} _14`}>'m</span>
                        <img
                            src={LogoTitle}
                            alt="JavaScript Developer Name, Web Developer Name"
                        />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={nameArray}
                            idx={15}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray}
                            idx={22}
                        />
                    </h1>
                    <h2>Backend Developer / Web Developer</h2>
                    <Link to="/contact" className='flat-button'>CONTACT ME</Link>
                </div>
                <Logo />



            </div>
            <Loader type='ball-beat' />
        </>
    );
}

export default Home
