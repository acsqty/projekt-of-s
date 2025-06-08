const dodgeCanvas = document.getElementById('dodge-canvas');
        const dodgeCtx = dodgeCanvas.getContext('2d');
        let dodgePlayer, dodgeBlocks, dodgeScore, dodgeGameOver, dodgeAnim;
        let dodgeHighscore = localStorage.getItem('dodgeHighscore') || 0;
        document.getElementById('dodge-highscore').textContent = "Highscore: " + dodgeHighscore;

        function startDodgeGame() {
            dodgePlayer = { x: 180, y: 370, w: 40, h: 20 };
            dodgeBlocks = [];
            dodgeScore = 0;
            dodgeGameOver = false;
            document.getElementById('dodge-score').textContent = "Score: 0";
            for (let i = 0; i < 3; i++) {
                dodgeBlocks.push({ x: Math.random() * 360, y: -Math.random() * 200, w: 40, h: 20, speed: 2 + Math.random() * 2 });
            }
            dodgeUpdate();
        }
        function dodgeUpdate() {
            dodgeCtx.clearRect(0, 0, 400, 400);
            dodgeCtx.fillStyle = "#3b82f6";
            dodgeCtx.fillRect(dodgePlayer.x, dodgePlayer.y, dodgePlayer.w, dodgePlayer.h);
            dodgeCtx.fillStyle = "#ef4444";
            dodgeBlocks.forEach(b => {
                b.y += b.speed;
                if (b.y > 400) {
                    b.y = -20;
                    b.x = Math.random() * 360;
                    dodgeScore++;
                    document.getElementById('dodge-score').textContent = "Score: " + dodgeScore;
                    if (dodgeScore > dodgeHighscore) {
                        dodgeHighscore = dodgeScore;
                        localStorage.setItem('dodgeHighscore', dodgeHighscore);
                        document.getElementById('dodge-highscore').textContent = "Highscore: " + dodgeHighscore;
                    }
                }
                dodgeCtx.fillRect(b.x, b.y, b.w, b.h);
                if (b.x < dodgePlayer.x + dodgePlayer.w && b.x + b.w > dodgePlayer.x && b.y < dodgePlayer.y + dodgePlayer.h && b.y + b.h > dodgePlayer.y) {
                    dodgeGameOver = true;
                }
            });
            if (dodgeGameOver) {
                dodgeCtx.font = "bold 2rem sans-serif";
                dodgeCtx.fillStyle = "#fff";
                dodgeCtx.fillText("Game Over!", 120, 200);
                return;
            }
            dodgeAnim = requestAnimationFrame(dodgeUpdate);
        }
        dodgeCanvas.addEventListener('mousemove', e => {
            const rect = dodgeCanvas.getBoundingClientRect();
            dodgePlayer.x = Math.max(0, Math.min(360, e.clientX - rect.left - 20));
        });
        startDodgeGame();