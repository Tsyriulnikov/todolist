// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    //console.log(nums)
    return nums.reduce((acc, el) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    if (a + b < c || a + c < b || b + c < a) {
        return "00"
    } else {

        if (a === b && a === c) {
            return "10"
        } else {
            if (a === b || a === c || b === c) return "01"
        }
    }
    return "11"
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    return parseInt(String(number).split('').reduce((acc, el) => (String(parseInt(acc) + parseInt(el)))))
}

//return number.toString().split('').reduce((acc, cur) => +acc + +cur, 0)

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let odd = arr.reduce((acc, el, index) => index % 2 === 0 ? acc + el : acc)
    let even = arr.reduce((acc, el, index) => index % 2 !== 0 ? acc + el : acc)
    return odd > even ? true : false
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {

    return array.filter(el => Number.isInteger(el) && el > 0).map(el => Math.pow(el, 2))
}

//      !(el%1)
// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    return N > 0 ? N + sumFirstNumbers(N - 1) : 0;
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    let arr: Array<number> = [];
    while (amountOfMoney > 0) {
        while (amountOfMoney >= 1000) {
            arr.push(1000);
            amountOfMoney = amountOfMoney - 1000
        }
        while (amountOfMoney >= 500) {
            arr.push(500);
            amountOfMoney = amountOfMoney - 500
        }
        while (amountOfMoney >= 100) {
            arr.push(100);
            amountOfMoney = amountOfMoney - 100
        }
        while (amountOfMoney >= 50) {
            arr.push(50);
            amountOfMoney = amountOfMoney - 50
        }
        while (amountOfMoney >= 20) {
            arr.push(20);
            amountOfMoney = amountOfMoney - 20
        }
        while (amountOfMoney >= 10) {
            arr.push(10);
            amountOfMoney = amountOfMoney - 10
        }
        while (amountOfMoney >= 5) {
            arr.push(5);
            amountOfMoney = amountOfMoney - 5
        }
        while (amountOfMoney >= 2) {
            arr.push(2);
            amountOfMoney = amountOfMoney - 2
        }
        while (amountOfMoney >= 1) {
            arr.push(1);
            amountOfMoney = amountOfMoney - 1
        }
    }
    return arr
}