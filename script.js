function randomText(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function drawCaptcha(text) {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = '36px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(text, 20, 35);

    // Add some noise
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

function generateCaptcha() {
    const text = randomText();
    drawCaptcha(text);
    document.getElementById('captchaCanvas').setAttribute('data-text', text);
}

function checkCaptcha() {
    const userInput = document.getElementById('captchaInput').value;
    const captchaText = document.getElementById('captchaCanvas').getAttribute('data-text');
    if (userInput === captchaText) {
        alert('CAPTCHA verified!');
    } else {
        alert('Incorrect CAPTCHA, please try again.');
    }
}

// Generate CAPTCHA on page load
window.onload = generateCaptcha;