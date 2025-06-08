const memorySymbols = ["🍎","🍌","🍒","🍇","🍎","🍌","🍒","🍇"];
        let memoryFlipped = [], memoryMatched = [], memoryLock = false, memoryTries = 0;
        let memoryHighscore = localStorage.getItem('memoryHighscore') || null;
        document.getElementById('memory-highscore').textContent = memoryHighscore ? `Best: ${memoryHighscore} tries` : 'Best: -';
        function startMemoryGame() {
            let arr = [...memorySymbols].sort(() => Math.random() - 0.5);
            const board = document.getElementById('memory-board');
            board.innerHTML = '';
            memoryFlipped = [];
            memoryMatched = [];
            memoryLock = false;
            memoryTries = 0;
            document.getElementById('memory-status').textContent = '';
            arr.forEach((sym, i) => {
                const btn = document.createElement('button');
                btn.textContent = '?';
                btn.onclick = () => flipMemoryCard(i, sym, btn);
                board.appendChild(btn);
            });
        }
        function flipMemoryCard(i, sym, btn) {
            if (memoryLock || memoryMatched.includes(i) || memoryFlipped.some(f => f.i === i)) return;
            btn.textContent = sym;
            memoryFlipped.push({i, sym, btn});
            if (memoryFlipped.length === 2) {
                memoryLock = true;
                memoryTries++;
                setTimeout(() => {
                    if (memoryFlipped[0].sym === memoryFlipped[1].sym) {
                        memoryMatched.push(memoryFlipped[0].i, memoryFlipped[1].i);
                        if (memoryMatched.length === memorySymbols.length) {
                            document.getElementById('memory-status').textContent = `You win in ${memoryTries} tries!`;
                            if (!memoryHighscore || memoryTries < memoryHighscore) {
                                memoryHighscore = memoryTries;
                                localStorage.setItem('memoryHighscore', memoryHighscore);
                                document.getElementById('memory-highscore').textContent = `Best: ${memoryHighscore} tries`;
                            }
                        }
                    } else {
                        memoryFlipped[0].btn.textContent = '?';
                        memoryFlipped[1].btn.textContent = '?';
                    }
                    memoryFlipped = [];
                    memoryLock = false;
                }, 700);
            }
        }
        startMemoryGame();