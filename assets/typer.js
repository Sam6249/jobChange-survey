// Typer.js - 打字機效果共用元件
class Typer {
  constructor(element, options = {}) {
    this.element = element;
    this.speed = options.speed || 10; // 每個字的間隔(ms)
    this.onComplete = options.onComplete || null;
    this._timer = null;
  }

  type(text) {
    this.stop();
    this.element.textContent = '';
    let i = 0;
    const typing = () => {
      if (i < text.length) {
        this.element.textContent += text[i++];
        this._timer = setTimeout(typing, this.speed);
      } else {
        if (typeof this.onComplete === 'function') this.onComplete();
      }
    };
    typing();
  }

  stop() {
    if (this._timer) clearTimeout(this._timer);
  }
}

// 用法：
// const typer = new Typer(document.getElementById('dialogueText'), { speed: 50 });
// typer.type('這是一段打字機效果的文字');
export default Typer; 