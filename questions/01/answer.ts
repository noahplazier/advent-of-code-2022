import * as fs from "fs"
import { sum } from "../../utils/reduce"

const data = fs.readFileSync("questions/01/data.txt", "utf8")
const calories = data.replace(/\r/g, "").split("\n").map(c => Number.parseInt(c))
const caloriesByElf = calories.reduce((acc, curr) => {
    if (isNaN(curr)) acc.push(0)
    else acc[acc.length - 1] += curr
    return acc
  }, [0])
	
const top3Calories = caloriesByElf.reduce((acc, curr) => {
	const minCalories = Math.min(...acc)
	if (curr > minCalories) {
		const minCaloriesIdx = acc.findIndex(x => x === minCalories)!
		acc[minCaloriesIdx] = curr
	}
	return acc
}, [0, 0, 0])
	
// Part 1
const mostCalories = Math.max(...caloriesByElf)
console.log(mostCalories)

// Part 2
const top3CaloriesTotal = top3Calories.reduce(sum)
console.log(top3CaloriesTotal)
