import React, { useState, useEffect } from "react";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  SparklesIcon,
  UserCircleIcon,
  PrinterIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function ResumeBuilderForm() {
  const [template, setTemplate] = useState("simple");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [summary, setSummary] = useState("");

  const [experience, setExperience] = useState([
    // {
    //   id: 1,
    //   role: "",
    //   company: "",
    //   dates: "",
    //   bullets: ["", "", ""],
    // },
  ]);

  const [education, setEducation] = useState([
    // { id: 1, school: "", degree: "", dates: "" },
  ]);

  const [skills, setSkills] = useState([
    // "",
    // "",
  ]);

  // NEW: Local skill input for quick add
  const [newSkill, setNewSkill] = useState("");

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
    const payload = {
      name,
      title,
      contact,
      summary,
      template,
      experience,
      education,
      skills,
    };
    localStorage.setItem("resume_builder_data", JSON.stringify(payload));
  }, [name, title, contact, summary, template, experience, education, skills]);

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "New Role",
        company: "Company",
        dates: "YYYY – YYYY",
        bullets: ["Achievement..."],
      },
    ]);
  }

  function removeExperience(id) {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  }

  function updateExperience(id, field, value) {
    setExperience((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  }

  function addExpBullet(id) {
    setExperience((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, "New bullet..."] } : e
      )
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
        e.id === id
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) }
          : e
      )
    );
  }

  function addEducation() {
    setEducation((prev) => [
      ...prev,
      {
        id: Date.now(),
        school: "New School",
        degree: "Degree",
        dates: "YYYY – YYYY",
      },
    ]);
  }

  function removeEducation(id) {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  }

  function updateEducation(id, field, value) {
    setEducation((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
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

  function quickAddSkill() {
    if (!newSkill.trim()) return;
    setSkills((prev) => [...prev, newSkill.trim()]);
    setNewSkill("");
  }

  function exportPDF() {
    window.print();
  }

  function resetAll() {
    if (!confirm("Reset all resume data? This will clear local storage."))
      return;
    localStorage.removeItem("resume_builder_data");
    window.location.reload();
  }

  const SectionHeader = ({ icon: Icon, title, action }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {action}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold">Resume Builder</h2>
            <span className="hidden sm:inline text-xs text-gray-500">
              Auto-saves to your browser
            </span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="simple">Simple</option>
              <option value="modern">Modern</option>
            </select>

            <button
              onClick={exportPDF}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition"
              title="Export or print your resume"
            >
              <PrinterIcon className="h-4 w-4" />
              Export / Print
            </button>

            <button
              onClick={() => alert("Saved to localStorage")}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-gray-900 px-3 py-1.5 rounded text-sm transition"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Save
            </button>

            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition"
            >
              <TrashIcon className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Editor */}
        <div className="space-y-4">
          {/* Profile */}
          <section className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
            <SectionHeader icon={UserCircleIcon} title="Profile" />
            <p className="text-xs text-gray-600 mt-1">
              Start with the essentials. Keep it concise and clear.
            </p>
            <div className="space-y-3 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Rohit "
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Web Developer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Contact
                </label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email | Phone | LinkedIn"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief overview of your experience, strengths, and impact."
                />
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
            <SectionHeader
              icon={BriefcaseIcon}
              title="Experience"
              action={
                <button
                  onClick={addExperience}
                  className="inline-flex items-center gap-1 text-sm bg-green-600 text-white px-2.5 py-1.5 rounded-md hover:bg-green-700 transition"
                >
                  <PlusIcon className="h-4 w-4" /> Add
                </button>
              }
            />
            <div className="space-y-4 mt-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border rounded-lg p-3 sm:p-4 hover:shadow-sm transition"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <input
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(exp.id, "role", e.target.value)
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Role (e.g., Senior Product Designer)"
                        />
                        <input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Company"
                        />
                      </div>
                      <input
                        value={exp.dates}
                        onChange={(e) =>
                          updateExperience(exp.id, "dates", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dates (e.g., 2021 – Present)"
                      />
                    </div>

                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-600 text-sm inline-flex items-center gap-1 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" /> Delete
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium">Key achievements</h4>
                    {exp.bullets.map((b, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={b}
                          onChange={(e) =>
                            updateExpBullet(exp.id, i, e.target.value)
                          }
                          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Quantified impact (e.g., Increased conversion by 12%)"
                        />
                        <button
                          onClick={() => removeExpBullet(exp.id, i)}
                          className="text-red-500 px-2 rounded hover:bg-red-50"
                          title="Remove bullet"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addExpBullet(exp.id)}
                      className="text-sm bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded transition"
                    >
                      Add bullet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
            <SectionHeader
              icon={AcademicCapIcon}
              title="Education"
              action={
                <button
                  onClick={addEducation}
                  className="inline-flex items-center gap-1 text-sm bg-green-600 text-white px-2.5 py-1.5 rounded-md hover:bg-green-700 transition"
                >
                  <PlusIcon className="h-4 w-4" /> Add
                </button>
              }
            />
            <div className="space-y-4 mt-3">
              {education.map((ed) => (
                <div
                  key={ed.id}
                  className="border rounded-lg p-3 sm:p-4 hover:shadow-sm transition"
                >
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      value={ed.school}
                      onChange={(e) =>
                        updateEducation(ed.id, "school", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="School / University"
                    />
                    <input
                      value={ed.dates}
                      onChange={(e) =>
                        updateEducation(ed.id, "dates", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dates (e.g., 2014 – 2018)"
                    />
                  </div>

                  <input
                    value={ed.degree}
                    onChange={(e) =>
                      updateEducation(ed.id, "degree", e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Degree (e.g., B.A., Graphic & Interaction Design)"
                  />

                  <button
                    onClick={() => removeEducation(ed.id)}
                    className="text-red-600 text-sm mt-2 inline-flex items-center gap-1 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
            <SectionHeader
              icon={SparklesIcon}
              title="Skills"
              action={
                <button
                  onClick={addSkill}
                  className="inline-flex items-center gap-1 text-sm bg-green-600 text-white px-2.5 py-1.5 rounded-md hover:bg-green-700 transition"
                >
                  <PlusIcon className="h-4 w-4" />  Add
                </button>
              }
            />

            <div className="mt-3">
              {/* <div className="flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      quickAddSkill();
                    }
                  }}
                  placeholder="Type a skill and press Ent er"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={quickAddSkill}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
                > 
                  Add
                </button>
              </div> */}

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <input
                      value={s}
                      onChange={(e) => updateSkill(i, e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeSkill(i)}
                      className="text-red-600 px-2 py-1 rounded hover:bg-red-50 opacity-80 group-hover:opacity-100"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <p className="text-xs text-gray-500">
            Tip: Use Export / Print and save as PDF. Data is auto-saved to
            localStorage.
          </p>
        </div>

        {/* Preview */}
        <div className="print:shadow-none bg-white p-3 sm:p-5 rounded-xl border shadow overflow-auto">
          {template === "simple" ? (
            <div className="max-w-3xl mx-auto">
              <header className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b pb-3">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
                    {name || "Your Name"}
                  </h1>
                  <div className="text-sm text-gray-600">{title || "Job Title"}</div>
                </div>
                <div className="sm:ml-auto text-sm text-gray-600">
                  {contact || "Email | Phone | LinkedIn"}
                </div>
              </header>

              <section className="mt-4">
                <p className="text-sm leading-6">{summary || "Short professional summary or objective goes here."}</p>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Experience</h3>
                <div className="space-y-3 mt-2">
                  {experience.length === 0 && <div className="text-sm text-gray-500">No experience to show.</div>}
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="font-medium">
                          {exp.role} —{" "}
                          <span className="text-sm text-gray-600">
                            {exp.company}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{exp.dates}</div>
                      </div>
                      <ul className="list-disc list-inside text-sm mt-1 leading-6">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Education</h3>
                <div className="space-y-2 mt-2 text-sm">
                  {education.length === 0 && <div className="text-sm text-gray-500">No education to show.</div>}
                  {education.map((ed) => (
                    <div
                      key={ed.id}
                      className="flex flex-col sm:flex-row sm:justify-between"
                    >
                      <div>
                        {ed.school} —{" "}
                        <span className="text-gray-600">{ed.degree}</span>
                      </div>
                      <div className="text-gray-600">{ed.dates}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-semibold">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.length === 0 && <div className="text-sm text-gray-500">No skills listed.</div>}
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 border rounded bg-slate-50"
                    >
                      {s }
                    </span>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <aside className="col-span-1 bg-slate-50 p-4 rounded-lg border">
                <div className="flex flex-col items-center text-center">
                  <h2 className="font-semibold text-lg">{name}</h2>
                  <div className="text-sm text-gray-600">{title}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Contact</h4>
                  <div className="text-xs mt-1">{contact}</div>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-medium">Skills</h4>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {skills.map((s, i) => (
                      <div key={i} className="text-xs">
                        • {s}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <main className="col-span-2">
                <section>
                  <h3 className="font-semibold">Summary</h3>
                  <p className="text-sm text-gray-700 mt-1 leading-6">
                    {summary}
                  </p>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Experience</h3>
                  <div className="space-y-3 mt-2">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <div className="font-medium">{exp.role}</div>
                            <div className="text-sm text-gray-500">
                              {exp.company}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {exp.dates}
                          </div>
                        </div>
                        <ul className="list-disc list-inside text-sm mt-1 text-gray-700 leading-6">
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-4">
                  <h3 className="font-semibold">Education</h3>
                  <div className="space-y-2 mt-2 text-sm text-gray-700">
                    {education.map((ed) => (
                      <div key={ed.id}>
                        <div className="font-medium">{ed.school}</div>
                        <div className="text-sm text-gray-500">
                          {ed.degree} — {ed.dates}
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

      <style>{`@media print {
        body * { visibility: hidden; }
        .print\\:shadow-none, .print\\:shadow-none * { visibility: visible; }
        .print\\:shadow-none { position: absolute; left: 0; top: 0; width: 100%; }
        button, input, textarea, select { display: none !important; }
      }`}</style>
    </div>
  );
}
