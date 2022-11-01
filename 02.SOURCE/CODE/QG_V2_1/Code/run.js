// Get the button and container elements from HTML:
const button = document.getElementById("button")
const textarea = document.getElementById("the-textarea")
// Create an array of cars to send to the server:
const showResult = document.getElementById("show-result")
var coll = document.getElementsByClassName("collapsible");


// Create an event listener on the button element:
button.onclick = function () {
    button.classList.add("button--loading");
    const text = { "text": textarea.value }
    // Get the reciever endpoint from Python using fetch:
    fetch("http://127.0.0.1:5000/receiver",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            // Strigify the payload into JSON:
            body: JSON.stringify(text)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                alert("something is wrong")
            }
        }).then(jsonResponse => {

            let content = `<h3>Danh sách câu có ngữ pháp ứng với các pattern</h3>`
            let count = 1
            let html = ``
            for (let ele of jsonResponse) {
                if (ele['qas'].length > 0) {
                    html += `<button type="button" class="collapsible">${count++}. ${ele['sentence']}</button>`
                    html += `<div class="content"><p class="qa"><b>Câu hỏi:</b> ${ele['qas'][0]['question']}</p><p class="qa"><b>Câu trả lời:</b> ${ele['qas'][0]['answer']}</p>`
                    for(let i = 1; i < ele['qas'].length; i++){
                        html += `<hr><p class="qa"><b>Câu hỏi:</b> ${ele['qas'][i]['question']}</p><p class="qa"><b>Câu trả lời:</b> ${ele['qas'][i]['answer']}</p>`
                    }
                    html += `</div>`
                }
            }
            if (html) {
                showResult.innerHTML = content + html;
            }
            else {
                showResult.innerHTML = "<p>Không có câu hỏi được phát sinh</p>"
            }
            var i;
            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                    
                });
            }
            button.classList.remove("button--loading");
        }
        ).catch((err) => console.error(err));
}