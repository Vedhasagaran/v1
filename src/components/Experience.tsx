'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description?: string;
  skills?: string[];
  isCurrent?: boolean;
  isBreak?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "Peninsular Research Operation",
    type: "Full-time",
    period: "Jul 2024 — Present",
    duration: "1 yr 9 mos",
    location: "Chennai, India · Hybrid",
    isCurrent: true,
    skills: ["C#", "TypeScript", ".NET Core", "Angular", "React", "MongoDB", "Redis", "Azure", "Docker", "Node.js"],
  },
  {
    title: "Community Volunteer",
    company: "TechXConf",
    type: "Volunteer",
    period: "Sep 2024 — Present",
    duration: "1 yr 7 mos",
    location: "Remote",
    isCurrent: true,
  },
  {
    title: "Career Break",
    company: "UPSC Civil Services",
    type: "Personal goal pursuit",
    period: "Jan 2022 — Dec 2023",
    duration: "2 yrs",
    location: "Delhi, India",
    isBreak: true,
    description: "Took a focused break to prepare for the UPSC Civil Services Examination — one of India's most competitive exams. Developed strong foundations in polity, history, geography, economics, and current affairs, with Anthropology as an optional subject. Built exceptional analytical, writing, and critical thinking skills.",
  },
  {
    title: "Programming Analyst",
    company: "Cognizant",
    type: "Full-time",
    period: "Nov 2020 — Oct 2021",
    duration: "1 yr",
    location: "Chennai, India",
    description: "Developed a robust Web API to power key product screens, ensuring seamless data flow and performance. Implemented core business logic modules to enable critical functionalities.",
    skills: ["C#", "ASP.NET Web API", "Microservices", "Entity Framework", "MS SQL Server", "Agile"],
  },
  {
    title: "Intern",
    company: "Cognizant",
    type: "Internship",
    period: "Dec 2019 — Apr 2020",
    duration: "5 mos",
    location: "Coimbatore, India",
    skills: ["C#", "ASP.NET MVC", "HTML", "CSS", "JavaScript", "MySQL"],
  },
];

export default function Experience() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-16 text-foreground">
        Experience
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-12"
            >
              <div
                className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border-2 ${
                  exp.isCurrent
                    ? 'border-[var(--accent-color)] bg-[var(--accent-color)]'
                    : exp.isBreak
                    ? 'border-muted-foreground bg-transparent'
                    : 'border-foreground bg-foreground'
                }`}
              />

              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3 className={`text-lg font-bold tracking-tight ${exp.isBreak ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {exp.company}
                      <span className="font-normal"> · {exp.type}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-0.5 flex-shrink-0">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{exp.period}</span>
                    <span className="text-xs text-muted-foreground">{exp.location}</span>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {exp.description}
                  </p>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
