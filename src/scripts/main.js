import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"
// 實作寫在這裡！
let totalPriceSelector = document.querySelector(".total-price")

let cartList = document.querySelector("tbody")
const btns = document.querySelectorAll(".card-body .btn")
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // btn's parentElement
    const cardBody = btn.parentElement
    // console.log(cardBody)
    // cat name
    const catName = cardBody.firstElementChild.textContent
    // price
    const catPrice = cardBody.children[1].textContent.slice(
      1,
      cardBody.children[1].textContent.length
    )

    const cartItem = document.querySelectorAll("tbody tr")

    const tr = `<td>${catName}</td>
    <td><input type="number" class="quantity" value="1" /></td>
    <td>$${catPrice}</td>
    <td>$${catPrice}</td>
    <td>
      <button class="remove-item-btn btn btn-danger btn-sm">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>`

    const checkItem = [...cartItem].find(
      (item) => item.children[0].innerText === catName
    )
    // console.log(checkItem.children[1])
    // let inputValue = +(checkItem.children[1].children[0].value)
    if (checkItem === undefined) {
      cartList.insertAdjacentHTML("beforeend", tr)
    } else {
      let inputValue = +checkItem.children[1].children[0].value + 1
      checkItem.children[1].children[0].value = inputValue
      // let value = checkItem.children[1].children[0].value

      let itemPrice = checkItem.children[3]
      itemPrice.textContent = `$${Number(inputValue) * Number(catPrice)}`
    }
    
    let totalPrice = totalPriceSelector.textContent.slice(
      1,
      totalPriceSelector.textContent.length
    )
    console.log(totalPrice)
    console.log(catPrice)
    let sum = Number(totalPrice) + Number(catPrice)
    totalPriceSelector.textContent = `$${sum}`
    // totalPrice =
  })
})

cartList.addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  // console.log(totalPriceSelector.textContent);
  // console.log(cartList.children)
  // console.log(e.target.parentElement.parentElement.children[3].textContent)

  let totalPrice = totalPriceSelector.textContent.slice(
    1,
    totalPriceSelector.textContent.length
  )
  let sum;
  if (e.target.nodeName === "BUTTON") {
    e.target.parentElement.parentElement.remove()

    let itemTotal = e.target.parentElement.parentElement.children[3].textContent.slice(1, e.target.parentElement.parentElement.children[3].textContent.length)

    sum = Number(totalPrice) - Number(itemTotal)

    totalPriceSelector.textContent = `$${sum}`
  } else if (e.target.nodeName === "I") {
    e.target.parentElement.parentElement.parentElement.remove()

    let itemTotal = e.target.parentElement.parentElement.children[3].textContent.slice(1, e.target.parentElement.parentElement.parentElement.children[3].textContent.length)

    sum = Number(totalPrice) - Number(itemTotal)

    totalPriceSelector.textContent = `$${sum}`
  }
})

const removeAll = document.querySelector(".empty-cart")
removeAll.addEventListener("click", () => {
  cartList.innerHTML = ""
  totalPrice = "$0"
})
