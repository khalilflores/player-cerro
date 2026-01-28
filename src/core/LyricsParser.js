export class LyricsParser {
    static parseSRT(srtContent) {
        const lines = srtContent.trim().split(/\r?\n\r?\n/);
        const lyrics = [];
        const timeFormat = /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/;

        lines.forEach(line => {
            const parts = line.split(/\r?\n/);
            if (parts.length >= 3) {
                const timeMatch = parts[1].match(timeFormat);
                if (timeMatch) {
                    const startTime =
                        parseInt(timeMatch[1]) * 3600 +
                        parseInt(timeMatch[2]) * 60 +
                        parseInt(timeMatch[3]) +
                        parseInt(timeMatch[4]) / 1000;
                    const endTime =
                        parseInt(timeMatch[5]) * 3600 +
                        parseInt(timeMatch[6]) * 60 +
                        parseInt(timeMatch[7]) +
                        parseInt(timeMatch[8]) / 1000;
                    const text = parts.slice(2).join("\n").trim();
                    lyrics.push({ startTime, endTime, text });
                }
            }
        });
        return lyrics;
    }
}
