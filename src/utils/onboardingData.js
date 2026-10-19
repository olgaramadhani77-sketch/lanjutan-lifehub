export const slides = [
  {
    label: 'Quest Rhythm',
    headline: 'A calmer way to know what matters first.',
    description: 'LIFEHUB helps you turn a messy day into a sequence of meaningful actions.',
    quote: 'You do not need to do everything. You only need to know the next right mission.',
    miniLabel: 'Suggested Flow',
    miniText: 'Start with 3 daily quests',
  },
  {
    label: 'Habit Energy',
    headline: 'Small routines can become your strongest system.',
    description: 'Consistency feels easier when your habits are visible, trackable, and rewarding.',
    quote: 'The goal is not to become perfect overnight. The goal is to return tomorrow.',
    miniLabel: 'Daily Rhythm',
    miniText: 'Build one habit at a time',
  },
  {
    label: 'Focus Mode',
    headline: 'Your attention deserves a protected space.',
    description: 'Focus sessions help you slow down, choose one thing, and actually finish it.',
    quote: 'Deep work begins when you stop negotiating with distraction.',
    miniLabel: 'Focus Suggestion',
    miniText: 'Try one 25-minute session',
  },
  {
    label: 'Growth Progress',
    headline: 'Progress feels better when you can see it.',
    description: 'XP, levels, streaks, and badges make your daily effort easier to recognize.',
    quote: 'Your growth is not invisible. LIFEHUB turns effort into something you can see.',
    miniLabel: 'Progress Path',
    miniText: 'Earn XP from action',
  },
  {
    label: 'Eco Lifestyle',
    headline: 'A better day can also be better for the earth.',
    description: 'Eco side quests help you add simple sustainable choices into your routine.',
    quote: 'Small green actions are still progress when they become part of your lifestyle.',
    miniLabel: 'Green Mission',
    miniText: 'Start with one eco quest',
  },
];

export const questions = [
  {
    title: 'What do you want to improve first?',
    description: 'Choose the area that feels most important for your current life rhythm.',
    answers: [
      ['Manage my tasks', 'I want my daily work to feel clearer and more structured.', 'quest'],
      ['Build better habits', 'I want small routines that I can actually maintain.', 'habit'],
      ['Improve my focus', 'I get distracted easily and need better deep work sessions.', 'focus'],
      ['Balance everything', 'I want a system for tasks, habits, focus, and progress.', 'balanced'],
    ],
  },
  {
    title: 'How does your day usually feel?',
    description: 'This helps LIFEHUB understand the kind of program that fits your lifestyle.',
    answers: [
      ['Messy and overloaded', 'Too many things happen at once.', 'quest'],
      ['Inconsistent', 'I start routines, but often stop after a few days.', 'habit'],
      ['Distracted', 'I struggle to stay locked in.', 'focus'],
      ['Busy but manageable', 'I just need a cleaner system.', 'balanced'],
    ],
  },
  {
    title: 'What kind of support do you prefer?',
    description: 'Pick the system that would motivate you the most.',
    answers: [
      ['Daily quests', 'Give me missions I can complete one by one.', 'quest'],
      ['Routine tracker', 'Help me repeat good habits consistently.', 'habit'],
      ['Focus timer', 'Help me enter deep work mode.', 'focus'],
      ['Progress and rewards', 'I like XP, levels, and achievement feedback.', 'balanced'],
    ],
  },
  {
    title: 'Do you want eco missions included?',
    description: 'LIFEHUB can add small green side quests to your daily progress.',
    answers: [
      ['Yes, include eco quests', 'I want small sustainable actions in my routine.', 'eco'],
      ['Only simple ones', 'Give me eco missions that are easy to do.', 'eco'],
      ['Maybe later', 'I want to focus on productivity first.', 'balanced'],
      ['Not for now', 'Keep my program focused on personal productivity.', 'focus'],
    ],
  },
];

export const programs = {
  quest: {
    name: 'Quest Productivity Program',
    description: 'Your recommended starting point is a structured quest system. LIFEHUB will help you organize tasks, set priorities, and complete your day one mission at a time.',
    pills: ['Daily Quest', 'Priority', 'Deadline', 'Progress'],
  },
  habit: {
    name: 'Habit Starter Program',
    description: 'Your recommended starting point is habit building. LIFEHUB will help you create simple routines, track consistency, and turn small actions into long-term progress.',
    pills: ['Daily Habit', 'Streak', 'Routine', 'Consistency'],
  },
  focus: {
    name: 'Focus Builder Program',
    description: 'Your recommended starting point is deep work. LIFEHUB will help you protect your attention, reduce distractions, and build better focus sessions.',
    pills: ['Pomodoro', 'Deep Work', 'XP Reward', 'Discipline'],
  },
  balanced: {
    name: 'Balanced Life Program',
    description: 'Your recommended starting point is a balanced system. LIFEHUB will combine quests, habits, focus, and progress tracking to help you manage your day with more clarity.',
    pills: ['Quest', 'Habit', 'Focus', 'Achievement'],
  },
  eco: {
    name: 'Eco Lifestyle Program',
    description: 'Your recommended starting point includes eco side quests. LIFEHUB will help you build a better daily rhythm while adding small sustainable actions to your lifestyle.',
    pills: ['Eco Quest', 'Green Habit', 'Side Mission', 'Eco Points'],
  },
};
