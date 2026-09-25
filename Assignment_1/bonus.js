/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
let createCounter = function(init) {
    let reseted = init;
    function increment(){
        return ++init
    }
    function decrement(){
        return --init
    }
    function reset(){
        return init = reseted
    }
    return {
        increment,
        decrement,
        reset
    }
};


  const counter = createCounter(5)
  counter.increment(); // 6
  counter.reset(); // 5
  counter.decrement(); // 4
 