import { supabase } from '@/lib/supabase'

type BeachRow = { id: string; name: string; description: string | null }
type LocationRow = { id: string; beach_id: string }
type CameraRow = {
  id: string
  location_id: string
  name: string
  status: string
  description: string | null
}

export type BeachWithCameras = {
  id: string
  name: string
  description: string | null
  cameras: {
    id: string
    name: string
    status: string
    description: string | null
  }[]
}

export async function getBeachesWithCameras(): Promise<BeachWithCameras[]> {
  try {
    const [beachesRes, locationsRes, camerasRes] = await Promise.all([
      supabase.from('beaches').select('id,name,description').order('name'),
      supabase.from('locations').select('id,beach_id'),
      supabase.from('cameras').select('id,location_id,name,status,description'),
    ])

    if (beachesRes.error) throw beachesRes.error
    if (locationsRes.error) throw locationsRes.error
    if (camerasRes.error) throw camerasRes.error

    const allBeaches = (beachesRes.data ?? []) as BeachRow[]
    const allLocations = (locationsRes.data ?? []) as LocationRow[]
    const allCameras = (camerasRes.data ?? []) as CameraRow[]

    return allBeaches.map(beach => {
      const beachLocationIds = allLocations
        .filter(l => l.beach_id === beach.id)
        .map(l => l.id)
      const beachCameras = allCameras.filter(c =>
        beachLocationIds.includes(c.location_id)
      )
      return { ...beach, cameras: beachCameras }
    })
  } catch (error) {
    console.error('❌ Error fetching beaches data:', error)
    return []
  }
}
