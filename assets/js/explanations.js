$(document).ready(function() {

    $("#displayer").click(function(e) {
        fetch('../data/projects.json')
            .then(res => res.json())
            .then(data => {
                storedData = [...storeData(data["Projects"])];
                if(storedData[0].length > 1) {
                    storedData[0].forEach(project => {
                        // remove the marker from being displayed
                        if(project != "wp") { 
                            createCard(project, "wp");
                        }
                    });
                }
                if(storedData[1].length > 1) {
                    storedData[1].forEach(project => {
                        // remove the marker from being displayed
                        if(project != "dp") { 
                            createCard(project, "dp");
                        }
                    });
                }
                if(storedData[2].length > 1) {
                    storedData[2].forEach(project => {
                        // remove the marker from being displayed
                        if(project != "pi") { 
                            createCard(project, "pi");
                        }
                    });
                }
            }).catch(error => {
                console.error(error);
            })
        $("#displayer")[0].remove();
    })

    function storeData(projects=null) {
        // make sure projects is given data
        if(projects == null) {
            console.log(`Data Missing`);
            return null;
        }
        // Instantiate array
        projectArray = [["wp"], ["dp"], ["pi"]];
        // Get length of each project set
        wpLength = projects["Working Projects"].length;
        dpLength = projects["Developing Projects"].length;
        piLength = projects["Project Ideas"].length;
        if(wpLength > 0) {
            for(let i = 0; i < wpLength; i++) {
                projectArray[0].push(projects["Working Projects"][i]);
            }
        }
        if(dpLength > 0) {
            for(let i = 0; i < dpLength; i++) {
                projectArray[1].push(projects["Developing Projects"][i]);
            }
        }
        if(piLength > 0) {
            for(let i = 0; i < piLength; i++) {
                projectArray[2].push(projects["Project Ideas"][i]);
            }
        }
        return projectArray;
    }

    function createCard(project, marker) {
        // create card to add to cardHolder row
        const card = document.createElement("div");
        card.classList.add("col-5")
        card.classList.add("mx-auto")
        // data will be displayed as a list
        const dataHolder = document.createElement("ul");
        const name = document.createElement("li");
        const description = document.createElement("li");

        // set values for each shared data value
        name.innerHTML = `<strong>Name:</strong> ${project["Name"]}`;
        description.innerHTML = `<strong>Description:</strong> ${project["Description"]}`;

        switch(marker) {
            case "wp":
                const fu = document.createElement("li");
                fu.innerHTML = `<strong>Future Updates:</strong> ${project["Future Updates"]}`;
                // set order for data to be displayed (leaves room for updates later)
                dataHolder.appendChild(name);
                dataHolder.appendChild(fu);
                dataHolder.appendChild(description);
                card.appendChild(dataHolder);
                $(".wpCardHolder")[0].appendChild(card);
                break;
            case "dp":
                // set order for data to be displayed (leaves room for updates later)
                dataHolder.appendChild(name);
                dataHolder.appendChild(description);
                card.appendChild(dataHolder);
                $(".dpCardHolder")[0].appendChild(card);
                break;
            case "pi":
                const likelihood = document.createElement("li");
                likelihood.innerHTML = `<strong>Likelihood:</strong> ${project["Likelihood"]}`
                // set order for data to be displayed (leaves room for updates later)
                dataHolder.appendChild(name);
                dataHolder.appendChild(description);
                dataHolder.appendChild(likelihood);

                card.appendChild(dataHolder);
               $(".piCardHolder")[0].appendChild(card);
                break;
            default:
                console.error("Marker Break - Immediate Fix Required");
                alert("Nothing displayed.")
        }
    }
})