import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const ResumePreview = forwardRef((props, ref) => {
  const resume = useSelector((state) => state.resume);
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8" ref={ref}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {resume?.personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600">
          {resume?.personalInfo?.jobTitle || 'Your Job Title'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {resume?.sections?.summary && resume?.personalInfo?.summary && (
            <section>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Summary</h2>
              <p className="text-gray-700">{resume?.personalInfo?.summary}</p>
            </section>
          )}
          
          {resume?.sections?.experience && resume?.experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {resume?.experience?.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">
                          {exp?.startDate} - {exp?.current ? 'Present' : exp?.endDate}
                        </p>
                        <p className="text-gray-500 text-sm">{exp?.location}</p>
                      </div>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-gray-700">
                      {exp?.responsibilities?.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {resume?.sections?.education && resume?.education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {resume?.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{edu?.degree}</h3>
                      <span className="text-gray-600">
                        {edu?.startYear} - {edu?.endYear || 'Present'}
                      </span>
                    </div>
                    <p className="text-gray-700">{edu?.institution}</p>
                    <p className="text-gray-600 text-sm">{edu?.fieldOfStudy}</p>
                    {edu?.grade && <p className="text-gray-600 text-sm">Grade: {edu?.grade}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-2">Contact</h2>
            <div className="space-y-1 text-sm">
              {resume?.personalInfo.email && (
                <p>
                  <strong>Email:</strong> {resume?.personalInfo?.email}
                </p>
              )}
              {resume?.personalInfo?.phone && (
                <p>
                  <strong>Phone:</strong> {resume?.personalInfo?.phone}
                </p>
              )}
              {resume?.personalInfo?.linkedin && (
                <p>
                  <strong>LinkedIn:</strong> {resume?.personalInfo?.linkedin}
                </p>
              )}
              {resume?.personalInfo?.github && (
                <p>
                  <strong>GitHub:</strong> {resume?.personalInfo?.github}
                </p>
              )}
              {resume?.personalInfo?.website && (
                <p>
                  <strong>Website:</strong> {resume?.personalInfo?.website}
                </p>
              )}
              {resume?.personalInfo?.address && (
                <p>
                  <strong>Location:</strong> {resume?.personalInfo?.address}
                </p>
              )}
            </div>
          </div>
          
          {resume?.sections?.skills && resume?.skills?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
                  >
                    {skill?.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {resume?.sections?.projects && resume?.projects?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {resume.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{project?.name}</h3>
                    <p className="text-sm text-gray-700">{project?.description}</p>
                    {project?.technologies && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {project?.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resume?.sections?.certifications && resume?.certifications?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">
                Certifications
              </h2>
              <div className="space-y-2">
                {resume?.certification?.map((cert, index) => (
                  <div key={index} className="text-sm">
                  {console.log('cert:>> ', cert)}
                    <h3 className="font-medium">{cert?.name}</h3>
                    <p className="text-gray-600">{cert?.issuer}</p>
                    <p className="text-gray-500 text-xs">
                      {cert?.date} {cert?.credentialId ? `• ${cert?.credentialId}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;