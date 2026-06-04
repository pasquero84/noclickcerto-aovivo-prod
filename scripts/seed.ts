import { db } from '@/lib/db'
import { beaches, locations, cameras } from '@/lib/db/schema'

async function seed() {
  console.log('🌱 Iniciando seed de câmeras...')

  // Criar praias
  const itamambuca = await db
    .insert(beaches)
    .values({
      name: 'Itamambuca',
      slug: 'itamambuca',
      description: 'Praia com ondas perfeitas para o surfe',
    })
    .returning()

  const praiaGrande = await db
    .insert(beaches)
    .values({
      name: 'Praia Grande',
      slug: 'praia-grande',
      description: 'Praia de ondas consistentes',
    })
    .returning()

  const perequeAcu = await db
    .insert(beaches)
    .values({
      name: 'Perequê-Açu',
      slug: 'perequê-acu',
      description: 'Praia tranquila de Ubatuba',
    })
    .returning()

  const vermelha = await db
    .insert(beaches)
    .values({
      name: 'Vermelha',
      slug: 'vermelha',
      description: 'Praia do Centro de Ubatuba',
    })
    .returning()

  const preferida = await db
    .insert(beaches)
    .values({
      name: 'A Preferida',
      slug: 'a-preferida',
      description: 'A Preferida do Lado Norte de Ubatuba',
    })
    .returning()

  const toninhas = await db
    .insert(beaches)
    .values({
      name: 'Toninhas',
      slug: 'toninhas',
      description: 'Praia com presença de golfinhos',
    })
    .returning()

  // Criar localizações e câmeras
  const locations_data = [
    {
      beach: itamambuca[0],
      name: 'Canto Direito',
      cameras: ['Itamambuca - Canto Direito'],
    },
    {
      beach: itamambuca[0],
      name: 'Rua 1',
      cameras: ['Itamambuca - Rua 1'],
    },
    {
      beach: praiaGrande[0],
      name: 'Baguari',
      cameras: ['Praia Grande - Baguari'],
    },
    {
      beach: praiaGrande[0],
      name: 'Bombeiro',
      cameras: ['Praia Grande - Bombeiro'],
    },
    {
      beach: perequeAcu[0],
      name: 'Quiosque Girassol',
      cameras: ['Perequê-Açu - Quiosque Girassol'],
    },
    {
      beach: vermelha[0],
      name: 'Centro',
      cameras: ['Vermelha - Centro'],
    },
    {
      beach: preferida[0],
      name: 'Lado Norte',
      cameras: ['A Preferida - Lado Norte'],
    },
    {
      beach: toninhas[0],
      name: 'Toninhas',
      cameras: ['Toninhas'],
    },
  ]

  for (const loc_data of locations_data) {
    const location = await db
      .insert(locations)
      .values({
        beachId: loc_data.beach.id,
        name: loc_data.name,
      })
      .returning()

    for (const cameraName of loc_data.cameras) {
      await db.insert(cameras).values({
        locationId: location[0].id,
        name: cameraName,
        status: 'offline',
        description: `Câmera ao vivo de ${cameraName}`,
      })
    }
  }

  console.log('✅ Seed concluído com sucesso!')
}

seed().catch(err => {
  console.error('❌ Erro ao fazer seed:', err)
  process.exit(1)
})
