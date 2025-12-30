import React, { useRef, useEffect, useState } from 'react';
import './Header.css';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useWindowScroll } from 'react-use';


const Header = () => {
    const scrambleRef = useRef(null);
    const navContainerRef = useRef(null);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        gsap.registerPlugin(ScrambleTextPlugin);
        gsap.to(scrambleRef.current, {
            duration: 3,
            scrambleText: {
                text: 'Paulo.Diney',
                chars: 'upperAndLowerCase',
                revealDelay: 1,
                tweenLength: false
            },
            ease: 'power1.inOut'
        });
    }, []);

    useEffect(() => {
        if(currentScrollY === 0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }else if(currentScrollY > lastScrollY){
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }else if(currentScrollY < lastScrollY){
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`header${isNavVisible ? '' : ' header--hidden'}`} ref={navContainerRef}>
            <nav className='navigation'>
                <div className='logo'>
                    <h1 ref={scrambleRef}>Paulo.Diney</h1>
                </div>
                
                <button className='hamburger' onClick={toggleMenu} aria-label='Menu'>
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                </button>

                <ul className={`list ${menuOpen ? 'active' : ''}`}>
                    <li><a href="#home" onClick={closeMenu}>Inicio</a></li>
                    <li><a href="#about" onClick={closeMenu}>Sobre</a></li>
                    <li><a href="#projects" onClick={closeMenu}>Projetos</a></li>
                    <li><a href="#skills" onClick={closeMenu}>Habilidades</a></li>
                    <li><a href="#contact" onClick={closeMenu}>Contato</a></li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;