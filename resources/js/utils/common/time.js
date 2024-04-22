// Função para converter a string de tempo em segundos
export function parseTime(timeString) {
    if (typeof timeString === "number") {
        return timeString;
    }

    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
}

// Função para formatar o tempo restante para "mm:ss"
export function formatTime(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
    }${seconds}`;
}
