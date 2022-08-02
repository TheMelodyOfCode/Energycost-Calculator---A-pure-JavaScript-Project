
 class TotalBalance {

    constructor(){
        
        this._totalCosts = 0;
        this._totalUsage = 0;
        this._html = this._html_generieren();
        this._anzeigen = this.anzeigen();
        console.log(this._totalCosts);
    }




_html_generieren(){

    let aside = document.createElement("aside");
    aside.setAttribute("id", "balanceBox");

    let balanceTitle = document.createElement("h1");
    balanceTitle.textContent = "Gesamtbilanz:";
    aside.insertAdjacentElement("afterbegin", balanceTitle);

    let divUsage = document.createElement("div");
    divUsage.setAttribute("class", "totalUsage");
    aside.insertAdjacentElement("beforeend", divUsage);

    let spanUsageTitle = document.createElement("span");
    spanUsageTitle.textContent = `Verbrauch: `;
    divUsage.insertAdjacentElement("beforeend", spanUsageTitle);

    let spanUsage = document.createElement("span");
    spanUsage.textContent = ` ${this._totalUsage} m3 `;
    divUsage.insertAdjacentElement("beforeend", spanUsage);

    let divCosts = document.createElement("div");
    divCosts.setAttribute("class", "totalUsage");
    aside.insertAdjacentElement("beforeend", divCosts);

    let spanCostsTitle = document.createElement("span");
    spanCostsTitle.textContent = `Kosten: `;
    divCosts.insertAdjacentElement("afterbegin", spanCostsTitle);

    let spanCosts = document.createElement("span");
    spanCosts.textContent = `${this._totalCosts}  € `;
    divCosts.insertAdjacentElement("beforeend", spanCosts);

    return aside;
}

renewBalance(arrayEntriesECC){
    let totalCosts = 0;
    let totalUsage = 0;
    arrayEntriesECC.forEach(entry =>{
        totalCosts += parseFloat(entry._result);
        totalUsage += parseFloat(entry._usage);
        });
        this._totalCosts = totalCosts;
        this._totalUsage = totalUsage;
        console.log(this._totalCosts);
        console.log(this._totalUsage);
        this._html = this._html_generieren();
        this.anzeigen();
};


    anzeigen() {

      let waitForElement =  async selector =>{
            while (document.querySelector(selector) === null) {
                await new Promise(resolve => requestAnimationFrame(resolve))
            }
            return document.querySelector(selector)
        }
        waitForElement("#entry-group").then(() => {
                let balanzeBox = document.querySelector("#balanceBox");
                if (balanzeBox !== null) {
                    balanzeBox.remove();
                }
                let balanceContainer = document.getElementById("entry-group");
                balanceContainer.insertAdjacentElement("afterbegin", this._html);
            });
    }

}

// let gesamtbilanz = document.querySelector("#gesamtbilanz");
// if (gesamtbilanz !== null) {
//      gesamtbilanz.remove();
// }
//  document.querySelector("body").insertAdjacentElement("beforeend", this._html);