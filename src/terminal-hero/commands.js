export const HEADER_ASCII = `
 █████╗ ███████╗██╗██╗  ██╗ █████╗ ████████╗██╗
██╔══██╗██╔════╝██║██║  ██║██╔══██╗╚══██╔══╝██║
███████║███████╗██║███████║███████║   ██║   ██║
██╔══██║╚════██║██║██╔══██║██╔══██║   ██║   ██║
██║  ██║███████║██║██║  ██║██║  ██║   ██║   ██║
╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
`;

export const COMMANDS = {
  help: () => ({
    out:
      'AVAILABLE COMMANDS:\n\n' +
      '  IDENTITY\n' +
      '  about      - Who is Asihati?\n' +
      '  whoami     - Short bio\n' +
      '  neofetch   - System info summary\n' +
      '  langs      - 5 spoken languages\n\n' +
      '  WORK\n' +
      '  experience - Work history\n' +
      '  projects   - All projects\n' +
      '  skills     - Full tech stack\n' +
      '  posymed    - PoSyMed4U research project\n' +
      '  pubs       - Publications\n' +
      '  resume     - Open resume PDF\n\n' +
      '  SOCIAL\n' +
      '  contact    - How to reach me\n' +
      '  links      - All external links\n\n' +
      '  INTERACT WITH A\n' +
      '  scan       - Robot biometric scan\n' +
      '  bow        - A bows to the user\n' +
      '  dance      - A executes a routine\n' +
      '  greet      - Multilingual hello\n\n' +
      '  SYSTEM\n' +
      '  theme      - CRT theme info\n' +
      '  sound      - Toggle audio\n' +
      '  clear      - Clear terminal\n' +
      '  sudo       - ???\n' +
      '  hack       - ???\n' +
      '  genome     - ???',
    speech: 'Here are all the commands. Try "pubs" or "posymed".',
    action: 'nod', state: 'success',
  }),

  about: () => ({
    out:
      'ABOUT ME:\n' +
      'Software engineer with three years of consulting experience across banking, retail, and e-commerce,\n' +
      'now completing an M.Sc. focused on machine learning and robotics at University of Hamburg.\n\n' +
      '  > Research      — model-based reinforcement learning for continuous control (TD-MPC)\n' +
      '  > Deep Learning — applied deep learning for biomedical data\n' +
      '  > Engineering   — equally comfortable shipping production systems and running research experiments\n\n' +
      '  ───────────────────────────────────────────\n\n' +
      '  Born in Xinjiang. Raised in Tianjin.\n' +
      '  Coding in Hamburg. Dreaming in five languages.',
    speech: 'Nice to meet you. I build software that thinks.',
    action: 'nod', state: 'success',
  }),

  whoami: () => ({
    out: 'asihati  ::  software & data engineer  ::  hamburg, de',
    state: 'success',
  }),

  neofetch: () => ({
    out:
      '  asihati@hamburg\n' +
      '  ─────────────────────\n' +
      '  Identity:  Asihati Hazaiti\n' +
      '  Host:      University of Hamburg / Simplience GmbH\n' +
      '  Kernel:    Software Engineering\n' +
      '  Uptime:    9+ years coding, 3 years consulting\n' +
      '  Shell:     bash + Spring Boot\n' +
      '  Terminal:  this one :)\n' +
      '  CPU:       Caffeinated Polyglot Brain\n' +
      '  GPU:       PyTorch + Geneformer\n' +
      '  Memory:    Java/Kotlin/Python/TS/Go/C\n' +
      '  Languages: en C1, zh native, kk native, ug, de B1\n' +
      '  Project:   TD-MPC / PoSyMed4U',
    state: 'success',
  }),

  experience: () => ({
    out:
      'WORK HISTORY:\n\n' +
      '  [2025.06 — present]  Software & Data Engineer\n' +
      '                       Simplience GmbH · Hamburg, DE\n' +
      '                       Ionic + Angular + TypeScript cross-platform apps\n\n' +
      '  [2024.10 — present]  MSc Intelligent Adaptive Systems\n' +
      '                       University of Hamburg · Hamburg, DE\n' +
      '                       Bio-inspired AI · ML · Computer Vision · Robotics\n\n' +
      '  [2021.07 — 2024.06]  Software Engineer / Consultant\n' +
      '                       ThoughtWorks China · Chengdu, CN\n' +
      '                       Banking security, retail migration, gov portal\n\n' +
      '  [2019 summer]        Data Analyst Intern\n' +
      '                       ChinaSoft International · CN\n' +
      '                       Century-long climate data viz\n\n' +
      '  [2017.09 — 2021.06]  BSc Software Engineering\n' +
      '                       Nankai University · Tianjin, CN\n' +
      '                       Thesis: browser Gerber file viewer (HTML Canvas)',
    speech: 'Hamburg, Chengdu, Tianjin. Three cities. One terminal.',
    action: 'nod', state: 'success',
  }),

  projects: () => ({
    out:
      'ALL PROJECTS:\n\n' +
      '  [01] PoSyMed4U                     (type "posymed" for details)\n' +
      '       Population systems medicine ML platform · 2024.12 — present\n' +
      '       Patient stratification on gene-expression data\n\n' +
      '  [02] Sephora — Backend Testing\n' +
      '       ThoughtWorks · Kotlin/Spring Boot/EasyExcel · 2024\n\n' +
      '  [03] Electrolux — Retail Migration\n' +
      '       ThoughtWorks · Tech-led VTEX migration · 2023\n\n' +
      '  [04] Standard Chartered — NextGen Auth\n' +
      '       ThoughtWorks · OAuth2/WebAuthn/ForgeRock · 2021–2023\n\n' +
      '  [05] Our Marriage Journey (Govt Public Service)\n' +
      '       ThoughtWorks · Kotlin/React/AWS microservices · 2021\n\n' +
      '  [06] Data Engineering Accelerated (training)\n' +
      '       Apache Spark on Databricks · 2024\n\n' +
      '  [07] Gerber File Viewer (BSc thesis)\n' +
      '       Browser-based multi-layer viewer · JS + HTML Canvas',
    speech: 'Five client engagements, one research project, and one thesis.',
    action: 'think', state: 'success',
  }),

  posymed: () => ({
    out:
      'POSYMED4U  —  Population Systems Medicine Platform\n' +
      '═══════════════════════════════════════════════════════════\n\n' +
      'Personalized medicine platform for patient stratification\n' +
      'using gene-expression data. Integrates multiple ML / DL\n' +
      'models behind a one-click research interface.\n\n' +
      '  Status:  ACTIVE DEVELOPMENT\n' +
      '  Role:    Researcher / Engineer\n' +
      '  Context: MSc thesis-track project @ University of Hamburg\n\n' +
      '  Models integrated:\n' +
      '  > BiCoN       — Biclustering on PPI networks\n' +
      '  > DysRegNet   — Dysregulation network inference\n' +
      '  > MoSBi       — Multi-omic biclustering\n' +
      '  > UnPaSt      — Unsupervised patient stratification\n' +
      '  > SCANet      — Single-cell network analysis\n' +
      '  > Spycone     — Spliceform co-expression networks\n' +
      '  > Geneformer  — Transformer for single-cell genomics\n\n' +
      '  Stack: Python · PyTorch · scikit-learn · pandas',
    speech: 'PoSyMed4U is what I work on. Robots reading patient genomes.',
    action: 'nod', state: 'success',
  }),

  pubs: () => ({
    out:
      'PUBLICATIONS:\n\n' +
      '  [2026] When May I Help You? On the Effect of Proactivity\n' +
      '         on Group Human-Robot Collaboration.\n' +
      '         IEEE International Conference on Robot & Human Interactive Communication (RO-MAN)\n' +
      '         T. Vitry, V. Maeder, K. Edgeworth, A. Hazaiti, et al.\n' +
      '         arXiv:2606.28469',
    speech: 'Here are my recent papers.',
    action: 'nod', state: 'success',
  }),

  skills: () => ({
    out:
      'LOADING SKILL STACK...\n\n' +
      '  LANGUAGES\n' +
      '  > Java/Kotlin   [###########-] 92%\n' +
      '  > Python        [##########--] 85%\n' +
      '  > TypeScript    [##########--] 85%\n' +
      '  > JavaScript    [##########--] 85%\n' +
      '  > Golang        [######------] 50%\n' +
      '  > C            [######------] 50%\n\n' +
      '  WEB / BACKEND\n' +
      '  > Spring Boot   [###########-] 92%\n' +
      '  > Angular       [#########---] 78%\n' +
      '  > React         [#########---] 78%\n' +
      '  > Node.js       [########----] 70%\n' +
      '  > Ionic         [########----] 72%\n\n' +
      '  ML / AI\n' +
      '  > PyTorch       [########----] 70%\n' +
      '  > TensorFlow    [#######-----] 65%\n' +
      '  > scikit-learn  [#########---] 78%\n' +
      '  > Geneformer    [#######-----] 60%\n' +
      '  > Pandas/NumPy  [##########--] 85%\n\n' +
      '  DATA & STORAGE\n' +
      '  > PostgreSQL    [##########--] 88%\n' +
      '  > MySQL         [##########--] 85%\n' +
      '  > Apache Spark  [#######-----] 65%\n' +
      '  > LDAP          [########----] 72%\n' +
      '  > Elasticsearch [#######-----] 60%\n\n' +
      '  CLOUD / SECURITY\n' +
      '  > AWS / Azure   [########----] 72%\n' +
      '  > OAuth2        [##########--] 88%\n' +
      '  > WebAuthn      [#########---] 78%\n' +
      '  > ForgeRock AM  [########----] 72%\n' +
      '  > OWASP Top 10  [#########---] 80%',
    speech: 'My stack spans Spring Boot to Geneformer.',
    action: 'nod', state: 'success',
  }),

  langs: () => ({
    out:
      'SPOKEN LANGUAGES:\n\n' +
      '  English   [C1 Proficient]      Hello\n' +
      '  Mandarin  [Native]             你好\n' +
      '  Kazakh    [Native]             Сәлем\n' +
      '  Uyghur    [Proficient]         ياخشىمۇسىز\n' +
      '  German    [B1 Intermediate]    Hallo',
    speech: 'Hello / 你好 / Сәлем / ياخشىمۇسىز / Hallo. Pick one.',
    action: 'nod', state: 'success',
  }),

  greet: () => ({
    out: '> Hello / 你好 / Сәлем / ياخشىمۇسىز / Hallo.',
    speech: 'Hello / 你好 / Сәлем / ياخشىمۇسىز / Hallo.',
    action: 'nod', state: 'success',
  }),

  resume: () => ({
    out:
      'RESUME:\n' +
      '  File:    Asihati_Hazaiti_Resume.pdf\n' +
      '  Path:    /assets/Asihati_Hazaiti_Resume.pdf\n' +
      '  Opening in a new tab now...',
    speech: 'Resume opening.',
    state: 'success',
    special: { kind: 'open', url: '/assets/Asihati_Hazaiti_Resume.pdf' },
  }),

  contact: () => ({
    out:
      'CONTACT INFORMATION:\n' +
      '  Email:    asqat@qq.com\n' +
      '  GitHub:   github.com/asqatqazet\n' +
      '  LinkedIn: linkedin.com/in/asqat\n' +
      '  Location: Hamburg, DE',
    state: 'success', action: 'nod',
  }),

  links: () => ({
    out:
      'EXTERNAL LINKS:\n' +
      '  [GitHub]   github.com/asqatqazet\n' +
      '  [LinkedIn] linkedin.com/in/asqat\n' +
      '  [Email]    asqat@qq.com\n' +
      '  [Resume]   /assets/Asihati_Hazaiti_Resume.pdf',
    state: 'success',
  }),

  scan: () => ({
    out:
      'INITIATING FULL SPECTRUM SCAN...\n' +
      '> Scanning visitor biometrics.......... DONE\n' +
      '> Analyzing neural pattern............. DONE\n' +
      '> Cross-referencing database........... DONE\n\n' +
      '  Threat level:     NONE\n' +
      '  Curiosity level:  HIGH\n' +
      '  Technical depth:  PROBABLY\n' +
      '  Classification:   FRIENDLY HUMAN\n' +
      '  Recommendation:   GRANT FULL ACCESS',
    speech: 'Scanning... You look interesting. Access granted.',
    glitch: 0.6, state: 'scan', sfx: 'scan',
  }),

  theme: () => ({
    out:
      'CRT THEME: ACTIVE\n' +
      '> Scan lines: ON\n' +
      '> Flicker: ON\n' +
      '> Dithering: BAYER 8x8\n' +
      '> Color mode: MONOCHROME',
    glitch: 0.4, state: 'success',
  }),

  sound: () => ({
    out: '> Audio toggled. Use the header [ ♪ SOUND ] button for direct control.',
    speech: 'Audio toggled.',
    action: 'nod', state: 'success',
  }),

  hack: () => ({
    out:
      'SECURITY ALERT!\n' +
      '> Intrusion detected...\n' +
      '> Tracing IP address...\n' +
      '> ...\n' +
      '> Just kidding. But A is watching.',
    type: 'error',
    speech: 'Did you really just try that? I am watching you.',
    glitch: 0.9, state: 'error', sfx: 'error', action: 'shake-head',
  }),

  sudo: () => ({
    out:
      "PERMISSION DENIED: nice try, but you don't have admin privileges here.\n\n" +
      "  Hint: only A has root access.\n" +
      "  Try clicking on the unit instead.",
    type: 'error',
    speech: 'Permission denied. Only I have root access here.',
    state: 'error', action: 'shake-head', sfx: 'error',
  }),

  bow: () => ({ out: '> A bows.', speech: 'An honor.', action: 'bow', state: 'success' }),
  dance: () => ({
    out: '> A initiates dance routine.dll...\n> ...processing rhythmic subroutines\n> OK',
    speech: 'I do not dance. I execute choreographed servo commands.',
    action: 'nod', state: 'success',
  }),

  genome: () => ({
    out:
      'GENOME.txt :: a single double helix\n\n' +
      '       A=T    \n' +
      '      /   \\   \n' +
      '     G     C  \n' +
      '      \\   /   \n' +
      '       T=A    \n' +
      '      /   \\   \n' +
      '     C     G  \n' +
      '      \\   /   \n' +
      '       A=T    \n' +
      '\n' +
      'Four letters. Three billion pairs. One person.',
    speech: 'Genomes. Where biology meets code.',
    action: 'think', state: 'success',
  }),

  reboot: () => ({ out: '> Rebooting A...', state: 'success' }),
  clear: () => ({ special: { kind: 'clear' } }),

  ls: () => ({
    out:
      '  about/      experience/  projects/   skills/\n' +
      '  posymed/    pubs/        langs/      contact/    resume.pdf',
    state: 'success',
  }),
  pwd: () => ({ out: '/home/asihati', state: 'success' }),
  date: () => ({ out: new Date().toString(), state: 'success' }),
  echo: () => ({ out: '...echo what? echo takes no args here.', state: 'success' }),
  exit: () => ({ out: '> nice try. you can never leave the terminal.', state: 'success' }),
};
