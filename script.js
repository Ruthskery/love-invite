// ============================================
// FLOATING HEARTS BACKGROUND GENERATOR
// ============================================
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 5) + "s";
  heart.style.fontSize = (Math.random() * 10 + 15) + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 300);

// ============================================
// HEART-SHAPED IMAGES BACKGROUND
// ============================================
const heartImagesContainer = document.getElementById("heartImagesContainer");

// Add your image filenames here (place them in assets folder)
const coupleImages = [
  'assets/photo1.jpg',
  'assets/photo2.jpg',
  'assets/photo3.jpg',
  'assets/photo4.jpg',
];

function createHeartImage() {
  const heartImage = document.createElement("div");
  heartImage.classList.add("heart-image");
  
  const img = document.createElement("img");
  // Randomly select an image from the array
  const randomImage = coupleImages[Math.floor(Math.random() * coupleImages.length)];
  img.src = randomImage;
  img.alt = "Couple Memory";
  
  // Random horizontal position
  heartImage.style.left = Math.random() * 100 + "vw";
  
  // Random animation duration (12-18 seconds)
  heartImage.style.animationDuration = (Math.random() * 6 + 12) + "s";
  
  // Random horizontal drift
  const drift = (Math.random() - 0.5) * 200; // -100px to 100px
  heartImage.style.setProperty('--drift', drift + 'px');
  
  // Random delay
  heartImage.style.animationDelay = Math.random() * 5 + "s";
  
  // SMALLER size range: 200px to 350px
  const size = 200 + Math.random() * 150;
  heartImage.style.width = size + "px";
  heartImage.style.height = size + "px";
  
  heartImage.appendChild(img);
  heartImagesContainer.appendChild(heartImage);
  
  // Remove after animation completes
  setTimeout(() => {
    heartImage.remove();
  }, 23000); // Max duration + delay
}

// Create heart images at intervals - REDUCED FREQUENCY
setInterval(createHeartImage, 6000); // Create a new heart every 6 seconds (was 3)

// Create initial batch - FEWER HEARTS
for (let i = 0; i < 2; i++) {
  setTimeout(() => createHeartImage(), i * 2000);
}

// ============================================
// MUSIC CONTROL
// ============================================
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = musicToggle.querySelector(".music-icon");
let isMusicPlaying = false;

musicToggle.addEventListener("click", function(e) {
  e.stopPropagation();
  
  if (isMusicPlaying) {
    bgMusic.pause();
    musicIcon.textContent = "🔇";
    musicToggle.classList.remove("playing");
    isMusicPlaying = false;
  } else {
    bgMusic.play().catch(err => {
      console.log("Music play failed:", err);
    });
    musicIcon.textContent = "🔊";
    musicToggle.classList.add("playing");
    isMusicPlaying = true;
  }
});

// Auto-play music on first user interaction
document.addEventListener("click", function playMusicOnce(e) {
  if (!isMusicPlaying && e.target !== musicToggle && !musicToggle.contains(e.target)) {
    bgMusic.play().then(() => {
      musicIcon.textContent = "🔊";
      musicToggle.classList.add("playing");
      isMusicPlaying = true;
    }).catch(err => {
      console.log("Autoplay prevented");
    });
  }
}, { once: true });

// ============================================
// ENVELOPE OPENING ANIMATION
// ============================================
const envelopeContainer = document.getElementById("envelopeMainContainer");
const clickMessage = document.getElementById("clickMessage");
let isOpened = false;

// Hover effect
envelopeContainer.addEventListener('mouseenter', function() {
  if (!isOpened) {
    this.style.transform = 'scale(1.02)';
  }
});

envelopeContainer.addEventListener('mouseleave', function() {
  if (!isOpened) {
    this.style.transform = 'scale(1)';
  }
});

