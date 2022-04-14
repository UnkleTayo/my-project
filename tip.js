const web3 = new Web3(Web3.givenProvider)

// Target Form
const form = document.querySelector('form')

// Logic for sending eth
const send = async function (amt) {
  // connect to metaMask and send amt to address
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })

  const wei = web3.utils.toWei(amt, 'ether')

  if (accounts.length > 0) {
    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x670AE0E1b820907E70c57f9301B7d0dCe5E61562',
          value: web3.utils.toHex(wei),
        },
      ],
    })
  }
}

// check if digital wallet is available on page
if (window.ethereum) {
  form.classList.add('has-eth')
} else {
  alert('Please install MetaMask')
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  if (window.ethereum) {
    const input = form.querySelector('input')
    send(input.value)
  } else {
    alert('Please install MetaMask')
  }
})
