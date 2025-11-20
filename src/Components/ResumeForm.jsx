import React, { useState, useEffect } from "react";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("simple");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [summary, setSummary] = useState("");

  const [experience, setExperience] = useState([]);

  const [education, setEducation] = useState([]);

  const [skills, setSkills] = useState([]);

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

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      { id: Date.now(), role: "", company: "", dates: "", bullets: [""] }
    ]);
  }

  function removeExperience(id) {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  }

  function updateExperience(id, field, value) {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addExpBullet(id) {
    setExperience((prev) =>
      prev.map((e) => (e.id === id ? { ...e, bullets: [...(e.bullets || []), ""] } : e))
    );
  }

  function updateExpBullet(id, idx, value) {
    setExperience((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? value : b)) }
          : e
      )
    );
  }

  function removeExpBullet(id, idx) {
    setExperience((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
      )
    );
  }

  function addEducation() {
    setEducation((prev) => [...prev, { id: Date.now(), school: "", degree: "", dates: "" }]);
  }

  function removeEducation(id) {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  }

  function updateEducation(id, field, value) {
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  function addSkill() {
    setSkills((prev) => [...prev, ""]);
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* Editor */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">Resume Builder</h2>

            <div className="space-x-2 flex flex-wrap">
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="simple">Simple</option>
                <option value="modern">Modern</option>
              </select>

              <button
                onClick={exportPDF}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Export / Print
              </button>
            </div>
          </div>

          {/* Profile */}
          <section className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">Profile</h3>
            <div className="space-y-2">
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-2 py-1 text-sm sm:text-base" />
              <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-2 py-1 text-sm sm:text-base" />
              <input placeholder="Email | Phone | LinkedIn" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border rounded px-2 py-1 text-sm sm:text-base" />
              <textarea placeholder="Short professional summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full border rounded px-2 py-1 text-sm sm:text-base mt-3" />
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Experience</h3>
              <button onClick={addExperience} className="text-sm bg-green-600 text-white px-2 py-1 rounded">Add</button>
            </div>

            <div className="space-y-3 mt-3">
              {experience.length === 0 && (
                <div className="text-sm text-gray-500">No experience added yet. Click "Add" to create an entry.</div>
              )}

              {experience.map((exp) => (
                <div key={exp.id} className="border rounded p-3">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className="w-full border rounded px-2 py-1 text-sm sm:text-base" />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-full sm:w-1/2 border rounded px-2 py-1 text-sm sm:text-base" />
                        <input placeholder="Dates (e.g. 2021 – Present)" value={exp.dates} onChange={(e) => updateExperience(exp.id, "dates", e.target.value)} className="w-full sm:w-1/2 border rounded px-2 py-1 text-sm sm:text-base" />
                      </div>
                    </div>

                    <button onClick={() => removeExperience(exp.id)} className="text-red-600 text-sm">Delete</button>
                  </div>

                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium">Bullets</h4>
                    {exp.bullets.map((b, i) => (
                      <div key={i} className="flex gap-2">
                        <input placeholder="Achievement or responsibility" value={b} onChange={(e) => updateExpBullet(exp.id, i, e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm sm:text-base" />
                        <button onClick={() => removeExpBullet(exp.id, i)} className="text-red-500">×</button>
                      </div>
                    ))}
                    <button onClick={() => addExpBullet(exp.id)} className="text-sm bg-gray-100 px-2 py-1 rounded">Add bullet</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Education</h3>
              <button onClick={addEducation} className="text-sm bg-green-600 text-white px-2 py-1 rounded">Add</button>
            </div>

            <div className="space-y-3 mt-3">
              {education.length === 0 && (
                <div className="text-sm text-gray-500">No education added yet. Click "Add" to create an entry.</div>
              )}

              {education.map((ed) => (
                <div key={ed.id} className="border rounded p-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input placeholder="School" value={ed.school} onChange={(e) => updateEducation(ed.id, "school", e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm sm:text-base" />
                    <input placeholder="Dates" value={ed.dates} onChange={(e) => updateEducation(ed.id, "dates", e.target.value)} className="w-full sm:w-36 border rounded px-2 py-1 text-sm sm:text-base" />
                  </div>

                  <input placeholder="Degree" value={ed.degree} onChange={(e) => updateEducation(ed.id, "degree", e.target.value)} className="w-full border rounded px-2 py-1 mt-2 text-sm sm:text-base" />

                  <button onClick={() => removeEducation(ed.id)} className="text-red-600 text-sm mt-2">Delete</button>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Skills</h3>
              <button onClick={addSkill} className="text-sm bg-green-600 text-white px-2 py-1 rounded">Add</button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {skills.length === 0 && <div className="text-sm text-gray-500 col-span-2">No skills yet. Click "Add" to add skills.</div>}

              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input placeholder="Skill (e.g. Figma)" value={s} onChange={(e) => updateSkill(i, e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm sm:text-base" />
                  <button onClick={() => removeSkill(i)} className="text-red-600">×</button>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <button onClick={resetAll} className="text-sm bg-red-600 text-white px-3 py-1 rounded">Reset</button>
            <button onClick={() => alert("Saved to localStorage")} className="text-sm bg-gray-200 px-3 py-1 rounded">Save</button>
          </div>

          <p className="text-xs text-gray-500">Tip: Use Export / Print and save as PDF. Data is auto-saved to localStorage.</p>
        </div>

        {/* Preview */}
        <div className="print:shadow-none bg-white p-3 sm:p-5 rounded shadow overflow-auto">

          {template === "simple" ? (
            <div className="max-w-3xl mx-auto">

              <header className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold">{name || "Your Name"}</h1>
                  <div className="text-sm text-gray-600">{title || "Job Title"}</div>
                </div>
                <div className="sm:ml-auto text-sm text-gray-600">{contact || "Email | Phone | LinkedIn"}</div>
              </header>

              <section className="mt-4">
                <p className="text-sm">{summary || "Short professional summary or objective goes here."}</p>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Experience</h3>
                <div className="space-y-3 mt-2">
                  {experience.length === 0 && <div className="text-sm text-gray-500">No experience to show.</div>}
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="font-medium">
                          {exp.role || "Role"} — <span className="text-sm text-gray-600">{exp.company || "Company"}</span>
                        </div>
                        <div className="text-sm text-gray-600">{exp.dates}</div>
                      </div>
                      <ul className="list-disc list-inside text-sm mt-1">{(exp.bullets || []).map((b, i) => (<li key={i}>{b || "Achievement..."}</li>))}</ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Education</h3>
                <div className="space-y-2 mt-2 text-sm">
                  {education.length === 0 && <div className="text-sm text-gray-500">No education to show.</div>}
                  {education.map((ed) => (
                    <div key={ed.id} className="flex flex-col sm:flex-row sm:justify-between">
                      <div>{ed.school || "School"} — <span className="text-gray-600">{ed.degree || "Degree"}</span></div>
                      <div className="text-gray-600">{ed.dates}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.length === 0 && <div className="text-sm text-gray-500">No skills listed.</div>}
                  {skills.map((s, i) => (<span key={i} className="text-xs px-2 py-1 border rounded">{s || "Skill"}</span>))}
                </div>
              </section>
            </div>

          ) : (
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">

              <aside className="col-span-1 bg-gray-50 p-4 rounded">
                <div className="flex flex-col items-center">
                  <h2 className="font-semibold">{name || "Your Name"}</h2>
                  <div className="text-sm text-gray-600">{title || "Job Title"}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Contact</h4>
                  <div className="text-xs mt-1">{contact || "Email | Phone | LinkedIn"}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Skills</h4>
                  <div className="mt-2 flex flex-col gap-2">{skills.map((s, i) => (<div key={i} className="text-xs">• {s || "Skill"}</div>))}</div>
                </div>
              </aside>

              <main className="col-span-2">
                <section>
                  <h3 className="font-semibold">Summary</h3>
                  <p className="text-sm text-gray-700 mt-1">{summary || "Short professional summary or objective goes here."}</p>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Experience</h3>
                  <div className="space-y-3 mt-2">
                    {experience.length === 0 && <div className="text-sm text-gray-500">No experience to show.</div>}
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <div className="font-medium">{exp.role || "Role"}</div>
                            <div className="text-sm text-gray-500">{exp.company || "Company"}</div>
                          </div>
                          <div className="text-sm text-gray-500">{exp.dates}</div>
                        </div>
                        <ul className="list-disc list-inside text-sm mt-1 text-gray-700">{(exp.bullets || []).map((b, i) => (<li key={i}>{b || "Achievement..."}</li>))}</ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Education</h3>
                  <div className="space-y-2 mt-2 text-sm text-gray-700">
                    {education.length === 0 && <div className="text-sm text-gray-500">No education to show.</div>}
                    {education.map((ed) => (
                      <div key={ed.id}>
                        <div className="font-medium">{ed.school || "School"}</div>
                        <div className="text-sm text-gray-500">
                          {ed.degree || "Degree"} — {ed.dates}
                        </div>
                      </div>
                    ))}
                  </div>
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
