const goals2025 = {};
        const goals2026 = {};

        function initializeGoals() {
            document.querySelectorAll('#tab-2025 .goal-item').forEach((item, index) => {
                const isCompleted = item.dataset.completed === 'true';
                goals2025[index] = isCompleted;
            });

            document.querySelectorAll('#tab-2026 .goal-item').forEach((item, index) => {
                const isCompleted = item.dataset.completed === 'true';
                goals2026[index] = isCompleted;
            });

            updateProgress('2025');
            updateProgress('2026');
        }

        function updateProgress(year) {
            const goals = year === '2025' ? goals2025 : goals2026;
            const totalGoals = Object.keys(goals).length;
            const completedGoals = Object.values(goals).filter(val => val === true).length;
            const percentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

            const progressFill = document.getElementById(`progress-${year}`);
            progressFill.style.width = percentage + '%';
            progressFill.textContent = percentage + '%';
        }

        document.querySelectorAll('.goal-item').forEach((item, globalIndex) => {
            const checkbox = item.querySelector('.checkbox');
            const goalText = item.querySelector('.goal-text');
            const tab = item.closest('.tab-content').id;
            const year = tab.split('-')[1];

            checkbox.addEventListener('click', () => {
                const items = Array.from(document.querySelectorAll(`#${tab} .goal-item`));
                const index = items.indexOf(item);
                const goals = year === '2025' ? goals2025 : goals2026;

                goals[index] = !goals[index];
                
                if (goals[index]) {
                    checkbox.classList.add('checked');
                    goalText.classList.add('completed');
                    item.dataset.completed = 'true';
                } else {
                    checkbox.classList.remove('checked');
                    goalText.classList.remove('completed');
                    item.dataset.completed = 'false';
                }

                updateProgress(year);
            });
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const year = btn.dataset.year;

                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(`tab-${year}`).classList.add('active');
            });
        });

        initializeGoals();