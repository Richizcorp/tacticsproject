document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // 1. DATA MASTER SKUAD UTAMA AC MILAN (11 PEMAIN LENGKAP)
    // =================================================================
    const databasePemain = [
        { name: "Mike Maignan", inisial: "MM", posAsli: "GK", rating: 90, top: "86%", left: "50%", foto: "assets/maignan.png", multiplier: { "GK": 1.0, "CB": 0.15 } },
        { name: "Theo Hernandez", inisial: "TH", posAsli: "LB", rating: 93, top: "70%", left: "16%", foto: "assets/theo.png", multiplier: { "LB": 1.0, "LWB": 0.95, "CB": 0.65, "LWF": 0.75, "CF": 0.30 } },
        { name: "Fikayo Tomori", inisial: "FT", posAsli: "CB", rating: 89, top: "74%", left: "37%", foto: "assets/tomori.png", multiplier: { "CB": 1.0, "RB": 0.72, "LB": 0.72, "DMF": 0.60 } },
        { name: "Matteo Gabbia", inisial: "MG", posAsli: "CB", rating: 85, top: "74%", left: "63%", foto: "assets/gabbia.png", multiplier: { "CB": 1.0, "RB": 0.60, "DMF": 0.55 } },
        { name: "Davide Calabria", inisial: "DC", posAsli: "RB", rating: 86, top: "70%", left: "84%", foto: "assets/calabria.png", multiplier: { "RB": 1.0, "RWB": 0.93, "CB": 0.65, "RMF": 0.70 } },
        { name: "Tijjani Reijnders", inisial: "TR", posAsli: "CMF", rating: 91, top: "48%", left: "33%", foto: "assets/reijnders.png", multiplier: { "CMF": 1.0, "AMF": 0.92, "DMF": 0.88, "CF": 0.50 } },
        { name: "Youssouf Fofana", inisial: "YF", posAsli: "DMF", rating: 88, top: "54%", left: "50%", foto: "assets/fofana.png", multiplier: { "DMF": 1.0, "CMF": 0.85, "CB": 0.70 } },
        { name: "Ruben Loftus-Cheek", inisial: "RL", posAsli: "CMF", rating: 87, top: "48%", left: "67%", foto: "assets/loftus-cheek.png", multiplier: { "CMF": 1.0, "AMF": 0.92, "CF": 0.70, "DMF": 0.75 } },
        { name: "Rafael Leao", inisial: "RL", posAsli: "LWF", rating: 96, top: "22%", left: "18%", foto: "assets/leao.png", multiplier: { "LWF": 1.0, "LMF": 0.92, "CF": 0.85, "AMF": 0.80, "LB": 0.15 } },
        { name: "Alvaro Morata", inisial: "AM", posAsli: "CF", rating: 90, top: "14%", left: "50%", foto: "assets/morata.png", multiplier: { "CF": 1.0, "SS": 0.92, "AMF": 0.65, "GK": 0.10 } },
        { name: "Christian Pulisic", inisial: "CP", posAsli: "RWF", rating: 92, top: "22%", left: "82%", foto: "assets/pulisic.png", multiplier: { "RWF": 1.0, "AMF": 0.94, "RMF": 0.90, "LWF": 0.88, "CF": 0.60 } }
    ];

    // =================================================================
    // 2. INTERPRETER GEOLOKASI (MENERJEMAHKAN KOORDINAT % -> POSISI)
    // =================================================================
    function terjemahkanKoordinatPosisi(topPercent, leftPercent) {
        if (topPercent <= 30) {
            if (leftPercent >= 35 && leftPercent <= 65) return "CF";
            if (leftPercent < 35) return "LWF";
            return "RWF";
        } 
        else if (topPercent > 30 && topPercent <= 44) {
            if (leftPercent >= 35 && leftPercent <= 65) return "AMF";
            if (leftPercent < 35) return "LMF";
            return "RMF";
        } 
        else if (topPercent > 44 && topPercent <= 58) {
            if (leftPercent >= 38 && leftPercent <= 62) return "DMF";
            return "CMF";
        } 
        else if (topPercent > 58 && topPercent <= 80) {
            if (leftPercent >= 33 && leftPercent <= 67) return "CB";
            if (leftPercent < 33) return "LB";
            return "RB";
        } 
        else {
            return "GK";
        }
    }

    // =================================================================
    // 3. MANIPULASI DOM & INTERAKSI MESIN DRAG / CLICK
    // =================================================================
    const pitch = document.getElementById('pitch');
    const playersContainer = document.getElementById('players-on-pitch');
    const detailContent = document.getElementById('detail-content');
    const teamStrengthLabel = document.getElementById('team-strength');

    function hitungTeamStrength() {
        let totalStrength = 0;
        const semuaMarker = document.querySelectorAll('.player-marker');
        semuaMarker.forEach(marker => {
            totalStrength += parseInt(marker.getAttribute('data-current-rating'));
        });
        if (teamStrengthLabel) {
            teamStrengthLabel.innerText = Math.round(totalStrength);
        }
    }

    function inisialisasiPapanTaktik() {
        if (!playersContainer) return;
        playersContainer.innerHTML = "";

        databasePemain.forEach((pemain) => {
            const marker = document.createElement('div');
            marker.className = 'player-marker';
            marker.style.top = pemain.top;
            marker.style.left = pemain.left;
            marker.setAttribute('data-current-rating', pemain.rating);
            
            marker.innerHTML = `
                <span class="player-initial">${pemain.inisial}</span>
                <img src="${pemain.foto}" alt="${pemain.name}" class="player-photo" onerror="this.style.display='none'">
                <div class="player-badge-info">
                    <span class="rating-label">${pemain.rating}</span>
                    <span class="pos-label">${pemain.posAsli}</span>
                </div>
            `;

            // EVENT LISTENER MOUSE DOWN (AWAL SENTUHAN)
            marker.addEventListener('mousedown', (e) => {
                e.preventDefault();
                
                const pitchRect = pitch.getBoundingClientRect();
                let moved = false; // Flag penanda pergerakan mouse

                // Sub-fungsi untuk merender profil mendalam di panel kanan
                function tampilkanDetailPemain(posisiDinamis, ratingDinamis) {
                    // Hitung persentase efisiensi adaptasi taktik
                    const persenEfisiensi = Math.round((ratingDinamis / pemain.rating) * 100);
                    
                    detailContent.innerHTML = `
                        <div class="player-active-info">
                            <div style="width: 90px; height: 90px; margin: 0 auto 15px; border-radius: 50%; border: 2px solid #D4AF37; overflow: hidden; background: #111; position: relative;">
                                <img src="${pemain.foto}" alt="${pemain.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2290%22 height=%2290%22><rect width=%2290%22 height=%2290%22 fill=%22%23111%22/><text x=%2250%%22 y=%2255%%22 font-family=%22Oxanium%22 font-size=%2224%22 fill=%22%238B0000%22 font-weight=%22bold%22 text-anchor=%22middle%22>${pemain.inisial}</text></svg>'">
                            </div>

                            <h2 style="font-size: 22px; color: #fff; margin-bottom: 5px; font-family: 'Comfortaa', cursive;">${pemain.name}</h2>
                            <p style="font-size: 13px; color: #aaa; margin-bottom: 15px;">Posisi Alami: <strong style="color: #D4AF37">${pemain.posAsli}</strong></p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                                <div style="background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid #222;">
                                    <p style="font-size: 10px; color: #666;">POSISI AKTIF</p>
                                    <h3 style="font-size: 20px; color: #fff; margin-top: 5px;">${posisiDinamis}</h3>
                                </div>
                                <div style="background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid #222;">
                                    <p style="font-size: 10px; color: #666;">RATING ADAPTASI</p>
                                    <h3 style="font-size: 20px; color: #D4AF37; margin-top: 5px;">${ratingDinamis}</h3>
                                </div>
                            </div>

                            <div style="text-align: left; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; border: 1px solid #111;">
                                <h4 style="font-size: 11px; color: #D4AF37; margin-bottom: 10px; letter-spacing: 1px;">// KESESUAIAN TAKTIK TIM</h4>
                                <p style="font-size: 12px; color: #bbb; line-height: 18px;">
                                    ${pemain.name} saat ini diplot sebagai <strong>${posisiDinamis}</strong>. 
                                    ${pemain.posAsli === posisiDinamis ? 
                                        'Ia bermain di posisi utamanya, memberikan kontribusi efisiensi penuh bagi strategi tim.' : 
                                        `Mengalami penurunan kapasitas taktis menjadi <strong style="color:#ef4444;">${persenEfisiensi}%</strong> akibat penyesuaian peran.`}
                                </p>
                            </div>
                        </div>
                    `;
                }

                // Fungsi saat mouse diseret (Aksi Drag)
                function jalankanPergeseran(event) {
                    moved = true; // Set true karena mouse digeser
                    
                    let pikselX = event.clientX - pitchRect.left;
                    let pikselY = event.clientY - pitchRect.top;

                    pikselX = Math.max(24, Math.min(pikselX, pitchRect.width - 24));
                    pikselY = Math.max(24, Math.min(pikselY, pitchRect.height - 24));

                    const leftPercent = (pikselX / pitchRect.width) * 100;
                    const topPercent = (pikselY / pitchRect.height) * 100;

                    marker.style.left = leftPercent + '%';
                    marker.style.top = topPercent + '%';

                    const posSekarang = terjemahkanKoordinatPosisi(topPercent, leftPercent);
                    const koefisienEfisiensi = pemain.multiplier[posSekarang] || 0.20;
                    const ratingBaru = Math.round(pemain.rating * koefisienEfisiensi);

                    marker.querySelector('.rating-label').innerText = ratingBaru;
                    marker.querySelector('.pos-label').innerText = posSekarang;
                    marker.setAttribute('data-current-rating', ratingBaru);

                    if (koefisienEfisiensi < 0.6) {
                        marker.style.borderColor = "#ef4444";
                        marker.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.6)";
                    } else if (koefisienEfisiensi === 1.0) {
                        marker.style.borderColor = "#D4AF37";
                        marker.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
                    } else {
                        marker.style.borderColor = "#eab308";
                        marker.style.boxShadow = "0 0 10px rgba(234, 179, 8, 0.4)";
                    }

                    tampilkanDetailPemain(posSekarang, ratingBaru);
                    hitungTeamStrength();
                }

                // Fungsi saat mouse dilepas (Aksi Selesai)
                function hentikanPergeseran() {
                    document.removeEventListener('mousemove', jalankanPergeseran);
                    document.removeEventListener('mouseup', hentikanPergeseran);

                    // JIKA MOUSE TIDAK BERGESER SAMA SEKALI (KLIK MURNI)
                    if (!moved) {
                        const currentPos = marker.querySelector('.pos-label').innerText;
                        const currentRating = marker.getAttribute('data-current-rating');
                        tampilkanDetailPemain(currentPos, currentRating);
                    }
                }

                document.addEventListener('mousemove', jalankanPergeseran);
                document.addEventListener('mouseup', hentikanPergeseran);
            });

            playersContainer.appendChild(marker);
        });
        
        hitungTeamStrength();
    }

    inisialisasiPapanTaktik();
});