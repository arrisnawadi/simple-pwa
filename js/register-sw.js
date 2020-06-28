if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('./../service-worker.js')
      .then(function () {
        console.log('Pendaftaran Service Worker berhasil!');
      })
      .catch(function () {
        console.log('Pendaftaran Service Worker gagal!');
      });
  });
} else {
  console.log('Service Worker belum didukung browser ini.');
}