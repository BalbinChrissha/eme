import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useState, useEffect } from 'react'
import portfolioData from '../../data/portfolio.json'


const Portfolio = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    // console.log(portfolioData);

    const renderPortfolio = (portfolio) => {
        return (
            <div className='images-container' style={{ top: '30%' }}>
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img
                                    src={port.cover}
                                    className="portfolio-image"
                                    alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    <h4 className="description">{port.description}</h4>

                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >View</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <>

            <div className='container portfolio-page'>
                <div className="text-zone-portfolio">
                    <h1>
                        <AnimatedLetters letterClass={letterClass} idx={15} strArray={['P', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o']} />
                    </h1>
                </div>

                {/* Apply the 'boxes' class directly to the wrapper div */}
                <div className='boxes'>
                    {renderPortfolio(portfolioData.portfolio)}
                </div>
            </div>

            <Loader type='ball-beat' />
        </>
    )

}

export default Portfolio