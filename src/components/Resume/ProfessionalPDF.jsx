import React from 'react';
import './ProfessionalPDF.css';

const ProfessionalPDF = React.forwardRef(({ userData }, ref) => {
    if (!userData) return null;

    return (
        <div className="professional-pdf-container" ref={ref} style={{ display: 'none' }}>
            <div className="pdf-header">
                <div className="pdf-header-left">
                    <img src={(import.meta.env.BASE_URL + userData.profileImage).replace(/\/+/g, '/')} alt={userData.name} />
                </div>
                <div className="pdf-header-right">
                    <h1>{userData.name.toUpperCase()}</h1>
                    <div className="pdf-contact-info">
                        <p>📍 {userData.contact.location}</p>
                        <p>📞 {userData.contact.phone}</p>
                        <p>📧 {userData.contact.email}</p>
                    </div>
                </div>
            </div>

            <div className="pdf-body">
                {/* Summary */}
                <div className="pdf-section">
                    <div className="pdf-section-label">SUMMARY</div>
                    <div className="pdf-section-content">
                        <p>{userData.summary}</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="pdf-section">
                    <div className="pdf-section-label">SKILLS</div>
                    <div className="pdf-section-content">
                        {Object.entries(userData).filter(([key]) => key.endsWith('_skills')).map(([key, skills], index) => {
                            const title = key.split('_').map(word => word === 'skills' ? '' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
                            return (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <strong style={{ color: '#4e5e6e', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
                                        {title.toUpperCase()}
                                    </strong>
                                    <span style={{ fontSize: '13px', color: '#333' }}>
                                        {skills.map(s => typeof s === 'object' ? s.name : s).join(', ')}
                                    </span>
                                </div>
                            );
                        })}
                        {!Object.keys(userData).some(key => key.endsWith('_skills')) && userData.skills && (
                            <ul className="pdf-skills-list">
                                {(userData.skills || []).map((skill, i) => (
                                    <li key={i}>{typeof skill === 'object' ? skill.name : skill}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Education */}
                {userData.education && userData.education.length > 0 && (
                    <div className="pdf-section">
                        <div className="pdf-section-label">EDUCATION AND TRAINING</div>
                        <div className="pdf-section-content">
                            {userData.education.map((edu, i) => (
                                <div key={i} className="pdf-edu-item">
                                    <div className="pdf-edu-header">
                                        <strong>{edu.institution}, </strong> {edu.location || 'Surat, India'}, {edu.year}
                                    </div>
                                    <div className="pdf-edu-degree">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {userData.languages && Object.keys(userData.languages).length > 0 && (
                    <div className="pdf-section">
                        <div className="pdf-section-label">LANGUAGES</div>
                        <div className="pdf-section-content">
                            <span style={{ fontSize: '13px', color: '#333' }}>
                                {Object.keys(userData.languages).join(', ')}
                            </span>
                        </div>
                    </div>
                )}

                 {/* Experience */}
                {userData.experience && userData.experience.length > 0 && (
                    <div className="pdf-section pdf-experience-section">
                        <div className="pdf-section-label">EXPERIENCE</div>
                        <div className="pdf-section-content">
                            {userData.experience.map((exp, i) => (
                                <div key={i} className="pdf-experience-item">
                                    <div className="pdf-exp-header">
                                        <strong>{exp.role.toUpperCase()}, {exp.period}</strong>
                                    </div>
                                    <div className="pdf-exp-company">{exp.company}, {exp.location || 'Surat, India'}</div>
                                    <ul className="pdf-exp-desc">
                                        {Array.isArray(exp.description) ? (
                                            exp.description.map((desc, dIdx) => (
                                                <li key={dIdx} style={{ marginBottom: '4px' }}>{desc}</li>
                                            ))
                                        ) : (
                                            <li>{exp.description}</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

ProfessionalPDF.displayName = 'ProfessionalPDF';

export default ProfessionalPDF;
