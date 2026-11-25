/**
 * Pengait uji (HANYA mode dev): membuka layar mana pun tanpa klik,
 * dipakai skrip uji HP lewat Obscura/Puppeteer. Tidak ikut ke build produksi.
 */
export async function installDevHooks() {
  const [panels, subject, subjects, wardrobe, decor, desk, hub, coding, pattern, labs, explore, stories, storyData, badges, reader, flash] = await Promise.all([
    import('./scenes/panels.js'), import('./scenes/subject.js'), import('./data/subjects.js'), import('./scenes/wardrobe.js'),
    import('./scenes/decor.js'), import('./sandbox/desk.js'), import('./minigames/hub.js'), import('./minigames/coding.js'),
    import('./minigames/pattern.js'), import('./sandbox/labs.js'), import('./sandbox/explore.js'), import('./sandbox/stories.js'),
    import('./data/stories.js'), import('./sandbox/badges.js'), import('./sandbox/reader.js'), import('./sandbox/flashcards.js'),
  ]);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const click = (sel) => document.querySelector(sel)?.click();
  const S = subjects.SUBJECTS;
  const screens = {
    room: async () => {},
    subjects: () => panels.openSubjects(),
    subject: () => subject.openSubject(S[0]),
    lesson: async () => { await subject.openSubject(S[0]); await wait(300); click('[data-lesson]'); },
    wardrobe: () => wardrobe.openWardrobe(),
    decor: () => decor.openDecor(),
    desk: () => desk.openStudyDesk(),
    computer: () => hub.openComputer(),
    coding: async () => { coding.openCodingGame(); await wait(300); click('[data-level="0"]'); },
    pattern: () => pattern.openPatternGame(),
    lab: async () => { labs.openLabs(); await wait(300); click('[data-lab="bunyi"]'); },
    pizza: async () => { labs.openLabs(); await wait(300); click('[data-lab="pecahan"]'); },
    map: () => explore.openMap(),
    timeline: () => explore.openTimeline(),
    stories: () => stories.openStories(),
    story: () => stories.playStory(storyData.STORIES[0]),
    math: async () => { desk.openMathDrill(); await wait(300); click('[data-topic="tambah"]'); },
    flash: async () => { flash.openFlashcards(); await wait(300); click('[data-set]'); },
    reader: () => reader.openReader(S[0], 'bab1'),
    badges: () => badges.openBadges(),
    save: () => panels.openSave(),
    school6: async () => { (await import('./scenes/village.js')).openSchool6(); },
    subject6: async () => { const k6 = await import('./data/kelas6.js'); subject.openSubject(k6.SUBJECTS6[0]); },
  };
  window.__sdaya = {
    screens: Object.keys(screens),
    async open(name) {
      document.querySelectorAll('dialog[open]').forEach((d) => { d.close(); d.remove(); });
      await screens[name]?.();
      await wait(700);
      return true;
    },
  };
}
