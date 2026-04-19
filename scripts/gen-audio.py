"""Generate small CC0 audio clips for the Mundial tradiciones section.

Uses only the Python stdlib (wave, math, struct, random).
Writes 22050 Hz, 16-bit, mono WAV files into public/audio/.
"""

import math
import os
import random
import struct
import wave

SAMPLE_RATE = 22050
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)


def write_wav(filename: str, samples: list[float]) -> None:
    """Write a float list (-1..1) to a 16-bit mono WAV."""
    path = os.path.join(OUTPUT_DIR, filename)
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        pcm = b"".join(
            struct.pack("<h", max(-32767, min(32767, int(s * 32767)))) for s in samples
        )
        w.writeframes(pcm)
    size_kb = os.path.getsize(path) / 1024
    print(f"  wrote {filename} ({size_kb:.1f} KB, {len(samples)/SAMPLE_RATE:.1f} s)")


def trumpet_note(freq: float, duration: float, amp: float = 0.25) -> list[float]:
    """Simulate a brass note with rich harmonics + ADSR envelope."""
    n = int(duration * SAMPLE_RATE)
    samples: list[float] = []
    # Brass has strong odd/even harmonics; emulate with decreasing amplitudes
    harmonics = [(1, 1.0), (2, 0.55), (3, 0.40), (4, 0.28), (5, 0.18), (6, 0.10)]
    for i in range(n):
        t = i / SAMPLE_RATE
        # ADSR envelope: 30 ms attack, 40 ms decay to sustain 0.8, release in last 15%
        if t < 0.03:
            env = t / 0.03
        elif t < 0.07:
            env = 1.0 - 0.2 * ((t - 0.03) / 0.04)
        elif t < duration * 0.85:
            env = 0.8
        else:
            env = 0.8 * (1 - (t - duration * 0.85) / (duration * 0.15))
        # Sum harmonics
        v = 0.0
        for h, hamp in harmonics:
            v += hamp * math.sin(2 * math.pi * freq * h * t)
        v /= sum(a for _, a in harmonics)
        samples.append(v * env * amp)
    return samples


def trumpet_fanfare() -> list[float]:
    """~5-second classic mariachi-style fanfare: G4 - C5 - E5 - G5 held."""
    notes = [
        (392.0, 0.35),  # G4
        (523.25, 0.35),  # C5
        (659.25, 0.35),  # E5
        (783.99, 1.4),  # G5 (held)
        (0, 0.25),  # rest
        (783.99, 0.25),  # G5 short
        (0, 0.1),
        (783.99, 0.25),  # G5 short
        (0, 0.1),
        (880.0, 1.2),  # A5 (held, resolution)
    ]
    out: list[float] = []
    for freq, dur in notes:
        if freq == 0:
            out.extend(0.0 for _ in range(int(dur * SAMPLE_RATE)))
        else:
            out.extend(trumpet_note(freq, dur))
    return out


def crowd_roar(duration: float = 6.0) -> list[float]:
    """Stadium-crowd-like roar: filtered pink noise with slow amp modulation and chant-like peaks."""
    random.seed(42)
    n = int(duration * SAMPLE_RATE)
    # Pink-ish noise via moving average of white
    white = [random.uniform(-1, 1) for _ in range(n + 16)]
    pink = [sum(white[i : i + 16]) / 16 for i in range(n)]

    # Slow amplitude modulation (breathing chant feel) + crescendo into a chant
    samples: list[float] = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Big swell around 1.5-3s (whistle of crowd cheering), ramps up and down
        swell = 0.55 + 0.45 * math.sin(2 * math.pi * 0.25 * t - math.pi / 2)
        # Sudden "OLÉ!" peak around 3.5s and 4.5s
        peak = 0.0
        for center in (3.5, 4.5, 5.4):
            d = t - center
            peak += 0.7 * math.exp(-(d * d) / 0.02)
        env = min(1.0, swell + peak)
        samples.append(pink[i] * env * 0.6)
    # Add a low-frequency "thud" rumble (distant drums / foot stomping)
    for i in range(n):
        t = i / SAMPLE_RATE
        stomp = 0.0
        for center in (0.5, 1.2, 2.0, 2.8, 3.6, 4.4, 5.2):
            d = t - center
            stomp += 0.5 * math.exp(-(d * d) / 0.005) * math.sin(2 * math.pi * 60 * t)
        samples[i] += stomp * 0.3
    # Normalize softly
    peak = max(abs(s) for s in samples) or 1
    return [s / peak * 0.9 for s in samples]


if __name__ == "__main__":
    print("Generating audio clips in", OUTPUT_DIR)
    write_wav("trompeta-fanfare.wav", trumpet_fanfare())
    write_wav("multitud-ola.wav", crowd_roar(6.0))
    print("Done. License: CC0 (public domain dedication).")
