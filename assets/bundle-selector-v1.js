 //console.log('observer deployed for variant 1');
  const _stCartConfig2 = { attributes: true, childList: true, subtree: true };

const _stCartCallback2 = (mutationList) => {
    let spanPrice = document.querySelector('span.r_price');
    let spanOldPrice = document.querySelector('span.o_price');
    let firstPrice = document.querySelector("span.first-price");
    let secondPrice = document.querySelector("span.multi-strike")
    let firstBundlePrice = document.querySelector('span.first-bundle-price');
    let secondBundlePrice = document.querySelector('span.bundle-strike');
    let bundleGroup = document.querySelector("label.image-group.bundle-group > input");
    for (const mutation of mutationList) {
        if (mutation.type === 'childList' 
           && mutation.target === spanPrice
           && mutation.addedNodes.length > 0) {
            console.log('theres a mutation going on');
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

const _stCartObserver2 = new MutationObserver(_stCartCallback2);
_stCartObserver2.observe(document.querySelector("div.prod-body > div.price_area"), _stCartConfig2); 
  

const v1ID = setInterval(checkAndDisconnectv1, 1000);

function checkAndDisconnectv1() {
  //console.log('polling');
  // if variant 1 widget computed styles = display: none that means we aren't supposed to run _stCartCallback2
  let v1 = document.querySelector('.bundle-selector-v1');
  let multiStrike = document.querySelector('.multi-strike');
  let firstPrice = document.querySelector('.first-price');
   if (v1 && multiStrike && firstPrice) {
      clearInterval(v1ID);
      multiStrike.innerText.trim();
      firstPrice.innerText.trim();
      if (window.getComputedStyle(v1).display === 'none') {
      _stCartObserver2.disconnect();
      //console.log('MO was disconnected for variant 1');
    }
   }
}

document.addEventListener("DOMContentLoaded", (event) => {
   let multiID = document.querySelector("#buy_now_new_form > input.input_variant");
    if (multiID) {
      multiID.value = '31972279418961';
    }
});

  let bundleSelector = document.querySelector('.bundle-selector-v1');
  let firstImage = document.querySelector("label.image-group.multi-group > img");
  let secondImage = document.querySelector("label.image-group.bundle-group > img");

   firstImage.addEventListener("click", (e) => {
    if (e.currentTarget === firstImage) {
    e.target.parentElement.querySelector('input').click();
    }
});

    secondImage.addEventListener("click", (e) => {
    if (e.currentTarget === secondImage) {
    e.target.parentElement.querySelector('input').click();
    }
});
  
         function handleChange(e) {
      let buyNow = document.querySelector("#buy_now_new_button");
      let spanPrice = document.querySelector('span.r_price');
      let spanOldPrice = document.querySelector('span.o_price');
       let firstPrice = document.querySelector("span.first-price");
       let secondPrice = document.querySelector("span.multi-strike")
      let firstBundlePrice = document.querySelector("span.first-bundle-price");
      let secondBundlePrice =  document.querySelector('span.bundle-strike');   
      if (e.value === 'bundle') {
        //console.log('change handled')
        _stCartObserver2.disconnect();
        buyNow.addEventListener('click', prevent);
        spanPrice.innerText = firstBundlePrice.innerText;
        spanOldPrice.innerText = secondBundlePrice.innerText;
        document.querySelector('.active-option').classList.remove('active-option');
        e.nextElementSibling.classList.add('active-option');
        primer(buyNow);
   
        
      }
      else {
        spanPrice.innerText = firstPrice.innerText;
        spanOldPrice.innerText = secondPrice.innerText;
        buyNow.removeEventListener('click', postItems)
        document.querySelector("#buy_now_new_button").removeEventListener('click', prevent);
        document.querySelector('.active-option').classList.remove('active-option');
        document.querySelector("label.image-group.multi-group > img").classList.add('active-option');
        console.log('event listener removed');
        _stCartObserver2.observe(document.querySelector("div.prod-body > div.price_area"), _stCartConfig2); 
      }
        }

          function prevent(e) {
          e.preventDefault();
          console.log('default prevented');
        }

        function primer(buyNow) {
        //console.log('primer')
        buyNow.addEventListener('click', postItems);
      }

           function postItems() {
              let variants = [];
             let multiID = document.querySelector("#buy_now_new_form > input.input_variant").value;
             let proID = document.querySelector('input.hidden-js').getAttribute('data-var-id');
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
        

let parentDiv = document.querySelector("div.prod-body > div.optionList.hide");
let mobileForm = document.querySelector("div.form-default > div > select");

 parentDiv.addEventListener('click', (e)=>{
  let spanPrice = document.querySelector('span.r_price');
  let spanOldPrice = document.querySelector('span.o_price');
  let firstPrice = document.querySelector("span.first-price");
  let secondPrice = document.querySelector("span.multi-strike");
  let firstBundlePrice = document.querySelector('span.first-bundle-price');
  let secondBundlePrice = document.querySelector('span.bundle-strike');
  let firstPriceArray = [30, 28, 25, 24, 23];
  const secondPriceArray = firstPriceArray.map((x) => x * 2);
  let thirdPriceArray = [15, 14, 12.50, 12, 11.50];


   
let bundleGroup = document.querySelector("label.image-group.bundle-group > input")
 let activeSpan = e.target;
 let currentSpan = document.querySelector('span.active');
   if (activeSpan === currentSpan) {
   let kidIndex = activeSpan.dataset.item - 1;
   checkKidAmount(kidIndex);
        if (bundleGroup.checked === true && kidIndex !== NaN) {
     //console.log('bundle selected');
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
  let firstPrice = document.querySelector("span.first-price");
  let secondPrice = document.querySelector("span.multi-strike");
  let firstBundlePrice = document.querySelector('span.first-bundle-price');
  let secondBundlePrice = document.querySelector('span.bundle-strike');
  let firstPriceArray = [30, 28, 25, 24, 23];
  const secondPriceArray = firstPriceArray.map((x) => x * 2);
  let thirdPriceArray = [15, 14, 12.50, 12, 11.50];
  
  //console.log('mobile')
   mobileForm.addEventListener('change', (e)=>{
  let activeOption = e.target.selectedOptions[0].dataset.item;
  let kidIndex = activeOption - 1;

       setTimeout(() => {
    if (thirdPriceArray[kidIndex] % 1 != 0) {
       firstPrice.textContent = "$" + thirdPriceArray[kidIndex] + "0";
    }

    else {
      firstPrice.textContent = "$" + thirdPriceArray[kidIndex];
    }
    
     secondPrice.textContent = "$" + firstPriceArray[kidIndex];
     firstBundlePrice.textContent = "$" + firstPriceArray[kidIndex];
     secondBundlePrice.textContent = "$" + secondPriceArray[kidIndex];
    }, 00);
     
  //console.log(kidIndex);
  checkKidAmount(kidIndex);
})

}

// should pass this in with liquid to be dynamic. Will do during implementation time. 
    
 function checkKidAmount(kidIndex) {
    let variant;
    if (kidIndex === 0) {
      variant = 39450680066129;
      document.querySelector('input.hidden-js').dataset.varId = variant;
    }

    if (kidIndex === 1) {
      variant = 39450680098897;
      document.querySelector('input.hidden-js').dataset.varId = variant;
    }

    if (kidIndex === 2) {
      variant = 39450680131665;
      document.querySelector('input.hidden-js').dataset.varId = variant;
    }

    if (kidIndex === 3) {
      variant = 39450680164433;
      document.querySelector('input.hidden-js').dataset.varId = variant;
    }

    if (kidIndex === 4) {
      variant = 39450680197201;
      document.querySelector('input.hidden-js').dataset.varId = variant;
    }
  }


  
