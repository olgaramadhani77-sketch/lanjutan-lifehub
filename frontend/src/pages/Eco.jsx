import React, { useState } from 'react';
import { useLifeHub, usePageStyles } from '../utils/hooks.js';
import { Nav, StatCard, FloatCard } from '../components/index.js';
import { addEcoQuest, updateEcoQuest, deleteEcoQuest, claimEcoQuest } from '../utils/core.js';

/* --- MENGHAPUS POINTS DARI INITIAL STATE FORM --- */
const blankForm = { title: '', description: '' };

export default function Eco() {
  usePageStyles(['/css/pages.css', '/css/eco.css', '/css/gamification.css']);

  const { ecoQuests, gamification } = useLifeHub();
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);

  {/* --- FITUR LOAD MORE: State untuk batas tampilan item (awal 2) --- */}
  const [visibleCount, setVisibleCount] = useState(2);

  const completed = ecoQuests.filter((e) => e.completed).length;
  const available = ecoQuests.length - completed;
  const progress = ecoQuests.length ? Math.round((completed / ecoQuests.length) * 100) : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (edit === null) {
      addEcoQuest(form);
    } else {
      updateEcoQuest(edit, form);
    }

    setForm(blankForm);
    setEdit(null);
  };

  const startEdit = (index, quest) => {
    setEdit(index);
    setForm(quest);
  };

  const cancelEdit = () => {
    setEdit(null);
    setForm(blankForm);
  };

  {/* --- FITUR LOAD MORE: Handler penambahan jumlah item (+2) --- */}
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <>
      <Nav active="eco" />
      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Eco Side Quest</p>
            <h1>Complete green missions that actually matter.</h1>
            <p>Add small sustainable actions into your daily routine, claim eco points, and turn better lifestyle choices into visible progress.</p>
            <div className="hero-actions">
              <a href="#ecoWorkspace" className="primary-btn">
                Create Eco Quest
              </a>
              <a href="#ecoListSection" className="secondary-btn">
                View Eco List
              </a>
            </div>
          </div>

           {/* <div className="visual-stage">
            <div className="visual-orb"></div>

            <FloatCard variant="one">
              <h4>Green Mission</h4>
              <p>Bring tumbler • Save electricity • Reduce waste</p>
            </FloatCard>

            <FloatCard variant="two">
              <h4>{gamification.ecoPoints}</h4>
              <p>Eco Points</p>
            </FloatCard>

            <FloatCard variant="three">
              <h4>{claimed}</h4>
              <p>Claimed Quests</p>
            </FloatCard>

            <div className="progress-ring">
              <span>{progress}%</span>
            </div>
          </div>  */}
        </section>

        <section className="stats-grid">
          <StatCard label="Total Eco Quest" value={ecoQuests.length} />
          <StatCard label="Completed" value={completed} />
          <StatCard label="Available" value={available} />
          {/* --- FITUR TAMBAHAN: Card Progress disisipkan di sini --- */}
          <StatCard label="Progress" value={`${progress}%`} />
          {/* <StatCard label="Eco Points" value={gamification.ecoPoints} /> */}
        </section>

        <section className="feature-workspace" id="ecoWorkspace">
          <form className="feature-panel feature-form sticky" onSubmit={submit}>
            <p className="panel-label">{edit === null ? 'Create' : 'Edit'}</p>
            <h2>{edit === null ? 'New Eco Quest' : 'Edit Eco Quest'}</h2>

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Example: Bring a tumbler"
            />

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write a short description"
            ></textarea>

            {/* --- MENGHAPUS INPUT ANGKA POINTS --- */}

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                {edit === null ? 'Add Eco Quest' : 'Save Changes'}
              </button>

              {edit !== null && (
                <button className="secondary-btn" type="button" onClick={cancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <section className="feature-panel" id="ecoListSection">
            <div className="panel-header">
              <div>
                <p className="panel-label">Today</p>
                <h2>Eco Side Quests</h2>
              </div>
            </div>

            <div className="feature-list">
              {ecoQuests.length ? (
                <>
                  {/* --- FITUR LOAD MORE: Pemotongan array menggunakan .slice(0, visibleCount) --- */}
                  {ecoQuests.slice(0, visibleCount).map((q, i) => (
                    <div key={i} className={`eco-card ${q.completed ? 'completed' : ''}`}>
                      <div className="eco-card-content">
                        <div>
                          {/* --- MENGHAPUS DISPLAY PILL '+q.points Eco Points' --- */}
                          <h3>{q.title}</h3>
                          <p>{q.description || 'No description added.'}</p>
                        </div>
                        <div className="eco-status">{q.completed ? 'Completed' : 'Available'}</div>
                      </div>

                      <div className="eco-actions">
                        <button className="secondary-btn" onClick={() => startEdit(i, q)}>
                          Edit
                        </button>
                        <button className="primary-btn" disabled={q.completed} onClick={() => completeEcoQuest(i)}>
                          {q.completed ? 'Completed' : 'Complete'}
                        </button>
                        <button className="danger-btn" onClick={() => deleteEcoQuest(i)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* --- FITUR LOAD MORE: Tombol Load More muncul jika sisa data masih ada --- */}
                  {visibleCount < ecoQuests.length && (
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
                  <h3>No eco quest yet</h3>
                  <p>Create your first green side mission and start collecting eco points.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}