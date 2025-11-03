/* Quiz logic for prettier site: two partners on same device, nicer result wording */
const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quizSection');
const quizForm = document.getElementById('quizForm');
const quizTitle = document.getElementById('quizTitle');
const resultsSection = document.getElementById('resultsSection');
const forecastCard = document.getElementById('forecastCard');
const signupSection = document.getElementById('signupSection');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const mockPay = document.getElementById('mockPay');

let partnerResults = [];
let currentPartner = 1;

startBtn.addEventListener('click', () => {
  startBtn.style.display='none';
  quizSection.classList.remove('hidden');
  quizTitle.innerText = `Partner ${currentPartner} — Quick Quiz`;
  window.scrollTo(0,0);
});

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(quizForm);
  let scores = [];
  for (let i=1;i<=6;i++){
    scores.push(parseInt(formData.get('q'+i),10));
  }
  partnerResults.push(scores);
  quizForm.reset();
  if (currentPartner===1){
    currentPartner=2;
    quizTitle.innerText = `Partner ${currentPartner} — Quick Quiz`;
    setTimeout(()=>alert('Nice! Now have Partner 2 take the quiz on the same device.'),200);
  } else {
    quizSection.classList.add('hidden');
    showForecast();
  }
});

function analyzeProfile(scores){
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  if (avg < 1.9) return {type:'Quiet & Reflective',key:1,desc:'You recharge with quiet and reflection.'};
  if (avg < 2.6) return {type:'Calm & Private',key:2,desc:'You value gentle check-ins and space.'};
  if (avg < 3.3) return {type:'Expressive & Direct',key:3,desc:'You prefer talking things through openly.'};
  if (avg < 3.9) return {type:'Action-Oriented',key:4,desc:'You like solving problems with practical steps.'};
  return {type:'Sensitive & Warm',key:5,desc:'You value reassurance and emotional closeness.'};
}

function mergeProfiles(p1, p2){
  const a = p1.key, b = p2.key;
  // common patterns with friendlier wording
  if ((a===1 && b===3) || (a===2 && b===3) || (a===3 && b===1)){
    return {
      weather:'Partly Cloudy ☁️',
      headline:'Push–Pull Pattern',
      trigger:'One partner pulls away while the other seeks immediate talk. Emotions can feel mismatched.',
      prevention:'Agree on a 20-minute timeout phrase, then return to the conversation with "I\'m back — can we try again?"'
    }
  }
  if ((a===4 && b===1) || (a===4 && b===2)){
    return {
      weather:'Cloudy with Sparks ⚡',
      headline:'Action vs Reflection',
      trigger:'Practical fixes meet emotional pause — impatience can build.',
      prevention:'Use "I need..." statements and schedule a quick practical follow-up after the emotional check-in.'
    }
  }
  if ((a===5 && b===3) || (a===3 && b===5)){
    return {
      weather:'Storm Likely ⛈️',
      headline:'Directness meets Sensitivity',
      trigger:'Direct feedback can feel like criticism to a sensitive partner.',
      prevention:'Start tough talks with validation: "I hear you, and..." followed by your point.'
    }
  }
  if (a===b){
    return {
      weather:'Mostly Sunny 🌤️',
      headline:'Aligned Styles',
      trigger:'You both likely handle stress similarly — watch for shared blind spots (e.g., avoiding hard talks).',
      prevention:'Try a weekly 5-minute check-in to surface small issues before they grow.'
    }
  }
  // default friendly output
  return {
    weather:'Mostly Sunny 🌤️',
    headline:'Mixed Styles — High Potential',
    trigger:'Tiredness and outside stress amplify small misunderstandings.',
    prevention:'Try a 60-second nightly appreciation ritual: mention one thing you noticed today.'
  }
}

function showForecast(){
  const p1 = analyzeProfile(partnerResults[0]);
  const p2 = analyzeProfile(partnerResults[1]);
  const merged = mergeProfiles(p1,p2);

  resultsSection.classList.remove('hidden');
  signupSection.classList.remove('hidden');

  forecastCard.innerHTML = `
    <div class="topline"><div class="weather">${merged.weather}</div><div class="headline">${merged.headline}</div></div>
    <p class="types"><strong>Partner 1:</strong> ${p1.type} — ${p1.desc}<br/><strong>Partner 2:</strong> ${p2.type} — ${p2.desc}</p>
    <hr/>
    <p><strong>Biggest Trigger:</strong> ${merged.trigger}</p>
    <p><strong>Prevention Tip:</strong> ${merged.prevention}</p>
    <hr/>
    <p class="action"><em>Tonight's 60s action:</em> Say: "<strong>I appreciated how you…</strong>"</p>
  `;
  window.scrollTo(0,document.body.scrollHeight);
}

// Download placeholder - recommend adding html2canvas in next version
downloadBtn.addEventListener('click', () => {
  alert('Download tool coming soon. For now, take a screenshot to share your forecast.');
});
resetBtn.addEventListener('click', () => location.reload());
mockPay.addEventListener('click', () => {
  alert('Deep Forecast sample:\n\n• Core Dynamic\n• Triggers & Scripts\n\nTo sell PDFs you can add Stripe + server PDF generation.');
});
