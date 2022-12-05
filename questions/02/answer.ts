import * as fs from "fs"
import { sum } from "../../utils/reduce"

interface MoveDictionary { [key: string]: number }

const data = fs.readFileSync("questions/02/data.txt", "utf8")
const pairs = data.replace(/\r/g, "").split("\n").map(x => x.split(" "))

const scores: MoveDictionary = {
	A: 1, B: 2, C: 3,
	X: 1, Y: 2, Z: 3
}

const compareMovesPt1 = (pair: Array<string>): number => {
	const [theirs, ours] = pair.map(move => scores[move])
	const diff = (theirs - ours + 3) % 3
	const outcome = diff === 1 ? 0 : diff === 0 ? 3 : 6
	return ours + outcome
}

const wlt: MoveDictionary = { X: 2, Y: 0, Z: 1 }
const wltBonus: MoveDictionary = { X: 0, Y: 3, Z: 6 }

const compareMovesPt2 = (pair: Array<string>): number => {
	const theirs = scores[pair[0]]
	let score = wltBonus[pair[1]]
	
	const winPoints = wlt[pair[1]]
	const delta = (theirs + winPoints) % 3
	score += delta
	if (theirs + winPoints === 3) score += 3
	return score
}

// Part 1
const matchScores = pairs.map(compareMovesPt1).reduce(sum)
console.log(matchScores)

// Part 2
const res = pairs.map(compareMovesPt2).reduce((acc, curr) => acc + curr)
console.log(res)
