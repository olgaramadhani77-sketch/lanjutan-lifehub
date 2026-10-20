import React, { useState } from "react";
import { useLifeHub, usePageStyles } from "../utils/hooks.js";
import { Nav, Icon, Link } from "../components/index.js";
import { addTask, updateTask, deleteTask, toggleTask } from "../utils/core.js";

function dueStatus(d) {
  if (!d) return "No due date";

  const today = new Date();
  const due = new Date(d);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  if (+due === +today) return "Today";
  return due < today ? "Overdue" : "Upcoming";
}

const blankForm = {
  title: "",
  description: "",
  category: "Study",
  priority: "Medium",
  dueDate: "",
};

export default function Quest() {
  usePageStyles(["/css/pages.css", "/css/eco.css", "/css/gamification.css"]);

  const { tasks } = useLifeHub();
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);

  const progressPct = tasks.length
    ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
    : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (edit === null) {
      addTask(form);
    } else {
      updateTask(edit, form);
    }

    setForm(blankForm);
    setEdit(null);
  };

  const startEdit = (index, task) => {
    setEdit(index);
    setForm(task);
  };

  const cancelEdit = () => {
    setEdit(null);
    setForm(blankForm);
  };

  return (
    <>
      <Nav active="quest" />
      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Quest Manager</p>
            <h1>Organize your day like a mission.</h1>
            <p>
              Create daily quests, set priorities, choose deadlines, and track
              your progress through a clean and focused productivity system.
            </p>
            <div className="hero-actions">
              <a href="#workspace" className="primary-btn">
                Create Quest
              </a>
              <Link to="/achievement" className="secondary-btn">
                View Progress
              </Link>
            </div>
          </div>

          {/* <div className="visual-stage">
            <div className="visual-orb"></div>

            <FloatCard variant="one">
              <h4>High Priority</h4>
              <p>Finish frontend layout before midnight.</p>
            </FloatCard>

            <FloatCard variant="two">
              <div className="progress-ring">
                <span>{progressPct}%</span>
              </div>
              <h4>Daily Progress</h4>
              <p>Your quest rhythm is improving.</p>
            </FloatCard>

            <FloatCard variant="three">
              <h4>Upcoming</h4>
              <p>Design Web • Deadline tomorrow</p>
            </FloatCard>
          </div> */}
        </section>

        <section className="feature-workspace" id="workspace">
          <form className="feature-panel feature-form sticky" onSubmit={submit}>
            <p className="panel-label">{edit === null ? "Create" : "Edit"}</p>
            <h2>{edit === null ? "New Quest" : "Edit Quest"}</h2>

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Quest title"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>

            {/* <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {[
                "Personal",
                "Study",
                "Frontend Development",
                "Documentation",
                "Design Research",
                "Version Control",
                "Eco Quest",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select> */}

            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />

            <button className="primary-btn full-btn" type="submit">
              {edit === null ? "Add Quest" : "Save Changes"}
            </button>

            {edit !== null && (
              <button
                className="secondary-btn full-btn"
                type="button"
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>

          <section className="feature-panel">
            <p className="panel-label">List</p>
            <h2>Your Quests</h2>

            <div className="feature-list">
              {tasks.length ? (
                tasks.map((t, i) => (
                  <div
                    key={i}
                    className={`eco-card ${t.completed ? "claimed" : ""}`}
                  >
                    <div className="eco-card-content">
                      <div>
                        <h3>{t.title}</h3>

                        <p>{t.description || "No description added."}</p>

                        <div className="meta-row">
                          

                          <span className="tag light">{t.priority}</span>

                          <span
                            className={`tag ${
                              dueStatus(t.dueDate) === "Overdue"
                                ? "danger"
                                : "success"
                            }`}
                          >
                            {dueStatus(t.dueDate)}
                          </span>
                        </div>
                      </div>

                      <div className="eco-status">
                        {t.completed ? "Completed" : "Active"}
                      </div>
                    </div>

                    <div className="eco-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => startEdit(i, t)}
                      >
                        Edit
                      </button>

                      <button
                        className="primary-btn"
                        onClick={() => toggleTask(i)}
                      >
                        {t.completed ? "Undone" : "Done"}
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() => deleteTask(i)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-feature">
                  <h3>No quests yet</h3>
                  <p>Create your first quest and start building progress.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
