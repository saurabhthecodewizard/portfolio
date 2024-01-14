"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { links } from '@/lib/data';
import Link from 'next/link';
import { BsMoon, BsSun } from 'react-icons/bs';
import { name } from '@/lib/assets';
import Image from 'next/image';
import { BiMenu, BiX } from 'react-icons/bi';
import useActiveSectionContext from '@/context/useActiveSectionContext';

const Navbar = () => {
    const { activeSection, setActiveSection, setLastClick } = useActiveSectionContext();
    const [theme, setTheme] = React.useState("light");
    const [toggle, setToggle] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const toggleTheme = React.useCallback(() => {
        if (theme == "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, [theme]);

    const onClickToggleHandler = React.useCallback(() => {
        setToggle(!toggle)
    }, [toggle]);

    const onClickLinkHandler = React.useCallback((event: React.MouseEvent) => {
        const selectedSectionName = event.currentTarget.ariaLabel as string;
        setActiveSection(selectedSectionName);
        setLastClick(Date.now());
        setToggle(false);
    }, [setActiveSection, setLastClick]);

    const onClickOutsideHandler = React.useCallback(
        (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        },
        [menuRef]
    );

    React.useEffect(() => {
        document.addEventListener('mousedown', onClickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', onClickOutsideHandler);
        };
    }, [onClickOutsideHandler]);

    return (
        <nav className='z-[999] relative flex items-center justify-center'>
            <div className={`fixed flex pt-28 lg:pt-36 gap-3 w-full justify-between items-center bg-opacity-80 backdrop-blur-[0.5rem] px-10 sm:px-16 md:px-28 lg:px-44 xl:px-60 2xl:px-84`}>
                <motion.div className='lg:flex items-center gap-2'
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <Image src={name} alt={'Saurabh Mahajan'} className="w-[18rem] object-contain" />
                </motion.div>

                <motion.div className='flex gap-3 h-[3.25rem] items-center'
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className='lg:flex hidden top-[1.7rem h-[initial] rounded-full border border-white border-opacity-40 bg-white shadow-lg shadow-black/[0.05] px-3'>
                        <ul className='flex flex-wrap items-center justify-center gap-1 text-[0.9rem] font-medium text-gray-500'>
                            {
                                links.map((link) => (
                                    <motion.li key={link.href} className={`h-3/4 flex items-center justify-center`}
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <motion.div
                                            className={`flex w-full items-center justify-center px-3 py-2 my-1 hover:text-gray-950 transition 
                                        ${activeSection === link.name ? 'text-gray-950 bg-gray-100 rounded-full' : ''}`}
                                            layoutId="activeSection"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30
                                            }}
                                        >
                                            <Link aria-label={link.name} onClick={onClickLinkHandler} href={link.href}>
                                                {
                                                    link.name
                                                }
                                            </Link>
                                        </motion.div>
                                    </motion.li>
                                ))
                            }
                        </ul>
                    </div>
                    <button
                        className={`sm:bg-white sm:hover:bg-[#8266ff] w-[3.25rem] h-[3.25rem] bg-opacity-80 backdrop-blur-[0.5rem] sm:border sm:border-white sm:border-opacity-40 sm:shadow-2xl rounded-full flex items-center justify-center justify-self-end hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950`}
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? <BsSun /> : <BsMoon />}
                    </button>
                    {toggle
                        ? <BiX onClick={onClickToggleHandler} className='w-10 h-10 cursor-pointer bg-opacity-80 backdrop-blur-[0.5rem] active:scale-105 transition-all lg:hidden' />
                        : <BiMenu onClick={onClickToggleHandler} className='w-10 h-10 cursor-pointer bg-opacity-80 backdrop-blur-[0.5rem] active:scale-105 transition-all lg:hidden' />}
                </motion.div>

                <motion.div
                    ref={menuRef}
                    className={`${toggle ? 'block z-50' : 'hidden'} lg:hidden fixed mt-16 py-4 rounded-2xl self-start right-12 sm:right-16 md:right-28 max-h-[32rem] w-60 bg-white`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: toggle ? 1 : 0, scale: toggle ? 1 : 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ul className='flex flex-col items-center justify-center h-full gap-y-4 text-[1rem] font-medium text-gray-500'>
                        {links.map((link) => (
                            <motion.li key={link.href} className='flex items-center justify-center w-full'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                <Link aria-label={link.name} onClick={onClickLinkHandler} href={link.href} className={`px-3 py-2 hover:text-gray-950 transition 
                                ${activeSection === link.name ? 'text-gray-950 bg-gray-100 rounded-full' : ''}`}>
                                    {link.name}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;