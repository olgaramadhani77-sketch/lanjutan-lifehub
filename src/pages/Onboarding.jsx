import React, { useEffect, useState } from 'react';
import { usePageStyles, navigate } from '../utils/hooks.js';
import { Link, OnboardingCharacter } from '../components/index.js';
import { saveRecommended } from '../utils/core.js';
import { slides, questions, programs } from '../utils/onboardingData.js';

export default function Onboarding() {
  usePageStyles(['/css/onboarding.css', '/css/gamification.css']);

  const [slide, setSlide] = useState(0);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ quest: 0, habit: 0, focus: 0, balanced: 0, eco: 0 });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4800);
    return () => clearInterval(id);
  }, []);

  const choose = (value) => {
    const next = { ...scores, [value]: scores[value] + 1 };

    if (step + 1 >= questions.length) {
      const key = Object.keys(next).sort((a, b) => next[b] - next[a])[0] || 'balanced';
      setResult(programs[key]);
      saveRecommended({ key, ...programs[key] });
    } else {
      setScores(next);
      setStep(step + 1);
    }
  };

  const retakeQuestions = () => {
    setResult(null);
    setStep(0);
    setScores({ quest: 0, habit: 0, focus: 0, balanced: 0, eco: 0 });
  };

  const q = questions[step];
  const active = slides[slide];
  const prevSlide = (slide - 1 + slides.length) % slides.length;
  const nextSlide = (slide + 1) % slides.length;

  return (
    <>
      <header className="onboard-nav">
        <Link to="/" className="onboard-brand">
          LIFEHUB
        </Link>
        <nav className="onboard-links">
          <Link to="/">Home</Link>
          <a href="#things">Explore</a>
          <a href="#personalize" className="nav-primary">
            Personalize
          </a>
        </nav>
      </header>

      <main>
        <section className="things-section" id="things">
          <div className="section-shell">
            <div className="showcase-header">
              <p className="eyebrow">Things You Can Do with LIFEHUB</p>
              <h1>{active.headline}</h1>
              <p>{active.description}</p>
            </div>

            <div className="quote-carousel-shell">
              <button className="feature-arrow left" onClick={() => setSlide(prevSlide)}>
                ←
              </button>

              <div className="quote-carousel-window">
                <div className="quote-carousel">
                  {slides.map((s, i) => {
                    const positionClass = i === slide ? 'active' : i === prevSlide ? 'prev' : i === nextSlide ? 'next' : 'hidden';

                    return (
                      <article key={s.label} className={`quote-card ${positionClass}`}>
                        <div className="quote-top">
                          <span className="quote-label">{s.label}</span>
                          <h2>{s.quote}</h2>
                          <p>{s.description}</p>
                        </div>
                        <div className="quote-bottom">
                          <div className="quote-mini">
                            <span>{s.miniLabel}</span>
                            <strong>{s.miniText}</strong>
                          </div>
                          <OnboardingCharacter />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <button className="feature-arrow right" onClick={() => setSlide(nextSlide)}>
                →
              </button>
            </div>

            <div className="feature-dots">
              {slides.map((_, i) => (
                <button key={i} className={`feature-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)}></button>
              ))}
            </div>

            <div className="continue-row">
              <a href="#personalize" className="primary-btn">
                Continue to Personalization
              </a>
            </div>
          </div>
        </section>

        <section className="personalize-section" id="personalize">
          <div className="section-shell">
            <div className="personalize-layout">
              <div className="personalize-intro">
                <p className="eyebrow">Pre-login Personalization</p>
                <h2>Let LIFEHUB understand your rhythm first.</h2>
                <p>Answer a few short questions so LIFEHUB can recommend a starting program that fits the way you manage tasks, habits, focus, and daily growth.</p>

                <div className="mini-program-preview">
                  <div>
                    <span>01</span>
                    <p>Choose your focus area</p>
                  </div>
                  <div>
                    <span>02</span>
                    <p>Tell us your daily pattern</p>
                  </div>
                  <div>
                    <span>03</span>
                    <p>Get your recommended program</p>
                  </div>
                </div>
              </div>

              {!result ? (
                <div className="question-card">
                  <div className="question-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                    </div>
                    <span>
                      {step + 1}/{questions.length}
                    </span>
                  </div>

                  <p className="eyebrow">Question</p>
                  <h2>{q.title}</h2>
                  <p>{q.description}</p>

                  <div className="answer-grid">
                    {q.answers.map((a) => (
                      <button className="answer-btn" key={a[0]} onClick={() => choose(a[2])}>
                        <h4>{a[0]}</h4>
                        <p>{a[1]}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="result-card show lifehub-result-light">
                  <p className="eyebrow">Recommended Program</p>
                  <h2>{result.name}</h2>
                  <p>{result.description}</p>

                  <div className="program-pills">
                    {result.pills.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </div>

                  <div className="result-actions">
                    <button className="primary-btn" onClick={() => navigate('/dashboard')}>
                      Enter Dashboard
                    </button>
                    <button className="secondary-btn" onClick={retakeQuestions}>
                      Retake Questions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
