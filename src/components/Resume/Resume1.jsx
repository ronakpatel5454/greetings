import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { ronakData } from '../../data/ronak';
import './Resume1.css';
import ProfessionalPDF from './ProfessionalPDF';

const Resume1 = () => {
    const resumeRef = useRef();
    const professionalResumeRef = useRef();

    const handleDownload = () => {
        const element = resumeRef.current;
        const opt = {
            margin:       0.5,
            filename:     `${ronakData.name}_Resume_Modern.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const buttons = document.querySelectorAll('.download-group-container button');
        buttons.forEach(btn => btn.style.display = 'none');

        html2pdf().set(opt).from(element).save().then(() => {
            buttons.forEach(btn => btn.style.display = 'flex');
        });
    };

    const handleProfessionalDownload = () => {
        const element = professionalResumeRef.current;
        // Temporarily show it for capture
        element.style.display = 'block';
        
        const opt = {
            margin:       0,
            filename:     `${ronakData.name}_Resume_Professional.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.display = 'none';
        });
    };

    return (
        <div className="resume1-container" ref={resumeRef}>
            <div className="download-group-container">
                <button className="download-btn" onClick={handleDownload} title="Download Modern PDF">
                    <span className="download-icon">📥</span>
                </button>
                <button className="download-btn-prof" onClick={handleProfessionalDownload} title="Download Professional PDF">
                    <span className="download-icon">📄</span>
                </button>
            </div>
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${(import.meta.env.BASE_URL + ronakData.uimage).replace(/\/+/g, '/')})` }}>
                <div className="hero-overlay">
                    <nav className="hero-nav">
                        {/* <div className="nav-logo">DevFolio</div> */}
                        <ul className="nav-links">
                            {/* <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Portfolio</li>
                            <li>Dropdown</li>
                            <li>Contact</li> */}
                        </ul>
                    </nav>
                    <div className="hero-content">
                        <h1>I am {ronakData.name}</h1>
                        <p className="typed-text">{ronakData.title}</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-card">
                    <div className="about-info">
                        <div className="info-left">
                            <div className="profile-img-box">
                                <img src={(import.meta.env.BASE_URL + ronakData.profileImage).replace(/\/+/g, '/')} alt={ronakData.name} />
                            </div>
                            <div className="contact-details">
                                <p><span>Name:</span> {ronakData.name}</p>
                                <p><span>Profile:</span> {ronakData.title}</p>
                                <p><span>Email:</span> {ronakData.contact.email}</p>
                                <p><span>Phone:</span> {ronakData.contact.phone}</p>
                            </div>
                        </div>
                        <div className="info-right">
                            <h2>About me</h2>
                            <p className="summary-text">{ronakData.summary}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section">
                <h2>Our Skills</h2>
                <div className="skills-categories">
                    {Object.entries(ronakData).filter(([key]) => key.endsWith('_skills')).map(([key, skills], index) => {
                        const title = key.split('_').map(word => word === 'skills' ? '' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
                        return (
                            <div key={index} className="skill-category-group">
                                <h3 className="category-title">{title}</h3>
                                <div className="skills-grid">
                                    {skills.map((skill, sIndex) => (
                                        <div key={sIndex} className="skill-item">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="skill-bar">
                                                <div className="skill-progress" style={{ width: skill.level }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Education Section */}
            <section className="section-white">
                <h2>Education</h2>
                <div className="timeline">
                    {ronakData.education.map((edu, index) => (
                        <div key={index} className="timeline-card">
                            <h3>{edu.degree}</h3>
                            <span className="period">{edu.year}</span>
                            <p>{edu.institution}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section (Identical to Education as requested) */}
            <section className="section-gray">
                <h2>Projects</h2>
                <div className="timeline">
                    {ronakData.projects.map((project, index) => (
                        <div key={index} className="timeline-card">
                            <h3>{project.name}</h3>
                            <a href={project.link} className="project-link">View Project →</a>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Hidden Professional PDF Template */}
            <ProfessionalPDF userData={ronakData} ref={professionalResumeRef} />
        </div>
    );
};

export default Resume1;
