import { ref } from "vue";
export function useCounter() {
  const val = ref(0);
  const inc = () => {
    val.value++;
  };
  const dec = () => {
    val.value--;
  };
  const reset = () => {
    val.value = 0;
  };
  return { val, inc, dec, reset };
}

export function customDirect(){
const vFocus = {
  mounted: (inputVal) => {
    console.log(inputVal.tagName)
    const input = inputVal.tagName === 'INPUT' ?inputVal:inputVal.querySelector('input')
    if(!input){console.warn("No Input Field found")}
    input.focus();
  },
};

const vCase = {
  mounted: (input) => {
    // if(input.value){
    //   input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase()
    // }
    input.addEventListener("input", (val) => {
      const original = val.target.value;
      const formatted =
        original.charAt(0).toUpperCase() + original.slice(1).toLowerCase();
      if (original !== formatted) {
        val.target.value = formatted;
        input.dispatchEvent(new Event("input"));
      }
    });
    //input.addEventListener('blur',(val)=>val.target.value =val.target.value.charAt(0).toUpperCase() + val.target.value.slice(1).toLowerCase())
  },
};

return {vCase,vFocus}
}
