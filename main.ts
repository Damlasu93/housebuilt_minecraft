player.onChat("ev", function () {
    // Agent'ı oyuncunun yanına getir
    agent.teleportToPlayer()
    // =========================
    // 1. TABAN: 5 x 5 = 25 BLOK
    // =========================
    // 25 taş bloğu 1. slota koy
    agent.setItem(STONE, 25, 1)
    agent.setSlot(1)
    // 5 satır
    for (let row = 0; row <= 4; row++) {
        // Her satırda 5 blok
        for (let col = 0; col <= 4; col++) {
            agent.place(DOWN)
            // Son bloktan sonra ilerleme
            if (col < 4) {
                agent.move(FORWARD, 1)
            }
        }
        // Son satır değilse bir sonraki satıra geç
        if (row < 4) {
            if (row % 2 == 0) {
                agent.turn(RIGHT_TURN)
                agent.move(FORWARD, 1)
                agent.turn(RIGHT_TURN)
            } else {
                agent.turn(LEFT_TURN)
                agent.move(FORWARD, 1)
                agent.turn(LEFT_TURN)
            }
        }
    }
    // =========================
    // 2. DUVAR: 4 KAT x 16 = 64
    // =========================
    // 64 taşı 2. slota koy
    agent.setItem(STONE, 64, 2)
    agent.setSlot(2)
    // Tabanın son köşesinden duvarı takip etmek için dön
    agent.turn(LEFT_TURN)
    // 4 kat duvar
    for (let height = 0; height <= 3; height++) {
        // Agent hareket ederken blok yerleştirsin
        agent.setAssist(PLACE_ON_MOVE, true)
        // Karenin 4 kenarı
        for (let index = 0; index < 4; index++) {
            agent.move(FORWARD, 4)
            agent.turn(RIGHT_TURN)
        }
        // Bir sonraki kata çık
        // Yukarı çıkarken fazladan blok koymaması için kapatıyoruz
        if (height < 3) {
            agent.setAssist(PLACE_ON_MOVE, false)
            agent.move(UP, 1)
        }
    }
    // Blok yerleştirmeyi kapat
    agent.setAssist(PLACE_ON_MOVE, false)
})