// Open envelope on click
document.addEventListener("click", function openEnvelope(e) {
  if (e.target.tagName === 'BUTTON' || e.target.closest('.music-control')) {
    return;
  }
  
  if (!isOpened) {
    envelopeContainer.style.animation = 'envelopeShake 0.3s ease';
    
    setTimeout(() => {
      envelopeContainer.classList.add("opened");
      clickMessage.style.display = "none";
      isOpened = true;
      createSparkles(e.clientX, e.clientY);
    }, 300);
    
    document.removeEventListener("click", openEnvelope);
  }
});

// ============================================
// SHAKE ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes envelopeShake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }
`;
document.head.appendChild(style);

// ============================================
// SPARKLE EFFECT
// ============================================
function createSparkles(x, y) {
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    
    const angle = (Math.PI * 2 * i) / 20;
    const distance = Math.random() * 100 + 50;
    
    sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleFloat {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// EMAIL NOTIFICATION FUNCTION
// ============================================
async function sendEmailNotification(response) {
  try {
    const formData = new FormData();
    formData.append('_subject', `💌 Valentine Response: ${response}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('Name', 'Carmela 💖');
    formData.append('Response', response);
    formData.append('Date', new Date().toLocaleDateString());
    formData.append('Time', new Date().toLocaleTimeString());

    // Send email in background without navigation
    await fetch('', {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // This prevents CORS issues
    });
    
    console.log('Email notification sent successfully');
  } catch (error) {
    console.log('Email notification failed:', error);
    // Continue with the animation even if email fails
  }
}

// ============================================
// BUTTON ACTIONS
// ============================================
// ============================================
// BUTTON ACTIONS
// ============================================
function sayYes() {
  // Send email notification
  sendEmailNotification('YES! 💘');
  
  // Preserve music state
  const musicElement = document.getElementById("bgMusic");
  const wasMusicPlaying = !musicElement.paused;
  
  // Show response page
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.innerHTML = getYesPageHTML();
    
    // Restore music
    if (wasMusicPlaying) {
      const newMusic = document.getElementById("bgMusic");
      if (newMusic) {
        newMusic.currentTime = musicElement.currentTime; // Continue from same position
        newMusic.play().catch(err => console.log("Music resume failed:", err));
      }
    }
    
    document.body.style.opacity = '1';
    initializeYesPage();
  }, 500);
}

function sayOfCourse() {
  // Send email notification
  sendEmailNotification('OF COURSE! 😘');
  
  // Preserve music state
  const musicElement = document.getElementById("bgMusic");
  const wasMusicPlaying = !musicElement.paused;
  
  // Show response page
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.innerHTML = getOfCoursePageHTML();
    
    // Restore music
    if (wasMusicPlaying) {
      const newMusic = document.getElementById("bgMusic");
      if (newMusic) {
        newMusic.currentTime = musicElement.currentTime; // Continue from same position
        newMusic.play().catch(err => console.log("Music resume failed:", err));
      }
    }
    
    document.body.style.opacity = '1';
    initializeOfCoursePage();
  }, 500);
}

function sayOfCourse() {
  // Send email notification
  sendEmailNotification('OF COURSE! 😘');
  
  // Show response page
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.innerHTML = getOfCoursePageHTML();
    document.body.style.opacity = '1';
    initializeOfCoursePage();
  }, 500);
}

