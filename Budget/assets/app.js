    
class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }

    submitBudgetForm(){
      const  value =  this.budgetInput.value;
      console.log(value);
      if(value<0 || value ===''){
          console.log("enter the if");
          this.budgetFeedback.classList.add("showItem");
          this.budgetFeedback.innerHTML = `<p> Value can't be empty or negative </p`;
          const self = this;
          console.log("**"+this);
          setTimeout(function(){
            console.log("@@"+self);
            console.log("##"+this);
               self.budgetFeedback.classList.remove("showItem");
          },4000);
        } 
        else{
            this.budgetAmount.textContent = value; 
            this.budgetInput.value = "";
            this.showBalance();
        }
    }

    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        console.log(expenseValue);
        const amountValue = this.amountInput.value;
        console.log(amountValue);
        if(expenseValue === '' || amountValue === '' || amountValue < 0){
            this.expenseFeedback.classList.add("showItem");
            this.expenseFeedback.innerHTML = `<p>Expense and amount value cannot be empty or negative </p >`;
           const self = this;
            setTimeout(function(){
            self.expenseFeedback.classList.remove("showItem");
            },4000);
        }
        else{
            let amount = parseInt(amountValue);
           // this.expenseAmount.textContent = amountValue;
            this.expenseInput.value = '';
            this.amountInput.value = '';
             
            let expense = {
                id:this.itemID,
                title:expenseValue,
                amount:amount
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
}

        addExpense(expense){
                    const div = document.createElement("div");
                    div.classList.add("expense");
                    div.innerHTML = `
                    <div class="expense-item d-flex justify-content-between align-items-baseline">
                    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title} </h6>
                    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
                    <div class="expense-icons list-item">
                    <a href="#" class="edit-icon mx-2 data-id="${expense.id}>
                    <i class="fas fa-edit"></i>
                    </a>
                    <a href="#" class="edit-icon mx-2 data-id="${expense.id}>
                    <i class="fas fa-trash"></i>
                    </a>
                </div>
                </div>
                    `;
                    this.expenseList.appendChild(div);
        }


    showBalance(){
        console.log("in show Balance");
        const expense = this.totalExpense();
        console.log(expense);
        const total = parseInt(this.budgetAmount.textContent) - expense;
        //const total =this.budgetAmount.textContent - expense;
        console.log(total);
         this.balanceAmount.textContent = total;

         if(total<0){
             this.balance.classList.remove("showGreen","showBlack");
             this.balance.classList.add("showRed");
         }

         else if(total>0){
            this.balance.classList.remove("showRed","showBlack");
            this.balance.classList.add("showGreen");
         }
         else if(total===0){
            this.balance.classList.remove("showRed","showGreen");
            this.balance.classList.add("showBlack");
         }
         // this.balanceAmount.textContent = 
    }

        totalExpense(){
            console.log("in total Expense");
            let total = 0;
            if(this.itemList.length>0){
                            total = this.itemList.reduce(function(acc,curr){
                                acc+=curr.amount;
                                return acc;
                            },0);
            }
            
                this.expenseAmount.textContent = total;
            
            return total;
        }


        editExpense(element){
            let id = parseInt(element.dataset.id);
            console.log("in edit expense "+id);
            let parent = element.parentElement.parentElement.parentElement;
            this.expenseList.removeChild(parent);
            let expense = this.itemList.filter(function(item){
                        return item.id===id;
            });
                this.expenseInput.value = expense[0].title;
                this.amountInput.value = expense[0].amount;
            let templist = this.itemList.filter(function(item){
                    return item.id!==id;
            });
            this.itemList = templist;
            this.showBalance();
        }

        deleteExpense(element){
            let id = parseInt(element.dataset.id);
            console.log("in edit expense "+id);
            let parent = element.parentElement.parentElement.parentElement;
            this.expenseList.removeChild(parent);

            let templist = this.itemList.filter(function(item){
                return item.id!==id;
        });
        this.itemList = templist;
        this.showBalance();
        }


       
  }

  function eventListeners(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    const ui  = new UI();

    budgetForm.addEventListener('submit',function(event){
        event.preventDefault();
        ui.submitBudgetForm();

    });

    expenseForm.addEventListener('submit',function(event){
        event.preventDefault();
        ui.submitExpenseForm();

    });

    // expenseList.addEventListener('click',function(){
    //             if(event.target.parentElement.classList.contains('edit-icon')){
    //                                 ui.editExpense(event.target.parentElement);
    //             }

    //             else if(event.target.parentElement.classList.contains('delete-icon')){
    //                 console.log("enter delete");
    //                 ui.deleteExpense(event.target.parentElement);
    //             }

    // });


  }

  document.addEventListener('DOMContentLoaded',function(){
      eventListeners();
  });