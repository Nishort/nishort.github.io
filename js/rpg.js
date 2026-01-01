function getDailySeed() {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // "2024-12-01"
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
      seed += dateString.charCodeAt(i);
  }
  return seed;
}

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getSeededChoice(array, seed) {
  const index = Math.floor(seededRandom(seed) * array.length);
  return array[index];
}

const statuses = [
  "Exploring an abandoned dungeon...",
  "Working part-time to afford food...",
  "Dreaming about being successful...",
  "Grinding hard skills...",
  "Grinding soft skills...",
  "Bargaining with a suspicious stranger...",
  "Resting in a noisy pub...",
  "Fighting a giant slime!",
  "Fighting an emerald dragon!",
  "Fighting a boar!",
  "Struggling with an existential crisis!",
  "Sleeping in a comfy bed...",
  "Hiding from bandits in a dark cave...",
  "Enchanting equipment...",
  "Playing some good indie games!",
  "Reading a map of the nearby area...",
  "Playing with my cat...",
  "Drinking healing pots...",
  "Traveling to distant lands...",
  "Projecting non-Euclidean spaces...",
  "Trying to escape from liminal spaces...",
  "Cooking something delicious!",
  "Crying lonely ( ╥ω╥ )...",
  "Refactoring alien's code...",
  "Checking World Line number...",
  "Idling with no reason...",
  "Watching old animes..."
];

function updateDailyStats() {
  const dailySeed = getDailySeed();
  const rng = seededRandom;

  // 1. Get level
  let currentSeed = dailySeed;
  const level = document.getElementById('rpgLevelNum').textContent || 25;

  // 2. Generate HP 
  const maxHp = 50 + (level * 5); 
  const currentHp = Math.floor(rng(currentSeed++) * maxHp * 0.99) + Math.floor(maxHp * 0.01); 
  const hpPercent = (currentHp / maxHp) * 100;
  document.getElementById('rpgHpText').textContent = `${currentHp}/${maxHp}`;
  document.getElementById('rpgHpBar').style.width = `${hpPercent}%`;

  // 3. Generate MP 
  const maxMp = 30 + (level * 3);
  const currentMp = Math.floor(rng(currentSeed++) * maxMp * 0.99) + Math.floor(maxMp * 0.01); 
  const mpPercent = (currentMp / maxMp) * 100;
  document.getElementById('rpgMpText').textContent = `${currentMp}/${maxMp}`;
  document.getElementById('rpgMpBar').style.width = `${mpPercent}%`;

  // 4. Get status
  document.getElementById('rpgCharStatus').textContent = getSeededChoice(statuses, currentSeed++);
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateDailyStats);