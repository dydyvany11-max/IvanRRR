function pickPropArray(arr, prop) {
    return arr
        .filter(item => item.hasOwnProperty(prop))
        .map(item => item[prop]);
}

const students = [
   { name: 'Павел', age: 20 },
   { name: 'Иван', age: 20 },
   { name: 'Эдем', age: 20 },
   { name: 'Денис', age: 20 },
   { name: 'Виктория', age: 20 },
   { age: 40 },
];

console.log('Задание 1:');
console.log(pickPropArray(students, 'name'));

// Задание 2
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        console.log(count);
    }
}

console.log('\nЗадание 2:');
const counter1 = createCounter();
counter1(); 
counter1(); 

const counter2 = createCounter();
counter2(); 
counter2();

// Задание 3
function spinWords(str) {
    return str
        .split(' ')
        .map(word => {
            if (word.length >= 5) {
                return word.split('').reverse().join('');
            }
            return word;
        })
        .join(' ');
}

console.log('\nЗадание 3:');
console.log(spinWords("Привет от Legacy"));
console.log(spinWords("This is a test"));

// Задание 4

function findTwoSum(nums, target) {
    
    const numMap = {};
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        
        if (numMap.hasOwnProperty(complement)) {
            return [numMap[complement], i];
        }
        
       
        numMap[nums[i]] = i;
    }
    
   
    return [];
}


const nums1 = [2, 7, 11, 15];
const target1 = 9;
console.log("Задание 4 - Пример 1:");
console.log(findTwoSum(nums1, target1)); 

const nums2 = [3, 2, 4];
const target2 = 6;
console.log("\nЗадание 4 - Пример 2:");
console.log(findTwoSum(nums2, target2)); 

const nums3 = [3, 3];
const target3 = 6;
console.log("\nЗадание 4 - Пример 3:");
console.log(findTwoSum(nums3, target3)); 

// Задание 5

var findLongestSharedBeginning = function (arr) {
    if (arr.length === 0) return "";

    function checkAllContain(fragment) {
        return arr.every(item => item.toLowerCase().includes(fragment.toLowerCase()));
    }

    let longestFound = "";

    for (let size = 2; size <= arr[0].length; size++) {
        for (let position = 0; position <= arr[0].length - size; position++) {
            let currentFragment = arr[0].slice(position, position + size);
            if (checkAllContain(currentFragment)) {
                if (currentFragment.length > longestFound.length) {
                    longestFound = currentFragment;
                }
            }
        }
    }
    return longestFound;
};

console.log(findLongestSharedBeginning(["цветок", "поток", "хлопок"]));
console.log(findLongestSharedBeginning(["собака", "гоночная маашина", "машина"]));