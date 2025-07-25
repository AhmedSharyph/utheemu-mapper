let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const box = document.createElement('div');
  box.innerHTML = `
    <div style="position:fixed;bottom:20px;left:20px;right:20px;background:#fff;padding:14px;border-radius:12px;box-shadow:0 0 12px rgba(0,0,0,0.3);z-index:9999;text-align:center;">
      <p>📲 Add FunaTrace to your Home Screen</p>
      <button style="padding:10px 18px;background:#00bcd4;color:#fff;border:none;border-radius:6px;font-size:16px;" id="installBtn">Add</button>
    </div>`;
  document.body.appendChild(box);

  document.getElementById('installBtn').addEventListener('click', () => {
    box.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://ahmedsharyph.github.io/funadhoomapper/service-worker.js');
}
