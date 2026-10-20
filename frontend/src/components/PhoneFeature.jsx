import React from 'react';

export default function PhoneFeature({ title, badge, cards, row }) {
  const isQuest = title.includes('Quest');
  const isHabit = title.includes('Habit');
  const isPomodoro = title.includes('Pomodoro');

  const popupOne = isQuest
    ? ['Priority First', 'See the most important quest instantly.']
    : isHabit
    ? ['Habit Streak', 'Consistency becomes visible every day.']
    : isPomodoro
    ? ['Focus Timer', 'Protect attention through structured sessions.']
    : ['Morning Quest', 'Start your day with a clear mission.'];

  const popupTwo = isQuest
    ? ['Task Sorted', 'Deadlines and categories stay organized.']
    : isHabit
    ? ['Small Progress', 'Little routines build a stronger system.']
    : isPomodoro
    ? ['Deep Work', 'Stay locked in without constant interruption.']
    : ['Quick Plan', 'Organize what matters first.'];

  const popupThree = isQuest
    ? ['Quest Mode', 'Turn tasks into actionable missions.']
    : isHabit
    ? ['Track Routine', "See what habits are actually sticking."]
    : isPomodoro
    ? ['XP Reward', 'Every finished session moves you forward.']
    : ['Daily Flow', 'Track your day in one calm view.'];

  return (
    <div className="feature-visual">
      <div className="phone-mockup">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="phone-header">
            <span className="phone-title">{title}</span>
            <span className="phone-badge">{badge}</span>
          </div>

          {cards.map((c, i) => (
            <div className="screen-card" key={i}>
              <h4>{c[0]}</h4>
              <p>{c[1]}</p>
            </div>
          ))}

          {row && (
            <div className="screen-row">
              <div className="screen-mini">{row[0]}</div>
              <div className="screen-mini">{row[1]}</div>
            </div>
          )}
        </div>
      </div>

      <div className="popup-card one">
        <h5>{popupOne[0]}</h5>
        <p>{popupOne[1]}</p>
      </div>

      <div className="popup-card two">
        <h5>{popupTwo[0]}</h5>
        <p>{popupTwo[1]}</p>
      </div>

      <div className="popup-card three">
        <h5>{popupThree[0]}</h5>
        <p>{popupThree[1]}</p>
      </div>
    </div>
  );
}
