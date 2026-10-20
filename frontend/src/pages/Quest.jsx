// import React, { useState } from "react";
// import { useLifeHub, usePageStyles } from "../utils/hooks.js";
// import { Nav, Icon, Link } from "../components/index.js";
// import { addTask, updateTask, deleteTask, toggleTask } from "../utils/core.js";

// function dueStatus(d) {
//   if (!d) return "No due date";

//   const today = new Date();
//   const due = new Date(d);
//   today.setHours(0, 0, 0, 0);
//   due.setHours(0, 0, 0, 0);

//   if (+due === +today) return "Today";
//   return due < today ? "Overdue" : "Upcoming";
// }

// const blankForm = {
//   title: "",
//   description: "",
//   category: "Study",
//   priority: "Medium",
//   dueDate: "",
// };

// export default function Quest() {
//   usePageStyles(["/css/pages.css", "/css/eco.css", "/css/gamification.css"]);

//   const { tasks } = useLifeHub();
//   const [form, setForm] = useState(blankForm);
//   const [edit, setEdit] = useState(null);

//   {/* --- FITUR LOAD MORE: State untuk batas tampilan item (awal 2) --- */}
//   const [visibleCount, setVisibleCount] = useState(2);

//   const progressPct = tasks.length
//     ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
//     : 0;

//   const submit = (e) => {
//     e.preventDefault();
//     if (!form.title.trim()) return;

//     if (edit === null) {
//       addTask(form);
//     } else {
//       updateTask(edit, form);
//     }

//     setForm(blankForm);
//     setEdit(null);
//   };

//   const startEdit = (index, task) => {
//     setEdit(index);
//     setForm(task);
//   };

//   const cancelEdit = () => {
//     setEdit(null);
//     setForm(blankForm);
//   };

//   {/* --- FITUR LOAD MORE: Handler penambahan jumlah item (+2) --- */}
//   const handleLoadMore = () => {
//     setVisibleCount((prevCount) => prevCount + 2);
//   };

//   return (
//     <>
//       <Nav active="quest" />
//       <main className="page-shell">
//         <section className="feature-hero">
//           <div>
//             <p className="eyebrow">Quest Manager</p>
//             <h1>Organize your day like a mission.</h1>
//             <p>
//               Create daily quests, set priorities, choose deadlines, and track
//               your progress through a clean and focused productivity system.
//             </p>
//             <div className="hero-actions">
//               <a href="#workspace" className="primary-btn">
//                 Create Quest
//               </a>
//               <Link to="/achievement" className="secondary-btn">
//                 View Progress
//               </Link>
//             </div>
//           </div>

//           {/* <div className="visual-stage">
//             <div className="visual-orb"></div>

//             <FloatCard variant="one">
//               <h4>High Priority</h4>
//               <p>Finish frontend layout before midnight.</p>
//             </FloatCard>

//             <FloatCard variant="two">
//               <div className="progress-ring">
//                 <span>{progressPct}%</span>
//               </div>
//               <h4>Daily Progress</h4>
//               <p>Your quest rhythm is improving.</p>
//             </FloatCard>

//             <FloatCard variant="three">
//               <h4>Upcoming</h4>
//               <p>Design Web • Deadline tomorrow</p>
//             </FloatCard>
//           </div> */}
//         </section>

//         <section className="feature-workspace" id="workspace">
//           <form className="feature-panel feature-form sticky" onSubmit={submit}>
//             <p className="panel-label">{edit === null ? "Create" : "Edit"}</p>
//             <h2>{edit === null ? "New Quest" : "Edit Quest"}</h2>

//             <input
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="Quest title"
//             />

//             <textarea
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               placeholder="Description"
//             ></textarea>

//             {/* <select
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             >
//               {[
//                 "Personal",
//                 "Study",
//                 "Frontend Development",
//                 "Documentation",
//                 "Design Research",
//                 "Version Control",
//                 "Eco Quest",
//               ].map((x) => (
//                 <option key={x}>{x}</option>
//               ))}
//             </select> */}

