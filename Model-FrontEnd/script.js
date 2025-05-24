document.getElementById('autismForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Prediction failed');
      }

      const result = await response.json();
      document.getElementById('result').innerText = `Prediction: ${result.prediction}`;
  } catch (error) {
      document.getElementById('result').innerText = `Error: ${error.message}`;
  }
});