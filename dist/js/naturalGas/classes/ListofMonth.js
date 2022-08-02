"use strict"

/**
 * The class ListofMonth has all the properties and method to finally create
 * the List of month
 */
class ListofMonth {
    /**
     * The constructor creates on instantiation a month-list object with the 
     * parameter and properties below.
     * The parameters year and month get passed on form the 
     * MonthListCollection method _addListOfMonth were an new instanz of this class
     * is created.
     * @param {Number} year 
     * @param {Number} month 
     * @property {Array} _entries
     * @property {Object} balanceSheet
     * @property {Element} _html
     */
    constructor (year, month, pricePerYear ){
        this._year = year;
        this._month = month;
        this._pricePerYear = pricePerYear;
        this._entries = [];
        // this._balanceSheet = 0;
        this._html = this._generate_listOfMonth();
        // console.log(this._balanceSheet);
    }
    /**
     * These are getter methods to have acces 
     * form the outside to stick to convetion
     */
    month(){
        return this._month;
    }
    year(){
        return this._year;
    }
    html(){
        return this._html;
    }
    /**
     * This method gets invoked by the MonthListCollection method passOnEntry
     * and gets passed on the new entry as an object within the parameter new_entry
     * @param {Object} new_entry 
     */
    addEntry(new_entry){
        this._entries.push(new_entry);
        this._reGenerateAll();
    }
    /**
     * This method generates the Html for the month list with all it's childNotes
     * @returns {Element} listOfMonth - List of the Month
     */
    _generate_listOfMonth(){
        let listOfMonth = document.createElement("article");
        listOfMonth.setAttribute("class", "listOfMonth");
        document.querySelector("#listOfMonth").insertAdjacentElement("afterbegin", listOfMonth);
 
        let balanceSheetContainer = document.createElement("div");
        balanceSheetContainer.setAttribute("class", "flex-item balanceSheetContainer");
        document.querySelector(".listOfMonth").insertAdjacentElement("afterbegin", balanceSheetContainer);
 
        let month_year = document.createElement("h2");
        month_year.setAttribute("class", "month-year");
        month_year.textContent = `${new Date(this._year, this._month -1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`
        document.querySelector(".balanceSheetContainer").insertAdjacentElement("afterbegin", month_year);
 
        let headLine = document.createElement("h2");
        headLine.setAttribute("class", "monatsbilanz");
        document.querySelector(".balanceSheetContainer").insertAdjacentElement("beforeend", headLine);
 
        let monatsBilanz = document.createElement("span");
        monatsBilanz.setAttribute("class", "monatsbilanz");
        monatsBilanz.textContent = `${this._balanceSheet} € + ${this._pricePerYear } € `;
        
        headLine.insertAdjacentElement("afterbegin", monatsBilanz);

        // let pricePerYear = document.createElement("span");
        // pricePerYear.setAttribute("class", "monatsbilanz");
        // pricePerYear.textContent = `${this._balanceSheet} €`; 
 
        // headLine.insertAdjacentElement("afterbegin", pricePerYear);

        let entryContainer = document.createElement("div");
        entryContainer.setAttribute("class", "flex-item entry-container");
        document.querySelector(".listOfMonth").insertAdjacentElement("beforeend", entryContainer);

       let bulletPointList = document.createElement("ul");
        this._entries.forEach(eintrag => 
        bulletPointList.insertAdjacentElement("beforeend", eintrag.html()));       
        document.querySelector(".entry-container").insertAdjacentElement("afterbegin", bulletPointList);

        return listOfMonth;

        }
        /**
         * This method iterates over the _entries Array and
         * generates the balance sheet
         */
        _generateBalanceSheet(){
            let monatsbilanz = 0;
            this._entries.forEach(entry => {
                console.log(entry)
                monatsbilanz += parseFloat(entry.result());
            });
            this._balanceSheet = monatsbilanz;
        }
        /**
         * This method iterates over the _entries Array and sorts the entries
         * by there timestamp. Timestamp in combination with date shows the 
         * entries from top (newest) to botton (oldest).
         */
        _sortEntries(){
            this._entries.sort((entry_a, entry_b) => {
                if (entry_a.date() > entry_b.date()) {
                    return -1;
                } else if (entry_a.date() < entry_b.date()) {
                    return 1;
                } else {
                    if (entry_a.timestamp() > entry_b.timestamp()) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        }
        /**
         * This method keeps the entries always up to date by sorting the entries in the Array again, 
         * generating a new balance sheet and creating a new List of the Month.
         */
        _reGenerateAll() {
            this._sortEntries();
            this._generateBalanceSheet();
            this._html = this._generate_listOfMonth();
        }
}