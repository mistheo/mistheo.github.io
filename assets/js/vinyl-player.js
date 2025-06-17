// vinyl-player.js
// Gestionnaire de lecture audio pour le lecteur vinyle

function vinylPlayer() {
    return {
        // État du lecteur
        isPlaying: false,
        isLoading: false,
        audio: null,
        volume: 0.3,
        secretClicks: 0,
        lastClickTime: 0,
        secretAudioSrc: 'assets/audio/secret.wav',

        
        // Configuration audio
        audioConfig: {
            // Remplacez par le chemin vers votre fichier audio
            audioSrc: 'assets/audio/background-music.wav',
            // Autres options
            loop: true,
            preload: 'metadata'
        },

        // Initialisation du composant
        init() {
            this.initAudio();
            
            // Écouteurs d'événements
            window.addEventListener('beforeunload', () => {
                this.cleanup();
            });
            this.handleEasterEggClick();
        },

        // Initialisation de l'objet Audio
        initAudio() {
            try {
                this.audio = new Audio();
                this.audio.src = this.audioConfig.audioSrc;
                this.audio.loop = this.audioConfig.loop;
                this.audio.preload = this.audioConfig.preload;
                this.audio.volume = this.volume;

                // Événements audio
                this.setupAudioEvents();
                
                console.log('Audio initialisé avec succès');
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de l\'audio:', error);
                this.showError('Impossible de charger le fichier audio');
            }
        },

        // Configuration des événements audio
        setupAudioEvents() {
            if (!this.audio) return;

            // Quand l'audio peut commencer à jouer
            this.audio.addEventListener('canplay', () => {
                this.isLoading = false;
                console.log('Audio prêt à être lu');
            });

            // Quand l'audio commence à jouer
            this.audio.addEventListener('play', () => {
                this.isPlaying = true;
                console.log('Lecture démarrée');
            });

            // Quand l'audio est en pause
            this.audio.addEventListener('pause', () => {
                this.isPlaying = false;
                console.log('Lecture mise en pause');
            });

            // Quand l'audio se termine
            this.audio.addEventListener('ended', () => {
                this.isPlaying = false;
                console.log('Lecture terminée');
            });

            // Gestion des erreurs
            this.audio.addEventListener('error', (e) => {
                this.isLoading = false;
                this.isPlaying = false;
                console.error('Erreur audio:', e);
                this.showError('Erreur lors de la lecture du fichier audio');
            });

            // Quand l'audio commence à charger
            this.audio.addEventListener('loadstart', () => {
                this.isLoading = true;
                console.log('Chargement de l\'audio...');
            });

            // Quand l'audio a suffisamment chargé
            this.audio.addEventListener('loadeddata', () => {
                this.isLoading = false;
                console.log('Audio chargé');
            });
        },

        // Basculer entre lecture et pause
        async togglePlay() {
            if (!this.audio) {
                console.error('Audio non initialisé');
                return;
            }

            try {
                if (this.isPlaying) {
                    await this.pause();
                } else {
                    await this.play();
                }
            } catch (error) {
                console.error('Erreur lors de la lecture/pause:', error);
                this.showError('Erreur lors de la lecture');
            }
        },

        // Démarrer la lecture
        async play() {
            if (!this.audio) return;

            try {
                this.isLoading = true;
                await this.audio.play();
                console.log('Lecture démarrée avec succès');
            } catch (error) {
                this.isLoading = false;
                this.isPlaying = false;
                
                // Gestion spécifique des erreurs de lecture automatique
                if (error.name === 'NotAllowedError') {
                    this.showError('Interaction utilisateur requise pour démarrer l\'audio');
                    console.warn('Lecture automatique bloquée par le navigateur');
                } else {
                    this.showError('Impossible de lire le fichier audio');
                    console.error('Erreur de lecture:', error);
                }
                throw error;
            }
        },

        // Mettre en pause
        async pause() {
            if (!this.audio) return;

            try {
                this.audio.pause();
                console.log('Lecture mise en pause');
            } catch (error) {
                console.error('Erreur lors de la pause:', error);
                throw error;
            }
        },

        // Arrêter complètement
        stop() {
            if (!this.audio) return;

            try {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.isPlaying = false;
                console.log('Lecture arrêtée');
            } catch (error) {
                console.error('Erreur lors de l\'arrêt:', error);
            }
        },

        // Définir le volume
        setVolume(newVolume) {
            if (!this.audio) return;

            try {
                const vol = Math.max(0, Math.min(1, parseFloat(newVolume)));
                this.audio.volume = vol;
                this.volume = vol;
                console.log('Volume défini à:', vol);
            } catch (error) {
                console.error('Erreur lors du réglage du volume:', error);
            }
        },

        // Obtenir la durée totale
        getDuration() {
            return this.audio ? this.audio.duration : 0;
        },

        // Obtenir le temps actuel
        getCurrentTime() {
            return this.audio ? this.audio.currentTime : 0;
        },

        // Définir la position de lecture
        setCurrentTime(time) {
            if (!this.audio) return;

            try {
                this.audio.currentTime = Math.max(0, Math.min(this.getDuration(), time));
            } catch (error) {
                console.error('Erreur lors du réglage de la position:', error);
            }
        },

        // Afficher une erreur (vous pouvez personnaliser cette méthode)
        showError(message) {
            console.error(message);
            // Option 2: Notification personnalisée (si vous avez un système de notifications)
            // this.showNotification(message, 'error');
        },

        // Nettoyage des ressources
        cleanup() {
            if (this.audio) {
                this.audio.pause();
                this.audio.src = '';
                this.audio = null;
                console.log('Ressources audio nettoyées');
            }
        },

        handleEasterEggClick() {
            const now = Date.now();
            
            // Si plus de 1.5s entre les clics, on reset
            if (now - this.lastClickTime > 1500) {
                console.log(this.lastClickTime, now);
                this.secretClicks = 0;
            }

            this.secretClicks++;
            this.lastClickTime = now;

            if (this.secretClicks >= 7) {
                this.secretClicks = 0;
                this.playSecretAudio();
            }
        },

        playSecretAudio() {
            try {
                const secretAudio = new Audio(this.secretAudioSrc);
                secretAudio.volume = this.volume;
                secretAudio.play();
                console.log('🎵 Easter egg activé : secret.wav joué');
            } catch (error) {
                console.error('Erreur lors de la lecture de secret.wav:', error);
            }
        },
    }
}

// Fonction utilitaire pour vérifier le support audio
function checkAudioSupport() {
    const audio = document.createElement('audio');
    const canPlayWav = audio.canPlayType('audio/wav');
    const canPlayMp3 = audio.canPlayType('audio/mpeg');
    
    console.log('Support WAV:', canPlayWav);
    console.log('Support MP3:', canPlayMp3);
    
    return {
        wav: canPlayWav !== '',
        mp3: canPlayMp3 !== ''
    };
}

// Initialisation globale (optionnelle)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vinyl Player JS chargé');
    console.log('Support audio:', checkAudioSupport());
});

// Export pour modules ES6 (si nécessaire)
// export { vinylPlayer, checkAudioSupport };