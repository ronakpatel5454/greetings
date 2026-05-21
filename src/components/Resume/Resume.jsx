import React, { useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { users, defaultUser } from '../../data/users';
import './Resume.css';
import ProfessionalPDF from './ProfessionalPDF';

const Resume = () => {
  const [searchParams] = useSearchParams();
  const userKey = searchParams.get('user') || defaultUser;
  const resumeRef = useRef();
  const professionalResumeRef = useRef();

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: `${userKey}_Resume_Modern.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const buttons = document.querySelectorAll('.download-group-container button');
    buttons.forEach(btn => btn.style.display = 'none');

    html2pdf().set(opt).from(element).save().then(() => {
      buttons.forEach(btn => btn.style.display = 'flex');
    });
  };

  const handleProfessionalDownload = () => {
    const element = professionalResumeRef.current;
    if (!element) return;
    
    element.style.display = 'block';
    const opt = {
      margin: 0,
      filename: `${userKey}_Resume_Professional.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.display = 'none';
    });
  };

  const userData = useMemo(() => {
    return users[userKey.toLowerCase()];
  }, [userKey]);

  if (!userData) {
    return (
      <div className="error-container">
        <h1>User Not Found</h1>
        <p>Sorry, we couldn't find a resume for "{userKey}".</p>
        <Link to="/resume" className="error-btn">View Default Resume</Link>
      </div>
    );
  }

  return (
    <div className="resume-container" ref={resumeRef}>
      <div className="download-group-container">
        <button className="download-btn-fixed" onClick={handleDownload} title="Download Modern PDF">
          <span className="download-icon">📥</span>
        </button>
        <button className="download-btn-prof-fixed" onClick={handleProfessionalDownload} title="Download Professional PDF">
          <span className="download-icon">📄</span>
        </button>
      </div>
      <div className="resume-wrapper">
        {/* Header */}
        <header className="resume-header">
          {userData.profileImage && (
            <div className="profile-image-container">
              <img 
                src={userData.profileImage.startsWith('http') ? userData.profileImage : (import.meta.env.BASE_URL + userData.profileImage).replace(/\/+/g, '/')} 
                alt={userData.name} 
                className="profile-image" 
              />
            </div>
          )}
          <h1 className="resume-name">{userData.name}</h1>
          <p className="resume-title">{userData.title}</p>
          <div className="resume-contact">
            <div className="contact-item">📧 {userData.contact.email}</div>
            <div className="contact-item">📱 {userData.contact.phone}</div>
            <div className="contact-item">📍 {userData.contact.location}</div>
          </div>
        </header>

        {/* Summary */}
        <section className="resume-section">
          <h2 className="section-title">Summary</h2>
          <p className="summary-text">{userData.summary}</p>
        </section>

        <div className="resume-grid">
          {/* Main Content */}
          <div className="resume-main">
            <section className="resume-section" style={{ marginBottom: '2rem' }}>
              <h2 className="section-title">Education</h2>
              {userData.education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="item-role">{edu.degree}</h3>
                    <span className="item-period">{edu.year}</span>
                  </div>
                  <p className="item-company">{edu.institution}</p>
                </div>
              ))}
            </section>

            <section className="resume-section" style={{ marginBottom: '2rem' }}>
              <h2 className="section-title">Experience</h2>
              {userData.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="item-role">{exp.role}</h3>
                    <span className="item-period">{exp.period}</span>
                  </div>
                  <p className="item-company">{exp.company}</p>
                  {Array.isArray(exp.description) ? (
                    <ul className="item-desc-list" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="item-desc-bullet" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="item-desc">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2 className="section-title">Projects</h2>
              {userData.projects.map((project, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="item-role">{project.name}</h3>
                    <a href={project.link} className="project-link" style={{ fontSize: '0.8rem' }}>View Project →</a>
                  </div>
                  <p className="item-desc">{project.description}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="resume-sidebar">
            <section className="resume-section">
              <h2 className="section-title">Skills</h2>
              <div className="skills-categorized">
                {Object.entries(userData).filter(([key]) => key.endsWith('_skills')).map(([key, skills], index) => {
                  const title = key.split('_').map(word => word === 'skills' ? '' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
                  return (
                    <div key={index} className="skill-category">
                      <h4 className="skill-category-title">{title}</h4>
                        <div className="skills-list">
                          {skills.map((skill, sIndex) => (
                            <span key={sIndex} className="skill-tag">
                              {typeof skill === 'object' ? skill.name : skill}
                            </span>
                          ))}
                        </div>
                    </div>
                  );
                })}
                {(!Object.keys(userData).some(key => key.endsWith('_skills')) && userData.skills) && (
                  <div className="skills-list">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {typeof skill === 'object' ? skill.name : skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {userData.hobbies && (
              <section className="resume-section" style={{ marginTop: '2rem' }}>
                <h2 className="section-title">Hobbies</h2>
                <div className="skills-list">
                  {userData.hobbies.map((hobby, index) => (
                    <span key={index} className="skill-tag">{hobby}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <ProfessionalPDF userData={userData} ref={professionalResumeRef} />
    </div>
  );
};

export default Resume;
