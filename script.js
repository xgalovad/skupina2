function validateForm() {
  var name = document.getElementById("name").value;
  var surname = document.getElementById("surname").value;
  var email = document.getElementById("email").value;
  var gender = document.getElementById("gender").value;
  var message = document.getElementById("message").value;
  
  // Kontrola, či nie sú polia prázdne
  if (name.trim() == "" || surname.trim() == "" || email.trim() == "" || gender.trim() == "" || message.trim() == "") {
    alert("Všetky polia sú povinné.");
    return false;
  }
  
  // Kontrola formátu emailu pomocou regulárneho výrazu
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Prosím, zadajte platnú emailovú adresu.");
    return false;
  }
  
  // Ak všetky kontroly prejdú, formulár je považovaný za správny
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
    .then(response => response.json())
    .then(texts => {
        document.querySelectorAll('.more-text').forEach(function(item) {
            var newTextElement = document.createElement('p');
            var added = false; // flag to control the text addition

            item.addEventListener('mouseenter', function() {
                if (!added) { // check if the text is not already added
                    var textKey = this.dataset.text;
                    var text = texts[textKey];
                    newTextElement.textContent = text;
                    this.parentElement.insertBefore(newTextElement, this.nextSibling);
                    added = true; // mark that text is added
                }
            });

            item.addEventListener('mouseleave', function() {
                if (added) { // check if the text is added
                    this.parentElement.removeChild(newTextElement);
                    added = false; // reset the flag as text is removed
                }
            });
        });
    })
    .catch(error => console.error('Error loading the JSON data: ', error));
});

