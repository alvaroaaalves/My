document.addEventListener('DOMContentLoaded', function () {
    // 1. Ação do Botão de Impressão
    const printButton = document.getElementById('printBtn');
    if (printButton) {
        printButton.addEventListener('click', function () {
            window.print();
        });
    }

    // 2. Animação de revelação na rolagem da página (IntersectionObserver)
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

    // 3. Efeito de digitação suave no título principal
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
