// Condições reais do mar via Open-Meteo (grátis, sem chave de API).
// Marine API: ondas + nível do mar (maré). Forecast API: vento + temperatura.

// Ubatuba (ponto offshore central)
const UBATUBA = { lat: -23.54, lng: -45.04 }

const DIRS = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'] // L=Leste, O=Oeste
function cardinal(deg: number): string {
  return DIRS[Math.round(deg / 45) % 8]
}

export type Conditions = {
  waveHeight: number
  wavePeriod: number
  waveDir: string
  windSpeed: number
  windDir: string
  temp: number
  tide: 'Enchendo' | 'Vazando'
  updatedAt: string
}

export async function getConditions(
  lat: number = UBATUBA.lat,
  lng: number = UBATUBA.lng,
): Promise<Conditions | null> {
  try {
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height,wave_period,wave_direction&hourly=sea_level_height_msl&timezone=America%2FSao_Paulo&forecast_days=1`
    const fcUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=wind_speed_10m,wind_direction_10m,temperature_2m&timezone=America%2FSao_Paulo`

    const [mRes, fRes] = await Promise.all([
      fetch(marineUrl, { next: { revalidate: 1800 } }),
      fetch(fcUrl, { next: { revalidate: 1800 } }),
    ])
    if (!mRes.ok || !fRes.ok) return null
    const m = await mRes.json()
    const f = await fRes.json()

    // tendência da maré: compara o nível na hora atual com a hora seguinte
    const sea: number[] = m.hourly?.sea_level_height_msl ?? []
    const hr = parseInt(String(m.current?.time ?? '').slice(11, 13)) || 0
    const a = sea[hr] ?? 0
    const b = sea[Math.min(hr + 1, sea.length - 1)] ?? a
    const tide: 'Enchendo' | 'Vazando' = b >= a ? 'Enchendo' : 'Vazando'

    return {
      waveHeight: Math.round((m.current.wave_height ?? 0) * 10) / 10,
      wavePeriod: Math.round(m.current.wave_period ?? 0),
      waveDir: cardinal(m.current.wave_direction ?? 0),
      windSpeed: Math.round(f.current.wind_speed_10m ?? 0),
      windDir: cardinal(f.current.wind_direction_10m ?? 0),
      temp: Math.round(f.current.temperature_2m ?? 0),
      tide,
      updatedAt: String(m.current?.time ?? ''),
    }
  } catch {
    return null
  }
}
