
      (function() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
          document.body.classList.add('light-mode');
        }
      })();
    


      // Global Skill details mapping object
      const skillDetails = {
        "color-grading": {
          name: "Color Grading",
          icon: "🎨",
          tagline: "Making visuals feel like emotions",
          desc: "I transform footage and images into cinematic, mood-driven visuals using AI-assisted color workflows. Whether giving a photo golden-hour warmth or a cool futuristic tone, I understand how color tells a story.",
          tags: ["Cinematic Looks", "Mood and Tone", "Visual Storytelling", "AI-Assisted"]
        },
        "vibe-coding": {
          name: "Vibe Coding",
          icon: "⚡",
          tagline: "Build first figure out later",
          desc: "Using AI pair-programmers like Claude and Lovable, I ship real working products without traditional coding knowledge. I describe what I want, iterate fast, and deploy. Proof: Bioluminescent Streetlight a fully deployed web app built entirely this way.",
          tags: ["Lovable", "Claude AI", "Rapid Prototyping", "Zero Traditional Code", "Ship Fast"],
          isGold: true
        },
        "prompt-engineering": {
          name: "Prompt Engineering",
          icon: "🧠",
          tagline: "The new programming language",
          desc: "I craft precise, context-rich prompts that extract maximum value from AI models. I know how to structure prompts for complex tasks, chain instructions, handle personas, and get consistent high-quality output from Claude, Gemini, GPT, and others. This is my most-used skill every single day.",
          tags: ["Claude", "Gemini", "GPT", "Chain of Thought", "System Prompts"]
        },
        "tool-scouting": {
          name: "AI Tool Scouting",
          icon: "🔍",
          tagline: "I find tool before the crowd does",
          desc: "I actively discover, test, and evaluate new AI tools as they launch, including niche ones like Antigravity, Nano Banana, Google Veo, and Google AI Studio that most people haven't heard of yet. I map out what each tool is good for and use the right one for the job.",
          tags: ["Early Adopter", "Tool Evaluation", "Antigravity", "Nano Banana", "Google Veo"],
          isGold: true
        },
        "no-code": {
          name: "No-Code Development",
          icon: "🛠️",
          tagline: "Code is optional shipping is not",
          desc: "I build and deploy functional web applications using no-code and AI-native platforms. From concept to live URL without writing traditional code, my workflow combines visual builders, AI generation, and smart prompt iteration to produce real products.",
          tags: ["Lovable", "AI Builders", "Deploy and Ship", "Product Thinking"]
        },
        "photography": {
          name: "Photography",
          icon: "📷",
          tagline: "Frames that feel like paintings",
          desc: "I approach photography as visual storytelling: finding unusual angles, dramatic lighting, and unexpected compositions in everyday environments. My competition entry Sky Tower showcasing urban skylines ranked 4th out of 135 entries in MDI Gurugram.",
          tags: ["Urban Photography", "Competition Entry", "MDI Gurugram", "Composition", "Natural Light"]
        },
        "design": {
          name: "Canva and AI Design",
          icon: "🎨",
          tagline: "Design without barriers",
          desc: "Using Canva combined with AI design tools, I create clean, professional visual content from social media posts and presentations to brand assets and UI mockups. AI helps me generate concepts quickly, which I then refine and polish.",
          tags: ["Canva", "AI Design", "Visual Content", "Brand Assets", "Presentations"]
        }
      };

      const skillDataList = [
        { id: 'color-grading', name: 'Color Grading', emoji: '🎨', isGold: false },
        { id: 'vibe-coding', name: 'Vibe Coding', emoji: '⚡', isGold: true },
        { id: 'prompt-engineering', name: 'Prompt Engineering', emoji: '🧠', isGold: false },
        { id: 'tool-scouting', name: 'AI Tool Scouting', emoji: '🔍', isGold: true },
        { id: 'no-code', name: 'No-Code Development', emoji: '🛠️', isGold: false },
        { id: 'photography', name: 'Photography', emoji: '📷', isGold: false },
        { id: 'design', name: 'Canva and AI Design', emoji: '🎨', isGold: false }
      ];

      const aiToolsList = [
        { name: 'Claude', desc: 'Advanced reasoning and coding partner', color: '#CC785C', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:linear-gradient(135deg,#CC785C,#E8875A);\ndisplay:flex;align-items:center;justify-content:center;">\n<i data-lucide="brain" class="w-6 h-6 text-white"></i></div>` },
        { name: 'Gemini', desc: 'Multimodal intelligence and fast iteration', color: '#4285f4', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:#0d0d0d;display:flex;align-items:center;\njustify-content:center;">\n<i data-lucide="sparkles" class="w-6 h-6 text-[#4285f4]"></i></div>` },
        { name: 'ChatGPT', desc: 'Versatile conversational AI and ideation', color: '#10A37F', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:#ffffff;display:flex;align-items:center;\njustify-content:center;">\n<i data-lucide="message-square-text" class="w-6 h-6 text-[#10A37F]"></i></div>` },
        { name: 'Lovable', desc: 'Turning vibes into working web apps', color: '#FF6B9D', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:linear-gradient(135deg,#FF6B9D,#C44FE0);\ndisplay:flex;align-items:center;justify-content:center;">\n<i data-lucide="heart" class="w-6 h-6 text-white"></i></div>` },
        { name: 'Antigravity', desc: 'Agentic coding and complex problem solving', color: '#8b5cf6', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:linear-gradient(135deg,#6366F1,#8B5CF6);\ndisplay:flex;align-items:center;justify-content:center;\nfont-family:'Sora',sans-serif;font-size:15px;\nfont-weight:800;color:white;letter-spacing:-0.5px">\nAG</div>` },
        { name: 'Nano Banana', desc: 'Niche AI tool exploration', color: '#FFD700', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:#FFD700;display:flex;align-items:center;\njustify-content:center;font-family:'Sora',sans-serif;\nfont-size:15px;font-weight:800;color:#000">NB</div>` },
        { name: 'Google Veo', desc: 'Advanced generative video AI', color: '#1a6fd4', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:linear-gradient(135deg,#1a6fd4,#4a9eff);\ndisplay:flex;align-items:center;justify-content:center;">\n<i data-lucide="video" class="w-6 h-6 text-white"></i></div>` },
        { name: 'Google AI Studio', desc: 'Rapid prototyping with Gemini models', color: '#fbbf24', logo: `<div style="width:48px;height:48px;border-radius:12px;\nbackground:linear-gradient(135deg,#f59e0b,#fbbf24);\ndisplay:flex;align-items:center;justify-content:center;\nfont-family:'Sora',sans-serif;font-size:15px;\nfont-weight:800;color:white">AI</div>` }
      ];

      const marqueePhrases = "NAITIK AGARWAL • AI EXPLORER • PROMPT ENGINEER • VIBE CODER • CREATOR • ";
      const badgeList = ["Google AI Fundamentals", "Azure AI Engineer", "Prompt Engineering", "Google Cloud Skills", "Microsoft Copilot", "Generative AI", "Power Platform", "Machine Learning", "147 plus and Counting 🔥"];

      // Compile Marquee elements programmatically on script loading
      const repeatString = (str, count) => Array(count).fill(str).join(' ');
      
      // Load programmatically
      document.getElementById('marquee-proto-1').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-2').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-3').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-4').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-5').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-6').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-7').innerText = repeatString(marqueePhrases, 10);
      document.getElementById('marquee-proto-8').innerText = repeatString(marqueePhrases, 10);

      const badgesRow1 = document.getElementById('badge-loop-1');
      const badgesRow2 = document.getElementById('badge-loop-2');
      if (badgesRow1 && badgesRow2) {
        // Double array content to guarantee looping without whitespace
        const repeatedBadges1 = [...badgeList, ...badgeList, ...badgeList];
        const repeatedBadges2 = [...badgeList].reverse().concat([...badgeList].reverse()).concat([...badgeList].reverse());

        repeatedBadges1.forEach(text => {
          const badge = document.createElement('span');
          badge.className = 'inline-block bg-surface/30 border border-outline px-4 py-2 rounded-full whitespace-nowrap hover:border-primaryBlue/20 transition-all cursor-default';
          badge.innerText = text;
          badgesRow1.appendChild(badge);
        });

        repeatedBadges2.forEach(text => {
          const badge = document.createElement('span');
          badge.className = 'inline-block bg-surface/20 border border-outline px-4 py-2 rounded-full whitespace-nowrap hover:border-gold/20 transition-all cursor-default';
          badge.innerText = text;
          badgesRow2.appendChild(badge);
        });
      }

      // ==========================================
      // SOUND SYSTEM POWERED BY WEB AUDIO API
      // ==========================================
      class SoundEngine {
        constructor() {
          this.audioCtx = null;
          this.isPlayingDrone = false;
          this.droneNodesList = [];
          this.masterGainNode = null;
          this.globalGainNode = null;
          this.isMuted = true;
        }

        init() {
          if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContextClass();
          }
          if (!this.globalGainNode) {
            this.globalGainNode = this.audioCtx.createGain();
            this.globalGainNode.gain.setValueAtTime(0.9, this.audioCtx.currentTime);
            this.globalGainNode.connect(this.audioCtx.destination);
          }
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }
        }

        toggleMutation() {
          this.init();
          this.isMuted = !this.isMuted;
          
          if (!this.isMuted) {
            this.startSpaceshipDrone();
          } else {
            this.stopSpaceshipDrone();
          }
          return this.isMuted;
        }

        startSpaceshipDrone() {
          if (this.isMuted || !this.audioCtx) return;
          this.stopSpaceshipDrone(); // Kill preceding signals

          try {
            this.init();
            const now = this.audioCtx.currentTime;
            
            this.masterGainNode = this.audioCtx.createGain();
            this.masterGainNode.gain.setValueAtTime(0.0, now);
            this.masterGainNode.gain.linearRampToValueAtTime(0.18, now + 2.0); // Slow ambient fade-in
            
            const lowpassFilter = this.audioCtx.createBiquadFilter();
            lowpassFilter.type = 'lowpass';
            lowpassFilter.Q.setValueAtTime(5, now);
            lowpassFilter.frequency.setValueAtTime(140, now);
            
            const osc1 = this.audioCtx.createOscillator();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(55.0, now); // A1 note
            const gain1 = this.audioCtx.createGain();
            gain1.gain.setValueAtTime(0.08, now);
            
            const osc2 = this.audioCtx.createOscillator();
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(55.5, now); // Detuned sub harmonic
            const gain2 = this.audioCtx.createGain();
            gain2.gain.setValueAtTime(0.08, now);
            
            const osc3 = this.audioCtx.createOscillator();
            osc3.type = 'triangle';
            osc3.frequency.setValueAtTime(82.4, now); // E2 Perfect Fifth
            const gain3 = this.audioCtx.createGain();
            gain3.gain.setValueAtTime(0.08, now);

            const osc4 = this.audioCtx.createOscillator();
            osc4.type = 'triangle';
            osc4.frequency.setValueAtTime(110.0, now); // A2 Octave
            const gain4 = this.audioCtx.createGain();
            gain4.gain.setValueAtTime(0.08, now);

            // Breath modulation Filter LFO
            const lfo = this.audioCtx.createOscillator();
            lfo.frequency.setValueAtTime(0.1, now);
            const lfoGain = this.audioCtx.createGain();
            lfoGain.gain.setValueAtTime(70, now);

            lfo.connect(lfoGain);
            lfoGain.connect(lowpassFilter.frequency);

            osc1.connect(gain1).connect(lowpassFilter);
            osc2.connect(gain2).connect(lowpassFilter);
            osc3.connect(gain3).connect(lowpassFilter);
            osc4.connect(gain4).connect(lowpassFilter);
            
            lowpassFilter.connect(this.masterGainNode).connect(this.globalGainNode);

            osc1.start(now);
            osc2.start(now);
            osc3.start(now);
            osc4.start(now);
            lfo.start(now);

            this.droneNodesList = [osc1, osc2, osc3, osc4, lfo, gain1, gain2, gain3, gain4, lfoGain, lowpassFilter, this.masterGainNode];
            this.isPlayingDrone = true;
          } catch(err) {
            console.warn('Synthesis system failed to initialize drone', err);
          }
        }

        stopSpaceshipDrone() {
          if (this.droneNodesList.length > 0) {
            try {
              const now = this.audioCtx.currentTime;
              const fader = this.masterGainNode;
              if (fader) {
                fader.gain.cancelScheduledValues(now);
                fader.gain.setValueAtTime(fader.gain.value, now);
                fader.gain.linearRampToValueAtTime(0.0, now + 0.3); // Smooth click-free fade
              }
              const elements = [...this.droneNodesList];
              setTimeout(() => {
                elements.forEach(node => {
                  try {
                    if (node.stop) node.stop();
                  } catch(e) {}
                  try {
                    node.disconnect();
                  } catch(e) {}
                });
              }, 350);
              
              this.droneNodesList = [];
              this.isPlayingDrone = false;
            } catch(e) {}
          }
        }

        playHoverFX() {
          if (this.isMuted || !this.audioCtx) return;
          this.init();
          try {
            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(950, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);
            
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.linearRampToValueAtTime(0.0, now + 0.12);
            
            osc.connect(gain).connect(this.globalGainNode);
            osc.start(now);
            osc.stop(now + 0.15);
          } catch(e) {}
        }

        playClickFX() {
          if (this.isMuted || !this.audioCtx) return;
          this.init();
          try {
            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(290, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
            
            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            
            osc.connect(gain).connect(this.globalGainNode);
            osc.start(now);
            osc.stop(now + 0.12);
          } catch(e) {}
        }

        playModalTriggerFX() {
          if (this.isMuted || !this.audioCtx) return;
          this.init();
          try {
            const now = this.audioCtx.currentTime;
            // Synthesize spatial upward bell chime chords: E4 -> G#4 -> B4 -> E5
            const chordFreqs = [329.63, 415.30, 493.88, 659.25];
            chordFreqs.forEach((freq, idx) => {
              const schedule = now + (idx * 0.075);
              const osc = this.audioCtx.createOscillator();
              const gain = this.audioCtx.createGain();
              
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, schedule);
              
              gain.gain.setValueAtTime(0.0, schedule);
              gain.gain.linearRampToValueAtTime(0.08, schedule + 0.02);
              gain.gain.exponentialRampToValueAtTime(0.0001, schedule + 0.55);
              
              osc.connect(gain).connect(this.globalGainNode);
              osc.start(schedule);
              osc.stop(schedule + 0.6);
            });
          } catch(e) {}
        }

        playWhooshFX() {
          if (this.isMuted || !this.audioCtx) return;
          this.init();
          try {
            const now = this.audioCtx.currentTime;
            const size = this.audioCtx.sampleRate * 0.75;
            const buffer = this.audioCtx.createBuffer(1, size, this.audioCtx.sampleRate);
            const dataChannel = buffer.getChannelData(0);
            
            // Random white noises
            for (let i = 0; i < size; i++) {
              dataChannel[i] = Math.random() * 2 - 1;
            }
            
            const noise = this.audioCtx.createBufferSource();
            noise.buffer = buffer;
            
            const bpFilter = this.audioCtx.createBiquadFilter();
            bpFilter.type = 'bandpass';
            bpFilter.Q.setValueAtTime(2.5, now);
            
            bpFilter.frequency.setValueAtTime(65, now);
            bpFilter.frequency.exponentialRampToValueAtTime(850, now + 0.3);
            bpFilter.frequency.exponentialRampToValueAtTime(65, now + 0.75);
            
            const gain = this.audioCtx.createGain();
            gain.gain.setValueAtTime(0.0, now);
            gain.gain.linearRampToValueAtTime(0.07, now + 0.25);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
            
            noise.connect(bpFilter).connect(gain).connect(this.globalGainNode);
            noise.start(now);
            noise.stop(now + 0.75);
          } catch(e) {}
        }
      }

      const cinematicAudio = new SoundEngine();

      // Sound toggle handler
      const soundBtn = document.getElementById('sound-toggle');
      const soundText = document.getElementById('sound-text');
      
      soundBtn.addEventListener('click', () => {
        const isCurrentlyMuted = cinematicAudio.toggleMutation();
        if (!isCurrentlyMuted) {
          soundText.innerText = "Sound: On";
          soundBtn.classList.remove('bg-surface/40');
          soundBtn.classList.add('bg-primaryBlue', 'text-black', 'border-primaryBlue');
          soundBtn.style.boxShadow = '0 0 20px rgba(74, 158, 255, 0.85)';
          cinematicAudio.playClickFX();
        } else {
          soundText.innerText = "Sound: Off";
          soundBtn.classList.add('bg-surface/40');
          soundBtn.classList.remove('bg-primaryBlue', 'text-black', 'border-primaryBlue');
          soundBtn.style.boxShadow = '';
        }
      });

      // Theme toggle handler
      const themeBtn = document.getElementById('theme-toggle');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          document.body.classList.toggle('light-mode');
          const isLight = document.body.classList.contains('light-mode');
          localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
          
          // Update Particle system colors / blending dynamically in real-time
          try {
            if (pMat) {
              if (isLight) {
                pMat.blending = THREE.NormalBlending;
                pMat.opacity = 0.45;
              } else {
                pMat.blending = THREE.AdditiveBlending;
                pMat.opacity = 0.82;
              }
              pMat.needsUpdate = true;
            }
          } catch (err) {}

          // Play interaction sound
          if (cinematicAudio && !cinematicAudio.isMuted) {
            cinematicAudio.playClickFX();
          }
        });
      }

      // Sound Whoosh rate limiter
      let precedingWhooshStamp = 0;
      function executeWhooshRateLimited() {
        const now = Date.now();
        if (now - precedingWhooshStamp > 1800) {
          cinematicAudio.playWhooshFX();
          precedingWhooshStamp = now;
        }
      }

      // ==========================================
      // TEXT SCRAMBLING MOTOR ENGINE
      // ==========================================
      class HeadingScrambler {
        constructor(element) {
          this.element = element;
          this.charactersArray = '#@$%&!*()_+{}[]|;:,.<>?/XØÆABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          this.renderStep = this.renderStep.bind(this);
        }
        trigger(targetText) {
          const startingText = this.element.innerText;
          const maxLength = Math.max(startingText.length, targetText.length);
          const completionPromise = new Promise((resolve) => this.resolveCallback = resolve);
          
          this.animationQueue = [];
          for (let i = 0; i < maxLength; i++) {
            const startChar = startingText[i] || '';
            const endChar = targetText[i] || '';
            const keyframeStart = Math.random() * 0.4;
            const keyframeEnd = keyframeStart + 0.35 + Math.random() * 0.25;
            this.animationQueue.push({ startChar, endChar, keyframeStart, keyframeEnd });
          }
          
          cancelAnimationFrame(this.renderFrameReq);
          this.startTime = performance.now();
          this.duration = 1200; // Exact 1200ms scramble
          this.renderStep();
          return completionPromise;
        }
        renderStep() {
          const elapsed = performance.now() - this.startTime;
          const progress = Math.min(elapsed / this.duration, 1);
          let textBuffer = '';
          let completedCount = 0;
          
          for (let i = 0, len = this.animationQueue.length; i < len; i++) {
            let { startChar, endChar, keyframeStart, keyframeEnd, currentNoise } = this.animationQueue[i];
            
            if (progress >= keyframeEnd) {
              completedCount++;
              textBuffer += endChar;
            } else if (progress >= keyframeStart) {
              if (!currentNoise || Math.random() < 0.28) {
                currentNoise = this.charactersArray[Math.floor(Math.random() * this.charactersArray.length)];
                this.animationQueue[i].currentNoise = currentNoise;
              }
              textBuffer += `<span class="text-primaryBlue opacity-90">${currentNoise}</span>`;
            } else {
              textBuffer += startChar;
            }
          }
          
          this.element.innerHTML = textBuffer;
          if (progress >= 1 && completedCount === this.animationQueue.length) {
            this.resolveCallback();
          } else {
            this.renderFrameReq = requestAnimationFrame(this.renderStep);
          }
        }
      }

      // ==========================================
      // INITIAL DOM INJECTIONS & HANDLERS
      // ==========================================
      document.addEventListener('DOMContentLoaded', () => {
        
        // Split .blur-entry nodes programmatically into words for tactile blur focus
        const blurEntryElements = document.querySelectorAll('.blur-entry');
        blurEntryElements.forEach(item => {
          const rawText = item.innerText.trim();
          const words = rawText.split(/\s+/);
          item.innerHTML = words.map((w, idx) => {
            return `<span class="blur-word" style="--delay: ${idx * 40}ms">${w}</span>`;
          }).join(' ');
        });

        // 1. Compile Skill Pills
        const pillsContainer = document.getElementById('skills-pills-container');
        skillDataList.forEach(skill => {
          const pill = document.createElement('button');
          pill.className = `skill-pill px-5 py-3 md:px-7 md:py-4 rounded-full border text-xs md:text-sm font-space uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 relative ${
            skill.isGold 
              ? 'border-gold/30 bg-gold/5 text-gold shadow-[0_0_15px_rgba(245,166,35,0.1)] hover:bg-gold hover:text-black hover:border-gold' 
              : 'border-outline bg-surface/30 text-white hover:bg-primaryBlue hover:text-black hover:border-primaryBlue hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]'
          }`;
          pill.setAttribute('data-skill-id', skill.id);
          pill.innerHTML = `<span>${skill.emoji}</span> <span>${skill.name}</span>`;
          pillsContainer.appendChild(pill);
        });

        // 2. Compile AI Tools Arsenal
        const toolContainer = document.getElementById('tools-grid');
        aiToolsList.forEach(tool => {
          const gridCard = document.createElement('div');
          gridCard.className = 'tilt-card relative bg-surface/30 backdrop-blur-md border border-outline rounded-3xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 group';
          
          gridCard.addEventListener('mouseenter', () => {
            gridCard.style.borderColor = tool.color;
            gridCard.style.boxShadow = `0 12px 30px -5px ${tool.color}80`;
          });
          gridCard.addEventListener('mouseleave', () => {
            gridCard.style.borderColor = 'rgba(255,255,255,0.08)';
            gridCard.style.boxShadow = 'none';
          });

          gridCard.innerHTML = `
            <div class="flex items-center gap-4">
              ${tool.logo}
              <h3 class="font-sora font-extrabold text-white text-base tracking-tight">${tool.name}</h3>
            </div>
            <p class="tool-desc text-textDim text-xs font-geist leading-relaxed">${tool.desc}</p>
          `;
          toolContainer.appendChild(gridCard);
        });

        // Initialize Lucide Vectors rendering
        lucide.createIcons();

        // 3. Section dynamic Progress Dots Sidebar (Desktop)
        const progressDotsSidebar = document.getElementById('progress-dots-container');
        const sectionsList = Array.from(document.querySelectorAll('section[id], footer[id]'));
        
        sectionsList.forEach(sec => {
          const dotBtn = document.createElement('button');
          dotBtn.className = 'w-2.5 h-2.5 rounded-full bg-textDim/40 hover:bg-primaryBlue hover:scale-125 transition-all duration-300 relative group cursor-pointer';
          dotBtn.setAttribute('data-target-id', sec.id);
          dotBtn.setAttribute('aria-label', 'Scroll to ' + sec.id);

          const tipText = document.createElement('span');
          tipText.className = 'absolute right-6 top-1/2 -translate-y-1/2 bg-surface text-center border border-outline text-[9px] text-white py-1 px-3.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 font-space whitespace-nowrap uppercase tracking-wider scale-95 origin-right group-hover:scale-100 transition-transform duration-300';
          tipText.innerText = sec.getAttribute('data-title') || sec.id;
          dotBtn.appendChild(tipText);

          dotBtn.addEventListener('click', () => {
            cinematicAudio.playClickFX();
            document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' });
          });

          progressDotsSidebar.appendChild(dotBtn);
        });

        // Track scroll status for dots highlight and stronger navbar shadow
        window.addEventListener('scroll', () => {
          let visibleSecId = '';
          const triggerCenter = window.scrollY + window.innerHeight / 2.5;

          sectionsList.forEach(sec => {
            if (triggerCenter >= sec.offsetTop) {
              visibleSecId = sec.id;
            }
          });

          const dots = progressDotsSidebar.querySelectorAll('button');
          dots.forEach(dot => {
            const targetId = dot.getAttribute('data-target-id');
            if (targetId === visibleSecId) {
              dot.classList.remove('bg-textDim/40', 'w-2.5', 'h-2.5');
              dot.classList.add('bg-primaryBlue', 'w-3.5', 'h-3.5', 'shadow-[0_0_12px_#4a9eff]');
            } else {
              dot.classList.remove('bg-primaryBlue', 'w-3.5', 'h-3.5', 'shadow-[0_0_12px_#4a9eff]');
              dot.classList.add('bg-textDim/40', 'w-2.5', 'h-2.5');
            }
          });

          // Stronger navbar shadow control
          const navbar = document.getElementById('navbar');
          if (window.scrollY > 20) {
            navbar.classList.add('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-outline', 'shadow-[0_10px_30px_rgba(7,9,26,0.85)]');
          } else {
            navbar.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-outline', 'shadow-[0_10px_30px_rgba(7,9,26,0.85)]');
          }
        });

        // 4. Modal popups trigger setup
        const modal = document.getElementById('skill-modal');
        const modalBody = document.getElementById('modal-card-content');
        const listPillsTriggers = document.querySelectorAll('.skill-pill');

        listPillsTriggers.forEach(btn => {
          btn.addEventListener('click', () => {
            const skillId = btn.getAttribute('data-skill-id');
            const data = skillDetails[skillId];
            if (data) {
              cinematicAudio.playModalTriggerFX();
              
              modalBody.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <span class="text-4xl p-3 bg-surface border border-outline rounded-2xl flex items-center justify-center">${data.icon}</span>
                    <div>
                      <h3 class="text-xl md:text-2xl font-sora font-extrabold text-white leading-tight">${data.name}</h3>
                      <p class="text-[10px] font-space tracking-wider text-gold/95 uppercase mt-0.5">${data.tagline}</p>
                    </div>
                  </div>
                  <button id="modal-close-trigger" aria-label="Close Modal" class="text-textDim hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <div class="space-y-4 font-geist mt-4">
                  <p class="text-textDim text-sm md:text-base leading-relaxed">${data.desc}</p>
                  <div class="pt-4 border-t border-outline flex flex-wrap gap-2">
                    ${data.tags.map(tag => `<span class="bg-surface border border-outline rounded-full px-3.5 py-1 text-xs text-white opacity-90 transition-transform duration-300 hover:scale-105">${tag}</span>`).join('')}
                  </div>
                </div>
              `;

              modal.classList.remove('hidden');
              modal.classList.add('flex');

              // Animate layout panel opening using GSAP
              const modalBlock = modal.querySelector('.modal-box');
              gsap.fromTo(modalBlock, 
                { scale: 0.88, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: 'back.out(1.4)' }
              );

              // Hook close listeners
              document.getElementById('modal-close-trigger').addEventListener('click', forceCloseModal);
            }
          });
        });

        function forceCloseModal() {
          cinematicAudio.playClickFX();
          const modalBlock = modal.querySelector('.modal-box');
          gsap.to(modalBlock, {
            scale: 0.88,
            opacity: 0,
            y: 30,
            duration: 0.28,
            ease: 'power2.in',
            onComplete: () => {
              modal.classList.add('hidden');
              modal.classList.remove('flex');
            }
          });
        }

        modal.addEventListener('click', (e) => {
          if (e.target === modal) forceCloseModal();
        });
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && !modal.classList.contains('hidden')) forceCloseModal();
        });

        // 6. Split Headers programmatically inside Viewport
        const headers = document.querySelectorAll('.split-heading');
        headers.forEach(h => {
          const text = h.innerText.trim();
          const words = text.split(/\s+/);
          // Store raw original text and spans HTML once under data attributes
          const initialSpansHtml = words.map((word, idx) => {
            const flyValue = idx % 2 === 0 ? '-160px' : '160px';
            return `<span class="word-span" style="--fly-x: ${flyValue};">${word}</span>`;
          }).join(' ');
          h.setAttribute('data-original-raw-text', text);
          h.setAttribute('data-original-spans-html', initialSpansHtml);
          h.innerHTML = initialSpansHtml;
        });

        // 7. Split Quotes programmatically for spring entry
        const quoteBox = document.querySelector('.split-quote');
        if (quoteBox) {
          const quoteText = quoteBox.innerText.trim();
          const words = quoteText.split(/\s+/);
          quoteBox.innerHTML = '';
          words.forEach((word, idx) => {
            const span = document.createElement('span');
            span.innerText = word;
            span.className = 'word-span-quote';
            span.style.setProperty('--fly-x', idx % 2 === 0 ? '-160px' : '160px');
            quoteBox.appendChild(span);
          });
        }

        // ==========================================
        // TEXT SCRAMBLE TIMERS TIMELINE
        // ==========================================
        const targetScrambleTitles = document.querySelectorAll('.split-heading');
        const scrambleObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
              const plainText = el.getAttribute('data-original-raw-text');
              const finalSpansHtml = el.getAttribute('data-original-spans-html');
              
              const scrambler = new HeadingScrambler(el);
              scrambler.trigger(plainText).then(() => {
                // Return spans back after finish to keep styling and animations active
                el.innerHTML = finalSpansHtml;
                // Animate entering words inside this header with 120ms stagger
                const spans = el.querySelectorAll('.word-span');
                spans.forEach((s, i) => {
                  setTimeout(() => { s.classList.add('enter'); }, i * 120);
                });
              });
            } else {
              // Reset status on exit to re-trigger next entry
              el.innerHTML = el.getAttribute('data-original-spans-html') || el.innerHTML;
              const spans = el.querySelectorAll('.word-span');
              spans.forEach(s => s.classList.remove('enter'));
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -10px 0px' });

        targetScrambleTitles.forEach(h => {
          scrambleObserver.observe(h);
        });

        // ==========================================
        // STATIC COUNTER INTERPOLATIONS
        // ==========================================
        const countValues = document.querySelectorAll('.counter-num');
        const spendDurationFactor = x => {
          if (x < 0.3) {
            const ratio = x / 0.3;
            return 0.8 * (1 - Math.pow(1 - ratio, 2));
          } else {
            const ratio = (x - 0.3) / 0.7;
            return 0.8 + 0.2 * (1 - Math.pow(1 - ratio, 2));
          }
        };
        
        const countObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            const item = entry.target;
            const goalNum = parseInt(item.getAttribute('data-target'));
            const representationType = item.getAttribute('data-format');
            
            if (entry.isIntersecting) {
              if (item.animActive) return;
              item.animActive = true;
              
              let animStart = null;
              const lengthMs = 2500; // exact 2.5s count duration

              function countFrameWorker(timestamp) {
                if (!item.animActive) return; // cancelled if exited view
                if (!animStart) animStart = timestamp;
                const elapsedProgress = Math.min((timestamp - animStart) / lengthMs, 1);
                const progressCurve = spendDurationFactor(elapsedProgress);
                const scaledResult = Math.floor(progressCurve * goalNum);

                if (representationType === 'plus') {
                  item.textContent = `${scaledResult}+`;
                } else if (representationType === 'th') {
                  item.textContent = `${scaledResult}th`;
                } else if (representationType === 'infinity') {
                  item.textContent = '∞';
                } else {
                  item.textContent = scaledResult;
                }

                if (elapsedProgress < 1) {
                  requestAnimationFrame(countFrameWorker);
                } else {
                  // Ensure accurate absolute finalize
                  if (representationType === 'plus') {
                    item.textContent = `${goalNum}+`;
                  } else if (representationType === 'th') {
                    item.textContent = `${goalNum}th`;
                  } else if (representationType === 'infinity') {
                    item.textContent = '∞';
                  } else {
                    item.textContent = goalNum;
                  }
                  item.animActive = false;
                }
              }

              requestAnimationFrame(countFrameWorker);
            } else {
              // cancelled and reset on out-of-view exit for dynamic scroll re-triggering
              item.animActive = false;
              if (representationType === 'infinity') {
                item.textContent = '∞';
              } else if (representationType === 'plus') {
                item.textContent = '0+';
              } else if (representationType === 'th') {
                item.textContent = '0th';
              } else {
                item.textContent = '0';
              }
            }
          });
        }, { threshold: 0.1 });

        countValues.forEach(el => countObserver.observe(el));

        // ==========================================
        // GENERAL INTERSECTION OBSERVER
        // ==========================================
        const scrollAnimatorObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const sec = entry.target;
              
              // Trigger whoosh sound in sound limits
              executeWhooshRateLimited();

              // Trigger general blur-entry tags
              const targetsToBlur = sec.querySelectorAll('.blur-entry');
              targetsToBlur.forEach(node => node.classList.add('enter'));

              // Staggered cascade reveal of cards (.tilt-card)
              const cardsToAnimate = sec.querySelectorAll('.tilt-card');
              if (cardsToAnimate.length > 0) {
                gsap.fromTo(cardsToAnimate,
                  { opacity: 0, scale: 0.8 },
                  { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1.0, 
                    ease: 'back.out(1.8)', 
                    stagger: 0.15, // 150ms cascade delay
                    onComplete: () => {
                      // Reset properties cleanly after reveal to keep dynamic hover tilt unaffected
                      cardsToAnimate.forEach(card => {
                        gsap.set(card, { clearProps: 'transform,opacity' });
                        card.style.opacity = '1';
                      });
                    }
                  }
                );
              }

              // Trigger photo progress bar in Sky Tower
              const progBars = sec.querySelectorAll('.progress-bar-val');
              progBars.forEach(bar => {
                const w = bar.getAttribute('data-width');
                bar.style.width = w;
              });

              // Trigger Future Word Quote entries
              const quoteSpans = sec.querySelectorAll('.word-span-quote');
              quoteSpans.forEach((span, idx) => {
                setTimeout(() => { span.classList.add('enter'); }, idx * 55);
              });

              scrollAnimatorObserver.unobserve(sec);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        sectionsList.forEach(el => scrollAnimatorObserver.observe(el));

        // 8. Sound feedback on navbar and interactive links
        const interactiveNodes = document.querySelectorAll('a, button, [role="button"], .interactive');
        interactiveNodes.forEach(node => {
          node.addEventListener('mouseenter', () => {
            cinematicAudio.playHoverFX();
          });
          node.addEventListener('click', () => {
            cinematicAudio.playClickFX();
          });
        });

        // 9. Letter-spacing expand footer pitch logic
        const pitchFooter = document.getElementById('footer-pitch');
        if (pitchFooter) {
          pitchFooter.addEventListener('mouseenter', () => {
            pitchFooter.style.letterSpacing = '0.08em';
          });
          pitchFooter.addEventListener('mouseleave', () => {
            pitchFooter.style.letterSpacing = 'normal';
          });
        }

        // ==========================================
        // 3D MAGNETIC CARDS INTERACTIVE LOGISTICS
        // ==========================================
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        magneticElements.forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dst = Math.sqrt(dx*dx + dy*dy);
            
            if (dst < 100) {
              let dispX = dx * 0.35;
              let dispY = dy * 0.35;
              const dispLen = Math.sqrt(dispX * dispX + dispY * dispY);
              if (dispLen > 20) {
                dispX = (dispX / dispLen) * 20;
                dispY = (dispY / dispLen) * 20;
              }

              gsap.to(btn, {
                x: dispX,
                y: dispY,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
              });

              const glowLayer = btn.querySelector('.btn-glow-highlight');
              if (glowLayer) {
                const rx = e.clientX - r.left;
                const ry = e.clientY - r.top;
                glowLayer.style.setProperty('--x', `${rx}px`);
                glowLayer.style.setProperty('--y', `${ry}px`);
                glowLayer.style.opacity = '1';
              }
            }
          });

          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: 'elastic.out(1.1, 0.35)'
            });
            const glowLayer = btn.querySelector('.btn-glow-highlight');
            if (glowLayer) glowLayer.style.opacity = '0';
          });
        });

        // 3D Card Tilt effects setup
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(c => {
          let specOverlay = c.querySelector('.specular');
          if (!specOverlay) {
            specOverlay = document.createElement('div');
            specOverlay.className = 'specular absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 opacity-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.2)_0%,transparent_50%)] mix-blend-color-dodge z-30';
            c.style.position = 'relative';
            c.appendChild(specOverlay);
          }

          c.addEventListener('mousemove', (e) => {
            const bounds = c.getBoundingClientRect();
            const relX = e.clientX - bounds.left;
            const relY = e.clientY - bounds.top;
            
            const internalCX = bounds.width / 2;
            const internalCY = bounds.height / 2;
            
            // Limit and project tilt to 22 degrees max
            const ry = ((relX - internalCX) / internalCX) * 22;
            const rx = -((relY - internalCY) / internalCY) * 22;

            gsap.to(c, {
              rotateX: rx,
              rotateY: ry,
              transformPerspective: 1000,
              scale: 1.025,
              duration: 0.08, // Snap to 0.08s snappy entry response time
              ease: 'power2.out'
            });

            // Specular highlighting moves opposite to the tilt position
            const oppX = bounds.width - relX;
            const oppY = bounds.height - relY;

            specOverlay.style.opacity = '1';
            specOverlay.style.setProperty('--x', `${oppX}px`);
            specOverlay.style.setProperty('--y', `${oppY}px`);
          });

          c.addEventListener('mouseleave', () => {
            gsap.to(c, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.4, // Snappy exit response as well
              ease: 'power2.out'
            });
            specOverlay.style.opacity = '0';
          });
        });

      });

      // ==========================================
      // TYPEWRITER ANIMATION LOGIC IMPLEMENTATION
      // ==========================================
      const typewriterElement = document.getElementById('typewriter-text');
      const textPhrases = ["AI Explorer.", "Creator.", "Prompt Engineer.", "Building Tomorrow.", "AI Native."];
      let currentPhraseIdx = 0;
      let currentCharIdx = 0;
      let isEraseMode = false;
      let currentTimerMs = 100;

      function activeTypingLoop() {
        const fullPhrase = textPhrases[currentPhraseIdx];
        if (isEraseMode) {
          currentCharIdx--;
          currentTimerMs = 35;
        } else {
          currentCharIdx++;
          currentTimerMs = 90;
        }

        typewriterElement.textContent = fullPhrase.substring(0, currentCharIdx);

        if (!isEraseMode && currentCharIdx === fullPhrase.length) {
          // Pause at complete text
          currentTimerMs = 1700;
          isEraseMode = true;
        } else if (isEraseMode && currentCharIdx === 0) {
          isEraseMode = false;
          currentPhraseIdx = (currentPhraseIdx + 1) % textPhrases.length;
          currentTimerMs = 350; // Delay before write next
        }

        setTimeout(activeTypingLoop, currentTimerMs);
      }
      activeTypingLoop();


      // ==========================================
      // CUSTOM LERPED SMOOTH WALKING CURSOR
      // ==========================================
      const dot = document.querySelector('.custom-cursor-dot');
      const ring = document.querySelector('.custom-cursor-ring');
      
      let curX = -100, curY = -100;
      let rX = -100, rY = -100;

      window.addEventListener('mousemove', (e) => {
        curX = e.clientX;
        curY = e.clientY;
        
        dot.style.left = `${curX}px`;
        dot.style.top = `${curY}px`;
      });

      function updateRingTrail() {
        rX += (curX - rX) * 0.12;
        rY += (curY - rY) * 0.12;
        
        ring.style.left = `${rX}px`;
        ring.style.top = `${rY}px`;
        
        requestAnimationFrame(updateRingTrail);
      }
      updateRingTrail();

      // Expand ring size on interactive elements hovering
      function registerHoverInteractions() {
        const links = document.querySelectorAll('a, button, [role="button"], .interactive, .skill-pill');
        links.forEach(node => {
          node.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
            ring.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.95)';
          });
          node.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.backgroundColor = 'transparent';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.6)';
          });
        });
      }
      
      // Initial trigger
      registerHoverInteractions();
      
      // Observer tracking nodes to re-attach interactions dynamically
      const nodeMutationObserver = new MutationObserver(() => {
        registerHoverInteractions();
      });
      nodeMutationObserver.observe(document.body, { childList: true, subtree: true });

      // ==========================================
      // LOGO GLITCH EFFECT CYCLER
      // ==========================================
      const nameNode = document.getElementById('hero-name');
      setInterval(() => {
        if (nameNode) {
          nameNode.classList.add('is-glitching');
          setTimeout(() => {
            nameNode.classList.remove('is-glitching');
          }, 350);
        }
      }, 2000);

    


      let chatHistory = [];
      let isChatOpen = false;

      // Show notification dot after 3s if not open
      setTimeout(() => {
        if (!isChatOpen) {
          document.getElementById('chat-notification-dot').style.opacity = '1';
        }
      }, 3000);

      function toggleChat() {
        isChatOpen = !isChatOpen;
        const chatWin = document.getElementById('chat-widget-window');
        if (isChatOpen) {
          chatWin.classList.add('open');
          document.getElementById('chat-notification-dot').style.opacity = '0';
          document.getElementById('chat-input').focus();
        } else {
          chatWin.classList.remove('open');
        }
      }

      function handleEnter(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendChatMessage();
        }
      }

      function sendSuggested(text) {
        document.getElementById('chat-input').value = text;
        sendChatMessage();
      }

      document.addEventListener('click', (e) => {
        const chatWin = document.getElementById('chat-widget-window');
        const bubble = document.getElementById('chat-widget-bubble');
        if (isChatOpen && !chatWin.contains(e.target) && !bubble.contains(e.target)) {
          toggleChat();
        }
      });

      function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${type}`;
        if (type === 'bot' && window.marked) {
          msgDiv.innerHTML = marked.parse(text);
          const links = msgDiv.querySelectorAll('a');
          links.forEach(link => link.setAttribute('target', '_blank'));
        } else {
          msgDiv.textContent = text;
        }
        const msgContainer = document.getElementById('chat-messages');
        msgContainer.appendChild(msgDiv);
        
        if (type === 'user') {
          msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
        } else {
          // If the bot response is taller than the chat window, scroll to the start of the response
          if (msgDiv.clientHeight > msgContainer.clientHeight) {
            msgDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            // Otherwise just scroll smoothly to the bottom to show the whole message
            msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
          }
        }
      }

      async function sendChatMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        // We keep suggestions visible or we can remove the hide block
        // const suggestions = document.getElementById('chat-suggestions');
        // if (suggestions) suggestions.style.display = 'none';

        addMessage(text, 'user');
        input.value = '';

        const sendBtn = document.getElementById('chat-send');
        const typing = document.getElementById('chat-typing');
        
        sendBtn.disabled = true;
        typing.classList.add('visible');
        
        const msgContainer = document.getElementById('chat-messages');
        msgContainer.appendChild(typing); // move it to bottom
        msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });

        try {
          const res = await fetch('/api/ask-naitik', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text, history: chatHistory })
          });

          if (!res.ok) {
            let errMsg = `Server issue (${res.status} ${res.statusText})`;
            try {
              const errData = await res.json();
              if (errData.error) errMsg = errData.error;
            } catch(e) {}
            throw new Error(errMsg);
          }

          const data = await res.json();
          let reply = data.reply || "Oops! Couldn't understand the response.";
          
          if (data.action && data.action.type === 'switchTheme') {
            const targetTheme = data.action.theme;
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            
            if (currentTheme === targetTheme) {
              reply = `The website is already in ${targetTheme} mode.`;
            } else {
              const isLight = targetTheme === 'light';
              if (isLight) {
                document.body.classList.add('light-mode');
              } else {
                document.body.classList.remove('light-mode');
              }
              localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            }
          }

          typing.classList.remove('visible');
          addMessage(reply, 'bot');

          // Update context
          chatHistory.push({ role: 'user', content: text });
          chatHistory.push({ role: 'model', content: reply });
          if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

        } catch (error) {
          console.error(error);
          typing.classList.remove('visible');
          addMessage("Oops! " + error.message, 'bot');
        } finally {
          sendBtn.disabled = false;
        }
      }
    


window.toggleChat = toggleChat;
window.handleEnter = handleEnter;
window.sendSuggested = sendSuggested;
window.sendChatMessage = sendChatMessage;

function attachEvents() {
    if (window._chatEventsAttached) return;
    window._chatEventsAttached = true;
    const bubble = document.getElementById('chat-widget-bubble');
    if (bubble) bubble.addEventListener('click', toggleChat);

    const closeBtn = document.querySelector('.chat-close');
    if (closeBtn) closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
    });

    const chip1 = document.getElementById('chip-1');
    if (chip1) chip1.addEventListener('click', (e) => {
        e.stopPropagation();
        sendSuggested('What can Naitik do?');
    });

    const chip2 = document.getElementById('chip-2');
    if (chip2) chip2.addEventListener('click', (e) => {
        e.stopPropagation();
        sendSuggested('His projects 🚀');
    });

    const chip3 = document.getElementById('chip-3');
    if (chip3) chip3.addEventListener('click', (e) => {
        e.stopPropagation();
        sendSuggested('Top achievements');
    });

    const chip4 = document.getElementById('chip-4');
    if (chip4) chip4.addEventListener('click', (e) => {
        e.stopPropagation();
        sendSuggested('Contact him');
    });

    const input = document.getElementById('chat-input');
    if (input) input.addEventListener('keypress', handleEnter);

    const sendBtn = document.getElementById('chat-send');
    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEvents);
} else {
    attachEvents();
}
