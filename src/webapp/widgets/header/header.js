import './header.css';
var isValid = function (s) {
  if (s.length % 2 !== 0) return false;
  let regMap = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  const arrS = [...s];
  const ret = arrS.reduce((prev, current)=> {
    //如果regMap里有值，就存起它对应的value
    if (regMap[current]) {
      prev.push(regMap[current])
    } else {
      //如果当前的值与数组里的最后一个值是相等
      //说明括号匹配成功，直接将数组里的最后一个值去掉
      let last = prev[prev.length - 1];
      if (current == last) {
        prev.pop();
      } else {
        prev.push(current);
      }
    }
    return prev;
  },[]);
  return ret.length === 0;
};
console.log(isValid("()[]{}"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));
console.log(isValid("()"));
console.log(isValid("(]"),' ============');

var checkSubarraySum = function (nums, k) {
  let ret = 0;

  for (let i = 0, len = nums.length; i < len - 1; i++) {
    let newNums = nums.slice(i + 1);
    newNums.reduce((prev, curr) => {
      let sum = prev + curr;
      if ((sum == 0 && k == 0) || sum % k == 0) {
        ret++;
      }
      return sum;
    }, nums[i]);
    if (ret > 0) {
      return true;
    }
  }
  return false;
};

console.log(checkSubarraySum([0, 1, 0], 0))
export default {
  init(){
    console.log('header init');
  }
}