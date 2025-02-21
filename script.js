// 简易单词库（后续可替换为API）
const dictionary = [
    'apple', 'banana', 'computer', 
    'hello', 'world', 'javascript',
    'university', 'student', 'programming'
];

function checkSpelling() {
    const inputWord = document.getElementById('wordInput').value.toLowerCase();
    const resultElement = document.getElementById('result');
    
    if (dictionary.includes(inputWord)) {
        resultElement.textContent = `✅ 嘿真让你蒙着了！`;
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `❌ 拼的什么玩意这是`;
        resultElement.style.color = 'red';
    }
}
