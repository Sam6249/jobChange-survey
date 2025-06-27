// attack.js
// 能量球攻擊動畫元件

const ENERGY_BALLS = [
  { key: 'land',  img: 'https://github.com/Sam6249/jobChange-survey/blob/main/assets/images/land.png?raw=true' }, // 左下
  { key: 'water', img: 'https://github.com/Sam6249/jobChange-survey/blob/main/assets/images/water.png?raw=true' }, // 中下
  { key: 'wind',  img: 'https://github.com/Sam6249/jobChange-survey/blob/main/assets/images/wind.png?raw=true' }, // 右下
  { key: 'light', img: 'https://github.com/Sam6249/jobChange-survey/blob/main/assets/images/light.png?raw=true' }, // 左上
  { key: 'fire',  img: 'https://github.com/Sam6249/jobChange-survey/blob/main/assets/images/fire.png?raw=true' }, // 右上
];

/**
 * 顯示能量球攻擊動畫
 * @param {Object} options
 * @param {Function} [options.onAttackEnd] - 動畫結束後的 callback
 * @param {string} [options.parentSelector] - 要插入的父層選擇器，預設 body
 */
export function showAttackAnimation({ onAttackEnd, parentSelector } = {}) {
  // 避免重複插入
  if (document.getElementById('energyAttack')) return;
  const parent = parentSelector ? document.querySelector(parentSelector) : document.body;
  const attackDiv = document.createElement('div');
  attackDiv.className = 'energy-attack';
  attackDiv.id = 'energyAttack';
  attackDiv.innerHTML = `
    ${ENERGY_BALLS.map(e => `<img src="${e.img}" class="energy-ball ${e.key}" />`).join('')}
    <button class="attack-btn" id="attackBtn">發動攻擊</button>
  `;
  parent.appendChild(attackDiv);

  // 動畫樣式
  if (!document.getElementById('energyAttackStyle')) {
    const style = document.createElement('style');
    style.id = 'energyAttackStyle';
    style.textContent = `
      @keyframes shake {
        0% { transform: translate(0, 0) rotate(0deg);}
        20% { transform: translate(-8px, 2px) rotate(-2deg);}
        40% { transform: translate(8px, -2px) rotate(2deg);}
        60% { transform: translate(-6px, 2px) rotate(-1deg);}
        80% { transform: translate(6px, -2px) rotate(1deg);}
        100% { transform: translate(0, 0) rotate(0deg);}
      }
      .bg-fade.shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      .bg-hit-flash {
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.5);
        pointer-events: none;
        z-index: 2;
        animation: flash 0.25s;
      }
      @keyframes flash {
        0% { opacity: 0.8; }
        100% { opacity: 0; }
      }
      .energy-attack {
        position: absolute;
        left: 50%;
        bottom: 160px;
        transform: translateX(-50%);
        z-index: 300;
        width: 380px;
        height: 220px;
        /* pointer-events: none; */
      }
      .energy-ball {
        position: absolute;
        width: 90px;
        height: 90px;
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
        pointer-events: none;
      }
      .energy-ball.land   { left: 0px;   top: 110px; }   /* 左下 */
      .energy-ball.water  { left: 145px; top: 110px; }   /* 中下 */
      .energy-ball.wind   { left: 290px; top: 110px; }   /* 右下 */
      .energy-ball.light  { left: 60px;  top: 10px;  }   /* 左上 */
      .energy-ball.fire   { left: 220px; top: 10px;  }   /* 右上 */
      .energy-ball.show {
        opacity: 1;
        transform: scale(1.1);
      }
      .attack-btn {
        position: absolute;
        left: 50%;
        bottom: -70px;
        transform: translateX(-50%);
        margin: 0;
        padding: 1rem 2.5rem;
        font-size: 1.3rem;
        font-weight: bold;
        background: #222;
        color: #fff;
        border: 3px solid #ffb03a;
        border-radius: 18px;
        cursor: pointer;
        box-shadow: 0 4px 24px #ffb03a55;
        transition: background 0.2s;
      }
      .attack-btn:hover { background: #ffb03a; color: #222; }
    `;
    document.head.appendChild(style);
  }

  // 依序顯示能量球
  attackDiv.style.display = 'flex';
  attackDiv.querySelectorAll('.energy-ball').forEach((ball, idx) => {
    setTimeout(() => ball.classList.add('show'), idx * 120);
  });

  // 發動攻擊動畫
  attackDiv.querySelector('#attackBtn').onclick = function() {
    // 目標點（energy-attack 區塊中央上方）
    const targetX = 145; // 380/2 - 45 (球寬一半)
    const targetY = -120;
    attackDiv.querySelectorAll('.energy-ball').forEach((ball) => {
      // 取得球的初始位置
      const rect = ball.getBoundingClientRect();
      const parentRect = attackDiv.getBoundingClientRect();
      const startX = rect.left - parentRect.left;
      const startY = rect.top - parentRect.top;
      // 計算位移量
      const dx = targetX - startX;
      const dy = targetY - startY;
      // 動畫
      ball.style.transition = 'transform 0.8s cubic-bezier(.7,2,.3,1), opacity 0.8s';
      ball.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
      ball.style.opacity = 0;
    });
    // bg-fade 搖晃
    const bgFade = document.querySelector('.bg-fade');
    if (bgFade) {
      bgFade.classList.add('shake');
      setTimeout(() => bgFade.classList.remove('shake'), 500);
      // 閃爍特效
      const flash = document.createElement('div');
      flash.className = 'bg-hit-flash';
      bgFade.parentNode.appendChild(flash);
      setTimeout(() => flash.remove(), 250);
      // 換背景圖
      bgFade.style.background = 'url("../assets/images/1-bg.png") no-repeat center';
      bgFade.style.backgroundSize = 'contain';
    }
    setTimeout(() => {
      attackDiv.remove();
      if (typeof onAttackEnd === 'function') onAttackEnd();
      setTimeout(() => {
        window.location.href = 'stage2.html';
      }, 1500);
    }, 900);
  };
} 