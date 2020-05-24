
async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formURL = document.getElementById('name').value;
    let ele = document.getElementById('validationerror');

    if (!Client.checkForURL(formURL)) {
        ele.style.display = "inline";
        return;
    }
    ele.style.display = "none";

    try {
        await fetch('http://localhost:8081/getAnalysis', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': "application/JSON",
            },
            body: JSON.stringify({url: formURL})
        })
            .then(res => res.json())
            .then(function (res) {
                let polarity = document.querySelector("#polarity").querySelector('p');
                let confidence = document.querySelector("#confidence").querySelector('p');
                let subjectivity = document.querySelector("#text_subjectivity").querySelector('p');
                let excerpt = document.querySelector("#excerpt").querySelector('p');

                polarity.innerHTML = res.polarity;
                confidence.innerHTML = res.polarity_confidence;
                subjectivity.innerHTML = res.subjectivity;
                excerpt.innerHTML = res.text;
            });
    } catch (e) {
        console.log('Error', e);
    }

};

export {handleSubmit}
