"use strict"
/**
 * The class FormField provides the methods and properties needed for the user input
 */
class FormField {
    /**
     * @property {Element} - creates the Formfield on instantiation
     */
    constructor (){
        this._formField = this._generateFormField_html();
    }
    /**
     * getter method to acces the emthod form outside
     * @returns {Element} - FromField
     */
    html(){
        return this._formField;
    }
     /**
      * This Method creates the HTML for the formfield and returns it.
      * It passes on the parameter @param formField for the EnergyCostCalculater submit event method
      * to further process the user input. It also invokes the method to display the header 
      * and renew the date everytime.
      * @returns {Element} formField
      */
      _generateFormField_html() {
        let formField = document.createElement("section");
        formField.setAttribute("id", "formField-section");
        formField.innerHTML = ` <form id="formField" action"#" method="get"></form>
        <div id="entry-group" >
        <div class="row-4">
            <div class="flex-item">
                <label for="zstand_start">Zählerstand Start</label> <br>
            <input type="number" id="zstand_start" name="zstand_start" form="formField" placeholder="z.B. 37451,01" size="10" min="0.01" step="0.01" title="Der erste Zählerstand (max. zwei Nachkommastellen)" required>
            </div>
            <div class="flex-item">
                <label for="zustandszahl">Zustandszahl</label> <br>
            <input type="number" id="zustandszahl" name="zustandszahl" form="formField" placeholder="z.B. 0.9674" size="10" min="0.01" step="0.01" title="Die Gas - Zustandszahl" required>
            </div>
            <div class="flex-item">
                <label for="brennwert">Brennwert</label><br>
                <input type="number" id="brennwert" name="brennwert" form="formField" placeholder="z.B. 10.19" size="10" min="0.01" step="0.01" title="Der Brennwert" required>
            </div>
            <div class="flex-item">
                <label for="kosten_kwh">Kosten Cent/Kwh</label><br>
            <input type="number" id="kosten_kwh" name="kosten_kwh" form="formField" placeholder="z.B. 0,16" size="10" min="0.01" min="0.01" step="0.01" title="Die Kosten in cent pro Kwh" required>
            </div>
        </div>
         <div class="row-3">
            <div class="flex-item">
                <label for="zstand_neu">Zählerstand Neu</label><br>
            <input type="number" id="zstand_neu" name="zstand_neu" form="formField" placeholder="z.B. 38184" size="10" min="0.01" step="0.01" title="Der aktuelle Zählerstand" required>
            </div>
            <div class="flex-item">
            <label for="pricePerYear">Grundpreis/Jahr</label><br>
            <input type="number" id="pricePerYear" name="pricePerYear" form="formField" placeholder="z.B. 107,00€" size="10" min="0.01" step="0.01" title="Grundpreis pro Jahr" required>
            </div>
            <div class="flex-item">
                <label for="date">Datum</label><br>
            <input type="date" id="date" name="date" form="formField" size="10" title="date entryFormular (Format: tt-mm-jjjj)" required>
            </div>
            <div class="flex-item">
                <button id="bt-submit" class="standard" type="submit" form="formField">Hinzufügen</button>
            </div>
        </div>`;
        energyCostCalculator.add_submitEvent(formField);
        return formField;
       }
       renewDate(){
        document.querySelector("#date").valueAsDate = new Date();
        }
        /**
        * Displays the Header, creates the formfield and renews the Date for user entries
        */
        displayHeader() {
        document.querySelector("#header").insertAdjacentElement("afterbegin", this._formField);
        this.renewDate();
        }
}