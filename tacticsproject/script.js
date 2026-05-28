document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // 1. DATABASE SKUAD BESAR AC MILAN (11 STARTER DEFAULT + 5 CADANGAN)
    // =================================================================
    const databasePemain = [
        { id: 0, name: "Mike Maignan", inisial: "MM", posAsli: "GK", rating: 90, stats: {spd: 65, str: 84, drb: 45, pas: 78}, foto: "assets/maignan.png", multiplier: { "GK": 1.0, "CB": 0.15 } },
        { id: 1, name: "Theo Hernandez", inisial: "TH", posAsli: "LB", rating: 93, stats: {spd: 96, str: 82, drb: 85, pas: 81}, foto: "assets/theo.png", multiplier: { "LB": 1.0, "LWB": 0.95, "CB": 0.65, "LWF": 0.75, "CF": 0.30 } },
        { id: 2, name: "Fikayo Tomori", inisial: "FT", posAsli: "CB", rating: 89, stats: {spd: 86, str: 85, drb: 68, pas: 70}, foto: "assets/tomori.png", multiplier: { "CB": 1.0, "RB": 0.72, "LB": 0.72, "DMF": 0.60 } },
        { id: 3, name: "Matteo Gabbia", inisial: "MG", posAsli: "CB", rating: 85, stats: {spd: 68, str: 83, drb: 60, pas: 68}, foto: "assets/gabbia.png", multiplier: { "CB": 1.0, "RB": 0.60, "DMF": 0.55 } },
        { id: 4, name: "Davide Calabria", inisial: "DC", posAsli: "RB", rating: 86, stats: {spd: 79, str: 74, drb: 76, pas: 77}, foto: "assets/calabria.png", multiplier: { "RB": 1.0, "RWB": 0.93, "CB": 0.65, "RMF": 0.70 } },
        { id: 5, name: "Tijjani Reijnders", inisial: "TR", posAsli: "CMF", rating: 91, stats: {spd: 80, str: 72, drb: 87, pas: 89}, foto: "assets/reijnders.png", multiplier: { "CMF": 1.0, "AMF": 0.92, "DMF": 0.88, "CF": 0.50 } },
        { id: 6, name: "Youssouf Fofana", inisial: "YF", posAsli: "DMF", rating: 88, stats: {spd: 75, str: 86, drb: 78, pas: 80}, foto: "assets/fofana.png", multiplier: { "DMF": 1.0, "CMF": 0.85, "CB": 0.70 } },
        { id: 7, name: "Ruben Loftus-Cheek", inisial: "RL", posAsli: "CMF", rating: 84, stats: {spd: 78, str: 88, drb: 84, pas: 82}, foto: "assets/loftus-cheek.png", multiplier: { "CMF": 1.0, "AMF": 0.92, "CF": 0.70, "DMF": 0.75 } },
        { id: 8, name: "Rafael Leao", inisial: "RL", posAsli: "LWF", rating: 96, stats: {spd: 97, str: 78, drb: 95, pas: 80}, foto: "assets/leao.png", multiplier: { "LWF": 1.0, "LMF": 0.92, "CF": 0.85, "AMF": 0.80, "LB": 0.15 } },
        { id: 9, name: "Alvaro Morata", inisial: "AM", posAsli: "CF", rating: 90, stats: {spd: 84, str: 80, drb: 82, pas: 74}, foto: "assets/morata.png", multiplier: { "CF": 1.0, "SS": 0.92, "AMF": 0.65, "GK": 0.10 } },
        { id: 10, name: "Samuel Chukwueze", inisial: "SC", posAsli: "RWF", rating: 83, stats: {spd: 90, str: 60, drb: 86, pas: 75}, foto: "assets/chukwueze.png", multiplier: { "RWF": 1.0, "RMF": 0.88, "LWF": 0.82 } },

        // DAFTAR PEMAIN CADANGAN (BENCH LIST)
        { id: 11, name: "Christian Pulisic", inisial: "CP", posAsli: "RWF", rating: 92, stats: {spd: 89, str: 65, drb: 88, pas: 84}, foto: "assets/pulisic.png", multiplier: { "RWF": 1.0, "AMF": 0.94, "RMF": 0.90, "LWF": 0.88, "CF": 0.60 } },
        { id: 12, name: "Ismael Bennacer", inisial: "IB", posAsli: "DMF", rating: 85, stats: {spd: 74, str: 70, drb: 83, pas: 84}, foto: "assets/bennacer.png", multiplier: { "DMF": 1.0, "CMF": 0.90 } },
        { id: 13, name: "Malick Thiaw", inisial: "MT", posAsli: "CB", rating: 84, stats: {spd: 75, str: 84, drb: 58, pas: 65}, foto: "assets/thiaw.png", multiplier: { "CB": 1.0 } },
        { id: 14, name: "Noah Okafor", inisial: "NO", posAsli: "LWF", rating: 82, stats: {spd: 88, str: 73, drb: 81, pas: 70}, foto: "assets/okafor.png", multiplier: { "LWF": 1.0, "CF": 0.85 } },
        { id: 15, name: "Luka Jovic", inisial: "LJ", posAsli: "CF", rating: 81, stats: {spd: 70, str: 79, drb: 74, pas: 64}, foto: "assets/jovic.png", multiplier: { "CF": 1.0 } }
    ];

    let skuadAktif = databasePemain.slice(0, 11);
    let isEditPosisiMode = false; 

    const blueprintFormasi = {
        "433": [
            {top: "86%", left: "50%"}, {top: "70%", left: "16%"}, {top: "74%", left: "37%"}, {top: "74%", left: "63%"}, {top: "70%", left: "84%"},
            {top: "48%", left: "33%"}, {top: "54%", left: "50%"}, {top: "48%", left: "67%"}, {top: "22%", left: "18%"}, {top: "14%", left: "50%"}, {top: "22%", left: "82%"}
        ],
        "4231": [
            {top: "86%", left: "50%"}, {top: "70%", left: "16%"}, {top: "74%", left: "37%"}, {top: "74%", left: "63%"}, {top: "70%", left: "84%"},
            {top: "56%", left: "35%"}, {top: "56%", left: "65%"}, {top: "34%", left: "18%"}, {top: "36%", left: "50%"}, {top: "34%", left: "82%"}, {top: "14%", left: "50%"}
        ],
        "352": [
            {top: "86%", left: "50%"}, {top: "74%", left: "25%"}, {top: "76%", left: "50%"}, {top: "74%", left: "75%"}, {top: "46%", left: "15%"},
            {top: "52%", left: "36%"}, {top: "52%", left: "64%"}, {top: "46%", left: "85%"}, {top: "34%", left: "50%"}, {top: "16%", left: "38%"}, {top: "16%", left: "62%"}
        ]
    };

    function terjemahkanKoordinatPosisi(topPercent, leftPercent) {
        if (topPercent <= 30) {
            if (leftPercent >= 35 && leftPercent <= 65) return "CF";
            if (leftPercent < 35) return "LWF";
            return "RWF";
        } else if (topPercent > 30 && topPercent <= 44) {
            if (leftPercent >= 35 && leftPercent <= 65) return "AMF";
            if (leftPercent < 35) return "LMF";
            return "RMF";
        } else if (topPercent > 44 && topPercent <= 58) {
            if (leftPercent >= 38 && leftPercent <= 62) return "DMF";
            return "CMF";
        } else if (topPercent > 58 && topPercent <= 80) {
            if (leftPercent >= 33 && leftPercent <= 67) return "CB";
            if (leftPercent < 33) return "LB";
            return "RB";
        } else { return "GK"; }
    }

    const pitch = document.getElementById('pitch');
    const playersContainer = document.getElementById('players-on-pitch');
    const benchContainer = document.getElementById('bench-container');
    const detailContent = document.getElementById('detail-content');
    const teamStrengthLabel = document.getElementById('team-strength');
    const selectFormasi = document.getElementById('select-formasi');
    const btnToggleMode = document.getElementById('btn-toggle-mode');
    const btnToggleBench = document.getElementById('btn-toggle-bench');

    function hitungTeamStrength() {
        let totalStrength = 0;
        document.querySelectorAll('.player-marker').forEach(marker => {
            totalStrength += parseInt(marker.getAttribute('data-current-rating'));
        });
        if (teamStrengthLabel) teamStrengthLabel.innerText = Math.round(totalStrength);
    }

    function renderDetailProfilMendalam(pemainObj, posisiTeks, ratingAngka, tipeStatus = "STARTER XI") {
        detailContent.innerHTML = `
            <div class="player-active-info" style="width:100%;">
                <div style="width: 80px; height: 80px; margin: 0 auto 10px; border-radius: 50%; border: 2px solid #D4AF37; overflow: hidden; background: #111;">
                    <img src="${pemainObj.foto}" alt="${pemainObj.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><rect width=%2280%22 height=%2280%22 fill=%22%23111%22/><text x=%2250%%22 y=%2255%%22 font-family=%22Oxanium%22 font-size=%2222%22 fill=%22%238B0000%22 font-weight=%22bold%22 text-anchor=%22middle%22>${pemainObj.inisial}</text></svg>'">
                </div>
                <h2 style="font-size: 18px; color: #fff; margin-bottom: 2px; font-family: 'Comfortaa', cursive;">${pemainObj.name}</h2>
                <p style="font-size: 11px; color: #aaa; margin-bottom: 5px;">Natural Position: <strong style="color: #D4AF37">${pemainObj.posAsli} (${pemainObj.rating})</strong></p>
                <p style="font-size: 10px; color: #888; margin-bottom: 15px; font-weight: bold; letter-spacing: 1px;">STATUS: ${tipeStatus}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px;">
                    <div style="background: rgba(255,255,255,0.01); padding: 8px; border-radius: 6px; border: 1px solid #222;">
                        <p style="font-size: 9px; color: #666;">CURRENT ROLE</p>
                        <h4 style="font-size: 16px; color: #fff; margin-top: 2px;">${posisiTeks}</h4>
                    </div>
                    <div style="background: rgba(255,255,255,0.01); padding: 8px; border-radius: 6px; border: 1px solid #222;">
                        <p style="font-size: 9px; color: #666;">OVR RATING</p>
                        <h4 style="font-size: 16px; color: #D4AF37; margin-top: 2px;">${ratingAngka}</h4>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.5); border: 1px solid #222; border-radius: 8px; padding: 12px; text-align: left;">
                    <h4 style="font-size: 10px; color:#D4AF37; margin-bottom: 8px; letter-spacing:1px;">// FIFA PLAYER ATTRIBUTES</h4>
                    ${Object.entries(pemainObj.stats).map(([key, value]) => `
                        <div style="margin-bottom: 6px;">
                            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
                                <span style="text-transform: uppercase; color:#aaa;">${key === 'spd' ? '🚀 SPEED' : key === 'str' ? '💪 STRENGTH' : key === 'drb' ? '⚡ DRIBBLING' : '🎯 PASSING'}</span>
                                <span style="font-weight:bold; color:${value > 85 ? '#34D399' : '#fff'}">${value}</span>
                            </div>
                            <div style="width:100%; height:4px; background:#222; border-radius:2px; overflow:hidden;">
                                <div style="width:${value}%; height:100%; background:${value > 85 ? '#34D399' : '#D4AF37'}; border-radius:2px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // =================================================================
    // 2. CORE RENDERING ENGINE (STARTER FIELD & SUBS BENCH DRAWER)
    // =================================================================
    function renderPapanTaktik() {
        if (!playersContainer || !benchContainer) return;
        playersContainer.innerHTML = "";
        benchContainer.innerHTML = ""; 

        const formasiSekarang = selectFormasi.value;
        const koordinatFormasi = blueprintFormasi[formasiSekarang];

        // --- PART A: MERENDER 11 PEMAIN STARTER DI LAPANGAN ---
        skuadAktif.forEach((pemain, index) => {
            const posDefault = koordinatFormasi[index];
            const targetTop = pemain.customTop ? pemain.customTop : posDefault.top;
            const targetLeft = pemain.customLeft ? pemain.customLeft : posDefault.left;
            
            const marker = document.createElement('div');
            marker.className = 'player-marker';
            marker.id = `player-idx-${index}`;
            marker.style.top = targetTop;
            marker.style.left = targetLeft;

            const tPercent = parseFloat(targetTop);
            const lPercent = parseFloat(targetLeft);
            const namaPosisi = terjemahkanKoordinatPosisi(tPercent, lPercent);
            const pengali = pemain.multiplier[namaPosisi] || 0.20;
            const ratingDinamis = Math.round(pemain.rating * pengali);

            marker.setAttribute('data-current-rating', ratingDinamis);

            marker.innerHTML = `
                <span class="player-initial">${pemain.inisial}</span>
                <img src="${pemain.foto}" alt="${pemain.name}" class="player-photo" onerror="this.style.display='none'">
                <div class="player-badge-info">
                    <span class="rating-label">${ratingDinamis}</span>
                    <span class="pos-label">${namaPosisi}</span>
                </div>
            `;

            marker.addEventListener('mousedown', (e) => {
                e.preventDefault();
                marker.style.zIndex = "1000";
                const pitchRect = pitch.getBoundingClientRect();
                let moved = false;
                const originalTop = marker.style.top;
                const originalLeft = marker.style.left;

                function jalankanPergeseran(event) {
                    moved = true;
                    let pikselX = event.clientX - pitchRect.left;
                    let pikselY = event.clientY - pitchRect.top;
                    pikselX = Math.max(24, Math.min(pikselX, pitchRect.width - 24));
                    pikselY = Math.max(24, Math.min(pikselY, pitchRect.height - 24));

                    pemain.customLeft = (pikselX / pitchRect.width) * 100 + '%';
                    pemain.customTop = (pikselY / pitchRect.height) * 100 + '%';

                    marker.style.left = pemain.customLeft;
                    marker.style.top = pemain.customTop;

                    const posSekarang = terjemahkanKoordinatPosisi(parseFloat(pemain.customTop), parseFloat(pemain.customLeft));
                    const scoreR = Math.round(pemain.rating * (pemain.multiplier[posSekarang] || 0.20));

                    marker.querySelector('.rating-label').innerText = scoreR;
                    marker.querySelector('.pos-label').innerText = posSekarang;
                    marker.setAttribute('data-current-rating', scoreR);

                    renderDetailProfilMendalam(pemain, posSekarang, scoreR, "STARTER XI");
                    hitungTeamStrength();
                }

                function handleMouseUp() {
                    document.removeEventListener('mousemove', jalankanPergeseran);
                    document.removeEventListener('mouseup', handleMouseUp);
                    marker.style.zIndex = "10";

                    if (moved) {
                        let targetSwapIndex = null;
                        const R_COLLISION = 38;

                        document.querySelectorAll('.player-marker').forEach(otherMarker => {
                            if (otherMarker.id !== marker.id) {
                                const rectA = marker.getBoundingClientRect();
                                const rectB = otherMarker.getBoundingClientRect();
                                const jarak = Math.hypot((rectA.left - rectB.left), (rectA.top - rectB.top));
                                if (jarak < R_COLLISION) targetSwapIndex = parseInt(otherMarker.id.replace('player-idx-', ''));
                            }
                        });

                        if (targetSwapIndex !== null) {
                            const tempTop = skuadAktif[index].customTop || originalTop;
                            const tempLeft = skuadAktif[index].customLeft || originalLeft;

                            skuadAktif[index].customTop = skuadAktif[targetSwapIndex].customTop || koordinatFormasi[targetSwapIndex].top;
                            skuadAktif[index].customLeft = skuadAktif[targetSwapIndex].customLeft || koordinatFormasi[targetSwapIndex].left;

                            skuadAktif[targetSwapIndex].customTop = tempTop;
                            skuadAktif[targetSwapIndex].customLeft = tempLeft;

                            const tempPemain = skuadAktif[index];
                            skuadAktif[index] = skuadAktif[targetSwapIndex];
                            skuadAktif[targetSwapIndex] = tempPemain;
                        } else {
                            if (!isEditPosisiMode) {
                                marker.style.top = originalTop;
                                marker.style.left = originalLeft;
                                pemain.customTop = originalTop;
                                pemain.customLeft = originalLeft;
                            }
                        }
                        renderPapanTaktik(); 
                    } else {
                        const currentPos = marker.querySelector('.pos-label').innerText;
                        const currentRating = marker.getAttribute('data-current-rating');
                        renderDetailProfilMendalam(pemain, currentPos, currentRating, "STARTER XI");
                    }
                }
                document.addEventListener('mousemove', jalankanPergeseran);
                document.addEventListener('mouseup', handleMouseUp);
            });

            playersContainer.appendChild(marker);
        });

        // --- BAGIAN B: MERENDER DAFTAR PEMAIN CADANGAN ---
        databasePemain.forEach((pemain) => {
            if (!skuadAktif.some(p => p.id === pemain.id)) {
                const benchCard = document.createElement('div');
                benchCard.className = 'bench-card';
                
                benchCard.innerHTML = `
                    <img src="${pemain.foto}" alt="${pemain.name}" class="bench-photo" onerror="this.style.display='none'">
                    <span class="bench-name">${pemain.name.split(' ').pop()}</span>
                    <div class="bench-badge-info">
                        <span style="color:#fff;">${pemain.rating}</span>
                        <span style="color:#D4AF37;">${pemain.posAsli}</span>
                    </div>
                `;

                benchCard.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    let movedBench = false;

                    const klonTiruan = benchCard.cloneNode(true);
                    klonTiruan.style.position = 'fixed';
                    klonTiruan.style.zIndex = '9999';
                    klonTiruan.style.opacity = '0.8';
                    klonTiruan.style.left = e.clientX - 37 + 'px';
                    klonTiruan.style.top = e.clientY - 47 + 'px';
                    document.body.appendChild(klonTiruan);

                    function onBenchDrag(event) {
                        movedBench = true;
                        klonTiruan.style.left = event.clientX - 37 + 'px';
                        klonTiruan.style.top = event.clientY - 47 + 'px';
                    }

                    function onBenchRelease(event) {
                        document.removeEventListener('mousemove', onBenchDrag);
                        document.removeEventListener('mouseup', onBenchRelease);
                        document.body.removeChild(klonTiruan);

                        if (movedBench) {
                            let targetStarterIndex = null;
                            document.querySelectorAll('.player-marker').forEach(markerLapangan => {
                                const rect = markerLapangan.getBoundingClientRect();
                                if (event.clientX >= rect.left && event.clientX <= rect.right &&
                                    event.clientY >= rect.top && event.clientY <= rect.bottom) {
                                    targetStarterIndex = parseInt(markerLapangan.id.replace('player-idx-', ''));
                                }
                            });

                            if (targetStarterIndex !== null) {
                                pemain.customTop = skuadAktif[targetStarterIndex].customTop;
                                pemain.customLeft = skuadAktif[targetStarterIndex].customLeft;

                                delete skuadAktif[targetStarterIndex].customTop;
                                delete skuadAktif[targetStarterIndex].customLeft;

                                skuadAktif[targetStarterIndex] = pemain;
                                renderPapanTaktik();
                            }
                        } else {
                            renderDetailProfilMendalam(pemain, pemain.posAsli, pemain.rating, "SUBSTITUTES BENCH");
                        }
                    }
                    document.addEventListener('mousemove', onBenchDrag);
                    document.addEventListener('mouseup', onBenchRelease);
                });

                benchContainer.appendChild(benchCard);
            }
        });

        hitungTeamStrength();
    }

    // =================================================================
    // 3. EVENT LISTENERS BUTTON CONTROLLERS (SAMPURNA - ANTI JATUH REFRESH)
    // =================================================================
    if (btnToggleBench) {
        btnToggleBench.addEventListener('click', () => {
            // FIX KOREKSI: Bandingkan secara ketat dengan string "flex"
            if (benchContainer.style.display === "flex") {
                benchContainer.style.display = "none";
                btnToggleBench.innerHTML = `🏃‍♂️ SHOW SUBSTITUTES BENCH (<span style="color: #fff;">5</span>)`;
                btnToggleBench.style.background = "#111";
            } else {
                benchContainer.style.display = "flex"; // Paksa menggunakan struktur tata letak flexbox lurus kanan
                btnToggleBench.innerHTML = `🏃‍♂️ HIDE SUBSTITUTES BENCH`;
                btnToggleBench.style.background = "rgba(212,175,55,0.1)";
            }
        });
    }

    if (btnToggleMode) {
        btnToggleMode.addEventListener('click', () => {
            isEditPosisiMode = !isEditPosisiMode;
            if (isEditPosisiMode) {
                btnToggleMode.innerHTML = `<span style="font-size: 14px;">✥</span> MODE: EDIT POSISI (BEBAS)`;
                btnToggleMode.style.background = "linear-gradient(135deg, #8B0000 0%, #5a0000 100%)";
                btnToggleMode.style.borderColor = "#ef4444";
            } else {
                btnToggleMode.innerHTML = `<span style="font-size: 14px;">✥</span> MODE: TUKAR PEMAIN`;
                btnToggleMode.style.background = "#222";
                btnToggleMode.style.borderColor = "#444";
            }
            renderPapanTaktik();
        });
    }

    const btnAutoPick = document.getElementById('btn-auto-pick');
    if (btnAutoPick) {
        btnAutoPick.addEventListener('click', () => {
            const formasiAktif = selectFormasi.value;
            const koordinatTarget = blueprintFormasi[formasiAktif];

            isEditPosisiMode = false;
            if (btnToggleMode) {
                btnToggleMode.innerHTML = `<span style="font-size: 14px;">✥</span> MODE: TUKAR PEMAIN`;
                btnToggleMode.style.background = "#222";
                btnToggleMode.style.borderColor = "#444";
            }

            databasePemain.forEach(p => { delete p.customTop; delete p.customLeft; });

            let skuadTeroptimal = [];

            koordinatTarget.forEach((posisiKoordinat) => {
                const targetPosRole = terjemahkanKoordinatPosisi(parseFloat(posisiKoordinat.top), parseFloat(posisiKoordinat.left));
                let kandidatTerbaik = null;
                let skorTertinggi = -1;

                databasePemain.forEach(pemain => {
                    if (!skuadTeroptimal.some(p => p.id === pemain.id)) {
                        const multiplierVal = pemain.multiplier[targetPosRole] || 0.20;
                        const ratingKecocokan = pemain.rating * multiplierVal;

                        if (ratingKecocokan > skorTertinggi) {
                            skorTertinggi = ratingKecocokan;
                            kandidatTerbaik = pemain;
                        }
                    }
                });
                skuadTeroptimal.push(kandidatTerbaik);
            });

            skuadAktif = skuadTeroptimal;
            renderPapanTaktik();

            detailContent.innerHTML = `
                <div style="text-align: center; color: #D4AF37;">
                    <div style="font-size: 32px; margin-bottom: 5px;">⚡</div>
                    <h3>SQUAD OPTIMIZED</h3>
                    <p style="font-size: 11px; color: #aaa; margin-top: 5px; line-height: 16px;">Sistem berhasil memindai database cadangan besar, menaikkan Christian Pulisic (92) ke starter RWF menggantikan Chukwueze (83) demi performa Team Strength maksimal!</p>
                </div>
            `;
        });
    }

    if (selectFormasi) {
        selectFormasi.addEventListener('change', () => {
            databasePemain.forEach(p => { delete p.customTop; delete p.customLeft; });
            renderPapanTaktik();
        });
    }

    renderPapanTaktik();
});