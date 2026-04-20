import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type DictionaryApiPhonetic = {
  text?: string
}

async function main() {
  console.log('Fetching saved words...')
  const words = await prisma.learningProgress.findMany({
    where: { level: 'SAVED' }
  })
  
  if (words.length === 0) {
    console.log('No saved words found.')
    return
  }

  console.log(`Found ${words.length} saved words to update.`)
  
  for (const word of words) {
    if (!word.pronunciation || !word.partOfSpeech) {
      console.log(`Fetching data for ${word.word}...`)
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.word)}`)
        if (res.ok) {
          const data = await res.json()
          let pronunciation = word.pronunciation
          let partOfSpeech = word.partOfSpeech
          
          const phonetics = data[0]?.phonetics
          if (!pronunciation && phonetics && phonetics.length > 0) {
            const validPhonetic = (phonetics as DictionaryApiPhonetic[]).find((phonetic) => phonetic.text)
            if (validPhonetic?.text) pronunciation = validPhonetic.text
          }
          
          const meanings = data[0]?.meanings
          if (!partOfSpeech && meanings && meanings.length > 0) {
            partOfSpeech = meanings[0]?.partOfSpeech || null
          }
          
          if (pronunciation || partOfSpeech) {
            await prisma.learningProgress.update({
              where: { id: word.id },
              data: {
                pronunciation: pronunciation || undefined,
                partOfSpeech: partOfSpeech || undefined,
              }
            })
            console.log(`✅ Updated ${word.word}: ${pronunciation} | ${partOfSpeech}`)
          }
        }
      } catch (err) {
        console.error(`❌ Failed for ${word.word}:`, err)
      }
    } else {
        console.log(`⏭️ Skipped ${word.word} (already has data)`)
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