// ============================================
// YES PAGE
// ============================================
function getYesPageHTML() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
        
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          z-index: 9999;
        }
        
        .response-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 50%, #ffe4e1 100%);
          font-family: Poppins, sans-serif;
          text-align: center;
          color: #d63384;
          position: relative;
          overflow: hidden;
        }
        
        .response-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
        
        .content-box {
          background: linear-gradient(to bottom, #ffffff 0%, #fff5f7 100%);
          padding: 35px 45px;
          border-radius: 30px;
          box-shadow: 
            0 20px 60px rgba(214, 51, 132, 0.3),
            0 10px 30px rgba(255, 105, 180, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          z-index: 10;
          max-width: 550px;
          width: 90%;
          border: 2px solid rgba(255, 182, 193, 0.3);
        }
        
        .content-box::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 30px;
          padding: 2px;
          background: linear-gradient(135deg, #ff85a2, #ffc0cb, #ff85a2);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          animation: shimmer 3s infinite;
        }
        
        .emoji-celebration {
          font-size: 70px;
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s backwards;
          margin-bottom: 15px;
          filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.3));
        }
        
        .main-heading {
          font-size: 48px;
          margin: 0 0 12px 0;
          animation: scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s backwards;
          background: linear-gradient(135deg, #d63384 0%, #ff4d88 50%, #ff85a2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(214, 51, 132, 0.2));
        }
        
        .sub-heading {
          font-size: 26px;
          margin: 0 0 18px 0;
          background: linear-gradient(90deg, #ff69b4, #ff85a2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideInLeft 0.8s ease 0.7s backwards;
        }
        
        .details-text {
          font-size: 18px;
          color: #666;
          margin: 15px 0;
          animation: fadeIn 0.8s ease 0.9s backwards;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .countdown-section {
          margin: 20px 0;
          padding: 18px;
          background: linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 100%);
          border-radius: 15px;
          animation: slideInRight 0.8s ease 1.1s backwards;
          box-shadow: 
            0 4px 15px rgba(255, 192, 203, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 182, 193, 0.3);
        }
        
        .countdown-label {
          font-size: 13px;
          color: #c2185b;
          font-weight: bold;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        
        .countdown-timer {
          font-size: 32px;
          background: linear-gradient(135deg, #d63384, #ff4d88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
          letter-spacing: 2px;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .heart-float {
          position: absolute;
          font-size: 30px;
          opacity: 0;
          animation: floatHeart 4s ease-in-out infinite;
          filter: drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3));
        }
        
        @media (max-width: 768px) {
          .content-box {
            padding: 35px 30px;
            max-width: 90%;
          }
          .main-heading {
            font-size: 40px;
          }
          .sub-heading {
            font-size: 24px;
          }
          .details-text {
            font-size: 16px;
          }
          .countdown-timer {
            font-size: 28px;
          }
          .emoji-celebration {
            font-size: 60px;
          }
        }
      </style>
    </head>
    <body>
    
      <audio id="bgMusic" loop>
        <source src="assets/bgmusic.mp3" type="audio/mpeg">
      </audio>

      <div class="response-container">
        <div class="content-box">
          <h1 class="main-heading">YAY!!!</h1>
          <p class="details-text">
            <strong>📅 February 13, 2026</strong><br>
            <strong>⏰ 8:00 PM</strong><br>
            <strong>📍 TBA</strong>
          </p>
          
          <div class="countdown-section">
            <div class="countdown-label">Countdown</div>
            <div class="countdown-timer" id="countdown">3</div>
          </div>
          
          <p class="details-text" style="font-style: italic; color: #ff69b4;">
            See you tomorrow!✨
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// OF COURSE PAGE
// ============================================
function getOfCoursePageHTML() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
        
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          z-index: 9999;
        }
        
        .response-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 50%, #ffe4e1 100%);
          font-family: Poppins, sans-serif;
          text-align: center;
          color: #d63384;
          position: relative;
          overflow: hidden;
        }
        
        .response-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
        
        .content-box {
          background: linear-gradient(to bottom, #ffffff 0%, #fff5f7 100%);
          padding: 35px 45px;
          border-radius: 30px;
          box-shadow: 
            0 20px 60px rgba(214, 51, 132, 0.3),
            0 10px 30px rgba(255, 105, 180, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          z-index: 10;
          max-width: 550px;
          width: 90%;
          border: 2px solid rgba(255, 182, 193, 0.3);
        }
        
        .content-box::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 30px;
          padding: 2px;
          background: linear-gradient(135deg, #ff85a2, #ffc0cb, #ff85a2);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          animation: shimmer 3s infinite;
        }
        
        .emoji-celebration {
          font-size: 70px;
          animation: wiggle 1s ease infinite;
          margin-bottom: 15px;
          filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.3));
        }
        
        .main-heading {
          font-size: 48px;
          margin: 0 0 12px 0;
          animation: scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s backwards;
          background: linear-gradient(135deg, #d63384 0%, #ff4d88 50%, #ff85a2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(214, 51, 132, 0.2));
        }
        
        .sub-heading {
          font-size: 26px;
          margin: 0 0 18px 0;
          background: linear-gradient(90deg, #ff69b4, #ff85a2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideInLeft 0.8s ease 0.7s backwards;
        }
        
        .details-text {
          font-size: 17px;
          color: #666;
          margin: 15px 0;
          animation: fadeIn 0.8s ease 0.9s backwards;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .info-box {
          margin: 20px 0;
          padding: 20px;
          background: linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 100%);
          border-radius: 15px;
          animation: slideInRight 0.8s ease 1.1s backwards;
          box-shadow: 
            0 4px 15px rgba(255, 192, 203, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 182, 193, 0.3);
        }
        
        .info-box h3 {
          color: #c2185b;
          font-size: 16px;
          margin: 0 0 12px 0;
          letter-spacing: 1px;
          animation: fadeIn 0.6s ease 1.3s backwards;
        }
        
        .info-box p {
          margin: 6px 0;
          font-size: 15px;
          background: linear-gradient(90deg, #d63384, #ff4d88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeIn 0.6s ease 1.4s backwards;
        }
        
        .heart-float {
          position: absolute;
          font-size: 30px;
          opacity: 0;
          animation: floatHeart 4s ease-in-out infinite;
          filter: drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3));
        }
        
        @media (max-width: 768px) {
          .content-box {
            padding: 35px 30px;
            max-width: 90%;
          }
          .main-heading {
            font-size: 40px;
          }
          .sub-heading {
            font-size: 24px;
          }
          .details-text {
            font-size: 16px;
          }
          .info-box p {
            font-size: 14px;
          }
          .emoji-celebration {
            font-size: 60px;
          }
        }
      </style>
    </head>
    <body>

      <audio id="bgMusic" loop>
        <source src="assets/bgmusic.mp3" type="audio/mpeg">
      </audio>

      <div class="response-container">
        <div class="content-box">
          <h1 class="main-heading">Thank You!</h1>
          <h2 class="sub-heading">I can't wait!</h2>
          
          <div class="info-box">
            <p><strong>📅 February 13, 2026</strong></p>
            <p><strong>⏰ 8:00 PM </strong></p>
            <p><strong>📍 TBA</strong></p>
            <p><strong>👗 TBA</strong></p>
          </div>
          
          <p class="details-text" style="font-size: 16px; color: #999;">
            See you tomorrow!✨
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// INITIALIZE YES PAGE
// ============================================
function initializeYesPage() {
  // Confetti effect
  setTimeout(() => {
    const colors = ['#ff4d88', '#ff85a2', '#ffc0cb', '#d63384', '#ff69b4', '#ffe4e1'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        const duration = 2 + Math.random() * 2;
        confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }, i * 20);
    }
  }, 100);
  
  // Floating hearts
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    const hearts = ['💖', '💕', '💗', '💘'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    const container = document.querySelector('.response-container');
    if (container) {
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  }, 500);
  
  // Countdown timer
  function updateCountdown() {
    const eventDate = new Date('2026-02-12T20:00:00');
    const now = new Date();
    const diff = eventDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.textContent = days;
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// ============================================
// INITIALIZE OF COURSE PAGE
// ============================================
function initializeOfCoursePage() {
  // Confetti effect
  setTimeout(() => {
    const colors = ['#ff4d88', '#ff85a2', '#ffc0cb', '#d63384', '#ff69b4', '#ffe4e1'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        const duration = 2 + Math.random() * 2;
        confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }, i * 20);
    }
  }, 100);
  
  // Floating hearts
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    const hearts = ['💖', '💕', '💗', '💘', '😘'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    const container = document.querySelector('.response-container');
    if (container) {
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  }, 500);
}