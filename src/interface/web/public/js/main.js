document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const resultBox = document.getElementById('result');
    const errorBox = document.getElementById('error');
    const historyList = document.getElementById('history-list');

    if (!form || !resultBox || !errorBox || !historyList) return;

    async function fetchHistory() {
        try {
            const res = await fetch('/history');
            const data = await res.json();
            historyList.innerHTML = '';

            data.forEach((calc, index) => {
                const li = document.createElement('li');
                li.textContent = `${calc.operand1} ${calc.operator} ${calc.operand2} = ${calc.result} (${new Date(calc.timestamp).toLocaleString()})`;

                const btn = document.createElement('button');
                btn.textContent = 'Modifier';
                btn.addEventListener('click', () => {
                    document.getElementById('operand1').value = calc.operand1;
                    document.getElementById('operand2').value = calc.operand2;
                    document.getElementById('operator').value = calc.operator;
                });

                li.appendChild(btn);
                historyList.appendChild(li);
            });
        } catch (err) {
            console.error("Erreur de récupération de l'historique", err);
        }
    }

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
            await fetchHistory();
        } catch (err) {
            errorBox.textContent = 'Erreur réseau ou serveur.';
        }
    });

    fetchHistory();
});
