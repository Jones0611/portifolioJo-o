// Efeito Matrix no background com katakana
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        
        const alphabet = katakana + latin + nums + symbols;
        
        const fontSize = 18;
        const columns = canvas.width / fontSize;
        
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = Math.random() * canvas.height / fontSize;
        }
        
        const colors = ['#00ff00', '#00cc00', '#00aa00'];
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.font = `bold ${fontSize}px 'MS Gothic', 'Courier New', monospace`;
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        setInterval(draw, 50);
        
        // Atualiza o ano no footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Efeito de cursor piscante
        setInterval(() => {
            const cursor = document.querySelector('.cursor');
            cursor.style.visibility = (cursor.style.visibility === 'hidden' ? 'visible' : 'hidden');
        }, 500);
        
        // Ajusta o canvas quando a janela é redimensionada
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Atualizar data do currículo automaticamente
        document.getElementById('resume-update').textContent = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Verificar se o arquivo existe (opcional)
        fetch('Curriculo_JoaoVitorRodrigues.pdf')
            .then(response => {
                if (!response.ok) {
                    console.warn('Arquivo do currículo não encontrado!');
                    document.querySelector('.download-btn').style.opacity = '0.7';
                }
            })
            .catch(error => {
                console.error('Erro ao verificar currículo:', error);
            });