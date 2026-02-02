import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const THEMES_DIR = path.join(ROOT, 'themes')
const BASE_THEME = 'classic'

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

function listFilesRecursive(dir) {
  const result = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...listFilesRecursive(full))
    } else if (entry.isFile()) {
      result.push(full)
    }
  }
  return result
}

function relativeVueFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return listFilesRecursive(dir)
    .filter((f) => f.endsWith('.vue'))
    .map((f) => path.relative(dir, f).replace(/\\/g, '/'))
    .sort()
}

function validateTheme(themeName) {
  const basePagesDir = path.join(THEMES_DIR, BASE_THEME, 'pages')
  const baseLayoutsDir = path.join(THEMES_DIR, BASE_THEME, 'layouts')

  const themePagesDir = path.join(THEMES_DIR, themeName, 'pages')
  const themeLayoutsDir = path.join(THEMES_DIR, themeName, 'layouts')

  const basePages = new Set(relativeVueFiles(basePagesDir))
  const baseLayouts = new Set(relativeVueFiles(baseLayoutsDir))

  const themePages = new Set(relativeVueFiles(themePagesDir))
  const themeLayouts = new Set(relativeVueFiles(themeLayoutsDir))

  const missingPages = [...basePages].filter((p) => !themePages.has(p))
  const missingLayouts = [...baseLayouts].filter((p) => !themeLayouts.has(p))

  return { missingPages, missingLayouts }
}

function main() {
  const themes = listDirs(THEMES_DIR).filter((t) => !t.startsWith('_'))
  const targets = themes.filter((t) => t !== BASE_THEME)

  let hasError = false
  for (const themeName of targets) {
    const { missingPages, missingLayouts } = validateTheme(themeName)
    if (missingPages.length || missingLayouts.length) {
      hasError = true
      console.log(`Theme "${themeName}" missing files:`)
      if (missingPages.length) {
        console.log('  Pages:')
        for (const p of missingPages) console.log(`    - ${p}`)
      }
      if (missingLayouts.length) {
        console.log('  Layouts:')
        for (const p of missingLayouts) console.log(`    - ${p}`)
      }
    }
  }

  if (hasError) {
    console.log('Theme validation failed.')
    process.exit(1)
  } else {
    console.log('All themes are valid.')
  }
}

main()
