import {
    fetchSign
} from './apis.js'




window.onload = function profile() {
    // load data of the user
    let user = JSON.parse(sessionStorage.getItem('user'));
    

    let email = user.email
    let username = user.username
    document.getElementById('title').innerText = `profile of ${username}`
    document.getElementById('usernamestyle').innerText = `${username}`

    document.getElementById('emailstyle').innerText = `${email}`


    update()
     

        // Deletes the user

        document.getElementById("deleteaccbtn").addEventListener("click", function () {
            document.getElementById('deleteaccsure').style.display = 'block'
            
        })
        document.getElementById("deleteaccsure").addEventListener("click",  function () {
        

                fetchSign("https://web-2-host-football.onrender.com/users/verifyID", "DELETE", user).then(data => {
                    sessionStorage.removeItem("user")

                    window.location.href = "./index.html"


                })
            })


  }

  function update(username){
     // Show the email update form

     document.getElementById("updateacc").addEventListener("click", function () {
        document.getElementById("emailInput").style.display = "block";
  })

      // update email
      document.getElementById("emailChangeForm").addEventListener('submit', function (e) {
        e.preventDefault()
        let user = sessionStorage.getItem('user');
        let usernameValue = username
        let emailValue = e.target.email.value
        
        let update = {
            "email": emailValue,
        }


        fetchSign("https://web-2-host-football.onrender.com/users/verifyID", "PUT", update).then(data => {
            
            console.log(data)
                document.getElementById('emailstyle').innerText = `${update.email}`

        })

    })
  }