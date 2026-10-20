import React, { useState } from "react";
import { useLifeHub, usePageStyles } from "../utils/hooks.js";
import { Nav, StatCard, FloatCard } from "../components/index.js";
import {
  addHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
} from "../utils/core.js";

const blankForm = {
  title: "",
  description: "",
  category: "Wellness",
  target: "Daily",
};

export default function Habit() {
  usePageStyles(["/css/pages.css", "/css/eco.css", "/css/gamification.css"]);

  const { habits } = useLifeHub();
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);

  const completed = habits.filter((h) => h.completed).length;
  const progress = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (edit === null) {
      addHabit(form);
    } else {
      updateHabit(edit, form);
    }

    setForm(blankForm);
    setEdit(null);
  };

  const startEdit = (index, habit) => {
    setEdit(index);
    setForm(habit);
  };

  const cancelEdit = () => {
    setEdit(null);
    setForm(blankForm);
  };

  return (
    <>
      <Nav active="habit" />
      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Habit Tracker</p>
            <h1>Build routines that actually stay.</h1>
            <p>
              Create habits, repeat small wins, and make consistency feel
              visible through a calm daily tracker.
            </p>
            <div className="hero-actions">
              <a href="#workspace" className="primary-btn">
                Create Habit
              </a>
              <a href="#habitList" className="secondary-btn">
                View Habits
              </a>
            </div>
          </div>

          {/* <div className="visual-stage">
            <div className="visual-orb"></div>

            <FloatCard variant="one">
              <h4>Daily Routine</h4>
              <p>Drink water • Read • Stretch</p>
            </FloatCard>

            <FloatCard variant="two">
              <div className="progress-ring">
                <span>{progress}%</span>
              </div>
              <h4>Completion</h4>
              <p>
                {completed}/{habits.length} habits completed.
              </p>
            </FloatCard>

            <FloatCard variant="three">
              <h4>Streak Energy</h4>
              <p>Small habits, stronger rhythm.</p>
            </FloatCard>
          </div> */}
        </section>

        <section className="stats-grid">
          <StatCard label="Total Habits" value={habits.length} />
          <StatCard label="Completed" value={completed} />
          <StatCard label="Active" value={habits.length - completed} />
          <StatCard label="Progress" value={`${progress}%`} />
        </section>

        <section className="feature-workspace" id="workspace">
          <form className="feature-panel feature-form sticky" onSubmit={submit}>
            <p className="panel-label">{edit === null ? "Create" : "Edit"}</p>
            <h2>{edit === null ? "New Habit" : "Edit Habit"}</h2>

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Habit title"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {[
                "Wellness",
                "Learning",
                "Health",
                "Productivity",
                "Eco",
                "Lifestyle",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>

            <select
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
            >
              {["Daily", "Weekly", "Morning", "Evening"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>

            <button className="primary-btn full-btn">
              {edit === null ? "Add Habit" : "Save Changes"}
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

          <section className="feature-panel" id="habitList">
            <p className="panel-label">List</p>
            <h2>Your Habits</h2>

            <div className="feature-list">
              {habits.length ? (
                habits.map((h, i) => (
                  <div
                    key={i}
                    className={`eco-card ${h.completed ? "claimed" : ""}`}
                  >
                    <div className="eco-card-content">
                      <div>
                        <h3>{h.title}</h3>

                        <p>{h.description || "No description added."}</p>

                        <div className="meta-row">
                          <span className="tag dark">{h.category}</span>

                          <span className="tag light">{h.target}</span>
                        </div>
                      </div>

                      <div className="eco-status">
                        {h.completed ? "Completed" : "Active"}
                      </div>
                    </div>

                    <div className="eco-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => startEdit(i, h)}
                      >
                        Edit
                      </button>

                      <button
                        className="primary-btn"
                        onClick={() => toggleHabit(i)}
                      >
                        {h.completed ? "Undone" : "Done"}
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() => deleteHabit(i)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-feature">
                  <h3>No habits yet</h3>
                  <p>Create your first habit and start building consistency.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
