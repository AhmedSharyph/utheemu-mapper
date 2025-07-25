const form = document.getElementById('addressForm');
    const responseDiv = document.getElementById('response');
    const datalist = document.getElementById('addressList');
    const submitBtn = document.getElementById('submitBtn');

    // Load addresses from Google Sheet
    async function loadAddressOptions() {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbz8_X-uaxok6xQK0mog2hIvYVN_D3ydOPGOHdXC8SZ8tHulyVo2xm76NSTHCWaQ_8KzIg/exec?type=list");
        const addresses = await res.json();

        datalist.innerHTML = "";
        addresses.forEach(address => {
          const option = document.createElement("option");
          option.value = address;
          datalist.appendChild(option);
        });
      } catch (error) {
        console.error("Failed to load address list:", error);
      }
    }

    loadAddressOptions();

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      responseDiv.textContent = '';
      responseDiv.className = '';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const params = new URLSearchParams();
      for (const pair of formData) {
        params.append(pair[0], pair[1]);
      }

      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbxKRwa_EOW5CfVNaJZRP3-x01iuAmvw4GUgZBxnOMUFnEAyP23TsUslctQv3-sQhqiMWA/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        });

        const data = await res.json();

        if (data.result === 'success') {
          responseDiv.textContent = data.message;
          responseDiv.className = 'success';
          form.reset();
        } else {
          responseDiv.textContent = 'Error: ' + data.message;
          responseDiv.className = 'error';
        }
      } catch (error) {
        responseDiv.textContent = 'Error connecting to server.';
        responseDiv.className = 'error';
        console.error(error);
      }

      // Re-enable button and clear message after 5 seconds
      submitBtn.disabled = false;
      setTimeout(() => {
        responseDiv.textContent = '';
        responseDiv.className = '';
      }, 5000);
    });
