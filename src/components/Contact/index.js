import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        // Cleanup function to clear the timeout
        return () => clearTimeout(timeoutId);
    }, [])

    const [loading, setLoading] = useState(false); // State to manage loading
    // Rest of your component code

    const showToastMessage = () => {
        toast.success("Message Sucessfully Sent!", {
            position: "top-right",
        });
    };

    const showErrorMessage = () => {
        toast.error("Failed to send the message, please try again", {
            position: "top-right"
        });
    }



    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when sending email

        emailjs
            .sendForm('service_1f1yuem', 'template_61go5ck', form.current, 'gNdvg1emJz-VZ0n7S')
            .then(
                () => {
                    showToastMessage();
                    // Alert or notify for successful sending
                    form.current.reset();
                },
                () => {
                    showErrorMessage();
                }
            )
            .finally(() => {
                setLoading(false); // Set loading to false after email is sent or failed
            });
    };


    return (
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        Let's Chat. Tell me about your project. Lets create something together.
                    </p>
                    <p> Don't hesitate to contact me using the form below.</p>
                    <div className="contact-form">
                        <form ref={form} onSubmit={sendEmail}>
                            <ul>
                                <li className="half">
                                    <input placeholder="Name" type="text" name="name" required />
                                </li>
                                <li className="half">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </li>
                                <li>
                                    <input
                                        placeholder="Subject"
                                        type="text"
                                        name="subject"
                                        required
                                    />
                                </li>
                                <li>
                                    <textarea
                                        placeholder="Message"
                                        name="message"
                                        required
                                    ></textarea>
                                </li>
                                <li>
                                    <input
                                        type="submit"
                                        className="flat-button"
                                        value={loading ? "SENDING..." : "SEND"}
                                        disabled={loading} // Disable button while sending
                                    />
                                    {/* <input type="submit" className="flat-button" value="SEND" /> */}
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>

                <div className='info-map'>
                    Chrissha Balbin
                    <br />
                    Philippines
                    <br />
                    Urdaneta City, Pangasinan
                    <br />
                    <span>balbinchrissha4@gmail.com</span>
                </div>

                <div className='map-wrap'>
                    <MapContainer center={[15.997922, 120.5341844]} zoom={13}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        <Marker position={[15.997922, 120.5341844]}>
                            <Popup>Wanna meet up for a cup of coffee and talk about your next project? :)</Popup>

                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loader type="ball-beat" />
            <ToastContainer />
            {loading && (
                <Loader type="ball-beat" />
            )}


        </>
    )
}

export default Contact
