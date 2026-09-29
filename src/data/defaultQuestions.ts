import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // BAGIAN 1: PILIHAN GANDA (20 BUTIR SOAL: NO. 1 - 20)
  // Setiap soal memiliki 4 opsi jawaban (A, B, C, D) dengan 1 jawaban benar.
  // =========================================================================
  {
    id: 1,
    type: 'pg',
    topic: 'Dental Hygiene Tools',
    difficulty: 'Mudah',
    text: 'Look at the picture below!\n\nWhat are these personal hygiene items, and what is their primary function?',
    imageSvg: `<svg viewBox="0 0 460 200" class="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgTooth" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eff6ff" />
      <stop offset="100%" stop-color="#dbeafe" />
    </linearGradient>
    <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    <linearGradient id="pasteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="460" height="200" rx="16" fill="url(#bgTooth)" stroke="#bfdbfe" stroke-width="2" />
  <!-- Toothbrush -->
  <g transform="translate(60, 45) rotate(-15)">
    <!-- Handle -->
    <rect x="0" y="30" width="220" height="18" rx="9" fill="url(#brushGrad)" />
    <!-- Grip pads -->
    <rect x="80" y="34" width="30" height="10" rx="5" fill="#1d4ed8" />
    <!-- Neck -->
    <path d="M 215 32 L 245 35 L 245 43 L 215 46 Z" fill="#60a5fa" />
    <!-- Head -->
    <rect x="245" y="31" width="55" height="16" rx="8" fill="#3b82f6" />
    <!-- Bristles -->
    <rect x="250" y="15" width="45" height="16" rx="3" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5" />
    <path d="M 252 23 Q 272 17 292 23" stroke="#0284c7" stroke-width="2" fill="none" />
  </g>
  <!-- Toothpaste Tube -->
  <g transform="translate(240, 75) rotate(10)">
    <!-- Tube Body -->
    <polygon points="0,20 120,5 120,45 0,30" fill="url(#pasteGrad)" />
    <!-- Cap -->
    <rect x="120" y="15" width="20" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <!-- Paste swirl coming out -->
    <path d="M 140 25 Q 165 15 170 30 Q 155 35 140 25" fill="#38bdf8" />
    <text x="35" y="29" font-size="11" font-weight="bold" fill="#ffffff" letter-spacing="1">PASTE</text>
  </g>
  <text x="230" y="180" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Toothbrush &amp; Toothpaste</text>
</svg>`,
    options: [
      { id: 'A', text: 'Soap and water to wash our dirty clothes' },
      { id: 'B', text: 'Toothbrush and toothpaste to brush our teeth and keep mouth clean' },
      { id: 'C', text: 'Shampoo and comb to untangle and tidy up hair' },
      { id: 'D', text: 'Nail clipper and file to cut long fingernails' },
    ],
    correctAnswer: 'B',
    explanation: 'Sikat gigi (toothbrush) dan pasta gigi (toothpaste) adalah peralatan kebersihan diri yang digunakan untuk menyikat gigi (to brush teeth), mengangkat sisa makanan, serta mencegah gigi berlubang.',
  },
  {
    id: 2,
    type: 'pg',
    topic: 'Dental Hygiene Routine',
    difficulty: 'Mudah',
    text: 'How often should we brush our teeth every day to maintain healthy teeth and gums?',
    options: [
      { id: 'A', text: 'Only once every month' },
      { id: 'B', text: 'At least twice a day, in the morning and before going to bed' },
      { id: 'C', text: 'Only on Sunday mornings' },
      { id: 'D', text: 'Ten times every hour' },
    ],
    correctAnswer: 'B',
    explanation: 'Dokter gigi menganjurkan kita untuk menyikat gigi minimal dua kali sehari (at least twice a day): di pagi hari setelah sarapan dan di malam hari sebelum tidur.',
  },
  {
    id: 3,
    type: 'pg',
    topic: 'Handwashing Habits',
    difficulty: 'Mudah',
    text: 'Look at the picture below!\n\nWhen is the most essential time to wash our hands thoroughly with soap and running water?',
    imageSvg: `<svg viewBox="0 0 460 200" class="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgWash" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4" />
      <stop offset="100%" stop-color="#dcfce7" />
    </linearGradient>
    <linearGradient id="waterFlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="460" height="200" rx="16" fill="url(#bgWash)" stroke="#bbf7d0" stroke-width="2" />
  <!-- Water Faucet / Keran -->
  <path d="M 230 20 L 230 50 Q 230 65 210 65 L 195 65" fill="none" stroke="#64748b" stroke-width="10" stroke-linecap="round" />
  <circle cx="230" cy="20" r="10" fill="#94a3b8" />
  <!-- Water stream -->
  <path d="M 195 65 Q 192 100 195 130" stroke="url(#waterFlow)" stroke-width="6" stroke-linecap="round" fill="none" />
  <!-- Hands -->
  <g transform="translate(145, 110)">
    <!-- Left Hand -->
    <path d="M 20 20 C 10 5, 25 -5, 45 10 C 65 15, 60 30, 45 35 Z" fill="#fed7aa" stroke="#f97316" stroke-width="1.5" />
    <!-- Right Hand -->
    <path d="M 60 10 C 80 -5, 95 10, 80 25 C 70 35, 55 30, 50 20 Z" fill="#fed7aa" stroke="#f97316" stroke-width="1.5" />
    <!-- Soap Bubbles -->
    <circle cx="48" cy="12" r="7" fill="#ffffff" opacity="0.85" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="62" cy="8" r="5" fill="#ffffff" opacity="0.8" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="36" cy="22" r="6" fill="#ffffff" opacity="0.8" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="70" cy="26" r="4" fill="#ffffff" opacity="0.8" stroke="#38bdf8" stroke-width="1.5" />
  </g>
  <text x="230" y="178" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">Wash Hands with Soap &amp; Running Water</text>
</svg>`,
    options: [
      { id: 'A', text: 'Only when someone forces us to do so' },
      { id: 'B', text: 'Before eating meals and after using the toilet' },
      { id: 'C', text: 'While taking an exam at our school desk' },
      { id: 'D', text: 'Right after waking up without getting out of bed' },
    ],
    correctAnswer: 'B',
    explanation: 'Mencuci tangan dengan sabun sangat penting dilakukan sebelum makan (before eating) dan setelah dari kamar mandi/toilet (after using the toilet) untuk membunuh kuman penyakit.',
  },
  {
    id: 4,
    type: 'pg',
    topic: 'Hair Hygiene',
    difficulty: 'Mudah',
    text: "Made's hair feels itchy, oily, and dusty after playing football in the school field. What should Made use to wash his hair clean?",
    options: [
      { id: 'A', text: 'Toothpaste' },
      { id: 'B', text: 'Hair shampoo' },
      { id: 'C', text: 'Hand sanitizer' },
      { id: 'D', text: 'Floor cleaner' },
    ],
    correctAnswer: 'B',
    explanation: 'Untuk mencuci rambut yang berminyak dan kotor agar bersih dan harum, kita menggunakan sampo rambut (hair shampoo).',
  },
  {
    id: 5,
    type: 'pg',
    topic: 'Bathing Frequency',
    difficulty: 'Mudah',
    text: 'Living in a tropical country like Indonesia, how often should we take a bath or shower to keep our body fresh and prevent bad body odor?',
    options: [
      { id: 'A', text: 'Twice a day (in the morning and in the afternoon/evening)' },
      { id: 'B', text: 'Once a month' },
      { id: 'C', text: 'Once every two weeks' },
      { id: 'D', text: 'Only when it rains' },
    ],
    correctAnswer: 'A',
    explanation: 'Di daerah tropis yang hangat dan memicu keringat, kita dianjurkan mandi dua kali sehari (twice a day), yakni di pagi hari dan sore/malam hari.',
  },
  {
    id: 6,
    type: 'pg',
    topic: 'Nail Hygiene Tools',
    difficulty: 'Mudah',
    text: 'Look at the picture below!\n\nWhat is this grooming tool, and what is it used for?',
    imageSvg: `<svg viewBox="0 0 460 200" class="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgNail" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff7ed" />
      <stop offset="100%" stop-color="#ffedd5" />
    </linearGradient>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f1f5f9" />
      <stop offset="50%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="460" height="200" rx="16" fill="url(#bgNail)" stroke="#fed7aa" stroke-width="2" />
  <!-- Nail Clipper Graphic -->
  <g transform="translate(130, 45)">
    <!-- Base Lower Jaw -->
    <path d="M 10 70 L 170 55 L 170 65 L 10 75 Z" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
    <!-- Upper Body -->
    <path d="M 10 50 L 170 55 L 170 60 L 10 55 Z" fill="url(#metalGrad)" stroke="#475569" stroke-width="1.5" />
    <!-- Cutting Blades / Jaws -->
    <path d="M 5 45 Q 12 60 5 78 L 12 75 Q 16 60 12 48 Z" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
    <!-- Pivot Pin -->
    <circle cx="25" cy="58" r="4.5" fill="#334155" />
    <!-- Lever Handle raised -->
    <path d="M 25 58 L 160 15 Q 170 12 175 20 L 155 35 L 30 62 Z" fill="url(#metalGrad)" stroke="#334155" stroke-width="1.5" />
    <!-- Grip ridges on lever -->
    <line x1="120" y1="24" x2="125" y2="34" stroke="#475569" stroke-width="1.5" />
    <line x1="130" y1="22" x2="135" y2="32" stroke="#475569" stroke-width="1.5" />
    <line x1="140" y1="20" x2="145" y2="30" stroke="#475569" stroke-width="1.5" />
  </g>
  <text x="230" y="175" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">Nail Clipper (Nail Cutter)</text>
</svg>`,
    options: [
      { id: 'A', text: 'A pair of scissors to cut colorful paper' },
      { id: 'B', text: 'A nail clipper to cut long and dirty fingernails regularly' },
      { id: 'C', text: 'A comb to untangle messy hair' },
      { id: 'D', text: 'A toothbrush to scrub dirty shoes' },
    ],
    correctAnswer: 'B',
    explanation: 'Alat pada gambar adalah gunting kuku (nail clipper/nail cutter) yang berguna untuk memotong kuku yang panjang dan kotor agar kuman tidak bersarang di bawah kuku.',
  },
  {
    id: 7,
    type: 'pg',
    topic: 'Hand Hygiene On The Go',
    difficulty: 'Sedang',
    text: 'When we are outside traveling on a bus and there is no water and soap nearby, what portable liquid product can we use to sanitize our hands before eating a snack?',
    options: [
      { id: 'A', text: 'Hand sanitizer' },
      { id: 'B', text: 'Dishwashing fluid' },
      { id: 'C', text: 'Cooking oil' },
      { id: 'D', text: 'Liquid ink' },
    ],
    correctAnswer: 'A',
    explanation: 'Pembersih tangan berbahan alkohol cair atau gel yang praktis dibawa bepergian saat tidak tersedia air dan sabun adalah hand sanitizer.',
  },
  {
    id: 8,
    type: 'pg',
    topic: 'Respiratory Etiquette',
    difficulty: 'Sedang',
    text: 'What is the correct and polite hygiene etiquette when you cough or sneeze inside the classroom?',
    options: [
      { id: 'A', text: "Cough directly towards your classmate's face" },
      { id: 'B', text: 'Cover your mouth and nose with a tissue or the inside of your bent elbow' },
      { id: 'C', text: 'Sneeze loudly into your textbook without covering' },
      { id: 'D', text: 'Wipe your running nose on the school table' },
    ],
    correctAnswer: 'B',
    explanation: 'Etika batuk dan bersin yang benar adalah menutup mulut dan hidung menggunakan tisu atau bagian dalam lipatan siku (cover mouth and nose with tissue or inside of bent elbow).',
  },
  {
    id: 9,
    type: 'pg',
    topic: 'Clean Clothing',
    difficulty: 'Sedang',
    text: 'Why should we change our socks and school uniform with clean ones every day after sweating?',
    options: [
      { id: 'A', text: 'To make our laundry basket full faster' },
      { id: 'B', text: 'To prevent germs, fungi, and unpleasant body odor from developing' },
      { id: 'C', text: 'Because dirty clothes become too heavy to wear' },
      { id: 'D', text: 'To show off our clothes to our neighbors' },
    ],
    correctAnswer: 'B',
    explanation: 'Mengganti pakaian dan kaus kaki setiap hari setelah berkeringat penting untuk mencegah kuman, jamur kulit, dan bau badan tak sedap (prevent germs, fungi, and unpleasant body odor).',
  },
  {
    id: 10,
    type: 'pg',
    topic: 'Drying Body',
    difficulty: 'Mudah',
    text: 'After taking a refreshing shower, Siti uses a dry, clean ________ to dry her wet skin.',
    options: [
      { id: 'A', text: 'blanket' },
      { id: 'B', text: 'towel' },
      { id: 'C', text: 'pillowcase' },
      { id: 'D', text: 'curtain' },
    ],
    correctAnswer: 'B',
    explanation: 'Setelah mandi, kita mengeringkan tubuh yang basah menggunakan handuk bersih (clean towel).',
  },
  {
    id: 11,
    type: 'pg',
    topic: 'Hair Grooming Tools',
    difficulty: 'Mudah',
    text: 'Look at the picture below!\n\nAfter washing and drying his hair, Budi uses this item to make his hair neat and tidy. What is this tool called?',
    imageSvg: `<svg viewBox="0 0 460 200" class="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgComb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf5ff" />
      <stop offset="100%" stop-color="#f3e8ff" />
    </linearGradient>
    <linearGradient id="combGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="460" height="200" rx="16" fill="url(#bgComb)" stroke="#e9d5ff" stroke-width="2" />
  <!-- Comb Graphic -->
  <g transform="translate(90, 65)">
    <!-- Spine of comb -->
    <path d="M 0 10 Q 140 0 280 10 L 280 25 Q 140 18 0 25 Z" fill="url(#combGrad)" />
    <!-- Comb Teeth -->
    <path d="
      M 15 25 L 15 65 M 25 25 L 25 65 M 35 25 L 35 65 M 45 25 L 45 65
      M 55 25 L 55 65 M 65 25 L 65 65 M 75 25 L 75 65 M 85 25 L 85 65
      M 95 25 L 95 65 M 105 25 L 105 65 M 115 25 L 115 65 M 125 25 L 125 65
      M 135 25 L 135 65 M 145 25 L 145 65 M 155 25 L 155 65 M 165 25 L 165 65
      M 175 25 L 175 65 M 185 25 L 185 65 M 195 25 L 195 65 M 205 25 L 205 65
      M 215 25 L 215 65 M 225 25 L 225 65 M 235 25 L 235 65 M 245 25 L 245 65
      M 255 25 L 255 65 M 265 25 L 265 65
    " stroke="#7c3aed" stroke-width="3" stroke-linecap="round" />
  </g>
  <text x="230" y="170" font-size="12" font-weight="bold" fill="#6b21a8" text-anchor="middle">Hair Comb</text>
</svg>`,
    options: [
      { id: 'A', text: 'A toothbrush' },
      { id: 'B', text: 'A hair comb' },
      { id: 'C', text: 'A soup spoon' },
      { id: 'D', text: 'A wooden ruler' },
    ],
    correctAnswer: 'B',
    explanation: 'Gambar tersebut adalah sisir rambut (comb/hair comb), yang digunakan untuk merapikan rambut setelah mandi atau keramas.',
  },
  {
    id: 12,
    type: 'pg',
    topic: 'Imperatives & Advice (Should / Shouldn’t)',
    difficulty: 'Sedang',
    text: "Read the sentence and choose the best word to complete it:\n\n'Your hands and fingernails are full of garden soil. You ________ bite your fingernails because harmful germs can enter your mouth and cause stomachaches.'",
    options: [
      { id: 'A', text: 'should' },
      { id: 'B', text: "shouldn't (should not)" },
      { id: 'C', text: 'always' },
      { id: 'D', text: 'must' },
    ],
    correctAnswer: 'B',
    explanation: "Kita tidak boleh (should not / shouldn't) menggigit kuku karena kuman di sela kuku dapat tertelan dan memicu sakit perut.",
  },
  {
    id: 13,
    type: 'pg',
    topic: 'Daily Habits Dialogue',
    difficulty: 'Sedang',
    text: "Read the short dialogue below:\n\nKadek: 'Your teeth are so bright, healthy, and clean, Wayan! What do you do?'\nWayan: 'I always brush my teeth twice a day and I _______ eat too much sticky candy.'\n\nWhich word best fills the blank?",
    options: [
      { id: 'A', text: 'always' },
      { id: 'B', text: 'never / rarely' },
      { id: 'C', text: 'love to' },
      { id: 'D', text: 'must' },
    ],
    correctAnswer: 'B',
    explanation: 'Untuk mencegah kerusakan gigi dan lubang gigi, Wayan tidak pernah atau jarang (never / rarely) makan terlalu banyak permen lengket.',
  },
  {
    id: 14,
    type: 'pg',
    topic: 'School Environment Cleanliness',
    difficulty: 'Mudah',
    text: 'After finishing their snack at the school canteen, where should students throw the plastic wrappers and trash?',
    options: [
      { id: 'A', text: 'Under their classroom desk' },
      { id: 'B', text: 'Into the designated dustbin / trash can' },
      { id: 'C', text: 'Out of the window into the flower bed' },
      { id: 'D', text: 'Behind the school library door' },
    ],
    correctAnswer: 'B',
    explanation: 'Membuang sampah pada tempat sampah (dustbin / trash can) adalah kebiasaan menjaga kebersihan lingkungan sekolah.',
  },
  {
    id: 15,
    type: 'pg',
    topic: 'Morning Hygiene',
    difficulty: 'Mudah',
    text: 'Every morning right after getting out of bed, Anton washes his face with cold water so that he feels...',
    options: [
      { id: 'A', text: 'sleepy and lazy' },
      { id: 'B', text: 'fresh, awake, and energetic' },
      { id: 'C', text: 'angry and jealous' },
      { id: 'D', text: 'sick and weak' },
    ],
    correctAnswer: 'B',
    explanation: 'Membasuh muka di pagi hari membuat kita merasa segar, terjaga, dan bersemangat (fresh, awake, and energetic).',
  },
  {
    id: 16,
    type: 'pg',
    topic: 'Bedroom Hygiene',
    difficulty: 'Sedang',
    text: 'Why should we wash our bedsheets and pillowcases every one or two weeks?',
    options: [
      { id: 'A', text: 'To get rid of dust mites, sweat, and dead skin cells for healthier sleep' },
      { id: 'B', text: 'To make the colors fade quickly' },
      { id: 'C', text: 'Because clean sheets attract mosquitoes' },
      { id: 'D', text: 'To impress our classmates' },
    ],
    correctAnswer: 'A',
    explanation: 'Mencuci sprei dan sarung bantal secara rutin membersihkan tungau debu (dust mites), keringat, dan sel kulit mati agar tidur lebih sehat dan terhindar dari alergi kulit.',
  },
  {
    id: 17,
    type: 'pg',
    topic: 'Ear Hygiene Caution',
    difficulty: 'Sukar',
    text: "Doctor Ratna warns the students: 'Do not poke sharp objects or metal pins deep inside your ear canal.' What is the dangerous consequence of doing that?",
    options: [
      { id: 'A', text: 'It can tear the eardrum and cause permanent hearing loss' },
      { id: 'B', text: 'It makes your hair grow in reverse' },
      { id: 'C', text: 'It turns your teeth yellow' },
      { id: 'D', text: 'It makes your fingernails grow longer' },
    ],
    correctAnswer: 'A',
    explanation: 'Memasukkan benda tajam atau benda keras ke dalam liang telinga sangat berbahaya karena dapat merobek gendang telinga (tear the eardrum) dan menyebabkan gangguan pendengaran.',
  },
  {
    id: 18,
    type: 'pg',
    topic: 'Food Hygiene',
    difficulty: 'Sedang',
    text: 'Before peeling and eating fresh apples or guavas bought from the traditional market, what must we do first?',
    options: [
      { id: 'A', text: 'Leave them on the dusty kitchen floor' },
      { id: 'B', text: 'Wash the fruits thoroughly under clean running water' },
      { id: 'C', text: 'Wipe them with a dirty rag' },
      { id: 'D', text: 'Put them under a pile of books' },
    ],
    correctAnswer: 'B',
    explanation: 'Sebelum memakan buah segar, kita harus mencucinya di bawah air mengalir yang bersih (wash the fruits under clean running water) untuk menghilangkan kotoran dan residu pestisida.',
  },
  {
    id: 19,
    type: 'pg',
    topic: 'Adverbs of Frequency',
    difficulty: 'Sedang',
    text: "'Putu takes a shower once in the morning before school and once in the late afternoon after playing.'\n\nThis means Putu takes a shower ________.",
    options: [
      { id: 'A', text: 'once a week' },
      { id: 'B', text: 'twice a day' },
      { id: 'C', text: 'three times a month' },
      { id: 'D', text: 'never' },
    ],
    correctAnswer: 'B',
    explanation: 'Mandi sekali di pagi hari dan sekali di sore hari berarti mandi dua kali sehari (twice a day).',
  },
  {
    id: 20,
    type: 'pg',
    topic: 'Concept of Personal Hygiene',
    difficulty: 'Sedang',
    text: "What is the best definition of 'Personal Hygiene'?",
    options: [
      { id: 'A', text: 'Buying expensive imported clothing every month' },
      { id: 'B', text: 'The practice of keeping our body, hair, teeth, clothes, and surroundings clean to maintain good health and prevent diseases' },
      { id: 'C', text: 'Playing mobile games all night without sleeping' },
      { id: 'D', text: 'Eating fried snacks without drinking any water' },
    ],
    correctAnswer: 'B',
    explanation: 'Kebersihan diri (personal hygiene) adalah kebiasaan menjaga kebersihan tubuh, rambut, gigi, pakaian, dan lingkungan untuk memelihara kesehatan serta mencegah timbulnya penyakit.',
  },

  // =========================================================================
  // BAGIAN 2: PILIHAN GANDA KOMPLEKS (5 BUTIR SOAL: NO. 21 - 25)
  // Siswa dapat memilih lebih dari satu opsi jawaban yang benar.
  // =========================================================================
  {
    id: 21,
    type: 'pgk',
    topic: 'Bathroom Cleaning Items',
    difficulty: 'Sedang',
    text: 'Which of the following items are commonly found in the bathroom and used to clean our body during a bath or shower? (Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Body soap or liquid shower gel' },
      { id: 'B', text: 'A clean bath towel to dry off' },
      { id: 'C', text: 'A pencil sharpener' },
      { id: 'D', text: 'Hair shampoo to cleanse the scalp' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Sabun mandi (body soap), handuk (towel), dan sampo rambut (shampoo) adalah perlengkapan kebersihan badan di kamar mandi. Peraut pensil (pencil sharpener) adalah alat tulis sekolah.',
  },
  {
    id: 22,
    type: 'pgk',
    topic: 'Mealtime Hygiene Habits',
    difficulty: 'Sedang',
    text: 'Which good hygiene habits should we follow before having our lunch? (Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Wash our hands thoroughly with soap and running water' },
      { id: 'B', text: 'Ensure the plates, spoons, and drinking glasses are clean' },
      { id: 'C', text: 'Touch dirty dust and pet fur right before holding bread' },
      { id: 'D', text: 'Sit properly and cover food if it is not eaten immediately' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Sebelum makan, kita harus mencuci tangan dengan sabun, memastikan peralatan makan bersih, serta menutup makanan. Menyentuh debu atau bulu hewan sebelum memegang makanan adalah tindakan tidak higienis.',
  },
  {
    id: 23,
    type: 'pgk',
    topic: 'Consequences of Poor Hygiene',
    difficulty: 'Sedang',
    text: 'What negative health consequences can happen if someone rarely washes their body and neglects dental hygiene? (Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Tooth decay, painful cavities, and bad breath (halitosis)' },
      { id: 'B', text: 'Skin rashes, itchy infections, and strong body odor' },
      { id: 'C', text: 'Winning a sports tournament without training' },
      { id: 'D', text: 'Stomachache caused by bacteria on unwashed fingers' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Kebersihan yang buruk memicu gigi berlubang & bau mulut (A), gatal-gatal kulit & bau badan (B), serta sakit perut akibat kuman dari tangan kotor (D).',
  },
  {
    id: 24,
    type: 'pgk',
    topic: 'Proper Handwashing Steps',
    difficulty: 'Sedang',
    text: 'According to health standards, which of the following actions are correct steps when washing hands with soap? (Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Rub palms together to create rich soap lather' },
      { id: 'B', text: 'Clean between fingers and scrub under the fingernails' },
      { id: 'C', text: 'Rinse all soap foam thoroughly with clean running water' },
      { id: 'D', text: 'Wipe wet hands onto dirty trousers or floor cloth' },
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Langkah cuci tangan yang benar: menggosok telapak dengan busa sabun (A), membersihkan sela jari & bawah kuku (B), serta membilas dengan air mengalir (C). Mengelap tangan pada celana kotor (D) justru mengotori kembali tangan.',
  },
  {
    id: 25,
    type: 'pgk',
    topic: 'School Hygiene Etiquette',
    difficulty: 'Sedang',
    text: 'Which habits help maintain good hygiene and prevent the spread of germs among students at SD Negeri 3 Loloan Timur? (Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Covering mouth and nose with a handkerchief or elbow when sneezing' },
      { id: 'B', text: 'Flushing the school restroom toilet thoroughly with clean water after use' },
      { id: 'C', text: 'Spitting saliva on the classroom floor or corridor' },
      { id: 'D', text: 'Throwing used tissues and snack wrappers into the school dustbins' },
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: 'Menutup mulut saat bersin (A), menyiram toilet sekolah (B), dan membuang tisu bekas ke tempat sampah (D) adalah perilaku hidup bersih dan sehat di sekolah. Meludah di lantai (C) adalah perilaku jorok yang menyebarkan kuman.',
  },

  // =========================================================================
  // BAGIAN 3: PILIHAN GANDA KOMPLEKS KATEGORI (5 BUTIR SOAL: NO. 26 - 30)
  // Bentuk tabel pernyataan dengan respon Benar/Salah, Sesuai/Tidak Sesuai, atau Setuju/Tidak Setuju.
  // =========================================================================
  {
    id: 26,
    type: 'pgk_kategori',
    topic: 'Facts on Dental Care',
    difficulty: 'Sedang',
    categoryResponseType: 'benar_salah',
    text: 'Read each statement regarding dental hygiene habits and determine whether each statement is Benar (True) or Salah (False)!',
    statements: [
      {
        id: 's1',
        text: 'Brushing teeth twice a day helps remove dental plaque and leftover food particles.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Eating sugary lollipops right before sleeping without brushing teeth strengthens tooth enamel.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'A worn-out toothbrush with frayed bristles should be replaced every 3 months.',
        correctAnswer: true,
      },
      {
        id: 's4',
        text: 'You should only visit a dentist when your tooth has already broken and hurts terribly.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 Benar (menyikat gigi 2x sehari membersihkan plak). Pernyataan 2 Salah (makan gula sebelum tidur merusak email gigi). Pernyataan 3 Benar (ganti sikat gigi tiap 3 bulan). Pernyataan 4 Salah (pemeriksaan gigi rutin sebaiknya tiap 6 bulan sekali sebelum sakit).',
  },
  {
    id: 27,
    type: 'pgk_kategori',
    topic: "Reading: Made's Morning Routine",
    difficulty: 'Sedang',
    categoryResponseType: 'sesuai_tidak_sesuai',
    text: `Read the short reading passage carefully:

"Every morning at 05.30 AM, Made wakes up cheerfully. First, he makes his bed and opens the bedroom window so fresh morning breeze flows in. Next, he goes to the bathroom, takes a bath with refreshing soap, and brushes his teeth with mint toothpaste. After drying his body with a clean towel, he wears his neat school uniform. Before eating his breakfast, Made always washes his hands at the sink for 20 seconds."

Determine whether each statement below is Sesuai (Consistent) or Tidak Sesuai (Inconsistent) with the text!`,
    statements: [
      {
        id: 's1',
        text: 'Made brushes his teeth with mint toothpaste and dries himself with a clean towel.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Made washes his hands at the sink for 20 seconds before eating breakfast.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Made wears dirty clothes from yesterday after taking a bath.',
        correctAnswer: false,
      },
      {
        id: 's4',
        text: 'Made keeps his bedroom window closed and never lets fresh air inside.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 Sesuai (Made menyikat gigi dan mengeringkan badan dengan handuk bersih). Pernyataan 2 Sesuai (cuci tangan 20 detik sebelum sarapan). Pernyataan 3 Tidak Sesuai (Made memakai seragam sekolah rapi). Pernyataan 4 Tidak Sesuai (Made membuka jendela kamar tidur).',
  },
  {
    id: 28,
    type: 'pgk_kategori',
    topic: 'Hygiene Habits Evaluation',
    difficulty: 'Sedang',
    categoryResponseType: 'setuju_tidak_setuju',
    text: 'Read the everyday hygiene situations below. Decide whether you Setuju (Agree) or Tidak Setuju (Disagree) with the habit described in each statement!',
    statements: [
      {
        id: 's1',
        text: 'Rian clips his fingernails once a week so black dirt and bacteria do not accumulate under his nails.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Budi shares his personal toothbrush with his classmates to save money on buying toiletries.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Ayu always flushes the toilet bowl with clean water and washes her hands after using the school restroom.',
        correctAnswer: true,
      },
      {
        id: 's4',
        text: 'Ketut wipes his running nose and sweat directly using the sleeve of his school shirt.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 Setuju (memotong kuku seminggu sekali mencegah sarang kuman). Pernyataan 2 Tidak Setuju (sikat gigi adalah benda pribadi dan tidak boleh dipakai bersama). Pernyataan 3 Setuju (menyiram toilet dan cuci tangan). Pernyataan 4 Tidak Setuju (gunakan saputangan atau tisu untuk menyeka hidung, bukan lengan baju).',
  },
  {
    id: 29,
    type: 'pgk_kategori',
    topic: 'Tools & Functions Matching',
    difficulty: 'Mudah',
    categoryResponseType: 'benar_salah',
    text: 'Determine whether each hygiene tool and its stated function below is Benar (True) or Salah (False)!',
    statements: [
      {
        id: 's1',
        text: 'Shampoo is used to cleanse the hair and remove grease from the scalp.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'A nail clipper is used to safely trim long fingernails and toenails.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'A bath towel is primarily used to scrub dirty dishes in the kitchen sink.',
        correctAnswer: false,
      },
      {
        id: 's4',
        text: 'Hand sanitizer helps kill germs on hands when water and soap are unavailable.',
        correctAnswer: true,
      },
    ],
    explanation: 'Pernyataan 1 Benar (sampo untuk rambut). Pernyataan 2 Benar (gunting kuku untuk memotong kuku). Pernyataan 3 Salah (handuk mandi untuk mengeringkan tubuh, bukan mencuci piring). Pernyataan 4 Benar (hand sanitizer membunuh kuman saat tidak ada air dan sabun).',
  },
  {
    id: 30,
    type: 'pgk_kategori',
    topic: 'Dialogue: School Health Clinic (UKS)',
    difficulty: 'Sedang',
    categoryResponseType: 'sesuai_tidak_sesuai',
    text: `Read the dialogue at the School Health Clinic (UKS):

Nurse Ratna : "Good morning, Wayan. Why are you holding your stomach?"
Wayan       : "Good morning, Nurse. My stomach hurts so badly."
Nurse Ratna : "What did you eat during the morning break?"
Wayan       : "I bought snacks from a street vendor and ate them quickly."
Nurse Ratna : "Did you wash your hands with soap before touching the food?"
Wayan       : "No, Nurse. I forgot because my friends were in a hurry. My hands were still dusty from playing marbles."
Nurse Ratna : "Dusty hands carry bacteria into your digestive system. Please rest, drink this warm water, and always wash your hands before eating next time!"

Determine whether each statement is Sesuai (Consistent) or Tidak Sesuai (Inconsistent) with the dialogue!`,
    statements: [
      {
        id: 's1',
        text: 'Wayan has a stomachache because he ate street snacks with dirty, dusty hands without washing them first.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Nurse Ratna advised Wayan to always wash his hands with soap before eating meals.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Wayan washed his hands thoroughly with antiseptic soap for two minutes before buying the snacks.',
        correctAnswer: false,
      },
      {
        id: 's4',
        text: 'Nurse Ratna said that dirty and dusty hands can never cause any stomach problems.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 Sesuai (Wayan sakit perut karena makan dengan tangan kotor berdebu). Pernyataan 2 Sesuai (Perawat menasihati agar selalu mencuci tangan dengan sabun sebelum makan). Pernyataan 3 Tidak Sesuai (Wayan lupa mencuci tangan). Pernyataan 4 Tidak Sesuai (tangan kotor membawa bakteri ke pencernaan).',
  },

  // =========================================================================
  // BAGIAN 4: ISIAN SINGKAT (5 BUTIR SOAL: NO. 31 - 35)
  // Siswa mengetikkan kata atau frasa singkat dalam bahasa Inggris.
  // Dilengkapi toleransi sinonim / kata kunci yang diterima.
  // =========================================================================
  {
    id: 31,
    type: 'isian',
    topic: 'Hair Cleansing Product',
    difficulty: 'Mudah',
    text: 'We use bath soap to wash our body skin, and we use ________ to wash and cleanse our hair.',
    correctAnswer: 'shampoo',
    acceptableAnswers: ['shampoo', 'hair shampoo', 'sampo', 'shampo'],
    explanation: 'Cairan pembersih yang digunakan khusus untuk keramas mencuci rambut adalah sampo (shampoo).',
  },
  {
    id: 32,
    type: 'isian',
    topic: 'Body Drying Cloth',
    difficulty: 'Mudah',
    text: 'After finishing a bath or shower, we dry our wet skin using a clean ________.',
    correctAnswer: 'towel',
    acceptableAnswers: ['towel', 'bath towel', 'clean towel', 'handuk'],
    explanation: 'Kain penyerap air yang digunakan untuk mengeringkan tubuh setelah mandi adalah handuk (towel).',
  },
  {
    id: 33,
    type: 'isian',
    topic: 'Brushing Frequency',
    difficulty: 'Mudah',
    text: 'To protect our teeth from cavities and plaque, dentists recommend brushing our teeth at least ________ a day (in the morning and before going to bed).',
    correctAnswer: 'twice',
    acceptableAnswers: ['twice', 'twice a day', '2 times', 'two times', 'dua kali', '2x'],
    explanation: 'Frekuensi yang dianjurkan untuk menyikat gigi adalah minimal dua kali sehari (twice a day).',
  },
  {
    id: 34,
    type: 'isian',
    topic: 'Hand Cleansing Agent',
    difficulty: 'Mudah',
    text: 'Washing hands with only plain water is not enough to eliminate germs. We must wash our hands using clean running water and ________.',
    correctAnswer: 'soap',
    acceptableAnswers: ['soap', 'hand soap', 'sabun', 'sabun cuci tangan'],
    explanation: 'Bahan pembersih yang digunakan bersama air mengalir untuk mengangkat lemak dan kuman pada tangan adalah sabun (soap / hand soap).',
  },
  {
    id: 35,
    type: 'isian',
    topic: 'Nail Grooming Tool',
    difficulty: 'Mudah',
    text: 'When our fingernails grow too long and collect black dirt, we trim them neatly using a nail ________.',
    correctAnswer: 'clipper',
    acceptableAnswers: ['clipper', 'nail clipper', 'cutter', 'nail cutter', 'clippers', 'nail clippers', 'pemotong kuku'],
    explanation: 'Alat untuk memotong kuku yang panjang dan kotor adalah gunting kuku / pemotong kuku (nail clipper / nail cutter).',
  },
];
