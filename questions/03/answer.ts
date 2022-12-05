import * as fs from "fs"
import { sum } from "../../utils/reduce"
import { filterDuplicates } from "../../utils/filter"

const data = fs.readFileSync("questions/03/data.txt", "utf8")
const rucksacks = data.replace(/\r/g, "").split("\n")
const compartmentsSplit = rucksacks.map(x => [x.slice(0, x.length/2), x.slice(x.length/2)])
const overlappingCharacters = (left: string, right: string): string => left.split("").filter(char => right.includes(char))!.filter(filterDuplicates).join("")
const overlappingCharactersRec = (...strings: Array<string>): string => strings.length > 2
	? overlappingCharacters(overlappingCharactersRec(...strings.slice(0, -1)), strings[strings.length - 1])
	: overlappingCharacters(strings[0], strings[1])
const outliers = compartmentsSplit.map(x => overlappingCharacters(x[0], x[1]))
const characterToPriority = (char: string) => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1

const groupCharacters = [...Array(rucksacks.length / 3)].map((_, i) => overlappingCharactersRec(...rucksacks.slice(i * 3, (i+1)*3)))

// Part 1
const summedPriorities = outliers.map(characterToPriority).reduce(sum)
console.log(summedPriorities)

// Part 2
const summedGroupPriorities = groupCharacters.map(characterToPriority).reduce(sum)
console.log(summedGroupPriorities)
