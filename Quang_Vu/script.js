async function login(event) {

    event.preventDefault();
    const toast = document.querySelector('.toast');
    const user = document.getElementById("username").value
    const pass = document.getElementById("password").value
              const message = document.getElementById(
            'message'
  )
  
  try {
    
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    });
  
    const data = await response.json();
    
    
    if (response.ok && data.token) {
        console.log(data); 

          message.innerText ='login success!'
          toast.classList.add('show');
          toast.style.backgroundColor = 'green'
          setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
      fetchProducts(data?.token);
    } else {
        message.innerText ='login failed!'
    }
  } catch (error) {
    message.innerText ='login failed!'
    toast.style.backgroundColor = 'red'
              toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
  }
}


