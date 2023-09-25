 //console.log('observer deployed for variant 2');
  const _stCartConfig3 = { attributes: true, childList: true, subtree: true };

const _stCartCallback3 = (mutationList) => {
    let spanPrice = document.querySelector('span.r_price');
    let spanOldPrice = document.querySelector('span.o_price');
    let firstPrice = document.querySelector("span.first-price-v2");
    let secondPrice = document.querySelector("span.multi-strike-v2")
    let firstBundlePrice = document.querySelector('span.first-bundle-price-v2');
    let secondBundlePrice = document.querySelector('span.bundle-strike-v2');
    let bundleGroup = document.querySelector("label.image-group.bundle-group > input");
    for (const mutation of mutationList) {
        if (mutation.type === 'childList' 
           && mutation.target === spanPrice
           && mutation.addedNodes.length > 0) {
            let splitPrice = Number(mutation.target.textContent.split('$')[1]);
            firstPrice.textContent = mutation.target.textContent;
            firstBundlePrice.textContent = "$" + splitPrice * 2;
        }
      
          if (mutation.type === 'childList' 
           && mutation.target === spanOldPrice
           && mutation.addedNodes.length > 0) {
            let splitPrice = Number(mutation.target.textContent.split('$')[1]);
            secondPrice.textContent = " " + mutation.target.textContent;
            secondBundlePrice.textContent = " $" + splitPrice * 2;
        }
    }
};

const _stCartObserver3 = new MutationObserver(_stCartCallback3);
_stCartObserver3.observe(document.querySelector("div.prod-body > div.price_area"), _stCartConfig3); 



const v2ID = setInterval(checkAndDisconnectv2, 1000);

function checkAndDisconnectv2() {
  console.log('polling');
  // if variant 2 widget computed styles = display: none that means we aren't supposed to run _stCartCallback2
  let v2 = document.querySelector('.bundle-selector-v2');
   if (v2) {
      clearInterval(v2ID);
      if (window.getComputedStyle(v2).display === 'none') {
      _stCartObserver3.disconnect();
     // console.log('MO was disconnected for variant 2');
    }
   }
}


document.addEventListener("DOMContentLoaded", (event) => {
   let multiID = document.querySelector("#buy_now_new_form > input.input_variant");
    if (multiID) {
      multiID.value = '31972279418961';
    }
});

  //let bundleSelector = document.querySelector('.bundle-selector-v1');
  let firstImage2 = document.querySelector("label.image-group-v2.multi-group");
  let secondImage2 = document.querySelector("label.image-group-v2.bundle-group");

   firstImage2.addEventListener("click", (e) => {
    if (e.currentTarget === firstImage2) {
    e.currentTarget.querySelector('input').click();
    }
});

    secondImage2.addEventListener("click", (e) => {
    if (e.currentTarget === secondImage2) {
    e.currentTarget.querySelector('input').click();
    }
});
  
         function handleChange2(e) {
      let buyNow = document.querySelector("#buy_now_new_button");
      let spanPrice = document.querySelector('span.r_price');
      let spanOldPrice = document.querySelector('span.o_price');
       let firstPrice = document.querySelector("span.first-price-v2");
       let secondPrice = document.querySelector("span.multi-strike-v2")
      let firstBundlePrice = document.querySelector("span.first-bundle-price-v2");
      let secondBundlePrice =  document.querySelector('span.bundle-strike-v2');   
      if (e.value === 'bundle') {
        _stCartObserver3.disconnect();
        buyNow.addEventListener('click', prevent);
        spanPrice.innerText = firstBundlePrice.innerText;
        spanOldPrice.innerText = secondBundlePrice.innerText;
        document.querySelector('.active-option-2').classList.remove('active-option-2');
        e.parentElement.classList.add('active-option-2');
        primer(buyNow);
      }
      else {
        spanPrice.innerText = firstPrice.innerText;
        spanOldPrice.innerText = secondPrice.innerText;
        buyNow.removeEventListener('click', postItems)
        document.querySelector("#buy_now_new_button").removeEventListener('click', prevent);
        document.querySelector('.active-option-2').classList.remove('active-option-2');
        document.querySelector("label.image-group-v2.multi-group").classList.add('active-option-2');
        console.log('event listener removed');
        _stCartObserver3.observe(document.querySelector("div.prod-body > div.price_area"), _stCartConfig2); 
      }
        }
          function prevent(e) {
          e.preventDefault();
          console.log('default prevented');
        }

        function primer(buyNow) {
        buyNow.addEventListener('click', postItems);
      }

           function postItems() {
              let variants = [];
             let multiID = document.querySelector("#buy_now_new_form > input.input_variant").value;
             let proID = document.querySelector('input.hidden-js-2').getAttribute('data-var-id');
            variants.push(multiID);
            variants.push(proID);
        var formData2 = {
       'items': [{
        'id': variants[0],
         'selling_plan': 448692305,
        'quantity': 1
       },
                 {
          'id': variants[1],
         'selling_plan': 448168017,
        'quantity': 1 
                 }]
      };
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      })
      .then(response => {
         window.location.href = "/checkout";
      })
      .catch((error) => {
        console.error('Error:', error);
      });
   
           }
        

