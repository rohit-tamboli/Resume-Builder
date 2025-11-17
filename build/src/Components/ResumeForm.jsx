import React, { useState, useEffect } from "react";

// ResumeBuilder.jsx - professional default content (ATS-friendly)
// Single-file React component using TailwindCSS. Default export a component.

export default function ResumeBuilder() {
  // Basic profile (professional / ATS-friendly defaults)
  const [template, setTemplate] = useState("simple");
  const [name, setName] = useState("Jane Doe");
  const [title, setTitle] = useState("Senior Product Designer");
  const [contact, setContact] = useState("jane.doe@email.com | (555) 555-5555 | linkedin.com/in/janedoe");
  const [summary, setSummary] = useState(
    "Senior Product Designer with 7+ years designing user-centered web and mobile experiences. Strengths include design systems, cross-functional collaboration, user research, and delivering measurable UX improvements."
  );

  // Dynamic lists (professional examples)
  const [experience, setExperience] = useState([
    {
      id: 1,
      role: "Senior Product Designer",
      company: "Acme Co",
      dates: "2021 – Present",
      bullets: [
        "Led design for a cross-platform product used by 1M+ monthly active users; improved task completion by 18%.",
        "Owned design system components and documentation to reduce design-engineering rework by 35%.",
        "Conducted user research and moderated usability tests that informed product roadmap priorities."
      ]
    },
    {
      id: 2,
      role: "Product Designer",
      company: "BrightLabs UI",
      dates: "2018 – 2021",
      bullets: [
        "Designed responsive SaaS interfaces, increasing conversion by 12% through UX improvements.",
        "Built reusable Figma libraries and collaborated with engineers to deliver polished implementations.",
        "Performed heuristic reviews and competitor analysis to prioritize feature improvements."
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { id: 1, school: "State University", degree: "B.A., Graphic & Interaction Design", dates: "2014 – 2018" }
  ]);

  const [skills, setSkills] = useState([
    "Figma",
    "UX Research",
    "Design Systems",
    "Prototyping",
    "Usability Testing",
    "HTML/CSS",
    "Accessibility (WCAG)"
  ]);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resume_builder_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.name && setName(parsed.name);
        parsed.title && setTitle(parsed.title);
        parsed.contact && setContact(parsed.contact);
        parsed.summary && setSummary(parsed.summary);
        parsed.template && setTemplate(parsed.template);
        parsed.experience && setExperience(parsed.experience);
        parsed.education && setEducation(parsed.education);
        parsed.skills && setSkills(parsed.skills);
      } catch (e) {
        console.warn("Failed to parse saved resume data", e);
      }
    }
  }, []);

  useEffect(() => {
    const payload = { name, title, contact, summary, template, experience, education, skills };
    localStorage.setItem("resume_builder_data", JSON.stringify(payload));
  }, [name, title, contact, summary, template, experience, education, skills]);

  // Helpers (unchanged)
  function addExperience() {
    setExperience((prev) => [
      ...prev,
      { id: Date.now(), role: "New Role", company: "Company", dates: "YYYY – YYYY", bullets: ["Achievement..."] }
    ]);
  }

  function removeExperience(id) {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  }

  function updateExperience(id, field, value) {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addExpBullet(id) {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, bullets: [...e.bullets, "New bullet..."] } : e)));
  }

  function updateExpBullet(id, idx, value) {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? value : b)) } : e)));
  }

  function removeExpBullet(id, idx) {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e)));
  }

  function addEducation() {
    setEducation((prev) => [...prev, { id: Date.now(), school: "New School", degree: "Degree", dates: "YYYY – YYYY" }]);
  }

  function removeEducation(id) {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  }

  function updateEducation(id, field, value) {
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addSkill() {
    setSkills((prev) => [...prev, "New skill"]);
  }

  function updateSkill(idx, value) {
    setSkills((prev) => prev.map((s, i) => (i === idx ? value : s)));
  }

  function removeSkill(idx) {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
  }

  function exportPDF() {
    window.print();
  }

  function resetAll() {
    if (!confirm("Reset all resume data? This will clear local storage.")) return;
    localStorage.removeItem("resume_builder_data");
    window.location.reload();
  }

  // Render (unchanged structure; content now uses professional defaults)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Resume Builder</h2>
            <div className="space-x-2">
              <select value={template} onChange={(e) => setTemplate(e.target.value)} className="border rounded-md px-3 py-1">
                <option value="simple">Simple</option>
                <option value="modern">Modern</option>
              </select>
              <button onClick={exportPDF} className="bg-blue-600 text-white px-3 py-1 rounded">
                Export / Print
              </button>
            </div>
          </div>

          <section className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">Profile</h3>
            <div className="space-y-2">
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="Full name" />
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="Title (e.g. Product Designer)" />
              <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="Contact info" />
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full border rounded px-2 py-1 mt-3" placeholder="Short summary / profile" />
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Experience</h3>
              <div>
                <button onClick={addExperience} className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-3 mt-3">
              {experience.map((exp) => (
                <div key={exp.id} className="border rounded p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <input value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className="w-full border rounded px-2 py-1" />
                      <div className="flex gap-2">
                        <input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-1/2 border rounded px-2 py-1" />
                        <input value={exp.dates} onChange={(e) => updateExperience(exp.id, "dates", e.target.value)} className="w-1/2 border rounded px-2 py-1" />
                      </div>
                    </div>
                    <div className="text-right">
                      <button onClick={() => removeExperience(exp.id)} className="text-red-600">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium">Bullets</h4>
                    {exp.bullets.map((b, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={b} onChange={(e) => updateExpBullet(exp.id, i, e.target.value)} className="flex-1 border rounded px-2 py-1" />
                        <button onClick={() => removeExpBullet(exp.id, i)} className="text-red-500">
                          ×
                        </button>
                      </div>
                    ))}
                    <div>
                      <button onClick={() => addExpBullet(exp.id)} className="text-sm bg-gray-100 px-2 py-1 rounded">
                        Add bullet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Education</h3>
              <button onClick={addEducation} className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                Add
              </button>
            </div>
            <div className="space-y-3 mt-3">
              {education.map((ed) => (
                <div key={ed.id} className="border rounded p-3">
                  <div className="flex gap-2">
                    <input value={ed.school} onChange={(e) => updateEducation(ed.id, "school", e.target.value)} className="flex-1 border rounded px-2 py-1" />
                    <input value={ed.dates} onChange={(e) => updateEducation(ed.id, "dates", e.target.value)} className="w-36 border rounded px-2 py-1" />
                  </div>
                  <input value={ed.degree} onChange={(e) => updateEducation(ed.id, "degree", e.target.value)} className="w-full border rounded px-2 py-1 mt-2" />
                  <div className="text-right mt-2">
                    <button onClick={() => removeEducation(ed.id)} className="text-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Skills</h3>
              <button onClick={addSkill} className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                Add
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={s} onChange={(e) => updateSkill(i, e.target.value)} className="flex-1 border rounded px-2 py-1" />
                  <button onClick={() => removeSkill(i)} className="text-red-600">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-2">
            <button onClick={resetAll} className="text-sm bg-red-600 text-white px-3 py-1 rounded">
              Reset
            </button>
            <button onClick={() => alert("Saved to localStorage")} className="text-sm bg-gray-200 px-3 py-1 rounded">
              Save
            </button>
          </div>

          <p className="text-xs text-gray-500">Tip: Use Export / Print and save as PDF. Data is auto-saved to localStorage in your browser.</p>
        </div>

        {/* Preview column */}
        <div className="print:shadow-none bg-white p-6 rounded shadow overflow-auto">
          {template === "simple" ? (
            <div className="max-w-3xl mx-auto">
              <header className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <div className="text-sm text-gray-600">{title}</div>
                </div>
                <div className="ml-auto text-sm text-gray-600">{contact}</div>
              </header>

              <section className="mt-4">
                <p className="text-sm">{summary}</p>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Experience</h3>
                <div className="space-y-3 mt-2">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">
                            {exp.role} — <span className="text-sm text-gray-600">{exp.company}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">{exp.dates}</div>
                      </div>
                      <ul className="list-disc list-inside text-sm mt-1">{exp.bullets.map((b, i) => (<li key={i}>{b}</li>))}</ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Education</h3>
                <div className="space-y-2 mt-2 text-sm">
                  {education.map((ed) => (
                    <div key={ed.id} className="flex justify-between">
                      <div>{ed.school} — <span className="text-gray-600">{ed.degree}</span></div>
                      <div className="text-gray-600">{ed.dates}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((s, i) => (<span key={i} className="text-xs px-2 py-1 border rounded">{s}</span>))}
                </div>
              </section>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6">
              <aside className="col-span-1 bg-gray-50 p-4 rounded">
                <div className="flex flex-col items-center">
                  <h2 className="font-semibold">{name}</h2>
                  <div className="text-sm text-gray-600">{title}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Contact</h4>
                  <div className="text-xs mt-1">{contact}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Skills</h4>
                  <div className="mt-2 flex flex-col gap-2">{skills.map((s, i) => (<div key={i} className="text-xs">• {s}</div>))}</div>
                </div>
              </aside>

              <main className="col-span-2">
                <section>
                  <h3 className="font-semibold">Summary</h3>
                  <p className="text-sm text-gray-700 mt-1">{summary}</p>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Experience</h3>
                  <div className="space-y-3 mt-2">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{exp.role}</div>
                            <div className="text-sm text-gray-500">{exp.company}</div>
                          </div>
                          <div className="text-sm text-gray-500">{exp.dates}</div>
                        </div>
                        <ul className="list-disc list-inside text-sm mt-1 text-gray-700">{exp.bullets.map((b, i) => (<li key={i}>{b}</li>))}</ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Education</h3>
                  <div className="space-y-2 mt-2 text-sm text-gray-700">{education.map((ed) => (
                    <div key={ed.id}><div className="font-medium">{ed.school}</div><div className="text-sm text-gray-500">{ed.degree} — {ed.dates}</div></div>
                  ))}</div>
                </section>
              </main>
            </div>
          )}
        </div>
      </div>

      <style>{`@media print { body * { visibility: hidden; } .print\\:shadow-none, .print\\:shadow-none * { visibility: visible; } .print\\:shadow-none { position: absolute; left: 0; top: 0; width: 100%; } button, input, textarea, select { display: none !important; } }`}</style>
    </div>
  );
}
