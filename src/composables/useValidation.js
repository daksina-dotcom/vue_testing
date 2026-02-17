export function useCartItems()
{const handleItem = (item)=>{
    if (!item.quantity||item.quantity===-1||item.quantity<0){
        item.quantity=0
    }
}

const handleMinMax = (val, target, key) => {
  let finalVal = val;
  if (val < 0 || val === "" || val === null) {
    finalVal = 0;
  } else if (val > 100) {
    finalVal = 100;
  }
  target[key] = finalVal;
};

return {handleItem,handleMinMax}}