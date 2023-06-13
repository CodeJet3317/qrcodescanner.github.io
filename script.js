document.getElementById('generate-btn').addEventListener('click', function() {
    var text = document.getElementById('text-input').value;
    var apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(text);
  
    fetch(apiUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Failed to generate QR code.');
        }
        return response.blob();
      })
      .then(function(blob) {
        var qrCodeUrl = URL.createObjectURL(blob);
        var qrCodeImg = document.createElement('img');
        qrCodeImg.src = qrCodeUrl;
        qrCodeImg.alt = 'QR Code';
        
        var qrCodeContainer = document.getElementById('qrcode');
        qrCodeContainer.innerHTML = '';
        qrCodeContainer.appendChild(qrCodeImg);

        // Create a download link
        var downloadLink = document.createElement('a');
        downloadLink.href = qrCodeUrl;
        downloadLink.download = 'qrcode.png';

        // Attach download link to the button
        var downloadButton = document.getElementById('download-btn');
        downloadButton.style.display = 'block';
        downloadButton.addEventListener('click', function() {
          downloadLink.click();
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  });