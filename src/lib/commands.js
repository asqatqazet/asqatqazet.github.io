// Command registry for the terminal CLI.
// Each command returns either a string (single line), array of strings (lines),
// or a React node fragment via the `node` field. Side-effects via `effect` callback.

import profile from '../data/profile.json';
import experience from '../data/experience.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import dialogue from '../data/dialogue.json';
import motd from '../data/motd.txt?raw';

const RESET = (host) => host.reset();

function listHelp() {
  return [
    '┌─ COMMANDS ───────────────────────────────────────────────',
    '  help            show this list',
    '  motd            print the boot banner',
    '  whoami / about  short bio',
    '  education       degrees and coursework',
    '  experience      work history (reverse chrono)',
    '  projects [tag]  list projects (or filter by tag)',
    '  skills          tech stack, grouped',
    '  langs           5 languages, native scripts',
    '  resume          open resume PDF',
    '  contact         how to reach me',
    '  goto <section>  scroll to about | experience | projects | skills | langs | contact',
    '  theme <name>    green | amber | magenta',
    '  sound <on|off>  toggle audio feedback',
    '  clear / cls     wipe terminal output',
    '  ─── easter eggs ───',
    '  robot           ping the mascot',
    '  posymed         the active research project',
    '  genome          ASCII helix',
    '└──────────────────────────────────────────────────────────',
  ];
}

function aboutLines() {
  return [
    `> ${profile.name} :: ${profile.title}`,
    `> ${profile.location} · ${profile.tagline}`,
    '',
    profile.bio,
  ];
}

function educationLines() {
  const ed = experience.filter((e) => e.type === 'education');
  const out = ['┌─ EDUCATION ──────────────────────────────────────────────'];
  ed.forEach((e) => {
    const period = `${e.start} – ${e.end || 'present'}`;
    out.push(`  ${period}   ${e.role}`);
    out.push(`               ${e.company} · ${e.location}`);
    if (e.summary) out.push(`               ${e.summary}`);
    out.push('');
  });
  out.push('└──────────────────────────────────────────────────────────');
  return out;
}

function experienceLines() {
  const work = experience.filter((e) => e.type === 'work');
  const out = ['┌─ EXPERIENCE ─────────────────────────────────────────────'];
  work.forEach((e) => {
    const period = `${e.start} – ${e.end || 'present'}`;
    out.push(`  ${period}   ${e.role}`);
    out.push(`               ${e.company} · ${e.location}`);
    out.push(`               ${e.summary}`);
    out.push(`               stack: ${e.stack.join(', ')}`);
    out.push('');
  });
  out.push('└──────────────────────────────────────────────────────────');
  return out;
}

function projectsLines(filter) {
  let list = projects;
  if (filter) {
    const f = filter.toLowerCase();
    list = projects.filter((p) => {
      const tag = p.tag.toLowerCase().replace('/', '-');
      const id = p.id.toLowerCase();
      // Tag/id exact prefix match, OR title word starts-with
      if (tag === f || tag.startsWith(f + '-') || id === f || id.startsWith(f)) return true;
      const words = p.title.toLowerCase().split(/[^a-z0-9]+/);
      return words.some((w) => w.startsWith(f) && w.length > 2);
    });
  }
  if (!list.length) return [`> no projects match "${filter}"`];
  const out = [`┌─ PROJECTS${filter ? ` :: filter="${filter}"` : ''} ──────────────────────────`];
  list.forEach((p) => {
    out.push(`  [${p.tag.padEnd(8)}] ${p.title}`);
    out.push(`             ${p.duration}`);
    out.push(`             ${p.summary}`);
    out.push(`             stack: ${p.stack.join(', ')}`);
    out.push('');
  });
  out.push('└──────────────────────────────────────────────────────────');
  return out;
}

function skillsLines() {
  const labels = {
    languages: 'Languages',
    web: 'Web/Backend',
    ml: 'ML / AI',
    data: 'Data & Storage',
    cloud: 'Cloud / DevOps',
    security: 'Security',
  };
  const out = ['┌─ SKILL SET ──────────────────────────────────────────────'];
  Object.entries(labels).forEach(([k, label]) => {
    out.push(`  ${label.padEnd(16)} ${skills[k].join(', ')}`);
  });
  out.push('└──────────────────────────────────────────────────────────');
  return out;
}