//             <select
//               value={form.priority}
//               onChange={(e) => setForm({ ...form, priority: e.target.value })}
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>

//             <input
//               type="date"
//               value={form.dueDate}
//               onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
//             />

//             <button className="primary-btn full-btn" type="submit">
//               {edit === null ? "Add Quest" : "Save Changes"}
//             </button>

//             {edit !== null && (
//               <button
//                 className="secondary-btn full-btn"
//                 type="button"
//                 onClick={cancelEdit}
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </form>

//           <section className="feature-panel">
//             <p className="panel-label">List</p>
//             <h2>Your Quests</h2>

//             <div className="feature-list">
//               {tasks.length ? (
//                 <>
//                   {/* --- FITUR LOAD MORE: Pemotongan array menggunakan .slice(0, visibleCount) --- */}
//                   {tasks.slice(0, visibleCount).map((t, i) => (
//                     <div
//                       key={i}
//                       className={`eco-card ${t.completed ? "claimed" : ""}`}
//                     >
//                       <div className="eco-card-content">
//                         <div>
//                           <h3>{t.title}</h3>

//                           <p>{t.description || "No description added."}</p>

//                           <div className="meta-row">
//                             <span className="tag light">{t.priority}</span>

//                             <span
//                               className={`tag ${
//                                 dueStatus(t.dueDate) === "Overdue"
//                                   ? "danger"
//                                   : "success"
//                               }`}
//                             >
//                               {dueStatus(t.dueDate)}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="eco-status">
//                           {t.completed ? "Completed" : "Active"}
//                         </div>
//                       </div>

//                       <div className="eco-actions">
//                         <button
//                           className="secondary-btn"
//                           onClick={() => startEdit(i, t)}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="primary-btn"
//                           onClick={() => toggleTask(i)}
//                         >
//                           {t.completed ? "Undone" : "Done"}
//                         </button>

//                         <button
//                           className="danger-btn"
//                           onClick={() => deleteTask(i)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                   {/* --- FITUR LOAD MORE: Tombol Load More muncul jika sisa data masih ada --- */}
//                   {visibleCount < tasks.length && (
//                     <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                       <button
//                         type="button"
//                         className="secondary-btn"
//                         onClick={handleLoadMore}
//                       >
//                         Load More
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="empty-feature">
//                   <h3>No quests yet</h3>
//                   <p>Create your first quest and start building progress.</p>
//                 </div>
//               )}
//             </div>
//           </section>
//         </section>
//       </main>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { usePageStyles } from "../utils/hooks.js";
import { Nav, Link } from "../components/index.js";

const API_URL = "http://127.0.0.1:8000/api/quests";

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

function normalizeQuest(quest) {
  return {
    ...quest,
    dueDate: quest.due_date ?? quest.dueDate ?? "",
    completed: Boolean(quest.completed),
  };
}

function toApiPayload(form, completed = false) {
  return {
    title: form.title.trim(),
    description: form.description,
    category: form.category,
    priority: form.priority,
    due_date: form.dueDate || null,
    completed,
  };
}

