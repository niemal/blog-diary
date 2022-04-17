import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'author.json')

export const author = JSON.parse(fs.readFileSync(filePath, 'UTF-8'));
export const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'UTF-8'));