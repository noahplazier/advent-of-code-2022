import * as fs from "fs"

const data = fs.readFileSync("questions/04/data.txt", "utf8")
const pairs = data.replace(/\r/g, "").split("\n").map(pair => {
	const [l,r] = pair.split(",").map(sections => sections.split("-").map(sectionID => +sectionID))
	return [l, r]
})

const pairContainedByOtherPair = (l: Array<number>, r: Array<number>): boolean => {
	return l[0] <= r[0] && l[1] >= r[1] || r[0] <= l[0] && r[1] >= l[1]
}

const pairsOverlapPartly = (l: Array<number>, r: Array<number>): boolean => {
	const contained = pairContainedByOtherPair(l, r)
	return contained || l[0] <= r[0] && l[1] >= r[0] || r[0] <= l[0] && r[1] >= l[0]
}

// Part 1
const totalContainedPairs = pairs.filter(x => pairContainedByOtherPair(x[0], x[1])).length
console.log(totalContainedPairs)

// Part 2
const totalOverlappingPairs = pairs.filter(x => pairsOverlapPartly(x[0], x[1])).length
console.log(totalOverlappingPairs)
