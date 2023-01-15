

function onSubmit(e) {
    e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
    
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    const key = document.querySelector('#apikey').value;
    // const n = document.querySelector('#number').value;
  
    if (prompt === '') {
        alert('Ве молиме внесете текст!');
        return;
    }

    if (key === '') {
        alert('Ве молиме внесете API клуч!');
        return;
    }
  
    generateImageRequest(prompt, size, key);
}
  
async function generateImageRequest(prompt, size, key) {
    try {
        const img = document.querySelector('#image');
        showSpinner();
        img.style.visibility = "hidden";
        document.querySelector('.msg').textContent = ''

        const response = await fetch('/generations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, size, key }),
        });
    
        if (!response.ok) {
            removeSpinner();
            throw new Error('Оваа слика неможе да се генерира.');
        }
    
        const data = await response.json();
        const imageUrl = data.data;
        img.style.visibility = "visible";
        img.src = imageUrl;
  
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}
  
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
  
function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}
  
document.querySelector('#image-form').addEventListener('submit', onSubmit);
