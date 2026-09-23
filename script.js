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

    // 2. Geração Dinâmica de PDF com suporte nativo a cores estáticas
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function () {
            const element = document.getElementById('cv-content');
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

            // Define fundo do canvas explícito para evitar fundo transparente/branco indesejado
            const canvasBgColor = currentTheme === 'dark' ? '#1e293b' : '#ffffff';

            // Feedback visual no botão
            const originalText = downloadPdfBtn.textContent;
            downloadPdfBtn.textContent = '⏳ Gerando PDF...';
            downloadPdfBtn.disabled = true;

            // Aplica classe auxiliar para ajustar formatação no PDF
            element.classList.add('pdf-export');

            // Garante que elementos animados fiquem 100% visíveis
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

            const options = {
                margin:       [5, 5, 5, 5],
                filename:     `Curriculo_Alvaro_Alves_NOC_${currentTheme}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { 
                    scale: 2, 
                    useCORS: true, 
                    logging: false, 
                    backgroundColor: canvasBgColor,
                    windowWidth: 1000
                },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Pequeno delay para garantir que a classe .pdf-export foi totalmente aplicada no DOM antes da captura
            setTimeout(() => {
                html2pdf().set(options).from(element).save().then(() => {
                    element.classList.remove('pdf-export');
                    downloadPdfBtn.textContent = originalText;
                    downloadPdfBtn.disabled = false;
                }).catch(err => {
                    console.error('Erro ao gerar PDF:', err);
                    element.classList.remove('pdf-export');
                    downloadPdfBtn.textContent = originalText;
                    downloadPdfBtn.disabled = false;
                });
            }, 200);
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
