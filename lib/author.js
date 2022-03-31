import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'author.json')

export function getAuthor() {
    return JSON.parse(fs.readFileSync(filePath, 'UTF-8'));
}