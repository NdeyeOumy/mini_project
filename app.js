// script.js
document.addEventListener('DOMContentLoaded', () => {
    const resultField = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');
    const historyList = document.getElementById('history-list');

    // Load history from localStorage
    loadHistory();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (value === 'CE') {
                resultField.value = '';
            } else if (value === '←') {
                resultField.value = resultField.value.slice(0, -1);
            } else if (value === '=') {
                try {
                    const result = eval(resultField.value);
                    addToHistory(resultField.value + ' = ' + result);
                    resultField.value = result;
                } catch {
                    resultField.value = 'Erreur';
                }
            } else {
                resultField.value += value;
            }
        });
    });

    function addToHistory(entry) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(entry);
        if (history.length > 3) history.shift();
        localStorage.setItem('history', JSON.stringify(history));
        updateHistoryUI(history);
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        updateHistoryUI(history);
    }

    function updateHistoryUI(history) {
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement('li');
            li.innerText = entry;
            historyList.appendChild(li);
        });
    }
});
