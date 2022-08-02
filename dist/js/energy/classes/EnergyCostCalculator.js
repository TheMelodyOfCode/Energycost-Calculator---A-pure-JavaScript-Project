"use strict"
/**
 * The class EnergyCostCalculator is the heart of the application.
 * It has all methods and properties to retreive, process and pass on 
 * the user data entry. It converts and saves the data to the browsers local storage 
 * and provides the click events for the submit event andremoval button.
 */
class EnergyCostCalculator {
       /**
        * The constructor instantiates the MonthListCollection and 
        * restores the Local Storage entries. 
        * @property {Array} - Array that holds the DataEntry objects
        * @property {number} - number of the balance sheet
        */
       constructor(){

              this._monthListCollection = new MonthListCollection();
              this._totalBalance = new TotalBalance();
              this._entries = [];
              this._balanceSheet = 0;
              this._restore_localStorageEntries()

          }
       /**
        * This methods gets the user input and parses the value as a string into a number.
        * It passes the data on to _calculateFormData.
        * @param {Object} userInput - the provided user input to pass on
        * @returns the user input object
        */    
      _retrieveFormData(userInput){
             return {
                 zstand_start: parseFloat(userInput.target.elements.zstand_start.value),
                 zstand_neu: parseFloat(userInput.target.elements.zstand_neu.value),
                 pricePerYear: parseFloat(userInput.target.elements.pricePerYear.value),
                 kosten_kwh: parseFloat(userInput.target.elements.kosten_kwh.value),
                 date: userInput.target.elements.date.valueAsDate,
             }          
      }
      /**
       * This method calculates the retrieved data and return the result in an object
       * @param {Object} retrievedFormData - passed on data from _retrieve FormData
       * @returns - returns the result 
       */
      _calculateFormData(retrievedFormData){
      
       let zstand_neu = retrievedFormData.zstand_neu;
       let pricePerYear = (retrievedFormData.pricePerYear / 12);
       let usage = retrievedFormData.zstand_neu - retrievedFormData.zstand_start;
       let result = usage * retrievedFormData.kosten_kwh;
       console.log(pricePerYear);
              return {
                     usage: usage,
                     result: result,
                     zstand_neu: zstand_neu,
                     pricePerYear: pricePerYear.toFixed(2),
                     date: new Date(retrievedFormData.date)
              } 
      }
      /**
       * This method instantiates a new DataEntry and pushes it in
       * the this._entries Array. It also saves the data  Browser Local sorage
       * and passes the Array on to the monthListCollection.display method.
       * @param {*} calculatedData - data from the calculateFormData method.
       */
      _processFormData(calculatedData){
             let newEntry = new DataEntry(
              calculatedData.zstand_neu,
              calculatedData.pricePerYear,
              calculatedData.usage,
              calculatedData.result.toFixed(2),
              calculatedData.date
             );
               this._entries.push(newEntry);
               this._monthListCollection.display(this._entries);
              this._saveToLocalStorage();
              this._totalBalance.renewBalance(this._entries);
        }

       /**
        * The submit event that gets the data form the user and passes it on
        * @param {*} userInput - the user input data
        */
      add_submitEvent(userInput){
             userInput.querySelector("#formField").addEventListener("submit", submitEvent => {
                    submitEvent.preventDefault(); 
                    let userInput = this._calculateFormData(this._retrieveFormData(submitEvent));
                    this._processFormData(userInput);     
             });        
      }
      /**
       * This method iterates over the Array this._entries
       * and removes an entry by using it's timestamp.
       * It also renews all methods an displays them again
       * @param {Number} timestamp 
       */
     removeEntry(timestamp){
       let start_index;
       for (let i = 0; i< this._entries.length; i++) {
              if (this._entries[i].timestamp() === parseInt(timestamp)) {
                     start_index = i;
                     break;
              }
       }
       this._entries.splice(start_index, 1);
       this._monthListCollection.display(this._entries);
       this._saveToLocalStorage()
       }
      display (){
       this._monthListCollection.display();
      }
      /**
       * This method saves the this._entries Array as a JSON string to the browsers local storage.
       * This method gets invoked when an entry is added or removed.
       */
      _saveToLocalStorage(){
             localStorage.setItem("energy-entries", JSON.stringify(this._entries));
      }
      /**
       * This method gets invoked in the constructor to retrieve the data form the browsers local storage
       * everytime the EnergyCostCalculator gets instantiated in the main.js
       * Diese Methode muss im constructor aufgerufen werden.
       * Everytime the browser page gets opened this restores the data
       * Since the retrieved Data form the JSON-File is a string, the date has to be passed on 
       * as the date object.
       */
      _restore_localStorageEntries(){
             let savedEntries = localStorage.getItem("energy-entries");
             if (savedEntries !== null) {
                    JSON.parse(savedEntries).forEach(entry => {
                           this._processFormData({
                            zstand_neu: entry._zstand_neu,
                            pricePerYear: entry._pricePerYear,
                            result: entry._result,
                            usage: entry._usage,
                                date: new Date(entry._date)
                           });
                    })
             }  
      }
}