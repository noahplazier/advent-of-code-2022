import * as fs from "fs"

const data = fs.readFileSync("questions/04/data.txt", "utf8")
const pairs = data.replace(/\r/g, "").split("\n").map(pair => {
	const [l,r] = pair.split(",").map(sections => sections.split("-").map(sectionID => +sectionID))
	return [l, r]
})

const pairContainedByOtherPair = (l: Array<number>, r: Array<number>): boolean => {
	return l[0] <= r[0] && l[1] >= r[1] || r[0] <= l[0] && r[1] >= l[1]
}

// Part 1
const totalContainedPairs = pairs.map(x => pairContainedByOtherPair(x[0], x[1])).filter(x => x).length
console.log(totalContainedPairs)

// Part 2

