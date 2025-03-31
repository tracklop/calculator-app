document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const resultBox = document.getElementById('result');
    const errorBox = document.getElementById('error');

    if (!form || !resultBox || !errorBox) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        resultBox.textContent = '';
        errorBox.textContent = '';

        const operand1 = parseFloat(document.getElementById('operand1').value);
        const operand2 = parseFloat(document.getElementById('operand2').value);
        const operator = document.getElementById('operator').value;

        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ operand1, operand2, operator }),
            });

            const data = await response.json();

            if (!response.ok) {
                errorBox.textContent = data.error || 'Une erreur est survenue.';
                return;
            }

            resultBox.textContent = `Résultat : ${data.result}`;
            form.reset();
        } catch (err) {
            errorBox.textContent = 'Erreur réseau ou serveur.';
        }
    });
});