let parentDiv2 = document.querySelector("div.prod-body > div.optionList.hide");
let mobileForm2 = document.querySelector("div.form-default > div > select");

 parentDiv2.addEventListener('click', (e)=>{
  let spanPrice = document.querySelector('span.r_price');
  let spanOldPrice = document.querySelector('span.o_price');
  let firstPrice = document.querySelector("span.first-price-v2");
  let secondPrice = document.querySelector("span.multi-strike-v2");
  let firstBundlePrice = document.querySelector('span.first-bundle-price-v2');
  let secondBundlePrice = document.querySelector('span.bundle-strike-v2');
  let firstPriceArray = [30, 28, 25, 24, 23];
  const secondPriceArray = firstPriceArray.map((x) => x * 2);
  let thirdPriceArray = [15, 14, 12.50, 12, 11.50];
  let bundleGroup = document.querySelector("label.image-group-v2.bundle-group > input")
  let activeSpan = e.target;
  let currentSpan = document.querySelector('span.active');
   if (activeSpan === currentSpan) {
   let kidIndex = activeSpan.dataset.item - 1;
   checkKidAmount(kidIndex);
        if (bundleGroup.checked === true && kidIndex !== NaN) {
     setTimeout(() => {
     spanPrice.textContent = "$" + firstPriceArray[kidIndex];
    if (thirdPriceArray[kidIndex] % 1 != 0) {
       firstPrice.textContent = "$" + thirdPriceArray[kidIndex] + "0";
    }

    else {
      firstPrice.textContent = "$" + thirdPriceArray[kidIndex];
    }
    
    secondPrice.textContent = "$" + firstPriceArray[kidIndex];
     spanOldPrice.textContent = "$" + secondPriceArray[kidIndex];
     firstBundlePrice.textContent = "$" + firstPriceArray[kidIndex];
     secondBundlePrice.textContent = "$" + secondPriceArray[kidIndex];
    }, 00);
   }
   }

})

if (window.innerWidth < 500) {
  let spanPrice = document.querySelector('span.r_price');
  let spanOldPrice = document.querySelector('span.o_price');
  let firstPrice = document.querySelector("span.first-price-v2");
  let secondPrice = document.querySelector("span.multi-strike-v2");
  let firstBundlePrice = document.querySelector('span.first-bundle-price-v2');
  let secondBundlePrice = document.querySelector('span.bundle-strike-v2');
  let bundleGroup2 = document.querySelector("label.image-group-v2.bundle-group > input");
  let firstPriceArray = [30, 28, 25, 24, 23];
  const secondPriceArray = firstPriceArray.map((x) => x * 2);
  let thirdPriceArray = [15, 14, 12.50, 12, 11.50];
  
  //console.log('mobile')
   mobileForm2.addEventListener('change', (e)=>{
  //console.log('changed');
  let activeOption = e.target.selectedOptions[0].dataset.item;
  let kidIndex = activeOption - 1;
         if (bundleGroup2.checked === true && kidIndex !== NaN) {
       setTimeout(() => {
       spanPrice.textContent = "$" + firstPriceArray[kidIndex];
    if (thirdPriceArray[kidIndex] % 1 != 0) {
       firstPrice.textContent = "$" + thirdPriceArray[kidIndex] + "0";
    }

    else {
      firstPrice.textContent = "$" + thirdPriceArray[kidIndex];
    }
     secondPrice.textContent = "$" + firstPriceArray[kidIndex];
     spanOldPrice.textContent = "$" + secondPriceArray[kidIndex];
     firstBundlePrice.textContent = "$" + firstPriceArray[kidIndex];
     secondBundlePrice.textContent = "$" + secondPriceArray[kidIndex];
    }, 00);
      }
  checkKidAmount(kidIndex);
})

}

// should pass this in with liquid to be dynamic. Will do during implementation time. 
    
 function checkKidAmount(kidIndex) {
    let variant;
    if (kidIndex === 0) {
      variant = 39450680066129;
      document.querySelector('input.hidden-js-2').dataset.varId = variant;
    }

    if (kidIndex === 1) {
      variant = 39450680098897;
      document.querySelector('input.hidden-js-2').dataset.varId = variant;
    }

    if (kidIndex === 2) {
      variant = 39450680131665;
      document.querySelector('input.hidden-js-2').dataset.varId = variant;
    }

    if (kidIndex === 3) {
      variant = 39450680164433;
      document.querySelector('input.hidden-js-2').dataset.varId = variant;
    }

    if (kidIndex === 4) {
      variant = 39450680197201;
      document.querySelector('input.hidden-js-2').dataset.varId = variant;
    }
  }