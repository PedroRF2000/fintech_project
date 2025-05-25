document.addEventListener('DOMContentLoaded', function() {
    const recordBtn = document.getElementById('recordButton');
    const stopBtn = document.getElementById('stopButton');
    let waveInterval;
    let mediaRecorder;
    let audioChunks = [];

    if (recordBtn && stopBtn) {
        recordBtn.addEventListener('click', async function() {
            try {
                this.disabled = true;
                stopBtn.disabled = false;
                this.classList.add('recording');
                
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    // Aqui você enviaria o áudio para o servidor em uma aplicação real
                    console.log('Áudio gravado:', audioBlob);
                };
                
                mediaRecorder.start();
                
                // Anima as barras de onda
                const waveBars = document.querySelectorAll('.wave-bar');
                waveInterval = setInterval(() => {
                    waveBars.forEach(bar => {
                        bar.style.height = `${Math.random() * 80 + 20}%`;
                    });
                }, 100);

            } catch (error) {
                console.error("Erro ao acessar microfone:", error);
                alert("Erro ao acessar o microfone. Por favor, verifique as permissões.");
                resetRecording();
            }
        });

        stopBtn.addEventListener('click', function() {
            // Para a gravação
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
            
            clearInterval(waveInterval);
            resetRecording();
            
            // Processamento simulado
            setTimeout(() => {
                alert('Validação por voz concluída com sucesso!');
                window.location.href = 'index.html';
            }, 2000);
        });

        function resetRecording() {
            if (recordBtn) {
                recordBtn.disabled = false;
                recordBtn.classList.remove('recording');
            }
            if (stopBtn) stopBtn.disabled = true;
            document.querySelectorAll('.wave-bar').forEach(bar => {
                bar.style.height = '10%';
            });
        }

        // Limpeza ao sair da página
        window.addEventListener('beforeunload', function() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            clearInterval(waveInterval);
        });
    }
});