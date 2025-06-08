let reactionTimeout, reactionStart;
        let reactionHighscore = localStorage.getItem('reactionHighscore') || null;
        document.getElementById('reaction-highscore').textContent = reactionHighscore ? `Best: ${reactionHighscore} ms` : 'Best: - ms';
        const box = document.getElementById('reaction-box');
        box.onclick = () => {
            if (box.textContent === 'Click!') {
                const time = Date.now() - reactionStart;
                document.getElementById('reaction-result').textContent = `Your reaction: ${time} ms`;
                if (!reactionHighscore || time < reactionHighscore) {
                    reactionHighscore = time;
                    localStorage.setItem('reactionHighscore', reactionHighscore);
                    document.getElementById('reaction-highscore').textContent = `Best: ${reactionHighscore} ms`;
                }
                box.textContent = 'Click to Start';
                box.style.background = '#222';
            } else {
                box.textContent = 'Wait...';
                box.style.background = '#fbbf24';
                document.getElementById('reaction-result').textContent = '';
                reactionTimeout = setTimeout(() => {
                    box.textContent = 'Click!';
                    box.style.background = '#10b981';
                    reactionStart = Date.now();
                }, 1000 + Math.random() * 2000);
            }
        };