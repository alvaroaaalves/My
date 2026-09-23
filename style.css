document.addEventListener('DOMContentLoaded', function () {
    // 1. Gerenciamento do Tema Claro / Escuro (Padrão: Dark)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Obtém o tema salvo pelo usuário ou define 'dark' como o padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleBtnText(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleBtnText(newTheme);
        });
    }

    function updateToggleBtnText(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
        }
    }

    // 2. Geração Dinâmica de PDF via html2pdf
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function () {
            const element = document.getElementById('cv-content');

            // Feedback visual no botão
            const originalText = downloadPdfBtn.textContent;
            downloadPdfBtn.textContent = '⏳ Gerando PDF...';
            downloadPdfBtn.disabled = true;

            // Aplica estilos de impressão temporários para o PDF sair perfeito
            element.classList.add('pdf-mode');

            // Garante que todos os elementos estão visíveis
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

            const options = {
                margin:       [10, 10, 10, 10],
                filename:     'Curriculo_Alvaro_Alves_NOC.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Gera e baixa o arquivo
            html2pdf().set(options).from(element).save().then(() => {
                element.classList.remove('pdf-mode');
                downloadPdfBtn.textContent = originalText;
                downloadPdfBtn.disabled = false;
            }).catch(err => {
                console.error('Erro ao gerar PDF:', err);
                element.classList.remove('pdf-mode');
                downloadPdfBtn.textContent = originalText;
                downloadPdfBtn.disabled = false;
            });
        });
    }

    // 3. Animação de revelação na rolagem da página (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Efeito de digitação suave no título principal
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const fullText = nameElement.textContent;
        nameElement.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < fullText.length) {
                nameElement.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };

        setTimeout(typeWriter, 300);
    }
});
