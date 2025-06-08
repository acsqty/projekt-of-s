 const targetCanvas = document.getElementById('target-canvas');
        const targetCtx = targetCanvas.getContext('2d');
        let target, targetScore, targetAnim;
        let targetHighscore = localStorage.getItem('targetHighscore') || 0;
        document.getElementById('target-highscore').textContent = "Highscore: " + targetHighscore;
        function startTargetGame() {
            target = {x:Math.random()*350+25, y:Math.random()*150+25, r:25, dx:2+Math.random()*2, dy:2+Math.random()*2};
            targetScore = 0;
            document.getElementById('target-score').textContent = 'Score: 0';
            targetUpdate();
        }
        function targetUpdate() {
            targetCtx.clearRect(0,0,400,200);
            target.x += target.dx; target.y += target.dy;
            if (target.x<target.r||target.x>400-target.r) target.dx*=-1;
            if (target.y<target.r||target.y>200-target.r) target.dy*=-1;
            targetCtx.beginPath();
            targetCtx.arc(target.x, target.y, target.r, 0, Math.PI*2);
            targetCtx.fillStyle = '#fbbf24';
            targetCtx.fill();
            targetCtx.strokeStyle = '#222';
            targetCtx.stroke();
            targetAnim = requestAnimationFrame(targetUpdate);
        }
        targetCanvas.addEventListener('mousedown', e => {
            const rect = targetCanvas.getBoundingClientRect();
            const mx = e.clientX - rect.left, my = e.clientY - rect.top;
            if ((mx-target.x)**2 + (my-target.y)**2 < target.r**2) {
                targetScore++;
                document.getElementById('target-score').textContent = 'Score: '+targetScore;
                if (targetScore > targetHighscore) {
                    targetHighscore = targetScore;
                    localStorage.setItem('targetHighscore', targetHighscore);
                    document.getElementById('target-highscore').textContent = "Highscore: " + targetHighscore;
                }
                target.x = Math.random()*350+25; target.y = Math.random()*150+25;
            }
        });
        startTargetGame();