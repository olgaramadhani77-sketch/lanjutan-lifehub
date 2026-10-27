import React, { useState, useEffect } from "react";
import { usePageStyles } from "../utils/hooks.js";
import { Nav, StatCard } from "../components/index.js";
import {
  fetchHabits,
  createHabit,
  updateHabitApi,
  deleteHabitApi,
  toggleHabitApi,
} from "../utils/habitApi.js";

const blankForm = {
  title: "",
  description: "",
  category: "Wellness",
  target: "Daily",
};

export default function Habit() {
  usePageStyles(["/css/pages.css", "/css/eco.css", "/css/gamification.css"]);

  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);   // sekarang simpan objek habit, bukan index
  const [visibleCount, setVisibleCount] = useState(2);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const completed = habits.filter((h) => h.completed).length;
  const progress = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;

  // ============ LOAD DATA ============
  async function loadHabits() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchHabits();
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHabits();
  }, []);

  // ============ SUBMIT (CREATE / UPDATE) ============
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || saving) return;

    setSaving(true);
    setError("");

    try {
      if (edit === null) {
        await createHabit(form);
        await loadHabits();
      } else {
        await updateHabitApi(edit.id, form);
        await loadHabits();
      }
      setForm(blankForm);
      setEdit(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ============ EDIT ============
  const startEdit = (habit) => {
    setEdit(habit);
    setForm({
      title: habit.title || "",
      description: habit.description || "",
      category: habit.category || "Wellness",
      target: habit.target || "Daily",
    });
  };

  const cancelEdit = () => {
    setEdit(null);
    setForm(blankForm);
  };

  // ============ TOGGLE ============
  const handleToggle = async (habit) => {
    setError("");
    try {
      await toggleHabitApi(habit.id, habit.completed);
      await loadHabits();
    } catch (err) {
      setError(err.message);
    }
  };

  // ============ DELETE ============
  const handleDelete = async (habit) => {
    if (!window.confirm(`Hapus habit "${habit.title}"?`)) return;

    setError("");
    try {
      await deleteHabitApi(habit.id);
      await loadHabits();
      if (edit?.id === habit.id) cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  // ============ LOAD MORE ============
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
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

            <button className="primary-btn full-btn" disabled={saving}>
              {saving
                ? "Saving..."
                : edit === null
                ? "Add Habit"
                : "Save Changes"}
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

            {error && (
              <div role="alert" className="empty-feature">
                <p>{error}</p>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={loadHabits}
                >
                  Try Again
                </button>
              </div>
            )}

            <div className="feature-list">
              {loading ? (
                <p>Loading habits...</p>
              ) : habits.length ? (
                <>
                  {habits.slice(0, visibleCount).map((h) => (
                    <div
                      key={h.id}
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
                          onClick={() => startEdit(h)}
                        >
                          Edit
                        </button>

                        <button
                          className="primary-btn"
                          onClick={() => handleToggle(h)}
                        >
                          {h.completed ? "Undone" : "Done"}
                        </button>

                        <button
                          className="danger-btn"
                          onClick={() => handleDelete(h)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {visibleCount < habits.length && (
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={handleLoadMore}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
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