function langsLines() {
  const out = ['┌─ LANGUAGES ──────────────────────────────────────────────'];
  profile.languages.forEach((l) => {
    out.push(`  ${l.name.padEnd(10)} ${l.level.padEnd(20)} ${l.greeting}`);
  });
  out.push('└──────────────────────────────────────────────────────────');
  return out;
}

function contactLines() {
  return [
    '┌─ CONTACT ────────────────────────────────────────────────',
    `  email     ${profile.email}`,
    `  github    github.com/${profile.github}`,
    `  linkedin  linkedin.com/in/${profile.linkedin}`,
    `  location  ${profile.location}`,
    '└──────────────────────────────────────────────────────────',
  ];
}

const SECTION_IDS = ['boot', 'about', 'experience', 'projects', 'skills', 'langs', 'contact'];

const GENOME = [
  '   A=T     ',
  '  /   \\   ',
  ' G     C  ',
  '  \\   /   ',
  '   T=A    ',
  '  /   \\   ',
  ' C     G  ',
  '  \\   /   ',
  '   A=T    ',
];

const POSYMED = [
  '┌─ PoSyMed4U pipeline ─────────────────────────────────────',
  '  [gene-expression] → [BiCoN] ──┐',
  '                     [DysRegNet]┤',
  '                     [MoSBi]    ├──→ [patient strata]',
  '                     [UnPaSt]   │       │',
  '                     [SCANet]   │       └→ [Geneformer]',
  '                     [Spycone] ─┘',
  '└──────────────────────────────────────────────────────────',
];

export const COMMANDS = {
  help: () => listHelp(),
  '?': () => listHelp(),
  motd: () => motd.split('\n'),
  whoami: () => aboutLines(),
  about: () => aboutLines(),
  education: () => educationLines(),
  experience: () => experienceLines(),
  projects: (args) => projectsLines(args[0]),
  skills: () => skillsLines(),
  langs: () => langsLines(),
  contact: () => contactLines(),
  resume: (_, host) => {
    host.openResume();
    return ['> opening resume in new tab...', `  ${profile.resumeUrl}`];
  },
  goto: (args, host) => {
    const target = args[0];
    if (!target) return ['usage: goto <section>', `available: ${SECTION_IDS.join(', ')}`];
    if (!SECTION_IDS.includes(target)) return [`> unknown section: ${target}`];
    host.scrollTo(target);
    return [`> jumping to #${target}...`];
  },
  theme: (args, host) => {
    const t = args[0];
    if (!['green', 'amber', 'magenta'].includes(t)) return ['usage: theme <green|amber|magenta>'];
    host.setTheme(t);
    return [`> theme: ${t}`];
  },
  sound: (args, host) => {
    const v = args[0];
    if (v === 'on') { host.setSound(true); return ['> sound: on']; }
    if (v === 'off') { host.setSound(false); return ['> sound: off']; }
    return ['usage: sound <on|off>'];
  },
  clear: (_, host) => { RESET(host); return null; },
  cls: (_, host) => { RESET(host); return null; },
  robot: (_, host) => {
    const line = dialogue[Math.floor(Math.random() * dialogue.length)];
    host.robotSay(line);
    return [`> robot.exe: "${line}"`];
  },
  posymed: () => POSYMED,
  genome: () => GENOME,
  ls: () => SECTION_IDS.map((s) => `  ${s}/`),
  pwd: () => ['/home/asihati'],
  whoareyou: () => ['I am asihati.exe — pixel-art portfolio rev.1'],
  date: () => [new Date().toString()],
  echo: (args) => [args.join(' ')],
  exit: () => ['> nice try. you can never leave the terminal.'],
};

export function runCommand(raw, host) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const [name, ...args] = trimmed.split(/\s+/);
  const lower = name.toLowerCase();
  if (lower === 'sudo') return [`> permission denied: nice try`];
  const fn = COMMANDS[lower];
  if (!fn) return [`> command not found: ${name}`, `> type "help" for the list`];
  return fn(args, host);
}

export const COMMAND_NAMES = Object.keys(COMMANDS).filter((n) => n !== '?');

export const HEADER_ASCII = motd;
