import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { users, defaultUser } from '../../data/users';
import './Resume.css';

const Resume = () => {
  const [searchParams] = useSearchParams();
  const userKey = searchParams.get('user') || defaultUser;
  
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
    <div className="resume-container">
      <div className="resume-wrapper">
        {/* Header */}
        <header className="resume-header">
          {userData.profileImage && (
            <div className="profile-image-container">
              <img src={userData.profileImage} alt={userData.name} className="profile-image" />
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
              <h2 className="section-title">Experience</h2>
              {userData.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="item-role">{exp.role}</h3>
                    <span className="item-period">{exp.period}</span>
                  </div>
                  <p className="item-company">{exp.company}</p>
                  <p className="item-desc">{exp.description}</p>
                </div>
              ))}
            </section>

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
                          <span key={sIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {(!Object.keys(userData).some(key => key.endsWith('_skills')) && userData.skills) && (
                  <div className="skills-list">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
