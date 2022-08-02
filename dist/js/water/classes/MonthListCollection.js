"use strict"
/**
 * The class MonthListCollection provides properties, 
 * methods and a collection of month lists
 */
class MonthListCollection {
    /**
     * @property {Array} - List of Month
     * @property {Element} - generate a month list container
     */
    constructor() {
        this._listOfMonth = [];
        this._html = this._generate_listOfMonthContainer();
    }
    /**
     * This method  checks when it gets an entry from the class dataEntry
     * if the provided year and month are the same. 
     * if so a new entry will be added or if not a new list will be created.
     * To check for year and month the Getter-Methods of the class ListOfMonth are used
     * @param {Object} newEntry - The gets passed on from the method display that got the data
     * from the EnergyCostCalculator method processFromData
     */
    passOnEntry(newEntry){
        let monthOfEntries = newEntry.date().toLocaleDateString("de-DE", {month: "numeric"}); 
        let yearOfEntries = newEntry.date().toLocaleDateString("de-DE", {year: "numeric"}); // Methode vom Eintrag
        let listOfMonthExists = false;
        this._listOfMonth.forEach(listOfMonth => {
            if (monthOfEntries === listOfMonth.month() && yearOfEntries === listOfMonth.year()) {
                listOfMonth.addEntry(newEntry);
                listOfMonthExists = true;
        }
        });
        if (listOfMonthExists === false) {
            this._addListOfMonth(yearOfEntries, monthOfEntries, newEntry);
        }
    }
    /**
     * This method generates a new List of Month when needed.
     * It gets the Parameter passed on from the method above passOnEntry
     * @param {Number} yearOfEntries 
     * @param {Number} monthOfEntries 
     * @param {Object} newEntry 
     */
    _addListOfMonth(yearOfEntries, monthOfEntries, newEntry){
        let pricePerYear = newEntry._pricePerYear;
        let new_listOfMonth = new ListofMonth(yearOfEntries, monthOfEntries, pricePerYear );
        new_listOfMonth.addEntry(newEntry);
        this._listOfMonth.push(new_listOfMonth);
     }
    /**
     * This method iterates over the _listOfMonth Array and sorts the entries
     * by year and month. It shows the entries from top (newest) to botton (oldest).
     */
    _sort_listOfMonth(){
        this._listOfMonth.sort((listOfMonth_a, listOfMonth_b) => {
            if (listOfMonth_a.year() < listOfMonth_b.year()) {
                return 1;
            } else if (listOfMonth_a.year() > listOfMonth_b.year()) {
                return -1;
            } else {
                if (listOfMonth_a.month() < listOfMonth_b.month()) {
                    return 1;
                } else {
                    return -1;
                } 
            }
        });
    }
    /**
     * This method generates the list of Month container
     */
    _generate_listOfMonthContainer(){
        // alert("MS Container generieren");
        let monthList = document.createElement("section");
        monthList.setAttribute("id", "listOfMonth");
        document.querySelector("#header").insertAdjacentElement("afterend", monthList);
        this._listOfMonth.forEach(monthListInArray => {
     
            monthList.insertAdjacentElement("beforeend", monthListInArray.html());
           });
        return monthList;
    }
    /**
     * This method removes, renews and display the monthListCollection.
     * @param {Array} entryArray 
     */
    display(entryArray){
        this._listOfMonth = [];
        entryArray.forEach(entry => this.passOnEntry(entry) )
        let monthListCollection =  document.querySelector("#listOfMonth");
           if (monthListCollection !== null) {
               monthListCollection.remove();
           }
           this._sort_listOfMonth();
           this._html = this._generate_listOfMonthContainer();
    }

}







