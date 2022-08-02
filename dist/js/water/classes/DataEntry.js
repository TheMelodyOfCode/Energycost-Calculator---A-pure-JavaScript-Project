"use strict"
/**
 * The class DataEntry holds all the data, properties and methods for the 
 * actual entry with in the ListOfTHeMonth
 */
class DataEntry {
    
    /**
     * All the data of the parameters get passed on from an instance of DataEntry
     * withhin the EnergyCostCalculator.By instantiating the class DataEntry the constructor 
     * creates an entry with all the Data passed on form the EnergyCostCalculator.
     * @param {number} usage - the usage of the natural gas
     * @param {numer} result - the result of the calculation
     * @param {date} date - the date of the entry
     */
    constructor(zstand_neu, pricePerYear, usage, result, date){

        this._zstand_neu = zstand_neu;
        this._pricePerYear = pricePerYear;
        this._usage = parseFloat(usage);
        this._result = parseFloat(result);
        this._date = date;
        this._timestamp = Date.now();
        this._html = this._generateHtml();
        console.log(pricePerYear);
    }

    /**
     * To follow the convention , these getter methods are a clean way
     * to acces the properties of the DataEntry object from the outside.
     */
    usage(){
        return this._usage;
    }
    result(){
        return this._result;
    }
    date(){
        return this._date;
    }
    pricePerYear(){
        return this._pricePerYear;
    }
    timestamp(){
        return this._timestamp;
    }
    html(){
        return this._html;
    }
    
    /**
     * generates the html for the DataEntry and sets the click event for the 
     * entry-removal-button
     * @returns {element} - returns the Element with all the childnotes and click event
     */
    _generateHtml(){
        let bulletPoint = document.createElement("li");
        // bulletPoint.setAttribute("class", "entry data-timestamp", this._timestamp);
        bulletPoint.setAttribute("class", "entry");
        bulletPoint.setAttribute("data-timestamp", this._timestamp);
        // console.log(this._timestamp);
        let date = document.createElement("span");
        date.setAttribute("class", "date");
        // console.log(this._date);
        date.textContent = this._date.toLocaleDateString("de-DE", {  // Uncaught TypeError: this._date is undefined
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
        });
        bulletPoint.insertAdjacentElement("afterbegin", date);

        let zstandNew = document.createElement("span");
        zstandNew.setAttribute("class", "usage");
        zstandNew.textContent = `${this._zstand_neu} Zneu`;
        date.insertAdjacentElement("afterend", zstandNew);

        let usage = document.createElement("span");
        usage.setAttribute("class", "usage");
        usage.textContent = `${this._usage.toFixed(2)} Kwh`;  //.replace(/\./, ",")
        zstandNew.insertAdjacentElement("afterend", usage);

        let result = document.createElement("span");
        result.setAttribute("class", "result");
        result.textContent = `${this._result} €`;  //.replace(/\./, ",")
        usage.insertAdjacentElement("afterend", result);

        let button = document.createElement("button");
        button.setAttribute("class", "removal-button");
        result.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fa-solid fa-dumpster-fire")
        button.insertAdjacentElement("afterbegin", icon);

        this.addEntryRemovalEvent(bulletPoint);
        // console.log(bulletPoint);
        return bulletPoint;
        
 }
 /**
  * This method defines the click event of the removal-button that gets triggert
  * in the class EnergyCostCalculator
  * @param {element} bulletPoint 
  */
    addEntryRemovalEvent(bulletPoint){
        bulletPoint.querySelector(".removal-button").addEventListener("click", e => {
            // console.log(e);
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            // console.log(e.timestamp);
            energyCostCalculator.removeEntry(timestamp);
            // console.log(timestamp);
            formField.renewDate();
        });
}


}