export default function Quest() {
  usePageStyles([
    "/css/pages.css",
    "/css/eco.css",
    "/css/gamification.css",
  ]);

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const progressPct = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.completed).length / tasks.length) * 100
      )
    : 0;

  async function request(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message =
        body.message ||
        Object.values(body.errors || {}).flat().join(" ") ||
        `Request gagal (${response.status})`;

      throw new Error(message);
    }

    if (response.status === 204) return null;

    return response.json();
  }

  async function loadFirstPage() {
    setLoading(true);
    setError("");

    try {
      const result = await request(`${API_URL}?per_page=10`);

      setTasks((result.data || []).map(normalizeQuest));
      setNextPageUrl(result.next_page_url || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFirstPage();
  }, []);

  async function handleLoadMore() {
    if (!nextPageUrl || loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await request(nextPageUrl);

      setTasks((previous) => [
        ...previous,
        ...(result.data || []).map(normalizeQuest),
      ]);

      setNextPageUrl(result.next_page_url || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.title.trim() || saving) return;

    setSaving(true);
    setError("");

    try {
      if (edit === null) {
        const created = await request(API_URL, {
          method: "POST",
          body: JSON.stringify(toApiPayload(form)),
        });

        // Muat ulang agar urutan dan pagination tetap konsisten.
        await loadFirstPage();

        // Jika Quest baru tidak muncul di halaman pertama,
        // server tetap berhasil menyimpannya.
        console.log("Quest berhasil dibuat:", created);
      } else {
        const updated = await request(`${API_URL}/${edit.id}`, {
          method: "PUT",
          body: JSON.stringify(
            toApiPayload(form, edit.completed)
          ),
        });

        setTasks((previous) =>
          previous.map((task) =>
            task.id === edit.id
              ? normalizeQuest(updated)
              : task
          )
        );
      }

      setForm(blankForm);
      setEdit(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(task) {
    setEdit(task);

    setForm({
      title: task.title || "",
      description: task.description || "",
      category: task.category || "Study",
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
    });
  }

  function cancelEdit() {
    setEdit(null);
    setForm(blankForm);
  }

  async function toggleQuest(task) {
    setError("");

    try {
      const updated = await request(`${API_URL}/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          category: task.category,
          priority: task.priority,
          due_date: task.dueDate || null,
          completed: !task.completed,
        }),
      });

      setTasks((previous) =>
        previous.map((item) =>
          item.id === task.id
            ? normalizeQuest(updated)
            : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeQuest(task) {
    if (!window.confirm(`Hapus quest "${task.title}"?`)) return;

    setError("");

    try {
      await request(`${API_URL}/${task.id}`, {
        method: "DELETE",
      });

      setTasks((previous) =>
        previous.filter((item) => item.id !== task.id)
      );

      if (edit?.id === task.id) cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Nav active="quest" />

      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Quest Manager</p>
            <h1>Organize your day like a mission.</h1>
            <p>
              Create daily quests, set priorities, choose deadlines,
              and track your progress through a clean and focused
              productivity system.
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
        </section>

        <section className="feature-workspace" id="workspace">
          <form
            className="feature-panel feature-form sticky"
            onSubmit={submit}
          >
            <p className="panel-label">
              {edit === null ? "Create" : "Edit"}
            </p>

            <h2>{edit === null ? "New Quest" : "Edit Quest"}</h2>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Quest title"
              required
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <button
              className="primary-btn full-btn"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : edit === null
                  ? "Add Quest"
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

          <section className="feature-panel">
            <p className="panel-label">List</p>
            <h2>Your Quests</h2>

            {error && (
              <div role="alert" className="empty-feature">
                <p>{error}</p>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={loadFirstPage}
                >
                  Try Again
                </button>
              </div>
            )}

            <div className="feature-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`eco-card ${
                    task.completed ? "claimed" : ""
                  }`}
                >
                  <div className="eco-card-content">
                    <div>
                      <h3>{task.title}</h3>

                      <p>
                        {task.description || "No description added."}
                      </p>

                      <div className="meta-row">
                        <span className="tag light">
                          {task.priority}
                        </span>

                        <span
                          className={`tag ${
                            dueStatus(task.dueDate) === "Overdue"
                              ? "danger"
                              : "success"
                          }`}
                        >
                          {dueStatus(task.dueDate)}
                        </span>
                      </div>
                    </div>

                    <div className="eco-status">
                      {task.completed ? "Completed" : "Active"}
                    </div>
                  </div>

                  <div className="eco-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => toggleQuest(task)}
                    >
                      {task.completed ? "Undone" : "Done"}
                    </button>

                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => removeQuest(task)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {loading && <p>Loading quests...</p>}

              {!loading && tasks.length === 0 && !error && (
                <div className="empty-feature">
                  <h3>No quests yet</h3>
                  <p>
                    Create your first quest and start building progress.
                  </p>
                </div>
              )}

              {nextPageUrl && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
