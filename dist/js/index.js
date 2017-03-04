var keys = document.querySelectorAll('#calculator span')
var operators = ['+', '-', 'x', '÷']
var decimalAdded = false

for (var i = 0;i < keys.length;i++) {
  keys[i].onclick = function (e) {
    var input = document.querySelector('.screen')
    var inputVal = input.innerHTML
    var btnVal = this.innerHTML

    if (btnVal === 'C') {
      input.innerHTML = ''
      decimalAdded = false
    }

    else if (btnVal === '=') {
      var equation = inputVal
      var lastChar = equation[equation.length - 1]
      var last2Char = equation[equation.length - 2]

      /*将除号和乘号通过正则更换成数学换算符*/
      equation = equation.replace(/x/g, '*').replace(/÷/g, '/')

      /*对计算式最后的字符进行判断*/
      if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
        equation = equation.replace(/.$/, '')
      }
      /*解决小数点的问题*/
      if (operators.indexOf(last2Char) > -1 && lastChar == '.') {
        equation = equation.replace(/.$/, '')
      }

      if (equation) {
        input.innerHTML = eval(equation)
      }

      decimalAdded = false
    }

    else if (operators.indexOf(btnVal) > -1) {
      var lastChar = inputVal[inputVal.length - 1]
      var last2Char = inputVal[inputVal.length - 2]
      var equationChaos = !!(operators.indexOf(last2Char) > -1 && lastChar == '.'); // 解决小数点的问题
      /*只允许在有值以及最后的字符不是运算符号的情况下才能添加运算符号*/
      if (inputVal != '' && operators.indexOf(lastChar == -1) && !equationChaos) {
        input.innerHTML += btnVal
      }
      /*允许空值添加负号*/
      else if (inputVal == '' && btnVal == '-') {
        input.innerHTML += btnVal
      }
      /*替换重复按下运算符号*/
      if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
        input.innerHTML = inputVal.replace(/.$/, btnVal)
      }

      decimalAdded = false
    }

    /*通过flag来解决小数点的问题
        禁止重复按下'.'
    */
    else if (btnVal == '.') {
      if (!decimalAdded) {
        input.innerHTML += btnVal
        decimalAdded = true
      }
    }

    /*最后把按下的键加到inputVal*/
    else {
      input.innerHTML += btnVal
    }

    e.preventDefault()
  }
}
